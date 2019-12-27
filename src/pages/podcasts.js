import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo/seo';
import FlowBookSeries from '../components/books/flowBookSeries';

const PodcastsPage = ({ data, location }) => {
  return (
    <Layout>
      <Seo
        pathname={location.pathname}
        titleTemplate="%s | DJ Cruze : Manchester Is In The House"
      />
      <div className="pv0 mv0 mw-100 center">
        <Img
          fluid={data.image.childImageSharp.fluid}
          alt="Headphones"
          title="DJ Cruze podcasts"
        />
      </div>
      <FlowBookSeries />
    </Layout>
  );
};

export default PodcastsPage;

export const query = graphql`
  query PodcastsQuery {
    image: file(relativePath: { eq: "djcruze/headers/headphones.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
