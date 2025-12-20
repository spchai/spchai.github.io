document.addEventListener('DOMContentLoaded', function() {
  // 1. 获取数据
  const dataScript = document.getElementById('posts-data');
  if (!dataScript) return;

  let postsData;
  try {
    postsData = JSON.parse(dataScript.textContent);
  } catch (e) {
    console.error('JSON 解析失败:', e);
    return;
  }

  // 2. 提取所有标签
  const allTags = [...new Set(postsData.flatMap(post => post.tags))].sort();

  // 3. 生成标签按钮（自动换行）
  const tagContainer = document.getElementById('tag-filter');
  allTags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'tag-btn';
    btn.textContent = tag;
    btn.dataset.tag = tag;
    tagContainer.appendChild(btn);
  });

  // 4. 渲染文章（按年份分组）
  function renderPosts(filterTags = null) {
    const container = document.getElementById('dynamic-articles');
    container.innerHTML = '';

    // 筛选
    let filteredPosts = postsData;
    if (filterTags && filterTags.length > 0) {
      filteredPosts = postsData.filter(post =>
        filterTags.every(tag => post.tags.includes(tag))
      );
    }

    // 按年份分组
    const postsByYear = {};
    filteredPosts.forEach(post => {
      if (!postsByYear[post.year]) postsByYear[post.year] = [];
      postsByYear[post.year].push(post);
    });

    // 排序年份（倒序）
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

        // 处理图片路径
        let imageSrc = '/images/Loading.png';
        if (post.image_path && post.image_path.trim() !== '') {
          imageSrc = post.image_path.includes('://') ?
            post.image_path :
            `/images${post.image_path}`;
        }

        // 处理标题
        const title = post.covertitle && post.covertitle.trim() !== '' ? post.covertitle : post.title;

        // 处理元数据
        let metaHtml = '';
        if (post.date) {
          metaHtml = `<div class="page__meta"><i class="fa fa-calendar" aria-hidden="true"></i> <time datetime="${post.date}">${post.date_display}</time></div>`;
        }

        // 处理 excerpt
        let excerptHtml = '';
        if (post.excerpt && post.excerpt.trim() !== '') {
          excerptHtml = `<small class="archive__item-excerpt" itemprop="description">${post.excerpt}</small>`;
        }

        article.innerHTML = `
          <div class="archive__item-teaser">
            <a href="${post.url}" rel="permalink">
              <img style="height:210px;object-fit:cover;" src="${imageSrc}" alt="${title}">
            </a>
          </div>
          <div class="archive__item-title">
            <a href="${post.url}" rel="permalink">${title}</a>
          </div>
          ${metaHtml}
          ${excerptHtml}
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

  // 5. 事件处理
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

  // 6. 样式
  const style = document.createElement('style');
  style.textContent = `
    .tag-btn {
      flex: 0 0 auto;
      padding: 0.4rem 0.8rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.2s;
    }
    .tag-btn:hover { background: #f0f0f0; }
    .tag-btn.active { background: #007bff; color: white; border-color: #007bff; }
  `;
  document.head.appendChild(style);

  // 7. 初始化
  renderPosts();
  document.querySelector('[data-tag="all"]').classList.add('active');
});
