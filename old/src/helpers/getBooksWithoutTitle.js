const getBooksWithoutTitle = (data, title) => {
  const { books, images } = data;

  const booksWithoutTitle = books.filter(book => book.title !== title);

  return {
    books: booksWithoutTitle,
    images,
  };
};

export default getBooksWithoutTitle;
