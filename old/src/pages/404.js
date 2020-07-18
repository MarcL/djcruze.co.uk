import React from 'react';
import ImagePage from '../components/pages/imagePage';

const randomGifImage = () => {
  const randomGifs = [
    'https://media.giphy.com/media/l0Iy5fjHyedk9aDGU/giphy.gif',
    'https://media.giphy.com/media/v0R4uwLqGKvQY/giphy.gif',
    'https://media.giphy.com/media/xT5LMMTPYn2oNdGZji/giphy.gif',
    'https://media.giphy.com/media/Mgq7EMQUrhcvC/giphy.gif',
  ];

  const randomIndex = Math.floor(Math.random() * Math.floor(randomGifs.length));

  return randomGifs[randomIndex];
};

const NotFoundPage = ({ location }) => {
  const randomGif = randomGifImage();

  return (
    <ImagePage
      title="Sorry! Page not found"
      location={location}
      imageUrl={randomGif}
      imageTitle="Thank you"
    >
      <p className="f4 lh-copy">
        Oops! Looks like the page you were looking for got lost in the floods.
        You can find your way back to The Beck here:
      </p>
    </ImagePage>
  );
};

export default NotFoundPage;
