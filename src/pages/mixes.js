import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo/seo';
import FlowBookSeries from '../components/books/flowBookSeries';

const MixesPage = ({ data, location }) => {
  return (
    <Layout>
      <Seo
        pathname={location.pathname}
        titleTemplate="%s | DJ Cruze : Manchester Is In The House"
      />
      <div className="pv0 mv0 mw-100 center">
        <Img
          fluid={data.image.childImageSharp.fluid}
          alt="Turntable and vinyl"
          title="DJ Cruze mixes"
        />
      </div>
      <FlowBookSeries />
    </Layout>
  );
};

export default MixesPage;

export const query = graphql`
  query MixesQuery {
    image: file(relativePath: { eq: "djcruze/headers/turntable.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
