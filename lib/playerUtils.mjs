// Shared by the browser audio player (copied to /js/playerUtils.mjs) and the tests.

// Index of the last track that started at or before `currentTime`, or -1 before the first one.
// `trackStartTimes` must be sorted ascending.
export const findActiveTrackIndex = (trackStartTimes, currentTime) => {
    let activeIndex = -1;
    for (let index = 0; index < trackStartTimes.length; index++) {
        if (trackStartTimes[index] > currentTime) break;
        activeIndex = index;
    }
    return activeIndex;
};

// 75 -> "1:15", 3725 -> "1:02:05"
export const formatTime = (totalSeconds) => {
    const seconds = Math.max(0, Math.floor(totalSeconds || 0));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainder = String(seconds % 60).padStart(2, '0');
    return hours > 0 ? `${hours}:${String(minutes).padStart(2, '0')}:${remainder}` : `${minutes}:${remainder}`;
};

// Start time of the next or previous track, like a CD player: "previous" restarts the current
// track unless you're within the first few seconds of it. Returns null when there is none.
const RESTART_THRESHOLD_SECONDS = 3;
export const findAdjacentTrackStart = (trackStartTimes, currentTime, direction) => {
    if (direction === 'next') {
        return trackStartTimes.find((startTime) => startTime > currentTime + 0.5) ?? null;
    }
    const activeIndex = findActiveTrackIndex(trackStartTimes, currentTime);
    if (activeIndex < 0) return null;
    if (currentTime - trackStartTimes[activeIndex] > RESTART_THRESHOLD_SECONDS) return trackStartTimes[activeIndex];
    return activeIndex > 0 ? trackStartTimes[activeIndex - 1] : null;
};
