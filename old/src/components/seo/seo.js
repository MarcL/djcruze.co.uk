import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Twitter from './twitter';
import Facebook from './facebook';

const Seo = ({
  title = null,
  description = null,
  image = null,
  pathname = null,
  article = false,
  titleTemplate = null,
}) => (
  <StaticQuery
    query={graphql`
      query SEOQuery {
        site {
          siteMetadata {
            defaultTitle: title
            defaultTitleTemplate: titleTemplate
            defaultDescription: description
            siteUrl
            defaultImage: image
            twitterUsername
            facebookAppId
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          defaultTitleTemplate,
          defaultDescription,
          siteUrl,
          defaultImage,
          twitterUsername,
          facebookAppId,
        },
      },
    }) => {
      const seoData = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathname || '/'}`,
        titleTemplate: titleTemplate || defaultTitleTemplate,
      };

      return (
        <>
          <Helmet title={seoData.title} titleTemplate={seoData.titleTemplate}>
            <meta
              http-equiv="Content-Type"
              content="text/html; charset=utf-8"
            />
            <meta name="description" content={seoData.description} />
          </Helmet>
          <Facebook
            pageUrl={seoData.url}
            type={article ? 'article' : null}
            title={seoData.title}
            description={seoData.description}
            image={seoData.image}
            appId={facebookAppId}
          />
          <Twitter
            username={twitterUsername}
            title={seoData.title}
            description={seoData.description}
            image={seoData.image}
          />
        </>
      );
    }}
  />
);

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
};

export default Seo;
