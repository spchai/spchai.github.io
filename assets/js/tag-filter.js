document.addEventListener('DOMContentLoaded', function() {
  //只在 /news/ 页面执行
  if (!window.location.pathname.includes('/news/')) {
    return;
  }

  // 1. 获取文章数据
  const postsData = JSON.parse(document.getElementById('posts-data').textContent);

  // 2. 定义分类顺序和显示名称
  const categoryConfig = {
    'field': { name: '研究领域', order: 1 },
    'method': { name: '研究方法', order: 2 },
    'form': { name: '发表形式', order: 3 },
    'focus': { name: '研究对象', order: 4 },
    'others': { name: '其他标签', order: 5 }
  };

  // 3. 提取所有分类和标签
  const categories = {};

  postsData.forEach(post => {
    post.tags.forEach(tag => {
      // 检查标签是否符合 "category: value" 格式
      if (tag.includes(':')) {
        const parts = tag.split(':');
        const category = parts[0].trim();
        const value = parts[1].trim();

        if (categoryConfig[category]) {
          if (!categories[category]) {
            categories[category] = new Set();
          }
          categories[category].add(value);
        }
      }
    });
  });

  // 4. 生成左侧筛选面板
  const tagContainer = document.getElementById('tag-filter');

  // 按配置顺序排序
  const sortedCategories = Object.keys(categoryConfig).sort((a, b) =>
    categoryConfig[a].order - categoryConfig[b].order
  );

  sortedCategories.forEach(category => {
    if (categories[category]) {
      const section = document.createElement('div');
      section.className = 'filter-section';
      section.style.cssText = 'margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #eee;';

      const title = document.createElement('h4');
      title.textContent = categoryConfig[category].name;
      title.style.cssText = 'margin: 0 0 0.5rem 0; font-size: 1rem; color: #333;';
      section.appendChild(title);

      const btnContainer = document.createElement('div');
      btnContainer.className = 'filter-buttons';
      btnContainer.style.cssText = 'display: flex; flex-wrap: wrap; gap: 0.3rem;';

      // 将值排序
      const sortedValues = Array.from(categories[category]).sort();

      sortedValues.forEach(value => {
        const btn = document.createElement('button');
        btn.className = 'tag-btn';
        btn.dataset.category = category;
        btn.dataset.value = value;
        btn.textContent = value;
        btn.style.cssText = `
          padding: 0.3rem 0.6rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s;
          white-space: nowrap;
        `;
        btnContainer.appendChild(btn);
      });

      section.appendChild(btnContainer);
      tagContainer.appendChild(section);
    }
  });

  //5. 渲染文章函数
  function renderPosts(selectedFilters = {}) {
    const container = document.getElementById('dynamic-articles');
    container.innerHTML = '';

    // 筛选逻辑：分类之间AND，同一分类内OR
    let filteredPosts = postsData.filter(post => {
      // 检查每个分类
      for (const category in selectedFilters) {
        const selectedValues = selectedFilters[category];
        if (selectedValues.length === 0) continue;

        // 找出文章在该分类下的标签值
        const postValues = post.tags
          .filter(tag => tag.startsWith(category + ':'))
          .map(tag => tag.split(':')[1].trim());

        // OR：文章至少包含一个选中的值
        const hasMatch = selectedValues.some(val => postValues.includes(val));

        // AND：必须匹配当前分类
        if (!hasMatch) return false;
      }
      return true;
    });

    // 按年份分组
    const postsByYear = {};
    filteredPosts.forEach(post => {
      if (!postsByYear[post.year]) postsByYear[post.year] = [];
      postsByYear[post.year].push(post);
    });

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

        // 处理图片
        let imageSrc = '/images/Loading.png';
        if (post.image_path) {
          imageSrc = post.image_path.includes('://') ?
            post.image_path : `/images/${post.image_path}`;
        }

        // 处理标题
        let title = post.covertitle || post.title;
        // 处理元数据
        let metaHtml = '';
        if (post.collection === 'teaching') {
          metaHtml = `<div>${post.type}, <i>${post.venue}</i>, ${post.date.substring(0, 4)}</div>`;
        } else if (post.collection === 'publications') {
          metaHtml = `<div>Published in <i>${post.venue}</i>, ${post.date.substring(0, 4)}</div>`;
        } else if (post.date) {
          metaHtml = `<div class="page__meta"><i class="fa fa-calendar"></i> <time>${post.date_display}</time></div>`;
        }

        // 过滤显示标签（只显示非分类标签）
        const displayTags = post.tags.filter(tag => !tag.includes(':'));
        const tagsHtml = displayTags.length > 0 ?
          `<div class="post-tags">${displayTags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : '';

        article.innerHTML = `
          <div class="archive__item-teaser">
            <a href="${post.url}" rel="permalink">
              <img style="height:210px;object-fit:cover;" src="${imageSrc}" alt="${post.alt || 'Default image'}">
            </a>
          </div>
          <div class="archive__item-title">
            ${post.link ?
              `<a href="${post.link}">${title}</a> <a href="${post.url}" rel="permalink"><i class="fa fa-link"></i></a>` :
              `<a href="${post.url}" rel="permalink">${title}</a>`
            }
          </div>
          ${metaHtml}
          ${tagsHtml}
          ${post.excerpt ? `<small class="archive__item-excerpt">${post.excerpt}</small>` : ''}
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

  // 6. 处理筛选点击
  const selectedFilters = {}; // { field: ['Geotechnical'], method: ['Numerical'] }

  tagContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('tag-btn')) {
      const category = e.target.dataset.category;
      const value = e.target.dataset.value;

      // 初始化分类
      if (!selectedFilters[category]) {
        selectedFilters[category] = [];
      }

      // 切换选中状态
      const index = selectedFilters[category].indexOf(value);
      if (index > -1) {
        selectedFilters[category].splice(index, 1);
        e.target.classList.remove('active');
      } else {
        selectedFilters[category].push(value);
        e.target.classList.add('active');
      }

      // 如果分类为空，删除该分类
      if (selectedFilters[category].length === 0) {
        delete selectedFilters[category];
      }

      renderPosts(selectedFilters);
    }
  });

  // 7. 添加样式
  const style = document.createElement('style');
  style.textContent = `
    .filter-section { margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #eee; }
    .filter-section h4 { margin: 0 0 0.5rem 0; font-size: 1rem; color: #333; }
    .filter-buttons { display: flex; flex-wrap: wrap; gap: 0.3rem; }
    .tag-btn { padding: 0.3rem 0.6rem; border: 1px solid #ddd; border-radius: 4px; background: white; cursor: pointer; font-size: 0.85rem; transition: all 0.2s; white-space: nowrap; }
    .tag-btn:hover { background: #f0f0f0; }
    .tag-btn.active { background: #007bff; color: white; border-color: #007bff; }
    .post-tags { margin-top: 0.5rem; }
    .post-tags .tag { background: #e9ecef; padding: 0.2rem 0.5rem; border-radius: 3px; margin-right: 0.3rem; font-size: 0.8rem; }
  `;
  document.head.appendChild(style);

  // 8. 初始化
  renderPosts();
});
