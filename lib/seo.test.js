const test = require('node:test');
const assert = require('node:assert/strict');
const { metaDescription, MAX_DESCRIPTION_LENGTH } = require('./seo');

test('prefers the excerpt and strips markup', () => {
    assert.equal(
        metaDescription({ excerpt: '<p>Funky  house\nmusic</p>', description: 'Ignored' }),
        'Funky house music'
    );
});

test('falls back to the page description, then the site description', () => {
    assert.equal(metaDescription({ description: 'Page', fallback: 'Site' }), 'Page');
    assert.equal(metaDescription({ fallback: 'Site' }), 'Site');
});

test('adds the first three unique artists from the tracklist', () => {
    const tracklist = [
        { section: 'Side A' },
        { artist: 'East 17', title: 'Stay Another Day' },
        { artist: 'East 17', title: 'Deep' },
        { title: 'Untitled' },
        { artist: 'Bodyrox' },
        { artist: 'Chris Lake' },
        { artist: 'Not Shown' },
    ];
    assert.equal(
        metaDescription({ description: 'A funky house music mix', tracklist }),
        'A funky house music mix. Featuring East 17, Bodyrox, Chris Lake.'
    );
});

test('ignores the tracklist when there is an excerpt', () => {
    assert.equal(
        metaDescription({ excerpt: 'Episode notes', tracklist: [{ artist: 'East 17' }] }),
        'Episode notes'
    );
});

test('truncates long text at a word boundary', () => {
    const result = metaDescription({ excerpt: 'word '.repeat(60) });
    assert.ok(result.length <= MAX_DESCRIPTION_LENGTH);
    assert.match(result, /word…$/);
});
