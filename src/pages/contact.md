---
title: 'Contact DJ Cruze'
date: '2018-10-17T20:00:00.00Z'
layout: post
permalink: /contact/
headerImage: '/images/headers/contact-loft-club.jpg'
---

Do you want to contact me? No problem!

Send me a message using the form below.

<form
    class="w-full"
    data-netlify="true"
    netlify-honeypot="bot-field"
    name="contact"
    action="/contact/thank-you/"
    >
    <div class="mt-8">
        <div class="hidden">
            <input name="bot-field" />
        </div>
        <div class="grid grid-cols-1 gap-6">
            <label class="block">
                <span class="text-gray-700">Your name</span>
                <input type="text" class="{{theme.form.input}}" placeholder="Write your name here..." name="name">
            </label>
            <label class="block">
                <span class="text-gray-700">Email address</span>
                <input type="email" class="{{theme.form.input}}" placeholder="test@example.com" name="email">
            </label>
            <label class="block">
                <span class="text-gray-700">Your message</span>
                <textarea class="{{theme.form.textarea}}" placeholder="Write your message here..."
                    rows="6"
                    spellcheck="false" name="message"></textarea>
            </label>
        </div>
    </div>
    <button type="submit" class="{{theme.components.button}} w-full my-8 uppercase p-4 rounded-md font-semibold space-x-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6 fill-current inline-block align-middle"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
        <span>Send message</span>
    </button>
</form>