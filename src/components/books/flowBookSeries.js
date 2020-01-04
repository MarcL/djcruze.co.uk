import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const getAllNodes = data => {
  const {
    allMarkdownRemark: { edges },
  } = data;

  return edges.map(edge => edge.node);
};

const FlowBookSeries = ({ data, otherTitle }) => (
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
            }
          }
        }
      }
    `}
    render={data => {
      const nodes = getAllNodes(data);
      //   console.log(nodes);

      return (
        <div className="mv3 mw8 center">
          <h2 className="ttu f5 f4-m f3-ns mt3 mb0 tc">Title</h2>
          {nodes.map(node => {
            const {
              frontmatter: { title },
            } = node;
            return <h3>{title}</h3>;
          })}
        </div>
      );
    }}
  />
);

export default FlowBookSeries;
