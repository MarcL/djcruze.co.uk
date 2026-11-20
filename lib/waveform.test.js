const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const {
    mediaContentFromMarkdown,
    waveformFilePath,
    reducePeaks,
    WAVEFORM_DIRECTORY,
} = require('./waveform');

test('reads media.content from frontmatter', () => {
    const markdown = [
        '---',
        "title: 'A Mix'",
        'media:',
        "  image: '/images/mixes/a.jpg'",
        "  content: '/mixes/a_mix.mp3'",
        '---',
        'Body with content: ignored',
    ].join('\n');

    assert.equal(mediaContentFromMarkdown(markdown), '/mixes/a_mix.mp3');
});

test('reads unquoted media.content', () => {
    assert.equal(mediaContentFromMarkdown('---\nmedia:\n    content: /podcasts/b.mp3\n---\n'), '/podcasts/b.mp3');
});

test('returns null without frontmatter or media', () => {
    assert.equal(mediaContentFromMarkdown('no frontmatter'), null);
    assert.equal(mediaContentFromMarkdown("---\ntitle: 'x'\n---\n"), null);
});

test('maps media paths to waveform JSON files', () => {
    assert.equal(
        waveformFilePath('/mixes/djcruze_june1993_mix.mp3'),
        path.join(WAVEFORM_DIRECTORY, 'mixes', 'djcruze_june1993_mix.json')
    );
});

test('reduces block peaks by taking the max of each group and normalising', () => {
    assert.deepEqual(reducePeaks([0.1, 0.5, 0.2, 0.25, 0.05, 0.1], 3), [1, 0.5, 0.2]);
});

test('keeps all peaks when there are fewer blocks than requested', () => {
    assert.deepEqual(reducePeaks([0.5, 0.25], 1000), [1, 0.5]);
});

test('handles silence and empty input', () => {
    assert.deepEqual(reducePeaks([0, 0], 2), [0, 0]);
    assert.deepEqual(reducePeaks([], 10), []);
});
