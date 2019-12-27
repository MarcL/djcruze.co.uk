import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import Button from '../button';

const Contact = ({ children }) => (
  <div id="contact-form">
    {children}
    <form
      className="black-80 w-100"
      name="contact"
      method="POST"
      data-netlify="true"
      action="/contact-thank-you"
    >
      <div className="mw-100">
        <input
          className="input-reset ba b--black-20 pa2 mb2 db w-100 f4"
          name="name"
          id="name"
          type="text"
          placeholder="First name"
          required
        />
        <input
          className="input-reset ba b--black-20 pa2 mb2 db w-100 f4"
          name="email"
          id="email"
          type="email"
          placeholder="Email address"
          required
        />
        <textarea
          id="message"
          name="message"
          className="input-reset ba b--black-20 pa2 mb2 db w-100 f4"
          rows={10}
          aria-describedby="message-desc"
          required
          placeholder="Type your message here..."
        />
        <Button type="submit">
          <span className="pl3">
            <FaPaperPlane size="1em" className="v-mid" />
            &nbsp; Send your message
          </span>
        </Button>

        <input type="hidden" name="form-name" value="contact" />
      </div>
    </form>
  </div>
);
export default Contact;
