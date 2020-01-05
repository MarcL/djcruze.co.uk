import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import AudioCollection from './audioCollection';

const Podcasts = () => (
  <StaticQuery
    query={graphql`
      query AllPodcastQuery {
        allMarkdownRemark(
          filter: { frontmatter: { categories: { in: ["Podcasts"] } } }
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
      return <AudioCollection title="Podcasts" data={data} />;
    }}
  />
);

export default Podcasts;
