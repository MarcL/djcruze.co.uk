import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo/seo';
import Mixes from '../components/mixes';

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
      <Mixes />
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
