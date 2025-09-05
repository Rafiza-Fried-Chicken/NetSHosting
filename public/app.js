(() => {
  'use strict';

  // Cache DOM elements
  const app = document.getElementById('app');
  const navLinks = document.querySelectorAll('.nav-menu a');

  // Content for each section
  const sections = {
    'home': () => {
      const container = document.createElement('section');
      container.className = 'section active hero';
      container.setAttribute('aria-label', 'Home');

      const logo = document.createElement('div');
      logo.className = 'logo-text';
      logo.textContent = 'netshosting';

      container.appendChild(logo);
      return container;
    },

    'hosting-plans': () => {
      const container = document.createElement('section');
      container.className = 'section active';
      container.setAttribute('aria-label', 'Hosting Plans');

      const heading = document.createElement('h1');
      heading.textContent = 'Hosting Plans';
      container.appendChild(heading);

      // Example plans
      const plans = [
        {
          title: 'Basic',
          price: '$5/mo',
          features: [
            '10 GB SSD Storage',
            '100 GB Bandwidth',
            '1 Website',
            '24/7 Support',
          ],
        },
        {
          title: 'Pro',
          price: '$15/mo',
          features: [
            '100 GB SSD Storage',
            '1 TB Bandwidth',
            '10 Websites',
            'Priority Support',
          ],
        },
        {
          title: 'Enterprise',
          price: '$50/mo',
          features: [
            '1 TB SSD Storage',
            'Unlimited Bandwidth',
            'Unlimited Websites',
            'Dedicated Support',
          ],
        },
      ];

      const plansList = document.createElement('div');
      plansList.className = 'plans-list';

      plans.forEach(plan => {
        const card = document.createElement('article');
        card.className = 'plan-card';
        card.tabIndex = 0;

        const title = document.createElement('h2');
        title.className = 'plan-title';
        title.textContent = plan.title;

        const price = document.createElement('p');
        price.className = 'plan-price';
        price.textContent = plan.price;

        const features = document.createElement('ul');
        features.className = 'plan-features';
        plan.features.forEach(f => {
          const li = document.createElement('li');
          li.textContent = f;
          features.appendChild(li);
        });

        const btn = document.createElement('button');
        btn.className = 'btn-primary';
        btn.textContent = 'Select Plan';
        btn.type = 'button';
        btn.addEventListener('click', () => {
          alert(`You selected the ${plan.title} plan.`);
        });

        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(features);
        card.appendChild(btn);

        plansList.appendChild(card);
      });

      container.appendChild(plansList);
      return container;
    },

    'domains': () => {
      const container = document.createElement('section');
      container.className = 'section active';
      container.setAttribute('aria-label', 'Domains');

      const heading = document.createElement('h1');
      heading.textContent = 'Domains';
      container.appendChild(heading);

      const p = document.createElement('p');
      p.textContent = 'Register and manage your domains with ease. Coming soon: domain search and registration features.';
      container.appendChild(p);

      return container;
    },

    'support': () => {
      const container = document.createElement('section');
      container.className = 'section active';
      container.setAttribute('aria-label', 'Support');

      const heading = document.createElement('h1');
      heading.textContent = 'Support';
      container.appendChild(heading);

      const p = document.createElement('p');
      p.textContent = 'Need help? Contact our support team 24/7 via email or phone.';
      container.appendChild(p);

      const contactInfo = document.createElement('address');
      contactInfo.style.marginTop = '1rem';
      contactInfo.innerHTML = `
        <strong>Email:</strong> <a href="mailto:support@netshosting.com">support@netshosting.com</a><br />
        <strong>Phone:</strong> <a href="tel:+18001234567">+1 (800) 123-4567</a>
      `;
      container.appendChild(contactInfo);

      return container;
    },

    'cloud': () => {
      const container = document.createElement('section');
      container.className = 'section active';
      container.setAttribute('aria-label', 'Cloud / Temporary Storage');

      const message = document.createElement('div');
      message.style.fontSize = '2rem';
      message.style.fontWeight = '700';
      message.style.color = '#374151';
      message.style.textAlign = 'center';
      message.style.marginTop = '6rem';
      message.textContent = 'Coming Soon / Will be available after update';

      container.appendChild(message);
      return container;
    },

    'about-us': () => {
      const container = document.createElement('section');
      container.className = 'section active';
      container.setAttribute('aria-label', 'About Us');

      const heading = document.createElement('h1');
      heading.textContent = 'About Us';
      container.appendChild(heading);

      const p = document.createElement('p');
      p.textContent = 'NetsHosting is a leading hosting provider delivering reliable, secure, and scalable web hosting solutions for businesses of all sizes.';
      container.appendChild(p);

      return container;
    },

    'contact': () => {
      const container = document.createElement('section');
      container.className = 'section active';
      container.setAttribute('aria-label', 'Contact');

      const heading = document.createElement('h1');
      heading.textContent = 'Contact Us';
      container.appendChild(heading);

      const form = document.createElement('form');
      form.className = 'contact-form';
      form.noValidate = true;

      // Name
      const labelName = document.createElement('label');
      labelName.htmlFor = 'contact-name';
      labelName.textContent = 'Name';
      const inputName = document.createElement('input');
      inputName.type = 'text';
      inputName.id = 'contact-name';
      inputName.name = 'name';
      inputName.required = true;
      inputName.autocomplete = 'name';

      // Email
      const labelEmail = document.createElement('label');
      labelEmail.htmlFor = 'contact-email';
      labelEmail.textContent = 'Email';
      const inputEmail = document.createElement('input');
      inputEmail.type = 'email';
      inputEmail.id = 'contact-email';
      inputEmail.name = 'email';
      inputEmail.required = true;
      inputEmail.autocomplete = 'email';

      // Message
      const labelMessage = document.createElement('label');
      labelMessage.htmlFor = 'contact-message';
      labelMessage.textContent = 'Message';
      const textareaMessage = document.createElement('textarea');
      textareaMessage.id = 'contact-message';
      textareaMessage.name = 'message';
      textareaMessage.rows = 5;
      textareaMessage.required = true;

      // Submit button
      const btnSubmit = document.createElement('button');
      btnSubmit.type = 'submit';
      btnSubmit.className = 'btn-primary';
      btnSubmit.textContent = 'Send Message';

      form.appendChild(labelName);
      form.appendChild(inputName);
      form.appendChild(labelEmail);
      form.appendChild(inputEmail);
      form.appendChild(labelMessage);
      form.appendChild(textareaMessage);
      form.appendChild(btnSubmit);

      form.addEventListener('submit', e => {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        alert('Thank you for contacting NetsHosting. We will get back to you shortly.');
        form.reset();
      });

      container.appendChild(form);
      return container;
    },
  };

  // Helper: clear app content
  function clearApp() {
    while (app.firstChild) {
      app.removeChild(app.firstChild);
    }
  }

  // Helper: update active nav link
  function updateActiveNav(hash) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === hash) {
        link.classList.add('active');
        link.tabIndex = 0;
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.tabIndex = -1;
        link.removeAttribute('aria-current');
      }
    });
  }

  // Render section by hash
  function render(hash) {
    const key = hash.replace('#', '') || 'home';
    if (!sections[key]) {
      // fallback to home if unknown
      render('#home');
      return;
    }
    clearApp();
    const section = sections[key]();
    app.appendChild(section);
    updateActiveNav('#' + key);
    // Focus main content for accessibility
    app.focus();
  }

  // On hash change
  window.addEventListener('hashchange', () => {
    render(location.hash);
  });

  // Initial load
  document.addEventListener('DOMContentLoaded', () => {
    if (!location.hash) {
      location.hash = '#home';
    } else {
      render(location.hash);
    }
  });

  // Keyboard navigation for nav menu (optional enhancement)
  // Left/right arrow keys to move focus between menu items
  const navMenu = document.querySelector('.nav-menu');
  navMenu.addEventListener('keydown', e => {
    const focusable = Array.from(navLinks);
    const currentIndex = focusable.findIndex(el => el === document.activeElement);
    if (currentIndex === -1) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % focusable.length;
      focusable[nextIndex].focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + focusable.length) % focusable.length;
      focusable[prevIndex].focus();
    }
  });
})();
