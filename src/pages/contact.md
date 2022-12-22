---
title: 'Contact DJ Cruze'
date: '2018-10-17T20:00:00.00Z'
layout: post
permalink: /contact/
headerImage: '/images/headers/contact-loft-club.jpg'
---

Do you want to contact me? No problem!

Send me a message using the form below.

<form class="w-full" data-netlify="true" netlify-honeypot="bot-field" name="contact">
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
    <button type="submit" class="{{theme.components.button}} w-full my-8 uppercase p-4 rounded-md font-semibold">
        Send message
    </button>
</form>