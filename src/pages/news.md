---
title: 'Latest news'
date: '2020-08-06T20:00:00.00Z'
layout: oneColumn
permalink: /news/
headerImage: '/images/headers/news-crowd.jpg'
description: 'The latest news from DJ Cruze'
---

<div class="w-full">
{%- for post in collections.news reversed -%}

<article class="w-full grid grid-cols-1 md:grid-cols-6 items-start py-2 gap-x-8 gap-y-4 group">
    <div class="col-span-1 md:col-span-2">
        <a class="" href="{{post.url}}">
            <img class="shadow-md rounded-md" src="{{post.data.headerImage}}" title="{{post.data.title}}">
        </a>
    </div>
    <div class="col-span-1 md:col-span-4 {{theme.main.text}} space-y-2">
        <a class="font-bold text-2xl group-hover:underline uppercase block" href="{{post.url}}">{{post.data.title}}</a>
        <div class="font-medium text-xl">{{post.data.excerpt}}</div>
        <div class="">
            <a class="font-bold text-lg group-hover:underline uppercase" href="{{post.url}}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 h-5 fill-current inline-block align-middle"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                <span class="align-middle">Read more...</span>
            </a>
        </div>
    </div>
</article>
{%- endfor -%}
</div>
