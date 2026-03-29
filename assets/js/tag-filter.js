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
      
      const postTags = (article.getAttribute('data-tags') || "")
        .split('|')
        .map(normalizeTag)
        .filter(t => t !== "" && !t.endsWith(':'));

      const isMatch = Array.from(selectedTags).every(sel =>
        postTags.includes(normalizeTag(sel))
      );


      article.style.display = isMatch ? 'block' : 'none';
    });

    sections.forEach(sec => {
      const items = Array.from(sec.querySelectorAll('.archive__item'));
      const visibleCount = items.filter(i => i.style.display !== 'none').length;
      
      if (visibleCount > 0) {
        sec.style.display = 'block';
        const title = sec.querySelector('.archive__subtitle');
        if (title) {
          const year = sec.getAttribute('data-year');
          title.innerHTML = year +  ' <span style="font-size: 0.8em; opacity: 0.7;">(' +   visibleCount +   ')</span>';
        }
      } else {
        sec.style.display = 'none';
      }
    });
  }

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
