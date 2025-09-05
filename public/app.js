(function(){
  const routes = ['home','hosting-plans','domains','support','cloud','about','contact'];
  const $routes = new Map(routes.map(id => [id, document.getElementById(id)]));
  const nav = document.getElementById('nav');
  const toggle = document.querySelector('.nav-toggle');

  function setActive(hash){
    const route = (hash || '#home').replace('#','');
    routes.forEach(id => {
      const el = $routes.get(id);
      if (!el) return;
      if (id === route) el.classList.add('active'); else el.classList.remove('active');
    });
    // active nav link
    document.querySelectorAll('[data-route]').forEach(a => {
      const isActive = a.getAttribute('href') === `#${route}`;
      a.classList.toggle('active', isActive);
    });
    // close mobile menu
    nav.classList.remove('show');
  }

  window.addEventListener('hashchange', () => setActive(location.hash));
  window.addEventListener('DOMContentLoaded', () => {
    setActive(location.hash);
    document.getElementById('year').textContent = new Date().getFullYear();
  });

  // Mobile nav
  toggle.addEventListener('click', () => nav.classList.toggle('show'));

  // Domains demo (mock)
  const domainBtn = document.getElementById('domainBtn');
  const domainInput = document.getElementById('domainInput');
  const domainResult = document.getElementById('domainResult');
  if (domainBtn) {
    domainBtn.addEventListener('click', () => {
      const q = (domainInput.value || '').trim();
      if (!q) { domainResult.textContent = 'Please enter a domain name.'; return; }
      const tlds = ['.com','.net','.io'];
      const suggestions = tlds.map(t => `${q.replace(/\s+/g,'')}${t}`);
      domainResult.innerHTML = `Available suggestions: <strong>${suggestions.join(', ')}</strong>`;
    });
  }

  // Support form (mock submit)
  const supportForm = document.getElementById('supportForm');
  const supportMsg = document.getElementById('supportMsg');
  if (supportForm) {
    supportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      supportMsg.textContent = 'Ticket received. Our team will get back shortly.';
      supportForm.reset();
    });
  }

  // Contact form (mock submit)
  const contactForm = document.getElementById('contactForm');
  const contactMsg = document.getElementById('contactMsg');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactMsg.textContent = 'Thanks! Sales will contact you soon.';
      contactForm.reset();
    });
  }
})();

