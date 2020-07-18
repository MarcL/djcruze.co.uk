import React from 'react';
import Page from '../page';
import FlowBookSeries from '../books/flowBookSeries';

const ImagePage = ({ location, imageUrl, title, imageTitle, children }) => (
  <Page title={title} location={location}>
    <div className="cf w-100">
      <div className="fl w-100 w-40-ns ph2">
        <img
          src={imageUrl}
          alt={imageTitle}
          title={imageTitle}
          className="br3 shadow-4"
        />
      </div>
      <div className="fl w-100 w-60-ns ph0 ph4-ns pt3 pt0-ns">{children}</div>
      <div className="fl w-100">
        <FlowBookSeries />
      </div>
    </div>
  </Page>
);

export default ImagePage;
