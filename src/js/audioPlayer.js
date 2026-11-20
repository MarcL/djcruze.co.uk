import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@8.1.0/dist/wavesurfer.esm.js';
import RegionsPlugin from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@8.1.0/dist/plugins/regions.esm.js';
import { findActiveTrackIndex, formatTime } from './playerUtils.mjs';

const SEEK_STEP_SECONDS = 10;
const ACTIVE_TRACK_CLASS = 'tracklist-row-active';

const data = JSON.parse(document.getElementById('audio-player-data').textContent);
const playerCard = document.getElementById('audio-player');
const waveformElement = document.getElementById('waveform');
const miniPlayer = document.getElementById('mini-player');
const miniProgressTrack = document.getElementById('mini-progress-track');
const miniProgress = document.getElementById('mini-progress');
const toggleButtons = document.querySelectorAll('.js-play-toggle');
const currentTimeElements = document.querySelectorAll('.js-current-time');
const durationElements = document.querySelectorAll('.js-duration');
const nowPlayingElements = document.querySelectorAll('.js-now-playing');

// Tracks with timestamps, sorted, each linked to its tracklist row.
const timedTracks = data.tracks
    .filter((track) => typeof track.timestampInSeconds === 'number')
    .sort((trackA, trackB) => trackA.timestampInSeconds - trackB.timestampInSeconds)
    .map((track) => ({
        ...track,
        row: document.querySelector(`.tracklist-row[data-track-number="${track.number}"]`),
    }));
const trackStartTimes = timedTracks.map((track) => track.timestampInSeconds);

const waveColor = getComputedStyle(waveformElement).getPropertyValue('--wave-color').trim();
const progressColor = getComputedStyle(waveformElement).getPropertyValue('--progress-color').trim();

const regions = RegionsPlugin.create();
const wavesurfer = WaveSurfer.create({
    container: waveformElement,
    url: data.url,
    // Pre-generated peaks mean the browser never downloads the whole file to draw the waveform.
    peaks: data.waveform ? [data.waveform.peaks] : undefined,
    duration: data.waveform ? data.waveform.duration : undefined,
    height: 'auto',
    waveColor,
    progressColor,
    cursorColor: progressColor,
    barWidth: 4,
    barGap: 2,
    barRadius: 2,
    dragToSeek: true,
    plugins: [regions],
});

const trackLabel = (track) => [track.artist, track.title].filter(Boolean).join(' - ');

// A thin, faint line centred in a wider transparent strip so it is still easy to hover and click.
const MARKER_HIT_WIDTH_PIXELS = 9;
const markerBackground = (opacity) =>
    `linear-gradient(to right, transparent 4px, rgba(14, 165, 233, ${opacity}) 4px, rgba(14, 165, 233, ${opacity}) 5px, transparent 5px)`;

const addTrackMarkers = () => {
    regions.clearRegions();
    timedTracks.forEach((track) => {
        const marker = regions.addRegion({
            start: track.timestampInSeconds,
            drag: false,
            resize: false,
        });
        Object.assign(marker.element.style, {
            borderLeft: 'none',
            width: `${MARKER_HIT_WIDTH_PIXELS}px`,
            marginLeft: `-${Math.floor(MARKER_HIT_WIDTH_PIXELS / 2)}px`,
            background: markerBackground(0.4),
            cursor: 'pointer',
        });
        marker.element.addEventListener('mouseenter', () => (marker.element.style.background = markerBackground(1)));
        marker.element.addEventListener('mouseleave', () => (marker.element.style.background = markerBackground(0.4)));
        marker.element.title = `${track.number}. ${trackLabel(track)} (${formatTime(track.timestampInSeconds)})`;
    });
};

regions.on('region-clicked', (marker, event) => {
    event.stopPropagation();
    wavesurfer.setTime(marker.start);
});

let activeTrackIndex = null;
const updateActiveTrack = (currentTime) => {
    const index = findActiveTrackIndex(trackStartTimes, currentTime);
    if (index === activeTrackIndex) return;
    activeTrackIndex = index;

    timedTracks.forEach((track, trackIndex) => {
        track.row?.classList.toggle(ACTIVE_TRACK_CLASS, trackIndex === index);
    });
    const label = index >= 0 ? trackLabel(timedTracks[index]) : '';
    nowPlayingElements.forEach((element) => {
        element.textContent = label;
        element.closest('.js-now-playing-container')?.classList.toggle('hidden', !label);
    });
};

const updateTime = (currentTime) => {
    const duration = wavesurfer.getDuration();
    currentTimeElements.forEach((element) => (element.textContent = formatTime(currentTime)));
    miniProgress.style.width = duration > 0 ? `${(currentTime / duration) * 100}%` : '0';
    waveformElement.setAttribute('aria-valuenow', String(Math.floor(currentTime)));
    waveformElement.setAttribute('aria-valuetext', formatTime(currentTime));
    updateActiveTrack(currentTime);
};

const updateDuration = (duration) => {
    durationElements.forEach((element) => (element.textContent = formatTime(duration)));
    waveformElement.setAttribute('aria-valuemax', String(Math.floor(duration)));
};

const updatePlayingState = (isPlaying) => {
    toggleButtons.forEach((button) => {
        button.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
        button.querySelector('.js-play-icon').classList.toggle('hidden', isPlaying);
        button.querySelector('.js-pause-icon').classList.toggle('hidden', !isPlaying);
    });
};

// Mini player: shown once playback has started and the main player is off screen.
let hasStartedPlaying = false;
let isPlayerCardVisible = true;
const updateMiniPlayer = () => {
    const show = hasStartedPlaying && !isPlayerCardVisible;
    miniPlayer.classList.toggle('hidden', !show);
    document.body.classList.toggle('pb-20', show);
};
new IntersectionObserver(([entry]) => {
    isPlayerCardVisible = entry.isIntersecting;
    updateMiniPlayer();
}).observe(playerCard);

wavesurfer.on('ready', (duration) => {
    updateDuration(duration);
    addTrackMarkers();
});
wavesurfer.on('timeupdate', updateTime);
wavesurfer.on('play', () => {
    hasStartedPlaying = true;
    updatePlayingState(true);
    updateMiniPlayer();
});
wavesurfer.on('pause', () => updatePlayingState(false));
wavesurfer.on('finish', () => updatePlayingState(false));

if (data.waveform) updateDuration(data.waveform.duration);
updateTime(0);

toggleButtons.forEach((button) => button.addEventListener('click', () => wavesurfer.playPause()));

miniProgressTrack.addEventListener('click', (event) => {
    const bounds = miniProgressTrack.getBoundingClientRect();
    wavesurfer.seekTo(Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)));
});

// Keyboard seeking on the waveform (it has role="slider").
waveformElement.addEventListener('keydown', (event) => {
    const currentTime = wavesurfer.getCurrentTime();
    const seekTargets = {
        ArrowLeft: currentTime - SEEK_STEP_SECONDS,
        ArrowRight: currentTime + SEEK_STEP_SECONDS,
        Home: 0,
        End: wavesurfer.getDuration(),
    };
    if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        wavesurfer.playPause();
    } else if (event.key in seekTargets) {
        event.preventDefault();
        wavesurfer.setTime(Math.min(wavesurfer.getDuration(), Math.max(0, seekTargets[event.key])));
    }
});

// Click a timestamped track to jump to it and start playing.
document.querySelectorAll('.tracklist-seek').forEach((button) => {
    button.addEventListener('click', () => {
        wavesurfer.setTime(Number(button.dataset.timestamp));
        wavesurfer.play();
    });
});
