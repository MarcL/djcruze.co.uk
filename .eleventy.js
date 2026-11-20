require('dotenv').config();

const escape = require('lodash.escape');
const embedYouTube = require('eleventy-plugin-youtube-embed');
const rfc822Date = require('rfc822-date');
const externalLinks = require('@aloskutov/eleventy-plugin-external-links');
const Image = require('@11ty/eleventy-img');
const path = require('path');
const { parseTracklist } = require('./lib/tracklist');
const { loadWaveform } = require('./lib/waveform');

const isProductionBuild = process.env.ELEVENTY_ENV === 'production';

module.exports = (eleventyConfig) => {
    async function imageShortcode(
        src,
        className = 'rounded-none 2xl:rounded-md shadow-md object-cover',
        alt,
        sizes,
        highPriority = false
    ) {
        // Is it a local or internet source?
        const imageSource = /^http[s]*/.test(src) ? src : `./src${src}`;

        const urlPath = '/images/generated/';
        let metadata = await Image(imageSource, {
            widths: [300, 600, 1024, 1280],
            formats: ['avif', 'jpeg', 'webp'],
            urlPath,
            outputDir: path.join(eleventyConfig.dir.output, urlPath),
            filenameFormat: function (id, src, width, format) {
                const extension = path.extname(src);
                const name = path.basename(src, extension);

                return `${name}-${width}.${format}`;
            },
        });

        let imageAttributes = {
            class: className,
            alt,
            sizes,
            loading: 'lazy',
            decoding: 'async',
        };

        if (highPriority) {
            imageAttributes.fetchpriority = 'high';
            delete imageAttributes.loading;
            delete imageAttributes.decoding;
        }

        return Image.generateHTML(metadata, imageAttributes);
    }

    eleventyConfig.setLiquidOptions({
        dynamicPartials: false,
    });

    // Plugins
    eleventyConfig.addPlugin(embedYouTube);
    eleventyConfig.addPlugin(externalLinks);

    // Copy
    eleventyConfig.addPassthroughCopy({ 'src/_redirects': '_redirects' });
    eleventyConfig.addPassthroughCopy({ 'src/images': 'images' });
    eleventyConfig.addPassthroughCopy({ 'src/favicons': 'favicons' });
    eleventyConfig.addPassthroughCopy({ 'src/css': 'css' });
    eleventyConfig.addPassthroughCopy({ 'src/fonts': 'fonts' });
    eleventyConfig.addPassthroughCopy({ 'src/js': 'js' });
    eleventyConfig.addPassthroughCopy({ 'lib/playerUtils.mjs': 'js/playerUtils.mjs' });
    eleventyConfig.addPassthroughCopy({
        'node_modules/wavesurfer.js/dist/wavesurfer.esm.js': 'js/vendor/wavesurfer.esm.js',
        'node_modules/wavesurfer.js/dist/plugins/regions.esm.js': 'js/vendor/regions.esm.js',
    });

    // Shortcodes
    eleventyConfig.addShortcode('version', function () {
        return String(Date.now());
    });

    eleventyConfig.addShortcode('buildDate', function () {
        return rfc822Date(new Date());
    });

    eleventyConfig.addShortcode('image', imageShortcode);

    const dateToISO = (dateValue) => new Date(dateValue).toISOString();

    eleventyConfig.addLiquidFilter('rfc822Date', (dateValue) => {
        return rfc822Date(dateValue);
    });

    eleventyConfig.addLiquidFilter('toISOString', (dateValue) => {
        return dateToISO(dateValue);
    });

    eleventyConfig.addLiquidFilter('toUTCString', (dateValue) => {
        return new Date(dateValue).toUTCString();
    });

    eleventyConfig.addLiquidFilter('pageDate', (dateValue) => {
        const date = new Date(dateValue);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        return date.toLocaleDateString('en-GB', options);
    });

    eleventyConfig.addLiquidFilter('xmlEscape', (value) => {
        return escape(value);
    });

    // Newest date in the collection
    eleventyConfig.addFilter('collectionLastUpdatedDate', (collection) => {
        if (!collection || !collection.length) {
            throw new Error(
                'Collection is empty in collectionLastUpdatedDate filter.'
            );
        }

        return rfc822Date(
            new Date(
                Math.max(
                    ...collection.map((item) => {
                        return item.date;
                    })
                )
            )
        );
    });

    eleventyConfig.addFilter('tracklistToJson', function (tracklist) {
        try {
            return parseTracklist(tracklist);
        } catch (error) {
            throw new Error(`${this.page?.inputPath}: ${error.message}`);
        }
    });

    // Pre-generated waveform peaks (see scripts/generateWaveforms.js). Production builds fail
    // when they are missing so a new mix or podcast can't ship without them.
    eleventyConfig.addFilter('waveform', function (mediaContent) {
        const waveform = loadWaveform(mediaContent);
        if (!waveform) {
            const message = `${this.page?.inputPath}: no waveform for ${mediaContent}. Run "npm run waveforms" and commit the JSON in src/waveforms/.`;
            if (isProductionBuild) throw new Error(message);
            console.warn(`[waveform] ${message}`);
        }
        return waveform;
    });

    // JSON that is safe to embed inside a <script> element.
    eleventyConfig.addFilter('scriptJson', (value) =>
        JSON.stringify(value ?? null).replace(/</g, '\\u003c')
    );

    eleventyConfig.setDataDeepMerge(true);

    return {
        dir: {
            input: './src',
            output: './_site',
        },
    };
};
