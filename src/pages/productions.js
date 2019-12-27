import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo/seo';
import FlowBookSeries from '../components/books/flowBookSeries';

const ProductionsPage = ({ data, location }) => {
  return (
    <Layout>
      <Seo
        pathname={location.pathname}
        titleTemplate="%s | DJ Cruze : Manchester Is In The House"
      />
      <div className="pv0 mv0 mw-100 center">
        <Img
          fluid={data.image.childImageSharp.fluid}
          alt="Clare Littlemore's books for The Flow Series"
          title="The Flow Series"
        />
      </div>
      <FlowBookSeries />
    </Layout>
  );
};

export default ProductionsPage;

export const query = graphql`
  query ProductionsQuery {
    image: file(relativePath: { eq: "flow-series-header.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
