---
layout: default
title: 'Podcasts'
permalink: /podcasts/
---

{% for mix in collections.podcast %}
<a href="{{mix.url}}" title="{{mix.data.title}}">{{mix.data.title}}</a>
{% endfor %}
