async function loadArticles(options = {}) {
  const {
    container = '.guide-list',
    section = 'blog',
    category = null,
    sort = 'date-desc',
    countElement = '#article-count'
  } = options;

  try {
    const response = await fetch('../assets/data/articles.json');
    const data = await response.json();

    let articles = data.articles.filter(a => a.section === section);
    if (category && category !== 'all') {
      articles = articles.filter(a => a.category === category);
    }

    if (sort === 'date-desc') {
      articles.reverse();
    } else if (sort === 'date-asc') {
      // Already in ascending order
    }

    const el = document.querySelector(container);
    if (!el) return;

    const countEl = document.querySelector(countElement);
    if (countEl) {
      const count = articles.length;
      countEl.textContent = `${count} article${count !== 1 ? 's' : ''}`;
    }

    el.innerHTML = articles.map(article => `
      <div class="guide-card" data-category="${article.category}">
        <span class="guide-card-category">${article.category}</span>
        <h3><a href="${article.url}">${article.title}</a></h3>
        <p>${article.excerpt}</p>
        <div class="guide-card-footer">
          <span class="difficulty-badge beginner">${article.date} &middot; ${article.readTime}</span>
          <a href="${article.url}">Read Article &rarr;</a>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading articles:', error);
  }
}

function initCategoryFilters() {
  const categories = document.querySelectorAll('.category-tags a');
  categories.forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.preventDefault();

      categories.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');

      const category = tag.getAttribute('data-category');
      loadArticles({ category });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadArticles();
  initCategoryFilters();
});
