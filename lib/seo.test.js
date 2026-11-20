const test = require('node:test');
const assert = require('node:assert/strict');
const {
    metaDescription,
    podcastSeriesSchema,
    podcastEpisodeSchema,
    MAX_DESCRIPTION_LENGTH,
} = require('./seo');

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

const podcast = {
    title: 'DJ Cruze House Music Podcast',
    description: 'House music',
    author: 'DJ Cruze',
    channelImage: '/images/podcasts/logo.jpg',
    feedPath: '/podcasts/feed.xml',
};
const siteUrl = 'https://www.djcruze.co.uk';

test('podcast series schema has absolute feed and image URLs', () => {
    const schema = podcastSeriesSchema(podcast, siteUrl);
    assert.equal(schema['@type'], 'PodcastSeries');
    assert.equal(schema.url, 'https://www.djcruze.co.uk/podcasts/');
    assert.equal(schema.webFeed, 'https://www.djcruze.co.uk/podcasts/feed.xml');
    assert.equal(schema.image, 'https://www.djcruze.co.uk/images/podcasts/logo.jpg');
});

test('podcast episode schema links media and series', () => {
    const schema = podcastEpisodeSchema({
        podcast,
        siteUrl,
        title: 'Episode #46 - Sexy Dancer',
        url: '/podcasts/episode-46-sexy-dancer/',
        date: new Date('2008-12-23T00:00:00Z'),
        description: 'Funky',
        media: { episode: 46, image: '/images/podcasts/podcast46.jpg', content: '/podcasts/46.mp3' },
        mediaUrl: '/media',
    });
    assert.equal(schema['@type'], 'PodcastEpisode');
    assert.equal(schema.url, 'https://www.djcruze.co.uk/podcasts/episode-46-sexy-dancer/');
    assert.equal(schema.datePublished, '2008-12-23T00:00:00.000Z');
    assert.equal(schema.episodeNumber, 46);
    assert.equal(schema.associatedMedia.contentUrl, 'https://www.djcruze.co.uk/media/podcasts/46.mp3');
    assert.equal(schema.partOfSeries.url, 'https://www.djcruze.co.uk/podcasts/');
});

test('podcast episode schema keeps an absolute media URL and skips missing fields', () => {
    const schema = podcastEpisodeSchema({
        podcast,
        siteUrl,
        title: 'Episode',
        url: '/podcasts/x/',
        date: '2005-09-30',
        media: { content: '/podcasts/x.mp3' },
        mediaUrl: 'https://f001.backblazeb2.com/file/djcruzemedia',
    });
    assert.equal(schema.associatedMedia.contentUrl, 'https://f001.backblazeb2.com/file/djcruzemedia/podcasts/x.mp3');
    assert.equal('episodeNumber' in schema, false);
    assert.equal('image' in schema, false);
});
