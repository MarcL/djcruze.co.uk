import React from 'react';

const getAllNodes = data => {
  const {
    allMarkdownRemark: { edges },
  } = data;

  return edges.map(edge => edge.node);
};

const AudioItem = ({ data }) => {
  const {
    frontmatter: { title },
  } = data;
  return <h3>{title}</h3>;
};

const AudioCollection = ({ title, data }) => {
  const nodes = getAllNodes(data);
  return (
    <div className="mv3 mw8 center">
      <h2 className="ttu f5 f4-m f3-ns mt3 mb0 tc">{title}</h2>
      {nodes.map(node => (
        <AudioItem data={node} />
      ))}
    </div>
  );
};

export default AudioCollection;
