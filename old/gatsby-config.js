module.exports = {
  siteMetadata: {
    title: 'DJ Cruze',
    titleTemplate: '%s | DJ Cruze : Manchester Is In The House',
    description: 'Needs a DJ Cruze description here.',
    siteUrl: 'https://djcruze.co.uk',
    twitterUsername: '@djcruze',
    image: '/clare-littlemore-flow-series.jpg',
    facebookAppId: '',
    footerIcons: [
      {
        link: 'https://facebook.com/housedjcruze',
        title: 'Facebook',
        iconName: 'FaFacebook',
      },
      {
        link: 'https://twitter.com/djcruze',
        title: 'Twitter',
        iconName: 'FaTwitter',
      },
      {
        link: 'https://m.me/housedjcruze',
        title: 'Messenger',
        iconName: 'FaFacebookMessenger',
      },
      // {
      //   link: 'https://instagram.com/housedjcruze',
      //   title: 'Instagram',
      //   iconName: 'FaInstagram',
      // },
      {
        link: 'https://youtube.com/djcruze',
        title: 'YouTube',
        iconName: 'FaYoutube',
      },
    ],
    mailchimp: {
      baseUrl: '//djcruze.us8.list-manage.com/subscribe/post',
      uuid: '437e287661b4218f78d9bfaa3',
      listId: 'b2b165b750',
      botValue: 'b_437e287661b4218f78d9bfaa3_b2b165b750',
    },
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/icons/djcruze-blue-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    // Enable these when ready to go live
    // DJ Cruze ID: UA-810717-1
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: 'UA-810717-20',
    //     head: true,
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-facebook-pixel`,
    //   options: {
    //     pixelId: '290377285027331',
    //   },
    // },
    'gatsby-plugin-catch-links',
  ],
};
