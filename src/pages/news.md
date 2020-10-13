---
title: 'Latest news'
date: '2020-08-06T20:00:00.00Z'
layout: oneColumn
permalink: /news/
---

<div class="w-100 pa0 ma0">
<div class="flex flex-wrap items-start">
{%- for post in collections.news reversed -%}

<article class="w-100 w-25-ns br2 shadow-4 ba b--black-10 pt0 pb3 mh3 mt2">
    <div class="mb3">
        <img src="{{post.data.headerImage}}" class="db w-100 br2 br--top" title="{{post.data.title}}" alt="{{post.data.title}}">
    </div>
    <div class="mh2 tc">
        <a class="f4 f3-ns fw7 pa3 ma0 ttu link near-black underline-hover" href="{{post.url}}">{{post.data.title}}</a>
        <div class="f4 f4-ns mt2 mb4">{{post.data.excerpt}}</div>
    </div>
</article>
{%- endfor -%}
</div>

</div>
