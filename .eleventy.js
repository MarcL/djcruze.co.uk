require('dotenv').config();

const escape = require('lodash.escape');
const embedYouTube = require('eleventy-plugin-youtube-embed');
const rfc822Date = require('rfc822-date');

module.exports = (eleventyConfig) => {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
  });

  // Plugins
  eleventyConfig.addPlugin(embedYouTube);

  // Copy
  eleventyConfig.addPassthroughCopy({ 'src/_redirects': '_redirects' });
  eleventyConfig.addPassthroughCopy({ 'src/images': 'images' });
  eleventyConfig.addPassthroughCopy({ 'src/favicons': 'favicons' });
  eleventyConfig.addPassthroughCopy({ 'src/css': 'css' });
  eleventyConfig.addPassthroughCopy({ 'src/fonts': 'fonts' });

  eleventyConfig.addShortcode('version', function () {
    return String(Date.now());
  });

  eleventyConfig.addShortcode('buildDate', function () {
    return rfc822Date(new Date());
  });

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

  eleventyConfig.addFilter('tracklistToJson', (tracklistArray) => {
    if (!Array.isArray(tracklistArray)) {
      return [{}];
    }

    const tracklist = tracklistArray.map((track) => {
      const timestampRegex = /\[([0-9]{2}:[0-9]{2}:[0-9]{2})\]/;
      const hasTimestamp = track.match(timestampRegex);

      let parsedData = {};
      if (hasTimestamp) {
        const [timestampArtist, title, label] = track.split(' -');
        const [timestamp, artist] = timestampArtist.split('] ');
  
        const timestampWithoutBrackets = timestamp.replace('[', '').replace(']', '');
        const [hours, minutes, seconds] = timestampWithoutBrackets.split(':');
        const timestampInSeconds = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

        parsedData = {
          timestamp,
          timestampInSeconds,
          artist: artist?.trim(),
          title: title?.trim(),
          label: label?.trim(),
        };
      } else {
        const [artist, title, label] = track.split(' -');

        parsedData = {
          timestamp: null,
          timestampInSeconds: null,
          artist: artist?.trim(),
          title: title?.trim(),
          label: label?.trim(),
        };
      }

      return {
        ...parsedData,
      };
    });
    
    // Count the number of labels in the tracklist
    const labels = tracklist.map((track) => track.label).filter((label) => label);
    return {
      tracklist,
      hasLabels: labels.length > 0,
    };
  });

  eleventyConfig.setDataDeepMerge(true);

  return {
    dir: {
      input: './src',
      output: './_site',
    },
  };
};
