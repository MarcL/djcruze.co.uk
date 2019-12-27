import React from 'react';
import Page from '../components/page';
import NewsletterForm from '../components/forms/newsletterForm';

const Newsletter = ({ location }) => {
  return (
    <Page title="Join Clare Littlemore’s VIP Reader’s Club" location={location}>
      <NewsletterForm location={location} />
    </Page>
  );
};

export default Newsletter;
