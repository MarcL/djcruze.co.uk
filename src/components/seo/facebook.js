import React from 'react';
import Helmet from 'react-helmet';

export default ({
  pageUrl = null,
  type = null,
  title = null,
  description = null,
  image = null,
  appId = null,
}) => (
  <Helmet>
    {pageUrl && <meta property="og:url" content={pageUrl} />}
    {type && <meta property="og:type" content={type} />}
    {title && <meta property="og:title" content={title} />}
    {description && <meta property="og:description" content={description} />}
    {image && <meta property="og:image" content={image} />}
    {appId && <meta property="fb:app_id" content={appId} />}
  </Helmet>
);
