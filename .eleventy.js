require('dotenv').config();

const escape = require('lodash.escape');

module.exports = (eleventyConfig) => {
  // Copy
  eleventyConfig.addPassthroughCopy({ 'src/_redirects': '_redirects' });
  eleventyConfig.addPassthroughCopy({ 'src/images': 'images' });
  eleventyConfig.addPassthroughCopy({ 'src/amplitude.css': 'amplitude.css' });
  // eleventyConfig.addPassthroughCopy({'src/thumbnails': 'thumbnails'});
  // eleventyConfig.addPassthroughCopy({'src/favicons': 'favicons'});
  // eleventyConfig.addPassthroughCopy({'src/robots.txt': 'robots.txt'});
  // eleventyConfig.addPassthroughCopy({'src/browserconfig.xml': 'browserconfig.xml'});
  // eleventyConfig.addPassthroughCopy({'src/distjs/': 'js/'});

  // Temporary aliases
  eleventyConfig.addLayoutAlias('audio', 'layouts/audio.html');
  //   eleventyConfig.addLayoutAlias('default', 'layouts/default.html');
  //   eleventyConfig.addLayoutAlias('homepage', 'layouts/homepage.html');
  //   eleventyConfig.addLayoutAlias('post', 'layouts/post.html');
  //   eleventyConfig.addLayoutAlias('page', 'layouts/page.html');
  //   eleventyConfig.addLayoutAlias('articles', 'layouts/articles.html');
  //   eleventyConfig.addLayoutAlias('biography', 'layouts/biography.html');
  //   eleventyConfig.addLayoutAlias(
  //     'landingpage-default',
  //     'layouts/landingpage-default.html'
  //   );
  //   eleventyConfig.addLayoutAlias(
  //     'landingpage-long',
  //     'layouts/landingpage-long.html'
  //   );
  //   eleventyConfig.addLayoutAlias(
  //     'landingpage-thank-you',
  //     'layouts/landingpage-thank-you.html'
  //   );

  //   eleventyConfig.addLiquidFilter('markdownify', (value) => {
  //     return markdownLib.render(value);
  //   });

  eleventyConfig.addShortcode('version', function () {
    return String(Date.now());
  });

  const dateToISO = (dateValue) => new Date(dateValue).toISOString();

  eleventyConfig.addLiquidFilter('toISOString', (dateValue) => {
    return dateToISO(dateValue);
  });

  eleventyConfig.addLiquidFilter('toUTCString', (dateValue) => {
    return new Date(dateValue).toUTCString();
  });

  eleventyConfig.addLiquidFilter('xmlEscape', (value) => {
    return escape(value);
  });

  eleventyConfig.addFilter('collectionLastUpdatedDate', (collection) => {
    if (!collection || !collection.length) {
      throw new Error(
        'Collection is empty in collectionLastUpdatedDate filter.'
      );
    }

    // Newest date in the collection
    return dateToISO(
      new Date(
        Math.max(
          ...collection.map((item) => {
            return item.date;
          })
        )
      )
    );
  });

  // Liquid template options
  //   eleventyConfig.setLiquidOptions({
  //     dynamicPartials: false,
  //     root: ['src/_includes/_includes', 'src/_includes/_includes/social', '.'],
  //   });

  eleventyConfig.setDataDeepMerge(true);

  return {
    dir: {
      input: './src',
      output: './_site',
    },
  };
};
