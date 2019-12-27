import React from 'react';
import { graphql } from 'gatsby';

import Markdown from '../components/markdown';
import Page from '../components/page';

export default ({ data, location }) => {
  const post = data.markdownRemark;
  const { title } = post.frontmatter;

  return (
    <Page title={title} location={location}>
      <div className="fl w-100 ph0 ph3-ns">
        <Markdown post={post} />
      </div>
    </Page>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
