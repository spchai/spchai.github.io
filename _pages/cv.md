---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}
<div class="wordwrap">You can also find my articles on <a href="{{site.author.googlescholar}}">my Google Scholar profile</a>.</div>

Education
======
* Ph.D in Geotechnical Engineering, the Hong Kong Polytechnic University, 2023–2026 (expected)
* M.A.Sc in Mineral Engineering, University of Montreal (Polytechnique Montréal), 2018-2020
* B.Eng. in Civil Engineering, Wuhan University, 2014-2018

Work experience
======
* University teacher: Zhengzhou University of Science and Technology, 2021-2023
  * Teaching in Geotechnical Engineering
    * Courses: Soil Mechanics, Road Engineering
    * Supervision in Final year project or thesis
  * Research 
    * Slope stability analyses
 
Skills
======
* Skill 1
* Skill 2
  * Sub-skill 2.1
  * Sub-skill 2.2
  * Sub-skill 2.3
* Skill 3

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>
  
Teaching
======
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Service and leadership
======
* Currently signed in to 43 different slack teams
