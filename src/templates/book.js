import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';

import Markdown from '../components/markdown';
import Page from '../components/page';
import FlowBookSeries from '../components/books/flowBookSeries';
import AmazonBuyButton from '../components/amazonBuyButton';

export default ({ data, location }) => {
  const post = data.markdownRemark;
  const image = post.frontmatter.image.childImageSharp.fluid;
  const { title, subtitle, buyUrl } = post.frontmatter;

  return (
    <Page title={title} subtitle={subtitle} location={location}>
      <div className="cf w-100">
        <div className="fl w-100 w-40-ns ph2">
          <div className="w-100">
            <Image fluid={image} className="br2 shadow-4" />
          </div>
          {buyUrl && (
            <div className="w-100 pv3">
              <AmazonBuyButton text="Buy from Amazon (US)" url={buyUrl.us} />
              <AmazonBuyButton text="Buy from Amazon (UK)" url={buyUrl.uk} />
            </div>
          )}
        </div>
        <div className="fl w-100 w-60-ns ph0 ph4-ns">
          <Markdown post={post} />
        </div>
        <div className="fl w-100">
          <FlowBookSeries otherTitle={post.frontmatter.title} />
        </div>
      </div>
    </Page>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subtitle
        buyUrl {
          uk
          us
        }
        image {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
