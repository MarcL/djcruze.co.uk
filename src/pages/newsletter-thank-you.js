import React from 'react';
import ImagePage from '../components/pages/imagePage';

const NewsletterThankYouPage = ({ location }) => {
  return (
    <ImagePage
      title="Thank you for signing up!"
      location={location}
      imageUrl="https://media.giphy.com/media/Y1XrxoBKZHTHeky1Wy/giphy.gif"
      imageTitle="Thank you"
    >
      <p className="f4 lh-copy">
        I love connecting with my readers, and I look forward to getting to know
        you better. If you haven’t checked out all the books in The Flow Series
        yet, take a look here:
      </p>
    </ImagePage>
  );
};

export default NewsletterThankYouPage;
