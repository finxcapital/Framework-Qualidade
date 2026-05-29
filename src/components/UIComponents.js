export function createButton({ text, onClick, type = 'button', variant = 'secondary', icon = '', disabled = false, id = '' }) {
  const btn = document.createElement('button');
  btn.type = type;
  if (id) btn.id = id;
  btn.className = `btn btn-${variant}`;
  btn.disabled = disabled;
  btn.innerHTML = `${icon} ${text}`;
  btn.addEventListener('click', onClick);
  return btn;
}

export function showToast(msg, isWarn = false) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.background  = isWarn ? 'rgba(245,158,11,.2)' : 'rgba(34, 197, 94, 0.2)';
  t.style.borderColor = isWarn ? '#f59e0b' : '#22c55e';
  t.style.color       = isWarn ? '#fcd34d' : '#86efac';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4500);
}

export function setLoading(active, titulo = 'Enviando...', sub = 'Aguarde, isso pode levar alguns segundos') {
  let overlay = document.getElementById('loadingOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
      <div style="width: 52px; height: 52px; border-radius: 50%; border: 3px solid rgba(255,255,255,.1); border-top-color: var(--accent); border-right-color: var(--finx-yellow); animation: spin 0.85s linear infinite; margin-bottom: 20px;"></div>
      <div class="loading-text" id="loadingText" style="font-size: 15px; font-weight: 600; color: #fff; letter-spacing: .02em;"></div>
      <div class="loading-sub" id="loadingSub" style="font-size: 13px; color: var(--muted); margin-top: 6px;"></div>
    `;
    document.body.appendChild(overlay);
  }

  if (active) {
    document.getElementById('loadingText').textContent = titulo;
    document.getElementById('loadingSub').textContent  = sub;
    overlay.classList.add('active');
  } else {
    overlay.classList.remove('active');
  }
}

export function createModal({ id, icon, title, sub, contentHTML, onConfirm, onCancel, confirmText = 'Confirmar', cancelText = 'Cancelar', confirmColor = 'primary' }) {
  let backdrop = document.getElementById(id);
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = id;
    backdrop.className = 'modal-backdrop';
    document.body.appendChild(backdrop);
  }

  backdrop.innerHTML = `
    <div class="modal-box">
      <div style="font-size: 28px; margin-bottom: 12px; text-align: center;">${icon}</div>
      <div style="font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 8px; text-align: center; line-height: 1.4;" id="${id}-title">${title}</div>
      <div style="font-size: 13px; color: var(--muted); text-align: center; line-height: 1.6; margin-bottom: 20px;" id="${id}-sub">${sub}</div>
      ${contentHTML || ''}
      <div style="display: flex; gap: 10px; margin-top: 20px;">
        <button class="btn btn-secondary" style="flex: 1; justify-content: center;" id="${id}-cancel">${cancelText}</button>
        <button class="btn btn-${confirmColor}" style="flex: 1; justify-content: center; ${confirmColor === 'test' ? 'background: var(--finx-yellow); color: var(--finx-dark); border: none;' : ''}" id="${id}-confirm">${confirmText}</button>
      </div>
    </div>
  `;

  document.getElementById(`${id}-cancel`).addEventListener('click', () => {
    backdrop.classList.remove('active');
    if (onCancel) onCancel();
  });
  
  document.getElementById(`${id}-confirm`).addEventListener('click', () => {
    if (onConfirm) onConfirm();
  });

  // Fecha clicando fora
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      backdrop.classList.remove('active');
      if (onCancel) onCancel();
    }
  });

  return backdrop;
}
