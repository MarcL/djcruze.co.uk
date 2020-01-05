import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import AudioCollection from './audioCollection';

const Mixes = () => (
  <StaticQuery
    query={graphql`
      query AllMixesQuery {
        allMarkdownRemark(
          filter: { frontmatter: { categories: { in: ["Mixes"] } } }
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                media {
                  image
                }
                title
                categories
                date
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => {
      return <AudioCollection title="Mixes" data={data} />;
    }}
  />
);

export default Mixes;
