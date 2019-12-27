import React from 'react';
import Page from '../components/page';
import FlowBookSeries from '../components/books/flowBookSeries';

const TheFlowSeries = ({ location }) => {
  return (
    <Page title="The Flow Series" location={location}>
      <div className="fl lh-copy w-100 f4 cf">
        <p>
          Flow is a dystopian series for young adults which centres around Quin,
          a sixteen-year-old who lives in The Beck, a Saviour Society. Beck law
          is tough: the rules must be followed in order to sustain life in a
          place where floodwaters constantly threaten existence. But, as Quin
          discovers, some laws are harder to follow than others. And when she
          discovers the devastating truth about her community, she wonders how
          far she and her friends will have to go to escape from The Beck’s
          clutches.
        </p>
        <p>
          <strong>
            If you devour fast-paced, addictive stories with compelling
            characters who inhabit intriguing futures, you’ll love The Flow
            Series.
          </strong>
        </p>
      </div>

      <FlowBookSeries showtitle={false} />
    </Page>
  );
};

export default TheFlowSeries;
