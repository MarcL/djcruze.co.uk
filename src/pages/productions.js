import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo/seo';
import Productions from '../components/productions';

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
          alt="Touchpad controller"
          title="DJ Cruze productions"
        />
      </div>
      <Productions />
    </Layout>
  );
};

export default ProductionsPage;

export const query = graphql`
  query ProductionsQuery {
    image: file(relativePath: { eq: "djcruze/headers/touchpad.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
