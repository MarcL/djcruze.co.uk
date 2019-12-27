import React from 'react';
import ContactForm from '../components/forms/contact';
import ImagePage from '../components/pages/imagePage';

const Contact = ({ location }) => {
  return (
    <ImagePage
      title="Come and say hi!"
      location={location}
      imageUrl="https://media.giphy.com/media/wa7l7YNWi9yz51FCoL/giphy.gif"
      imageTitle="Say hi"
    >
      <ContactForm />
      <p className="f4 lh-copy">
        I love talking to my readers, so if you have any burning questions about
        The Flow Series, my next project, or you just want to say hello, fill in
        your contact details below and I’ll get back to you as soon as I can.
      </p>
    </ImagePage>
  );
};

export default Contact;
