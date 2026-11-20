const test = require('node:test');
const assert = require('node:assert/strict');
const { parseTracklist } = require('./tracklist');

test('parses tracks with and without timestamps', () => {
    const result = parseTracklist([
        { time: '01:04:20', artist: 'Axwell', title: 'Nothing But Love', label: 'Axtone' },
        { artist: 'Spiller', title: 'Jumbo' },
    ]);

    assert.deepEqual(result.tracklist, [
        {
            number: 1,
            timestamp: '01:04:20',
            timestampInSeconds: 3860,
            artist: 'Axwell',
            title: 'Nothing But Love',
            label: 'Axtone',
            note: undefined,
        },
        {
            number: 2,
            timestamp: null,
            timestampInSeconds: null,
            artist: 'Spiller',
            title: 'Jumbo',
            label: undefined,
            note: undefined,
        },
    ]);
    assert.equal(result.hasLabels, true);
    assert.equal(result.trackCount, 2);
});

test('sections are not numbered or counted as tracks', () => {
    const result = parseTracklist([
        { section: 'Top 10 rundown' },
        { artist: 'Switch', title: 'A Bit Patchy' },
        { section: 'Cruze classic from 1998' },
        { artist: 'Full Intention', title: 'You Are Somebody' },
    ]);

    assert.deepEqual(result.tracklist[0], { section: 'Top 10 rundown' });
    assert.equal(result.tracklist[3].number, 2);
    assert.equal(result.trackCount, 2);
    assert.equal(result.hasLabels, false);
});

test('allows a note on a track with only an artist', () => {
    const [track] = parseTracklist([{ artist: '??', note: "Can't remember!" }]).tracklist;
    assert.equal(track.note, "Can't remember!");
});

test('returns an empty tracklist when there is none', () => {
    assert.deepEqual(parseTracklist(undefined), { tracklist: [], hasLabels: false, trackCount: 0 });
});

test('rejects old string entries', () => {
    assert.throws(() => parseTracklist(['Artist - Title - Label']), /must be an object/);
});

test('rejects a malformed time', () => {
    assert.throws(() => parseTracklist([{ time: '3:12', artist: 'Artist' }]), /expected HH:MM:SS/);
});

test('rejects unknown fields', () => {
    assert.throws(() => parseTracklist([{ artist: 'Artist', mix: 'Dub' }]), /unknown field\(s\): mix/);
});

test('rejects a track with no artist or title', () => {
    assert.throws(() => parseTracklist([{ label: 'Defected' }]), /needs an artist or a title/);
});

test('rejects extra fields on a section', () => {
    assert.throws(() => parseTracklist([{ section: 'New tunes', artist: 'Artist' }]), /section entry/);
});
