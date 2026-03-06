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
  fullscreen: true
  arrow_url: "/me/"
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
  
recent:
  - image_path: /Research/Dilatancy_DS.png
    alt: "Dilantancy during laboratory stick-slips (EGU25)"
    title: "Dilantancy during lab stick-slips (EGU25)"
    excerpt: "New results presented at EGU25 on the effects of fault roughness on dilatancy behavior observed from controlled laboratory experiments"
    url: "https://spchai.github.io/research/02_Dilatancy_DS/"
  - image_path: /Awards/2024-11-20-02 Awarding_Best_Student_Award.jpg
    alt: "Best Student Award in IGS2024"
    title: "Best Student Award in IGS2024"
    excerpt: "Won Best Student Award for the oral presentation entitled New insights into stress conditions on rock discontinuities in laboratory shear tests in the <em>2024 International Geomechanics</em> Conference"
    url: "https://spchai.github.io/posts/2024/Best_Student_Award/"
  - image_path: /Awards/2023-08-12-Awarding_Best_Poster_Award.png
    alt: "Best Poster Award in 2023 ARMA East Asia workshop"
    title: "Best Poster Award in 2023 ARMA East Asia workshop"
    excerpt: "Won Best Poster Award for the poster presentation entitled Stress analyses of laboratory shear tests in <em>2023 ARMA East Asia Geomechanics Workshop</em> held on 11 – 12 August in Hong Kong"
    url: "https://spchai.github.io/posts/2023/Best_Poster_Award/"
---

{% include base_path %}

{% if include.id %}
  {% assign recent = page.[include.id] %}
{% else %}
  {% assign recent = page.recent %}
{% endif %}

<div class="grid__wrapper">
  {% for f in recent %}

    {% if f.url contains "://" %}
      {% capture f_url %}{{ f.url }}{% endcapture %}
    {% else %}
      {% capture f_url %}{{ f.url | prepend: base_path }}{% endcapture %}
    {% endif %}

    <div class="archive__item">
      {% if f.image_path %}
        <div class="archive__item-teaser">
          <a href="{{ f_url }}">
            <img 
              style="height:270px;object-fit:cover;" 
              src=
              {% if f.image_path contains "://" %}
                "{{ f.image_path }}"
              {% else %}
                "{{ f.image_path | prepend: "/images/" | prepend: base_path }}"
              {% endif %}
            alt="{% if f.alt %}{{ f.alt }}{% endif %}">
          </a>
        </div>
      {% endif %}

      <div class="archive__item-body">
        {% if f.title %}
          <h2 class="archive__item-title"><a href="{{ f_url }}">{{ f.title }}</a></h2>
        {% endif %}

        {% if f.excerpt %}
          <div class="archive__item-excerpt">
            {{ f.excerpt | markdownify }}
          </div>
        {% endif %}

        <!-- {% if f.url %}
          <p><a href="{{ f_url }}" class="btn {{ f.btn_class }}">{{ f.btn_label | default: site.data.ui-text[site.locale].more_label | default: "Learn More" }}</a></p>
        {% endif %}  -->
      </div>
    </div>
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