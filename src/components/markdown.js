import React from 'react';

const Markdown = ({ post }) => (
  <div className="f4 lh-copy" dangerouslySetInnerHTML={{ __html: post.html }} />
);

export default Markdown;
