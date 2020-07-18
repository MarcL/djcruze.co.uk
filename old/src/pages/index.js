import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo/seo';
import FlowBookSeries from '../components/books/flowBookSeries';

const IndexPage = ({ data, location }) => {
  return (
    <Layout>
      <Seo
        pathname={location.pathname}
        titleTemplate="%s | DJ Cruze : Manchester Is In The House"
      />
      <div className="pv0 mv0 mw-100 center">
        <Img
          fluid={data.image.childImageSharp.fluid}
          alt="Picture of DJ Cruze"
          title="DJ Cruze: Manchester Is In The House"
        />
      </div>
      <FlowBookSeries />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query HomepageQuery {
    image: file(
      relativePath: { eq: "djcruze/headers/djcruze-blue-door-small.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
