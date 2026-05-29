export function createOptionCard({ title, desc, value, isSelected, onClick, multi = false }) {
  const card = document.createElement('div');
  card.className = `option-card ${isSelected ? 'selected' : ''}`;
  card.dataset.value = value;
  
  card.innerHTML = `
    <div class="option-card-icon">
      <svg width="12" height="9" fill="none" viewBox="0 0 11 9"><polyline points="1 4.5 4 7.5 10 1"/></svg>
    </div>
    <div class="option-card-content">
      <div class="option-card-title">${title}</div>
      ${desc ? `<div class="option-card-desc">${desc}</div>` : ''}
    </div>
  `;

  card.addEventListener('click', () => onClick(value));
  return card;
}

export function createExpandableCard({ id, color, title, fieldsHTML, isExpanded, onToggle }) {
  const card = document.createElement('div');
  card.className = `exp-card ${isExpanded ? 'active' : ''}`;
  card.id = `wrap_${id}`;

  card.innerHTML = `
    <div class="exp-header" id="head_${id}">
      <div class="option-card-icon ${isExpanded ? 'selected' : ''}" style="${isExpanded ? 'background: var(--accent); border-color: var(--accent);' : ''}">
        <svg width="12" height="9" fill="none" viewBox="0 0 11 9" style="${isExpanded ? 'display: block;' : ''}"><polyline points="1 4.5 4 7.5 10 1"/></svg>
      </div>
      <div class="exp-dot" style="background:${color}; box-shadow: 0 0 8px ${color}80"></div>
      <div class="exp-title">${title}</div>
      <div style="font-size: 13px; color: var(--muted);">${isExpanded ? 'Preenchendo...' : 'Marque para preencher'}</div>
    </div>
    <div class="exp-body" style="display: ${isExpanded ? 'grid' : 'none'}; gap: 16px;">
      ${fieldsHTML}
    </div>
  `;

  card.querySelector('.exp-header').addEventListener('click', () => {
    onToggle(!isExpanded);
  });

  return card;
}
