document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const body = document.body;
  let loader = document.getElementById('loader');
  const themeToggle = document.getElementById('themeToggle');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (!loader) {
    loader = document.createElement('div');
    loader.id = 'loader';
    loader.className = 'loader-wrapper';
    loader.innerHTML = '<div class="loader"></div>';
    document.body.prepend(loader);
  }

  const storedTheme = localStorage.getItem('rentsphere-theme');
  if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.setAttribute('data-theme', 'dark');
    updateThemeIcon(true);
  }

  function updateThemeIcon(isDark) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = isDark ? 'ph ph-sun' : 'ph ph-moon';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      if (nextTheme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('rentsphere-theme', 'dark');
        updateThemeIcon(true);
      } else {
        root.removeAttribute('data-theme');
        localStorage.setItem('rentsphere-theme', 'light');
        updateThemeIcon(false);
      }
    });
  }

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const expanded = navLinks.classList.contains('mobile-open');
      mobileMenuBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
    });
  }

  if (loader) {
    window.addEventListener('load', () => {
      loader.classList.add('is-hidden');
      body.classList.remove('loading');
    });
    body.classList.add('loading');
  }

  const revealItems = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-1, .stagger-2, .stagger-3, .stagger-4');
  if (revealItems.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach((item) => observer.observe(item));
  }

  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.target || 0);
        const duration = 1300;
        const start = performance.now();

        const tick = (time) => {
          const progress = Math.min((time - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(target * eased).toLocaleString();
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = target.toLocaleString();
          }
        };

        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.6 });

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.setAttribute('role', 'button');
    question.setAttribute('tabindex', '0');
    const toggle = () => item.classList.toggle('active');
    question.addEventListener('click', toggle);
    question.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  });

  const backToTop = document.createElement('button');
  backToTop.id = 'backToTop';
  backToTop.type = 'button';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '<i class="ph ph-arrow-up"></i>';
  document.body.appendChild(backToTop);

  const toggleBackToTop = () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const productLinks = document.querySelectorAll('[data-product-link]');
  productLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = 'product-details.html';
    });
  });

  const productData = [
    { title: 'MacBook Pro 16" M2', category: 'laptop', categoryLabel: 'Laptop', price: 30, rating: 4.8, distance: 1.2, owner: 'Sarah T.', img: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&w=900&q=80', featured: true },
    { title: 'DJI Mavic Air 2', category: 'drone', categoryLabel: 'Drone', price: 45, rating: 4.9, distance: 2.5, owner: 'Alex M.', img: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80', featured: true },
    { title: 'PlayStation 5 Console', category: 'gaming', categoryLabel: 'Gaming', price: 15, rating: 5.0, distance: 3.0, owner: 'Mike R.', img: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&w=900&q=80', featured: true },
    { title: 'Sony A7III + Lens Kit', category: 'camera', categoryLabel: 'Camera', price: 25, rating: 4.7, distance: 4.1, owner: 'Emily C.', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80', featured: true },
    { title: 'Epson 1080p Projector', category: 'projector', categoryLabel: 'Projector', price: 20, rating: 4.5, distance: 1.8, owner: 'Chris B.', img: 'https://images.unsplash.com/photo-1537248100185-3e28cb2c6fb3?auto=format&fit=crop&w=900&q=80', featured: false },
    { title: '4-Person Camping Tent', category: 'camping', categoryLabel: 'Camping', price: 12, rating: 4.9, distance: 5.0, owner: 'John D.', img: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=900&q=80', featured: false },
    { title: 'Bosch Drill & Driver Set', category: 'tools', categoryLabel: 'Power Tools', price: 18, rating: 4.6, distance: 2.2, owner: 'Karan P.', img: 'https://images.unsplash.com/photo-1581147036324-c5b1f0b8d2a3?auto=format&fit=crop&w=900&q=80', featured: false },
    { title: 'Canon EOS R6', category: 'camera', categoryLabel: 'Camera', price: 38, rating: 4.8, distance: 6.3, owner: 'Nina S.', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80', featured: false },
    { title: 'Mountain Bicycle', category: 'bicycle', categoryLabel: 'Bicycle', price: 14, rating: 4.7, distance: 3.7, owner: 'Ravi M.', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=80', featured: false },
    { title: 'Party Light Set', category: 'party', categoryLabel: 'Party', price: 22, rating: 4.4, distance: 4.8, owner: 'Aisha K.', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80', featured: false },
    { title: 'DJ Speaker Pair', category: 'audio', categoryLabel: 'Audio', price: 28, rating: 4.8, distance: 2.9, owner: 'Arjun D.', img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1d6e1b7?auto=format&fit=crop&w=900&q=80', featured: false },
    { title: 'High-Resolution Office Printer', category: 'home', categoryLabel: 'Office', price: 19, rating: 4.3, distance: 7.1, owner: 'Meera J.', img: 'https://images.unsplash.com/photo-1589020419759-9d7b9f1c3b1e?auto=format&fit=crop&w=900&q=80', featured: false }
  ];

  const productGrid = document.getElementById('productGrid');
  if (productGrid) {
    const sortSelect = document.getElementById('sortSelect');
    const resultsMeta = document.getElementById('resultsMeta');
    const browseSearch = document.getElementById('browseSearch');
    const browseSearchBtn = document.getElementById('browseSearchBtn');
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const distanceFilter = document.getElementById('distanceFilter');
    const categoryCheckboxes = Array.from(document.querySelectorAll('input[type="checkbox"][value]'));
    const ratingRadios = Array.from(document.querySelectorAll('input[name="ratingFilter"]'));

    let currentSearch = '';

    const getSelectedCategories = () => categoryCheckboxes.filter((box) => box.checked).map((box) => box.value);
    const getMinRating = () => Number((ratingRadios.find((radio) => radio.checked) || { value: '0' }).value);

    const renderProducts = () => {
      const selectedCategories = getSelectedCategories();
      const minRatingValue = getMinRating();
      const minPriceValue = Number(minPrice?.value || 0);
      const maxPriceValue = Number(maxPrice?.value || Number.POSITIVE_INFINITY);
      const maxDistanceValue = Number(distanceFilter?.value || 50);
      const sortValue = sortSelect?.value || 'recommended';

      let filtered = productData.filter((product) => {
        const matchesSearch = !currentSearch || `${product.title} ${product.categoryLabel} ${product.owner}`.toLowerCase().includes(currentSearch);
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesPrice = product.price >= minPriceValue && product.price <= maxPriceValue;
        const matchesDistance = product.distance <= maxDistanceValue;
        const matchesRating = product.rating >= minRatingValue;
        return matchesSearch && matchesCategory && matchesPrice && matchesDistance && matchesRating;
      });

      filtered = filtered.sort((a, b) => {
        if (sortValue === 'price-asc') return a.price - b.price;
        if (sortValue === 'price-desc') return b.price - a.price;
        if (sortValue === 'distance') return a.distance - b.distance;
        if (sortValue === 'rating') return b.rating - a.rating;
        if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
        return b.rating - a.rating;
      });

      productGrid.innerHTML = filtered.length
        ? filtered.map((product) => `
          <article class="card hover-lift">
            <div class="product-img-wrapper">
              <img src="${product.img}" alt="${product.title}">
              <div class="product-price">$${product.price}/day</div>
            </div>
            <div class="flex justify-between items-center mt-md">
              <span class="badge">${product.categoryLabel}</span>
              <div class="flex items-center gap-xs" style="color: var(--accent-color);"><i class="ph-fill ph-star"></i> ${product.rating.toFixed(1)}</div>
            </div>
            <h4 class="mt-sm">${product.title}</h4>
            <p style="font-size: 0.875rem; color: var(--text-secondary);">Listed by ${product.owner} • ${product.distance.toFixed(1)} mi away</p>
            <a href="product-details.html" class="btn btn-primary" style="width: 100%; margin-top: auto;">Book Now</a>
          </article>
        `).join('')
        : '<div class="card" style="grid-column: 1 / -1; text-align: center; padding: 2rem;"><h3 class="mb-sm">No rentals match your filters</h3><p class="text-secondary" style="margin: 0;">Try widening the price range or turning on more categories.</p></div>';

      if (resultsMeta) {
        resultsMeta.textContent = `Showing ${filtered.length} of ${productData.length} rentals`;
      }
    };

    const syncSearch = () => {
      currentSearch = (browseSearch?.value || '').trim().toLowerCase();
      renderProducts();
    };

    browseSearchBtn?.addEventListener('click', syncSearch);
    browseSearch?.addEventListener('input', syncSearch);
    applyFiltersBtn?.addEventListener('click', renderProducts);
    sortSelect?.addEventListener('change', renderProducts);
    minPrice?.addEventListener('input', renderProducts);
    maxPrice?.addEventListener('input', renderProducts);
    distanceFilter?.addEventListener('input', renderProducts);
    categoryCheckboxes.forEach((box) => box.addEventListener('change', renderProducts));
    ratingRadios.forEach((radio) => radio.addEventListener('change', renderProducts));

    renderProducts();
  }
});
