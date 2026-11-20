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
