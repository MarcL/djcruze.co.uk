import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import AudioCollection from './audioCollection';

const Productions = () => (
  <StaticQuery
    query={graphql`
      query AllProductionsQuery {
        allMarkdownRemark(
          filter: { frontmatter: { categories: { in: ["Studio"] } } }
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
            }
          }
        }
      }
    `}
    render={data => {
      return <AudioCollection title="Productions" data={data} />;
    }}
  />
);

export default Productions;
