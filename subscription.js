(() => {
  const trialKey = 'syncathletics-demo-trial-started-at';
  const basePlanKey = 'syncathletics-demo-base-plan-active';
  const trialDuration = 7 * 24 * 60 * 60 * 1000;
  const app = document.querySelector('[data-subscription-app]');

  if (!app) return;

  const gate = document.createElement('div');
  gate.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-[#1E201E]/50 p-6';
  gate.setAttribute('role', 'dialog');
  gate.setAttribute('aria-modal', 'true');
  gate.setAttribute('aria-labelledby', 'subscription-gate-title');
  gate.innerHTML = `
    <div class="w-full max-w-lg rounded-2xl border border-[#E5E3DC] bg-white p-7 text-center shadow-xl sm:p-9">
      <p class="text-xs font-bold uppercase tracking-widest text-[#1D3528]">SyncAthletics access</p>
      <h2 id="subscription-gate-title" class="mt-3 text-2xl font-extrabold text-[#1E201E]"></h2>
      <p id="subscription-gate-message" class="mt-3 text-sm leading-relaxed text-[#4A4E4D]"></p>
      <div class="mt-6 flex flex-col justify-center gap-3">
        <button id="subscription-gate-action" type="button" class="rounded-xl bg-[#1D3528] px-5 py-3 text-sm font-bold text-white hover:bg-[#15271d]"></button>
        <a href="features.html#pricing" class="text-sm font-semibold text-[#1D3528] underline">View plans</a>
      </div>
      <p class="mt-5 text-xs leading-relaxed text-[#6E7271]">
        Demo only: access is stored in this browser and can be bypassed. The base-plan button does not process a payment.
      </p>
    </div>
  `;

  const gateTitle = gate.querySelector('#subscription-gate-title');
  const gateMessage = gate.querySelector('#subscription-gate-message');
  const gateAction = gate.querySelector('#subscription-gate-action');

  function getStatus() {
    if (localStorage.getItem(basePlanKey) === 'true') return 'base';

    const storedStart = localStorage.getItem(trialKey);
    if (storedStart === null) return 'not-started';

    const trialStartedAt = Number(storedStart);
    if (!Number.isFinite(trialStartedAt)) {
      throw new Error('The saved SyncAthletics demo trial date is invalid.');
    }

    return Date.now() - trialStartedAt < trialDuration ? 'trial' : 'expired';
  }

  function updateAccess() {
    const status = getStatus();
    const isBasePlan = status === 'base';
    app.querySelectorAll('[data-trial-addon]').forEach((feature) => {
      feature.hidden = isBasePlan;
    });

    if (status === 'trial' || isBasePlan) {
      gate.remove();
      if (status === 'trial') {
        const startedAt = Number(localStorage.getItem(trialKey));
        window.setTimeout(updateAccess, Math.max(0, startedAt + trialDuration - Date.now()));
      }
      return;
    }

    gateTitle.textContent = status === 'expired'
      ? 'Your 7-day free trial has ended'
      : 'Start your 7-day free trial';
    gateMessage.textContent = status === 'expired'
      ? 'Activate the $6.99/month base plan to restore access to included features. Optional add-ons are not included.'
      : 'Try all SyncAthletics features free for 7 days. After the trial, the $6.99/month base plan unlocks the included features.';
    gateAction.textContent = status === 'expired'
      ? 'Activate Base Plan ($6.99/month) — Demo'
      : 'Start 7-Day Free Trial';
    gateAction.onclick = () => {
      if (status === 'expired') {
        localStorage.setItem(basePlanKey, 'true');
      } else {
        localStorage.setItem(trialKey, String(Date.now()));
      }
      updateAccess();
    };

    if (!gate.isConnected) document.body.appendChild(gate);
  }

  const query = new URLSearchParams(window.location.search);
  if (query.has('startTrial')) {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.hash}`);
  }

  updateAccess();
})();
