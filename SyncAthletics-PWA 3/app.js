
(() => {
  const path = location.pathname.toLowerCase();
  const tab = new URLSearchParams(location.search).get('tab');
  const active = tab === 'calendar' ? 'calendar' : path.endsWith('base-added.html') ? 'tools' : path.endsWith('features.html') || path.endsWith('whyus.html') ? 'features' : 'home';
  document.querySelectorAll('[data-app-tab]').forEach(link => {
    if (link.dataset.appTab === active) { link.classList.add('active'); link.setAttribute('aria-current','page'); }
  });
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
  }
  const banner = document.getElementById('install-banner');
  const installButton = document.getElementById('install-app-button');
  const dismissButton = document.getElementById('dismiss-install');
  let installPrompt = null;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (banner && !isStandalone && !sessionStorage.getItem('sync-install-dismissed')) {
    window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); installPrompt = event; banner.hidden = false; });
    // On iPhone Safari, provide the native Add to Home Screen instructions.
    if (/iphone|ipad|ipod/i.test(navigator.userAgent) && !window.navigator.standalone) banner.hidden = false;
  }
  installButton?.addEventListener('click', async () => {
    if (installPrompt) { installPrompt.prompt(); await installPrompt.userChoice; installPrompt = null; banner.hidden = true; }
    else { alert('On iPhone: open this page in Safari, tap the Share button, then choose “Add to Home Screen”.'); }
  });
  dismissButton?.addEventListener('click', () => { banner.hidden = true; sessionStorage.setItem('sync-install-dismissed','1'); });
})();
