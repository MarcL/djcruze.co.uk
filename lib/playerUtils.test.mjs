import test from 'node:test';
import assert from 'node:assert/strict';
import { findActiveTrackIndex, findAdjacentTrackStart, formatTime } from './playerUtils.mjs';

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

test('finds the next track start', () => {
    const startTimes = [0, 300, 600];
    assert.equal(findAdjacentTrackStart(startTimes, 10, 'next'), 300);
    assert.equal(findAdjacentTrackStart(startTimes, 300, 'next'), 600);
    assert.equal(findAdjacentTrackStart(startTimes, 650, 'next'), null);
});

test('previous restarts the current track, or goes back one near its start', () => {
    const startTimes = [0, 300, 600];
    assert.equal(findAdjacentTrackStart(startTimes, 450, 'previous'), 300);
    assert.equal(findAdjacentTrackStart(startTimes, 301, 'previous'), 0);
    assert.equal(findAdjacentTrackStart(startTimes, 1, 'previous'), null);
    assert.equal(findAdjacentTrackStart([120], 60, 'previous'), null);
});
