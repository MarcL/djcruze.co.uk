const CANONICAL_URL = 'https://www.djcruze.co.uk';
const MEDIA_ORIGIN_URL = 'https://f001.backblazeb2.com/file/djcruzemedia';
const isDevelopmentBuild = process.env.ELEVENTY_ENV === 'dev';
const isNetlifyProductionDeployment = process.env.CONTEXT === 'production';

// Netlify build URL
const netlifyBuildUrl = isNetlifyProductionDeployment ?
  CANONICAL_URL : process.env.DEPLOY_PRIME_URL;

// Point to localhost URL for development builds
const url = isDevelopmentBuild ? 'http://localhost:8080' : netlifyBuildUrl;

module.exports = {
  title: 'DJ Cruze',
  headerImage: '/images/headers/dj-cruze-headphones-red.jpg',
  email: 'info@djcruze.co.uk',
  description: 'DJ Cruze - Manchester is in the house!',
  url,
  googleAnalyticsId: 'UA-810717-1',
  twitterUsername: 'djcruze',
  author: 'https://www.facebook.com/housedjcruze',
  facebookAppId: '',
  // Use a same-origin proxy path in production so the HTML download attribute
  // works correctly on mobile browsers (e.g. Chrome on Android).
  // Netlify rewrites /media/* → https://f001.backblazeb2.com/file/djcruzemedia/*
  // See netlify.toml for the redirect rule.
  mediaFilesUrl: isDevelopmentBuild ? MEDIA_ORIGIN_URL : '/media',
  // Podcast feeds need absolute media URLs, so they point straight at B2.
  mediaOriginUrl: MEDIA_ORIGIN_URL
}
