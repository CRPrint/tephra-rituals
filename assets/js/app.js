document.addEventListener('DOMContentLoaded', () => {
  // Localization setup
  let currentLang = 'en-US';
  let translations = {};

  const elementsToTranslate = document.querySelectorAll('[data-i18n]');
  const langToggleBtn = document.getElementById('lang-toggle');

  // Fetch localization dictionaries
  async function loadTranslations(lang) {
    try {
      const response = await fetch(`./assets/lang/${lang}.json`);
      if (!response.ok) throw new Error(`Could not load ${lang}.json`);
      translations = await response.json();
      updateDOM();
    } catch (error) {
      console.error('Translation loading error:', error);
    }
  }

  function updateDOM() {
    elementsToTranslate.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.innerHTML = translations[key];
      }
    });
  }

  langToggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentLang === 'en-US') {
      currentLang = 'es-US';
    } else {
      currentLang = 'en-US';
    }
    loadTranslations(currentLang);
  });

  // Licensing Modal Logic
  const licenseModal = document.getElementById('license-modal');
  const btnLicense = document.getElementById('btn-license');
  const closeLicenseBtn = document.getElementById('close-license');

  if (btnLicense && licenseModal && closeLicenseBtn) {
    btnLicense.addEventListener('click', (e) => {
      e.preventDefault();
      licenseModal.classList.remove('opacity-0', 'pointer-events-none');
      licenseModal.querySelector('div').classList.remove('scale-95');
      licenseModal.querySelector('div').classList.add('scale-100');
    });

    const hideModal = () => {
      licenseModal.classList.add('opacity-0', 'pointer-events-none');
      licenseModal.querySelector('div').classList.remove('scale-100');
      licenseModal.querySelector('div').classList.add('scale-95');
    };

    closeLicenseBtn.addEventListener('click', hideModal);
    licenseModal.addEventListener('click', (e) => {
      if (e.target === licenseModal) {
        hideModal();
      }
    });
  }

  // Initial load
  loadTranslations(currentLang);
});
