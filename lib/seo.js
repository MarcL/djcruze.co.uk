const MAX_DESCRIPTION_LENGTH = 160;
const MAX_FEATURED_ARTISTS = 3;

const cleanText = (text) =>
    String(text ?? '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

const truncateAtWord = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    const cut = text.slice(0, maxLength - 1);
    const lastSpace = cut.lastIndexOf(' ');
    return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:!?-]+$/, '')}…`;
};

const featuredArtists = (tracklist) => {
    if (!Array.isArray(tracklist)) return [];
    const artists = tracklist
        .map((track) => track && cleanText(track.artist))
        .filter(Boolean);
    return [...new Set(artists)].slice(0, MAX_FEATURED_ARTISTS);
};

// Unique meta description per page: the excerpt if there is one, otherwise the
// page or site description plus the first few artists from the tracklist.
const metaDescription = ({ excerpt, description, fallback, tracklist }) => {
    const excerptText = cleanText(excerpt);
    if (excerptText) return truncateAtWord(excerptText, MAX_DESCRIPTION_LENGTH);

    let text = cleanText(description) || cleanText(fallback);
    const artists = featuredArtists(tracklist);
    if (artists.length > 0) {
        text = `${text.replace(/[.!]?$/, '.')} Featuring ${artists.join(', ')}.`;
    }
    return truncateAtWord(text, MAX_DESCRIPTION_LENGTH);
};

const absoluteUrl = (siteUrl, path) => (/^https?:\/\//.test(path) ? path : `${siteUrl}${path}`);

const podcastSeriesReference = (podcast, siteUrl) => ({
    '@type': 'PodcastSeries',
    name: podcast.title,
    url: `${siteUrl}/podcasts/`,
});

const podcastSeriesSchema = (podcast, siteUrl) => ({
    '@context': 'https://schema.org',
    ...podcastSeriesReference(podcast, siteUrl),
    description: podcast.description,
    image: absoluteUrl(siteUrl, podcast.channelImage),
    webFeed: absoluteUrl(siteUrl, podcast.feedPath),
    author: { '@type': 'Person', name: podcast.author },
});

const podcastEpisodeSchema = ({ podcast, siteUrl, title, url, date, description, media = {}, mediaUrl }) => ({
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: title,
    url: absoluteUrl(siteUrl, url),
    datePublished: new Date(date).toISOString(),
    description,
    ...(media.episode ? { episodeNumber: media.episode } : {}),
    ...(media.image ? { image: absoluteUrl(siteUrl, media.image) } : {}),
    associatedMedia: {
        '@type': 'MediaObject',
        contentUrl: absoluteUrl(siteUrl, `${mediaUrl}${media.content}`),
        encodingFormat: 'audio/mpeg',
    },
    partOfSeries: podcastSeriesReference(podcast, siteUrl),
});

module.exports = {
    metaDescription,
    podcastSeriesSchema,
    podcastEpisodeSchema,
    MAX_DESCRIPTION_LENGTH,
};
