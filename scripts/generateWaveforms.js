// Generates waveform peaks for every mix, podcast and production that does not have them yet.
// Usage: npm run waveforms [-- --force]   (requires ffmpeg on your PATH)
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const {
    mediaContentFromMarkdown,
    waveformFilePath,
    reducePeaks,
} = require('../lib/waveform');

const MEDIA_BASE_URL = 'https://f001.backblazeb2.com/file/djcruzemedia';
const COLLECTION_DIRECTORIES = ['mixes', 'podcasts', 'productions'].map((name) =>
    path.join(__dirname, '..', 'src', 'pages', name)
);
const SAMPLE_RATE = 8000;
const SAMPLES_PER_BLOCK = 800; // 0.1 seconds per block

const findMediaFiles = () =>
    COLLECTION_DIRECTORIES.flatMap((directory) =>
        fs
            .readdirSync(directory)
            .filter((filename) => filename.endsWith('.md'))
            .map((filename) => mediaContentFromMarkdown(fs.readFileSync(path.join(directory, filename), 'utf8')))
            .filter(Boolean)
    );

// Decodes the MP3 to mono 32-bit float samples with ffmpeg and records the peak of each block.
const readBlockPeaks = (url) =>
    new Promise((resolve, reject) => {
        const ffmpeg = spawn('ffmpeg', ['-v', 'error', '-i', url, '-ac', '1', '-ar', String(SAMPLE_RATE), '-f', 'f32le', '-']);
        const blockPeaks = [];
        let sampleCount = 0;
        let blockPeak = 0;
        let leftover = Buffer.alloc(0);
        let errorOutput = '';

        ffmpeg.stdout.on('data', (chunk) => {
            const buffer = Buffer.concat([leftover, chunk]);
            const usableBytes = buffer.length - (buffer.length % 4);
            for (let offset = 0; offset < usableBytes; offset += 4) {
                blockPeak = Math.max(blockPeak, Math.abs(buffer.readFloatLE(offset)));
                sampleCount++;
                if (sampleCount % SAMPLES_PER_BLOCK === 0) {
                    blockPeaks.push(blockPeak);
                    blockPeak = 0;
                }
            }
            leftover = buffer.subarray(usableBytes);
        });
        ffmpeg.stderr.on('data', (data) => (errorOutput += data));
        ffmpeg.on('error', reject);
        ffmpeg.on('close', (code) => {
            if (code !== 0) return reject(new Error(`ffmpeg exited with ${code}: ${errorOutput.trim()}`));
            if (sampleCount % SAMPLES_PER_BLOCK !== 0) blockPeaks.push(blockPeak);
            resolve({ blockPeaks, duration: sampleCount / SAMPLE_RATE });
        });
    });

const main = async () => {
    const force = process.argv.includes('--force');
    const mediaFiles = [...new Set(findMediaFiles())];
    const missing = mediaFiles.filter((mediaContent) => force || !fs.existsSync(waveformFilePath(mediaContent)));

    console.log(`${mediaFiles.length} media files, ${missing.length} to generate.`);

    let failures = 0;
    for (const mediaContent of missing) {
        try {
            const { blockPeaks, duration } = await readBlockPeaks(`${MEDIA_BASE_URL}${mediaContent}`);
            const outputPath = waveformFilePath(mediaContent);
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
            fs.writeFileSync(
                outputPath,
                JSON.stringify({ duration: Math.round(duration * 100) / 100, peaks: reducePeaks(blockPeaks) }) + '\n'
            );
            console.log(`✓ ${mediaContent} (${Math.round(duration)}s)`);
        } catch (error) {
            failures++;
            console.error(`✗ ${mediaContent}: ${error.message}`);
        }
    }

    if (failures > 0) process.exitCode = 1;
};

main();
