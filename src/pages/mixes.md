---
layout: default
title: 'Mixes'
permalink: /mixes/
---

{% for mix in collections.mix %}
<a href="{{mix.url}}" title="{{mix.data.title}}">{{mix.data.title}}</a>
{% endfor %}
