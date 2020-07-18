import React from 'react';
import Layout from './layout';
import Seo from './seo/seo';

const Title = ({ text }) => (
  <h1 className="ttu f4 f3-m f2-ns mt3 mt4-ns mb2 tc">{text}</h1>
);

const Subtitle = ({ text }) => (
  <h2 className="f6 f5-m f4-ns mid-gray ttu mv0 fw4 tc">{text}</h2>
);

const Page = ({ title, subtitle, children, location, titleTemplate }) => {
  return (
    <Layout>
      <Seo
        pathname={location.pathname}
        title={title}
        titleTemplate={titleTemplate}
      />
      <div className="cf mw8 center ph4 pb2 pb4-ns">
        <div className="pb3">
          {title && <Title text={title} />}
          {subtitle && <Subtitle text={subtitle} />}
        </div>
        {children}
      </div>
    </Layout>
  );
};

export default Page;
