require('dotenv').config();

const escape = require('lodash.escape');
const embedYouTube = require('eleventy-plugin-youtube-embed');
const rfc822Date = require('rfc822-date');
const { Liquid } = require('liquidjs');

module.exports = (eleventyConfig) => {
  // TODO: Remove this once 11ty updates to the latest
  // const liquidOptions = {
  //   root: ['_includes'],
  //   extname: '.liquid',
  //   dynamicPartials: false,
  //   strictFilters: true,
  // };

  // eleventyConfig.setLibrary('liquid', new Liquid(liquidOptions));
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

  eleventyConfig.setDataDeepMerge(true);

  return {
    dir: {
      input: './src',
      output: './_site',
    },
  };
};
