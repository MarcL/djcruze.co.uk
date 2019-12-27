import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

const SmallBook = ({ book, image }) => (
  <div className="fl w-50 w-25-m w-20-ns pa2" key={book.title}>
    <Link to={book.pageUrl} title={book.title} className="db link dim tc">
      <Img
        fluid={image}
        alt={book.title}
        title={book.title}
        className="shadow-4"
      />
      <dl className="mt2 lh-copy">
        <dt className="clip">Book title</dt>
        <dd className="ml0 f4 black truncate w-100 ttu">{book.title}</dd>
        <dt className="clip">Book number</dt>
        <dd className="ml0 f6 gray truncate w-100 ttu">{book.subtitle}</dd>
      </dl>
    </Link>
  </div>
);

export default SmallBook;
