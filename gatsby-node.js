const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const { frontmatter } = node;
    const { createNodeField } = actions;

    // Create slug from YAML frontmatter permalink if it exists
    // Otherwise, create it using the file system
    let slug = frontmatter.permalink
      ? frontmatter.permalink
      : createFilePath({ node, getNode, basePath: `pages` });

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                template
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const { template } = node.frontmatter;
        const templateFileName = template || 'page';
        const templateComponentFile = `./src/templates/${templateFileName}.js`;

        createPage({
          path: node.fields.slug,
          component: path.resolve(templateComponentFile),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        });
      });
      resolve();
    });
  });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, createFieldExtension } = actions;

  createFieldExtension({
    name: `defaultImage`,
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return '../images/mixes/default-logo-600x600.jpg';
          }
          return source[info.fieldName];
        },
      };
    },
  });

  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      media: Media
    }
    type Media {
      image: String @defaultImage
    }
  `);
};
