---
layout: splash
permalink: /
hidden: true
redirect_from: 
  - /about/
  - /about.html
header:
  overlay_color: "#5e616c"
  overlay_image: /assets/images/mm-home-page-feature.jpg
excerpt: >
  <div class="profile-columns">
    <div class="profile-image">
      <img src="/images/Shupeng.jpg" alt="Shupeng CHAI" style="max-width: 300px; border-radius: 50%;" >
    </div>
    <div class="profile-content">
      <h1 class="page__title" itemprop="headline"> Shupeng CHAI (柴术鹏) </h1>
      <div class="archive__subtitle">
        PhD candidate at the Hong Kong Polytechnic University <br /> 
        <br />
      </div>
      <div class="archive__item-body">
        I am currently working on the <strong>influences of fault roughness on rupture dynamics and stick-slip behavior</strong> through integrated <strong>laboratory experiments</strong> and <strong>numerical simulations</strong>  <br /> 
        <br />
        I am also interested in Rock mechanics and geophysics & Geotechnical engineering & Planetary Geomechanics & Mining backfill.
      </div>      
      
      <div itemscope itemtype="http://schema.org/Person">
        <div class="social-links">
          <a href="mailto:{{ author.email }}"><i class="fas fa-fw fa-envelope icon-pad-right" aria-hidden="true"></i>
          <a href="{{ author.googlescholar }}"><i class="ai ai-google-scholar icon-pad-right"></i>
          <a href="{{ author.orcid }}"><i class="ai ai-orcid ai-fw icon-pad-right"></i>
          <a href="{{ author.researchgate }}"><i class="ai ai-researchgate ai-fw icon-pad-right" aria-hidden="true"></i>
          <a href="{{ author.scopus }}"><i class="ai ai-scopus ai-fw icon-pad-right"></i>
          <a href="https://www.linkedin.com/in/{{ author.linkedin }}"><i class="fab fa-fw fa-linkedin icon-pad-right" aria-hidden="true"></i>
          <a href="{{ author.CV }}"><i class="fa-solid fa-file icon-pad-right" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </div>

  
feature_row:
  - image_path: /assets/images/mm-customizable-feature.png
    alt: "customizable"
    title: "Super customizable"
    excerpt: "Everything from the menus, sidebars, comments, and more can be configured or set with YAML Front Matter."
    url: "/docs/configuration/"
    btn_class: "btn--primary"
    btn_label: "Learn more"
  - image_path: /assets/images/mm-responsive-feature.png
    alt: "fully responsive"
    title: "Responsive layouts"
    excerpt: "Built with HTML5 + CSS3. All layouts are fully responsive with helpers to augment your content."
    url: "/docs/layouts/"
    btn_class: "btn--primary"
    btn_label: "Learn more"
  - image_path: /assets/images/mm-free-feature.png
    alt: "100% free"
    title: "100% free"
    excerpt: "Free to use however you want under the MIT License. Clone it, fork it, customize it... whatever!"
    url: "/docs/license/"
    btn_class: "btn--primary"
    btn_label: "Learn more"      
---

{% include feature_row %}

<!-- <small><a href="https://github.com/mmistakes/minimal-mistakes/releases/tag/4.27.1">Latest release v4.27.1</a></small> -->

