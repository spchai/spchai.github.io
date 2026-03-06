---
layout: splash
permalink: /
hidden: true
redirect_from: 
  - /home
header:
  overlay_color: "#5e616c"
  overlay_image: "https://spchai.github.io/images/home-page.jpg"
  overlay_filter: true
excerpt: >
  <div class="profile-columns">
    <div class="profile-image">
      <img src="/images/Shupeng.jpg" alt="Shupeng CHAI" style="max-width: 250px; border-radius: 50%;" >
    </div>
    <div class="profile-content">
      <h1 class="page__title" itemprop="headline"> Shupeng CHAI (柴术鹏) </h1>
      <div class="page__subtitle">
        PhD candidate at the Hong Kong Polytechnic University <br /> 
      </div>
      <br /> 
      <div class="archive__item-body">
        I am currently working on the <strong>earthquake mechanics</strong> through integrated <em>laboratory experiments</em> and <em>numerical simulations</em>.  <br /> 
        <br />
        <strong> Earthquake mechanics | Rock physics | Geotechnical engineering | Mining backfill</strong>
      </div>      
    </div>
  </div>
recent_posts:
  - 2025-04-27-Conference-Chai_et_al_EGU25
  - 2024-11-20-Best_Student_Award
  - 2023-08-12-Best_Poster_Award
---

{% include base_path %}

<div class="grid__wrapper">
  {% for post_name in page.recent_posts %}
    {% assign post = site.posts | where: "url", site.baseurl | where_exp: "p", "p.name contains post_name" | first %}
    {% if post %}
      <div class="archive__item">
        {% if post.image_path %}
          <div class="archive__item-teaser">
            <a href="{{ post.permalink | prepend: base_path }}">
              <img style="height:270px;object-fit:cover;" src="{{ post.image_path | prepend: '/images/' | prepend: base_path }}" alt="{{ post.covertitle }}">
            </a>
          </div>
        {% endif %}
        <div class="archive__item-body">
          <h2 class="archive__item-title">
            <a href="{{ post.permalink | prepend: base_path }}">{{ post.covertitle }}</a>
          </h2>
          <div class="archive__item-excerpt">{{ post.excerpt | markdownify | strip_html }}</div>
        </div>
      </div>
    {% endif %}
  {% endfor %}
</div>


<!-- 
header:
  overlay_color: "#5e616c"
  overlay_image: "https://spchai.github.io/images/home-page.jpg"

<br />      
    <div class="body-social-links">
      <a href="mailto:shupeng.chai@connect.polyu.hk">
        <img src="/images/icons/email.svg" alt="Email" class="icon-pad-right" style="height:32px;">
      </a>
      <a href="https://scholar.google.com/citations?user=xyXuDXUAAAAJ&hl=en">
        <img src="/images/icons/google-scholar.svg" alt="Google Scholar" class="icon-pad-right" style="height:32px;">
      </a>
      <a href="https://orcid.org/0000-0003-3600-6132">
        <img src="/images/icons/orcid.svg" alt="ORCID" class="icon-pad-right" style="height:32px;">
      </a>
      <a href="https://www.researchgate.net/profile/Shupeng-Chai">
        <img src="/images/icons/researchgate.svg" alt="ResearchGate" class="icon-pad-right" style="height:32px;">
      </a>
      <a href="https://www.scopus.com/authid/detail.uri?authorId=57908582600">
        <img src="/images/icons/scopus.svg" alt="Scopus" class="icon-pad-right" style="height:32px;">
      </a>
      <a href="https://www.linkedin.com/in/chaishupeng/?locale=en_US">
        <img src="/images/icons/linkedin.svg" alt="LinkedIn" class="icon-pad-right" style="height:32px;">
      </a>
      <a href="https://spchai.github.io/files/CV_Shupeng Chai.pdf">
        <img src="/images/icons/cv.svg" alt="CV" class="icon-pad-right" style="height:32px;">
      </a>
    </div> -->