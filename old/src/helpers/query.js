const getBooksFromQuery = data => {
  const {
    allMarkdownRemark: { edges },
  } = data;

  return edges.map(edge => {
    const {
      node: { frontmatter, fields },
    } = edge;
    const { title, releaseDate, subtitle, image } = frontmatter;

    return {
      title,
      releaseDate,
      subtitle,
      coverImageName: `${image.name}.${image.extension}`,
      pageUrl: fields.slug,
    };
  });
};

const getImagesFromQuery = data => {
  return data.images.edges.reduce((previous, current) => {
    const {
      node: {
        childImageSharp: { fluid: image },
      },
    } = current;

    return Object.assign({}, previous, {
      [image.originalName]: image,
    });
  }, {});
};

const getBookSeriesDataFromQuery = data => {
  const books = getBooksFromQuery(data);
  const images = getImagesFromQuery(data);

  return {
    books,
    images,
  };
};

export { getBooksFromQuery, getBookSeriesDataFromQuery, getImagesFromQuery };
