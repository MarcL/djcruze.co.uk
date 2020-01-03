// import React from 'react';
// import { StaticQuery, graphql } from 'gatsby';

// import BookSeries from './bookSeries';
// import { getBookSeriesDataFromQuery } from '../../helpers/query';
// import getBooksWithoutTitle from '../../helpers/getBooksWithoutTitle';

// const FlowBookSeries = ({ data, otherTitle, showtitle = true }) => (
//   <StaticQuery
//     query={graphql`
//       query FlowBookQuery {
//         allMarkdownRemark(
//           filter: { frontmatter: { series: { eq: "The Flow Series" } } }
//           sort: { fields: frontmatter___releaseDate, order: ASC }
//         ) {
//           edges {
//             node {
//               frontmatter {
//                 releaseDate
//                 image {
//                   id
//                   name
//                   extension
//                 }
//                 title
//                 subtitle
//               }
//               fields {
//                 slug
//               }
//             }
//           }
//         }
//         images: allFile(
//           filter: {
//             relativePath: { glob: "books/covers/**" }
//             sourceInstanceName: { eq: "images" }
//           }
//         ) {
//           edges {
//             node {
//               childImageSharp {
//                 fluid(maxWidth: 12000) {
//                   originalName
//                   ...GatsbyImageSharpFluid
//                 }
//               }
//             }
//           }
//         }
//       }
//     `}
//     render={data => {
//       const seriesData = getBookSeriesDataFromQuery(data);
//       const booksData = otherTitle
//         ? {
//             title: 'Other books in the Flow series',
//             books: getBooksWithoutTitle(seriesData, otherTitle),
//           }
//         : {
//             title: 'The Flow series',
//             books: seriesData,
//           };

//       return (
//         <div className="mv3 mw8 center">
//           {showtitle && (
//             <h2 className="ttu f5 f4-m f3-ns mt3 mb0 tc">{booksData.title}</h2>
//           )}
//           <BookSeries data={booksData.books} />
//         </div>
//       );
//     }}
//   />
// );

// export default FlowBookSeries;
