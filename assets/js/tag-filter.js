(function() {
  const selectedTags = new Set();

  function normalizeTag(tag) {
    return tag
      .replace(/\s*:\s*/g, ': ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  function runFilter() {
    const articles = document.querySelectorAll('.archive__item');
    const sections = document.querySelectorAll('.year-section');

    articles.forEach(article => {
      if (selectedTags.size === 0) {
        article.style.display = 'block';
        return;
      }
      
      // 深度清洗标签：解决 YAML 解析出的空格、换行符问题
      const postTags = (article.getAttribute('data-tags') || "")
        .split('|')
        .map(normalizeTag)
        .filter(t => t !== "" && !t.endsWith(':'));

      const isMatch = Array.from(selectedTags).every(sel =>
        postTags.includes(normalizeTag(sel))
      );


      article.style.display = isMatch ? 'block' : 'none';
    });

    // 更新年份显示和计数
    sections.forEach(sec => {
      const items = Array.from(sec.querySelectorAll('.archive__item'));
      const visibleCount = items.filter(i => i.style.display !== 'none').length;
      
      if (visibleCount > 0) {
        sec.style.display = 'block';
        const title = sec.querySelector('.archive__subtitle');
        if (title) {
          const year = sec.getAttribute('data-year');
          // 仅更新括号内的数字，保留 ID 结构
          title.innerHTML = year +  ' <span style="font-size: 0.8em; opacity: 0.7;">(' +   visibleCount +   ')</span>';
        }
      } else {
        sec.style.display = 'none';
      }
    });
  }

  // 监听点击：使用委托模式解决 AcademicPages 侧边栏重绘问题
  document.addEventListener('click', function(e) {
    const node = e.target.nodeType === 3 ? e.target.parentElement : e.target;
    const target = node.closest('.tag-value');
    if (target) {
      e.preventDefault();
      e.stopPropagation();
      const tag = target.getAttribute('data-full-tag').trim();
      
      if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
        target.classList.remove('selected');
      } else {
        selectedTags.add(tag);
        target.classList.add('selected');
      }
      runFilter();
    }

    if (e.target.id === 'clear-filter') {
      e.preventDefault();
      selectedTags.clear();
      document.querySelectorAll('.tag-value').forEach(el => el.classList.remove('selected'));
      runFilter();
    }
  }, true);

  // 状态守护：AcademicPages 切换主题时会清除 selected 类名，这里补回来
  setInterval(() => {
    if (selectedTags.size > 0) {
      document.querySelectorAll('.tag-value').forEach(el => {
        const val = el.getAttribute('data-full-tag').trim();
        if (selectedTags.has(val)) {
          el.classList.add('selected');
        }
      });
    }
  }, 500); // 提高频率到 500ms，切换主题后的反馈更快
})();
