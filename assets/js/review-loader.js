async function loadReviews(options = {}) {
  const {
    container = '.reviews-list',
    category = null,
    sort = 'date-desc',
    countElement = '#review-count'
  } = options;

  try {
    const response = await fetch('../assets/data/articles.json');
    const data = await response.json();

    let reviews = data.articles.filter(a => a.section === 'reviews');
    if (category && category !== 'all') {
      reviews = reviews.filter(a => a.category === category);
    }

    if (sort === 'date-desc') {
      reviews.reverse();
    } else if (sort === 'date-asc') {
      // Already in ascending order
    }

    const el = document.querySelector(container);
    if (!el) return;

    const countEl = document.querySelector(countElement);
    if (countEl) {
      const count = reviews.length;
      countEl.textContent = `${count} review${count !== 1 ? 's' : ''}`;
    }

    el.innerHTML = reviews.map(review => `
      <div class="guide-card" data-category="${review.category}">
        <span class="guide-card-category">${review.category}</span>
        <h3><a href="${review.url}">${review.title}</a></h3>
        <p>${review.excerpt}</p>
        <div class="guide-card-footer">
          <span class="difficulty-badge beginner">${review.date} &middot; ${review.readTime}</span>
          <a href="${review.url}">Read Review &rarr;</a>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading reviews:', error);
  }
}

function initReviewCategoryFilters() {
  const categories = document.querySelectorAll('.review-categories a');
  categories.forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.preventDefault();

      categories.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');

      const category = tag.getAttribute('data-category');
      loadReviews({ category });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadReviews();
  initReviewCategoryFilters();
});
