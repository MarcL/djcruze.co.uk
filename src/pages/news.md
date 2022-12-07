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

<article class="w-100 flex flex-wrap items-start pv2">
    <div class="w-100 w-40-ns">
        <a class="link dim" href="{{post.url}}">
            <img class="shadow-md rounded-md" src="{{post.data.headerImage}}" title="{{post.data.title}}">
        </a>
    </div>
    <div class="w-100 w-60-ns pa0 pl3-m pl4-l">
        <a class="f4 f3-ns fw7 ttu link near-black underline-hover" href="{{post.url}}">{{post.data.title}}</a>
        <div class="f4 f4-ns grey lh-copy">{{post.data.excerpt}}</div>
        <div class="f4 f4-ns grey lh-copy">
            <a class="f5 f4-ns fw6 ttu link near-black underline-hover" href="{{post.url}}">
                <i class="fa fa-arrow-right dib navy"></i> Read more...
            </a>
        </div>
    </div>
</article>
{%- endfor -%}
</div>
