import React from 'react';
import queryString from 'query-string';
import Button from '../button';
import { FaDownload } from 'react-icons/fa';

const hiddenStyle = {
  position: 'absolute',
  left: '-5000px',
};

const MailchimpSignupForm = ({
  config,
  location,
  children,
  title = 'Sign Up Now',
}) => {
  const { baseUrl, uuid, listId, botValue } = config;
  const listUrl = `${baseUrl}?u=${uuid}&id=${listId}`;
  const { signup: signupSource } = queryString.parse(location.search);

  return (
    <div id="signup-form" className="pb3">
      {children}
      <form
        className="center"
        action={listUrl}
        method="POST"
        id="mailChimpSignupForm"
      >
        <div style={hiddenStyle} aria-hidden="true">
          <input type="text" name={botValue} tabIndex="-1" value="" readOnly />
        </div>

        <div className="mw-100">
          <input
            className="input-reset ba b--black-20 pa2 mb2 db w-100 f4"
            name="FNAME"
            id="name"
            type="text"
            placeholder="First name"
            required
          />
          <input
            className="input-reset ba b--black-20 pa2 mb2 db w-100 f4"
            name="EMAIL"
            id="email"
            type="email"
            placeholder="Email address"
            required
          />
          {signupSource && (
            <input name="SIGNUP" type="hidden" value={signupSource} />
          )}
        </div>

        <Button type="submit">
          <span className="pl3">
            <FaDownload size="1em" className="v-mid" />
            &nbsp; {title}
          </span>
        </Button>
      </form>
    </div>
  );
};

export default MailchimpSignupForm;
