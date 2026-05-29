const DRAFT_KEY = 'finx_monitor_draft';

export function saveDraft(state) {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(state));
}

export function loadDraft() {
  const saved = localStorage.getItem(DRAFT_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch (e) {
    console.error('Erro ao ler rascunho', e);
    return null;
  }
}

export function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
}
