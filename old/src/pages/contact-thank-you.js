import React from 'react';
import ImagePage from '../components/pages/imagePage';

const ContactThankYouPage = ({ location }) => {
  return (
    <ImagePage
      title="Thank you for getting in touch!"
      location={location}
      imageUrl="https://media.giphy.com/media/wQk0woYwaQyuQ/giphy.gif"
      imageTitle="Thank you"
    >
      <p className="f4 lh-copy">
        I love talking to my readers, and will get back to you as soon as
        possible. If you haven’t checked out all the books in The Flow Series
        yet, take a look here:
      </p>
    </ImagePage>
  );
};

export default ContactThankYouPage;
