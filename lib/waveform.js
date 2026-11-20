const fs = require('fs');
const path = require('path');

const WAVEFORM_DIRECTORY = path.join(__dirname, '..', 'src', 'waveforms');
const PEAK_COUNT = 1000;

// Finds `media.content` in a page's frontmatter without pulling in a YAML parser.
const mediaContentFromMarkdown = (markdown) => {
    const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!frontmatter) return null;

    const content = frontmatter[1].match(/^\s+content:\s*['"]?([^'"\r\n]+?)['"]?\s*$/m);
    return content ? content[1] : null;
};

const waveformFilePath = (mediaContent) =>
    path.join(WAVEFORM_DIRECTORY, mediaContent.replace(/\.[^./]+$/, '') + '.json');

// Reduces fine-grained block peaks to `peakCount` values (max of each group), normalised to 0-1.
const reducePeaks = (blockPeaks, peakCount = PEAK_COUNT) => {
    if (blockPeaks.length === 0) return [];

    const count = Math.min(peakCount, blockPeaks.length);
    const groupSize = blockPeaks.length / count;
    const peaks = [];

    for (let index = 0; index < count; index++) {
        const start = Math.floor(index * groupSize);
        const end = Math.max(start + 1, Math.floor((index + 1) * groupSize));
        let peak = 0;
        for (let blockIndex = start; blockIndex < end; blockIndex++) {
            peak = Math.max(peak, blockPeaks[blockIndex]);
        }
        peaks.push(peak);
    }

    const loudest = Math.max(...peaks);
    return peaks.map((peak) => (loudest > 0 ? Math.round((peak / loudest) * 100) / 100 : 0));
};

const loadWaveform = (mediaContent) => {
    const filePath = waveformFilePath(mediaContent);
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

module.exports = {
    PEAK_COUNT,
    WAVEFORM_DIRECTORY,
    mediaContentFromMarkdown,
    waveformFilePath,
    reducePeaks,
    loadWaveform,
};
