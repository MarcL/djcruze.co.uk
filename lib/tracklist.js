const TRACK_KEYS = ['time', 'artist', 'title', 'label', 'note'];
const TIME_REGEX = /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/;

const timeToSeconds = (time) => {
    const [, hours, minutes, seconds] = time.match(TIME_REGEX);
    return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
};

const validateEntry = (entry, index) => {
    const position = `Tracklist entry ${index + 1}`;

    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
        throw new Error(
            `${position} must be an object with section or artist/title fields, got: ${JSON.stringify(entry)}`
        );
    }

    if ('section' in entry) {
        if (Object.keys(entry).length !== 1 || typeof entry.section !== 'string') {
            throw new Error(`${position}: a section entry can only have a "section" text field.`);
        }
        return;
    }

    const unknownKeys = Object.keys(entry).filter((key) => !TRACK_KEYS.includes(key));
    if (unknownKeys.length > 0) {
        throw new Error(`${position} has unknown field(s): ${unknownKeys.join(', ')}`);
    }

    if (!entry.artist && !entry.title) {
        throw new Error(`${position} needs an artist or a title.`);
    }

    if (entry.time !== undefined && !TIME_REGEX.test(String(entry.time))) {
        throw new Error(`${position} has time "${entry.time}", expected HH:MM:SS.`);
    }
};

// Normalises frontmatter tracklist entries for the audio template.
const parseTracklist = (entries) => {
    if (!Array.isArray(entries)) {
        return { tracklist: [], hasLabels: false, trackCount: 0 };
    }

    let trackNumber = 0;
    const tracklist = entries.map((entry, index) => {
        validateEntry(entry, index);

        if ('section' in entry) {
            return { section: entry.section };
        }

        trackNumber++;
        return {
            number: trackNumber,
            timestamp: entry.time ?? null,
            timestampInSeconds: entry.time ? timeToSeconds(entry.time) : null,
            artist: entry.artist,
            title: entry.title,
            label: entry.label,
            note: entry.note,
        };
    });

    return {
        tracklist,
        hasLabels: tracklist.some((track) => track.label),
        trackCount: trackNumber,
    };
};

module.exports = { parseTracklist };
