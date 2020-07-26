---
layout: default
title: 'Podcasts'
permalink: /podcasts/
---

<div class="cf pa2">
{% for mix in collections.podcast reversed %}

<div class="fl w-50 w-25-ns pa2">
<a href="{{mix.url}}" class="db link dim tc">
{% if mix.data.media.image %}
<img src="{{mix.data.media.image}}" alt="{{mix.data.title}}" title="{{mix.data.title}}" class="w-100 db black-10 shadow-4"/>
{% else %}
<img src="/images/mixes/default-logo-600x600.jpg" alt="{{mix.data.title}}" title="{{mix.data.title}}" class="w-100 db black-10 shadow-4"/>
{% endif %}
<dl class="mt2 f6 lh-copy">
<dt class="clip">Title</dt>
<dd class="ml0 black truncate w-100">{{mix.data.title}}</dd>
</dl>
</a>
</div>

{% endfor %}

</div>
