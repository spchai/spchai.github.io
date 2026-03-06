---
layout: splash
permalink: /
hidden: true
redirect_from: 
  - /home
bg_image: "https://spchai.github.io/images/home-page.jpg"
recent_posts:
  - 2025-04-27-Conference-Chai_et_al_EGU25
  - 2024-11-20-Best_Student_Award
  - 2023-08-12-Best_Poster_Award
---

{% include base_path %}

<style>
  body {
    background: transparent;
    margin-bottom: 0 !important;
  }
  .page__footer {
    display: none;
  }

  .scroll-indicator {
    position: fixed;
    bottom: 2em;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    z-index: 100;
    animation: bounce 2s infinite;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--global-text-color);
  }
  .scroll-indicator img {
    width: 48px;
    height: 48px;
    filter: drop-shadow(0 0 2px var(--global-text-color));
    transition: all 0.3s ease;
  }
  .scroll-indicator:hover img {
    filter: drop-shadow(0 0 6px var(--global-text-color));
  }
  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-8px); }
  }

</style>

{% if page.author and site.data.authors[page.author] %}
  {% assign author = site.data.authors[page.author] %}{% else %}{% assign author = site.author %}
{% endif %}

<div class="profile-columns">
  <div class="profile-left">
    <div class="profile-image">
      <img src="/images/Shupeng.jpg" alt="Shupeng CHAI" style="max-width: 250px; border-radius: 50%;" >
    </div>
    <div class="author-social-links-desktop">
      {% if author.email %}
        <a href="mailto:{{ author.email }}">
          <img src="/images/icons/email.svg" alt="Email" class="icon-light icon-pad-right" style="height:36px;">
          <img src="/images/icons/email_d.svg" alt="Email" class="icon-dark icon-pad-right" style="height:36px;">
      </a>
      {% endif %}
      {% if author.googlescholar %}
        <a href="{{ author.googlescholar }}">
          <img src="/images/icons/google-scholar.svg" alt="Google Scholar" class="icon-light icon-pad-right" style="height:36px;">
          <img src="/images/icons/google-scholar_d.svg" alt="Google Scholar" class="icon-dark icon-pad-right" style="height:36px;">
        </a>
      {% endif %}
      {% if author.orcid %}
        <a href="{{ author.orcid }}">
          <img src="/images/icons/orcid.svg" alt="ORCID" class="icon-light icon-pad-right" style="height:36px;">
          <img src="/images/icons/orcid_d.svg" alt="ORCID" class="icon-dark icon-pad-right" style="height:36px;">
        </a>
      {% endif %}
      {% if author.researchgate %}
        <a href="{{ author.researchgate }}">
          <img src="/images/icons/researchgate.svg" alt="ResearchGate" class="icon-light icon-pad-right" style="height:36px;">
          <img src="/images/icons/researchgate_d.svg" alt="ResearchGate" class="icon-dark icon-pad-right" style="height:36px;">
        </a>
      {% endif %}
      {% if author.linkedin %}
        <a href="https://www.linkedin.com/in/{{ author.linkedin }}">
          <img src="/images/icons/linkedin.svg" alt="LinkedIn" class="icon-light icon-pad-right" style="height:36px;">
          <img src="/images/icons/linkedin_d.svg" alt="LinkedIn" class="icon-dark icon-pad-right" style="height:36px;">
        </a>
      {% endif %}
      {% if author.CV %}
        <a href="{{ author.CV }}">
          <img src="/images/icons/cv.svg" alt="CV" class="icon-light icon-pad-right" style="height:36px;">
          <img src="/images/icons/cv_d.svg" alt="CV" class="icon-dark icon-pad-right" style="height:36px;">
        </a>
      {% endif %}
    </div>
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

<div class="grid__wrapper">
  {% for post_name in page.recent_posts %}
    {% assign found = false %}
    {% for post in site.posts %}
      {% if post.path contains post_name %}
        {% unless found %}
          {% assign found = true %}
          <div class="archive__item">
            {% assign img_path = post.recent_path | default: post.image_path %}
            {% if img_path %}
              <div class="archive__item-teaser">
                <a href="{{ post.url | prepend: base_path }}">
                  <img style="height:270px;object-fit:cover;" src="{{ img_path | prepend: '/images/' | prepend: base_path }}" alt="{{ post.covertitle }}">
                </a>
              </div>
            {% endif %}
            <div class="archive__item-body">
              <h2 class="archive__item-title">
                <a href="{{ post.url | prepend: base_path }}">{{ post.covertitle }}</a>
              </h2>
              <div class="archive__item-excerpt">{{ post.excerpt | markdownify | strip_html }}</div>
            </div>
          </div>
        {% endunless %}
      {% endif %}
    {% endfor %}
  {% endfor %}
</div>

<a href="/me/" class="scroll-indicator" title="About Me">
  <img src="/images/icons/arrow-down.svg" alt="About Me">
</a>

<script>
(function() {
  var indicator = document.querySelector('.scroll-indicator');
  if (!indicator) return;
  
  // 点击事件
  indicator.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = '/me/';
  });
  
  // 滚轮事件 - 修复版本
  var lastWheelTime = 0;
  document.addEventListener('wheel', function(e) {
    var now = Date.now();
    if (now - lastWheelTime < 500) return; // 防抖，0.5秒内只触发一次
    
    if (e.deltaY > 0) { // 向下滚动
      var rect = indicator.getBoundingClientRect();
      // 只在靠近屏幕底部100px内时触发
      if (rect.top > window.innerHeight - 150 && rect.top < window.innerHeight) {
        lastWheelTime = now;
        window.location.href = '/me/';
      }
    }
  });
  
  // 也支持空格/PageDown键
  document.addEventListener('keydown', function(e) {
    if (e.key === ' ' || e.key === 'PageDown') {
      var rect = indicator.getBoundingClientRect();
      if (rect.top > window.innerHeight - 150 && rect.top < window.innerHeight) {
        e.preventDefault();
        window.location.href = '/me/';
      }
    }
  });
})();
</script>

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