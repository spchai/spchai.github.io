document.addEventListener('DOMContentLoaded', function() {
  // 检查是否在归档页面
  if (!document.getElementById('posts-data') || !document.getElementById('tag-filter')) {
    return;
  }

  // 1. 获取文章数据
  const postsData = JSON.parse(document.getElementById('posts-data').textContent);

  // 2. 提取所有标签并去重
  const allTags = [...new Set(postsData.flatMap(post => post.tags))].sort();

  // 3. 动态生成标签按钮
  const tagContainer = document.getElementById('tag-filter');
  allTags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'tag-btn';
    btn.textContent = tag;
    btn.dataset.tag = tag;
    tagContainer.appendChild(btn);
  });

  // 4. 渲染文章函数（按年份分组）
  function renderPosts(filterTags = null) {
    const container = document.getElementById('dynamic-articles');
    container.innerHTML = ''; // 清空现有内容

    // 过滤文章
    let filteredPosts = postsData;
    if (filterTags && filterTags.length > 0) {
      filteredPosts = postsData.filter(post =>
        filterTags.every(tag => post.tags.includes(tag))
      );
    }

    // 按年份分组
    const postsByYear = {};
    filteredPosts.forEach(post => {
      if (!postsByYear[post.year]) {
        postsByYear[post.year] = [];
      }
      postsByYear[post.year].push(post);
    });

    // 按年份倒序排列
    const sortedYears = Object.keys(postsByYear).sort().reverse();

    // 生成HTML
    sortedYears.forEach(year => {
      const yearSection = document.createElement('section');
      yearSection.className = 'year-section';

      const yearHeader = document.createElement('h1');
      yearHeader.id = year;
      yearHeader.className = 'archive__subtitle';
      yearHeader.textContent = `${year} (${postsByYear[year].length})`;

      const gridWrapper = document.createElement('div');
      gridWrapper.className = 'grid__wrapper';

      postsByYear[year].forEach(post => {
        const article = document.createElement('article');
        article.className = 'archive__item';
        article.setAttribute('itemscope', '');
        article.setAttribute('itemtype', 'http://schema.org/CreativeWork');

        // 处理图片
        let imageSrc = '/images/Loading.png';
        if (post.image_path) {
          imageSrc = post.image_path.includes('://') ? post.image_path : `/images/${post.image_path}`;
        }

        // 处理标题
        let title = post.covertitle;
        if (post.id) {
          title = post.covertitle.replace(/<[^>]*>/g, '');
        }

        // 处理元数据
        let metaHtml = '';
        if (post.collection === 'teaching') {
          metaHtml = `<div>${post.type}, <i>${post.venue}</i>, ${post.date.substring(0, 4)}</div>`;
        } else if (post.collection === 'publications') {
          metaHtml = `<div>Published in <i>${post.venue}</i>, ${post.date.substring(0, 4)}</div>`;
        } else if (post.date) {
          metaHtml = `<div class="page__meta"><i class="fa fa-calendar" aria-hidden="true"></i> <time datetime="${post.date}">${post.date_display}</time></div>`;
        }

        // 构建文章HTML
        article.innerHTML = `
          <div class="archive__item-teaser">
            <a href="${post.url}" rel="permalink">
              <img style="height:210px;object-fit:cover;" src="${imageSrc}" alt="${post.alt || 'Default image'}">
            </a>
          </div>
          <div class="archive__item-title">
            ${post.link ?
              `<a href="${post.link}">${title}</a> <a href="${post.url}" rel="permalink"><i class="fa fa-link" aria-hidden="true" title="permalink"></i><span class="sr-only">Permalink</span></a>` :
              `<a href="${post.url}" rel="permalink">${title}</a>`
            }
          </div>
          ${metaHtml}
          ${post.excerpt ? `<small class="archive__item-excerpt" itemprop="description">${post.excerpt}</small>` : ''}
        `;

        gridWrapper.appendChild(article);
      });

      yearSection.appendChild(yearHeader);
      yearSection.appendChild(gridWrapper);
      container.appendChild(yearSection);
    });

    // 更新计数器
    const countEl = document.getElementById('result-count');
    if (countEl) {
      countEl.textContent = `找到 ${filteredPosts.length} 篇文章`;
    }
  }

  // 5. 处理标签点击
  const selectedTags = new Set();

  tagContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('tag-btn')) {
      const tag = e.target.dataset.tag;

      if (tag === 'all') {
        selectedTags.clear();
        document.querySelectorAll('.tag-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        renderPosts();
      } else {
        document.querySelector('[data-tag="all"]').classList.remove('active');

        if (selectedTags.has(tag)) {
          selectedTags.delete(tag);
          e.target.classList.remove('active');
        } else {
          selectedTags.add(tag);
          e.target.classList.add('active');
        }

        if (selectedTags.size === 0) {
          document.querySelector('[data-tag="all"]').classList.add('active');
          renderPosts();
        } else {
          renderPosts(Array.from(selectedTags));
        }
      }
    }
  });

  // 6. 添加样式
  const style = document.createElement('style');
  style.textContent = `
    .tag-btn { display: block; width: 100%; margin: 0.3rem 0; padding: 0.5rem 0.8rem; border: 1px solid #ddd; border-radius: 4px; background: white; cursor: pointer; text-align: left; transition: all 0.2s; font-size: 0.9rem; }
    .tag-btn:hover { background: #f0f0f0; }
    .tag-btn.active { background: #007bff; color: white; border-color: #007bff; }
  `;
  document.head.appendChild(style);

  // 7. 初始化（首次加载显示全部）
  document.querySelector('[data-tag="all"]').classList.add('active');
  renderPosts();
});
