import React from 'react';
import MailChimpSignupForm from './mailchimpSignupForm';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const NewsletterForm = ({ location }) => (
  <StaticQuery
    query={graphql`
      query NewsletterQuery {
        site {
          siteMetadata {
            mailchimp {
              baseUrl
              botValue
              uuid
              listId
            }
          }
        }
        image: file(relativePath: { eq: "books/covers/trail-cover.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { mailchimp },
      },
      image,
    }) => {
      return (
        <div>
          <div className="fl w-100 w-40-ns ph2">
            <Img
              fluid={image.childImageSharp.fluid}
              alt="Kindle with free ebook"
              title="Download your free copy of Trial"
              className="br2 shadow-4"
            />
          </div>
          <div className="fl f4 lh-copy w-100 w-60-ns ph0 ph3-ns pt3 pt0-ns">
            <MailChimpSignupForm
              config={mailchimp}
              location={location}
              title="Get Your Free Book"
            />
            <p className="f4 black-80 tc">
              If you’re interested in a <strong>FREE</strong> copy of Trail, the
              prequel to The Flow Series, plus a <strong>bonus</strong> short
              story ‘In The Darkness’, just pop your name and email address in
              the form below. You’ll also receive a fortnightly newsletter with
              details of my next release, giveaways, book recommendations and
              general dystopian chatter.
            </p>
            <p className="f4 black-80 tc">
              I love to connect with my readers and try to respond to all my
              messages. So if you’d like to learn a little more about me and my
              writing-process, join my mailing list below.{' '}
              <em>
                (And I hate spam, so I faithfully promise I’ll never spam you.)
              </em>
            </p>
            <p className="f3 black-80 tc">
              <strong>I look forward to meeting you!</strong>
            </p>
          </div>
        </div>
      );
    }}
  />
);

export default NewsletterForm;
