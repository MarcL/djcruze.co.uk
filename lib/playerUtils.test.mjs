import test from 'node:test';
import assert from 'node:assert/strict';
import { findActiveTrackIndex, formatTime } from './playerUtils.mjs';

test('finds the track playing at a given time', () => {
    const startTimes = [0, 300, 600];
    assert.equal(findActiveTrackIndex(startTimes, 0), 0);
    assert.equal(findActiveTrackIndex(startTimes, 299), 0);
    assert.equal(findActiveTrackIndex(startTimes, 300), 1);
    assert.equal(findActiveTrackIndex(startTimes, 10000), 2);
});

test('returns -1 before the first timestamped track or with no tracks', () => {
    assert.equal(findActiveTrackIndex([120, 240], 60), -1);
    assert.equal(findActiveTrackIndex([], 60), -1);
});

test('formats times with and without hours', () => {
    assert.equal(formatTime(0), '0:00');
    assert.equal(formatTime(75.9), '1:15');
    assert.equal(formatTime(3725), '1:02:05');
    assert.equal(formatTime(undefined), '0:00');
});
