import React from 'react';
import SmallBook from './smallBook';

const BookSeries = ({ data }) => {
  const { books, images } = data;

  return (
    <div className="flex flex-wrap justify-center pa2">
      {books &&
        books.map(book => (
          <SmallBook
            key={book.title}
            book={book}
            image={images[book.coverImageName]}
          />
        ))}
    </div>
  );
};

export default BookSeries;
