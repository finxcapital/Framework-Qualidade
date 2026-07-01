import { loadDraft, saveDraft, clearDraft } from './services/draftStorage.js';
import { validateStep } from './utils/validation.js';
import { typeText } from './utils/animations.js';
import { MONITORES, EQUIPES, AUDITORIAS, PLANOS, FAROIS, DIAGNOSTICO_QUALITATIVO, DIAGNOSTICO_QUANTITATIVO } from './data/constants.js';
import { createOptionCard, createExpandableCard } from './components/Cards.js';
import { createButton, showToast, setLoading, createModal } from './components/UIComponents.js';
import { montarPayload } from './services/payloadBuilder.js';
import { enviarDaily } from './services/backendService.js';

const TOTAL_STEPS = 7;
let currentStep = 0;
let isSubmitting = false;

// Estado Central
const formState = {
  data: new Date().toISOString().split('T')[0],
  monitor: '',
  emailMonitor: '',
  equipes: [],
  emailGerente: '',
  hasGerente: false,
  indicadores: { metaMonitoriaCloserDia: '', feitasMonitoriaCloserDia: '', metaMonitoriaSDRDia: '', feitasMonitoriaSDRDia: '' },
  auditorias: {},
  diagnostico: {},
  planos: {},
  farol: '',
  farolObs: ''
};

// Mapeamento de Títulos das Etapas
const stepTitles = [
  "Quem é você?",
  "Qual equipe está sendo analisada?",
  "Quais foram os indicadores do dia?",
  "Quais auditorias foram realizadas?",
  "O que foi identificado no diagnóstico?",
  "Quais ações serão tomadas?",
  "Qual o farol de confiança?"
];

const stepSubtexts = [
  "Identificação do monitor",
  "Selecione a operação",
  "Volume de monitorias",
  "Marque as auditorias feitas",
  "Aspectos qualitativos e quantitativos",
  "Ações corretivas ou de melhoria",
  "Viabilidade de bater a meta"
];

function initApp() {
  const draft = loadDraft();
  if (draft) Object.assign(formState, draft);

  document.getElementById('app').innerHTML = `
    <div class="wizard-container">
      <div class="progress-container">
        <div class="progress-track"><div class="progress-fill" id="progressBar" style="width: 0%;"></div></div>
        <div class="progress-text"><span id="progressPct">0%</span> preenchido</div>
      </div>
      
      <div class="step-header">
        <div class="step-question" id="stepQuestion"></div>
        <div class="step-subtext" id="stepSubtext"></div>
      </div>
      
      <div class="step-content" id="stepContent"></div>
    </div>
    
    <div class="wizard-controls">
      <div class="wizard-controls-inner">
        <div class="controls-left" id="controlsLeft"></div>
        <div class="controls-right" id="controlsRight"></div>
      </div>
    </div>
  `;

  renderControls();
  renderCurrentStep(true);

  // Auto-save global no window
  window.addEventListener('beforeunload', (e) => {
    if ((formState.monitor || formState.equipes.length > 0) && !isSubmitting) {
      e.preventDefault();
      e.returnValue = '';
    }
  });
}

function updateProgress() {
  const pct = Math.round((currentStep / (TOTAL_STEPS - 1)) * 100);
  document.getElementById('progressBar').style.width = `${pct}%`;
  document.getElementById('progressPct').textContent = `${pct}%`;
}

function renderControls() {
  const left = document.getElementById('controlsLeft');
  const right = document.getElementById('controlsRight');
  left.innerHTML = ''; right.innerHTML = '';

  left.appendChild(createButton({
    text: 'Limpar', variant: 'secondary', id: 'btnReset',
    icon: `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path stroke-linecap="round" stroke-linejoin="round" d="M3 3v5h5"/></svg>`,
    onClick: handleReset
  }));

  if (currentStep > 0) {
    left.appendChild(createButton({
      text: 'Voltar', variant: 'secondary', 
      icon: `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>`,
      onClick: () => prevStep()
    }));
  }

  const isValid = validateStep(currentStep, formState);

  if (currentStep === TOTAL_STEPS - 1) {
    right.appendChild(createButton({
      text: 'Enviar Teste', variant: 'test', id: 'btnTest', disabled: !isValid,
      icon: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>',
      onClick: handleTestSend
    }));
    right.appendChild(createButton({
      text: 'Enviar Daily', variant: 'primary', id: 'btnSubmit', disabled: !isValid,
      icon: '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',
      onClick: handleRealSend
    }));
  } else {
    right.appendChild(createButton({
      text: 'Continuar', variant: 'primary', id: 'btnNext', disabled: !isValid,
      icon: '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>',
      onClick: () => nextStep()
    }));
  }
}

function checkValidation() {
  const isValid = validateStep(currentStep, formState);
  const btnNext = document.getElementById('btnNext');
  const btnTest = document.getElementById('btnTest');
  const btnSubmit = document.getElementById('btnSubmit');
  
  if (btnNext) btnNext.disabled = !isValid;
  if (btnTest) btnTest.disabled = !isValid;
  if (btnSubmit) btnSubmit.disabled = !isValid;
  
  saveDraft(formState);
}

function nextStep() {
  if (currentStep < TOTAL_STEPS - 1 && validateStep(currentStep, formState)) {
    const container = document.getElementById('stepInner');
    if (container) {
      container.classList.remove('enter-backward', 'active');
      container.classList.add('exit');
      setTimeout(() => {
        currentStep++;
        renderCurrentStep(true, false);
      }, 300);
    } else {
      currentStep++;
      renderCurrentStep(true, false);
    }
  }
}

function prevStep() {
  if (currentStep > 0) {
    const container = document.getElementById('stepInner');
    if (container) {
      container.classList.remove('exit', 'active');
      container.classList.add('exit-backward');
      setTimeout(() => {
        currentStep--;
        renderCurrentStep(false, true);
      }, 300);
    } else {
      currentStep--;
      renderCurrentStep(false, true);
    }
  }
}

async function renderCurrentStep(animateText = true, isBackward = false) {
  const titleEl = document.getElementById('stepQuestion');
  const subEl = document.getElementById('stepSubtext');
  const contentEl = document.getElementById('stepContent');

  subEl.textContent = stepSubtexts[currentStep];
  if (animateText) {
    titleEl.innerHTML = '';
    typeText(titleEl, stepTitles[currentStep], 30);
  } else {
    titleEl.textContent = stepTitles[currentStep];
  }

  updateProgress();
  renderControls();

  const wrap = document.createElement('div');
  wrap.className = `step-container ${isBackward ? 'enter-backward' : 'active'}`;
  wrap.id = 'stepInner';

  switch (currentStep) {
    case 0: renderStep0(wrap); break;
    case 1: renderStep1(wrap); break;
    case 2: renderStep2(wrap); break;
    case 3: renderStep3(wrap); break;
    case 4: renderStep4(wrap); break;
    case 5: renderStep5(wrap); break;
    case 6: renderStep6(wrap); break;
  }

  contentEl.innerHTML = '';
  contentEl.appendChild(wrap);
  
  // Foca no primeiro input se houver
  const firstInput = wrap.querySelector('input:not([type="hidden"]):not([type="radio"]):not([type="checkbox"])');
  if (firstInput && !firstInput.value) setTimeout(() => firstInput.focus(), 500);
}

// ================= RENDER STEPS =================

function renderStep0(container) {
  container.innerHTML = `
    <div class="grid-1" style="max-width: 400px; margin: 0 auto;">
      <div class="field">
        <label>Data de Referência</label>
        <input type="date" id="inputData" value="${formState.data}">
      </div>
      <div class="field" style="margin-top: 16px;">
        <label>Selecione seu perfil</label>
        <div id="monitoresList" class="grid-1"></div>
      </div>
    </div>
  `;

  container.querySelector('#inputData').addEventListener('change', (e) => {
    formState.data = e.target.value;
    checkValidation();
  });

  const list = container.querySelector('#monitoresList');
  MONITORES.forEach(m => {
    const card = createOptionCard({
      title: m.value, desc: m.email, value: m.value,
      isSelected: formState.monitor === m.value,
      onClick: (val) => {
        formState.monitor = val;
        formState.emailMonitor = m.email;
        renderStep0(container); // re-render to update selection visual
        checkValidation();
        // Auto-advance
        setTimeout(() => nextStep(), 200);
      }
    });
    list.appendChild(card);
  });
}

function renderStep1(container) {
  container.innerHTML = `
    <div class="grid-2">
      <div class="field">
        <label>Equipe (Múltipla escolha)</label>
        <div id="equipesList" class="grid-1"></div>
      </div>
      <div class="field">
        <label>E-mail Alternativo (Opcional)</label>
        <div class="option-card ${formState.hasGerente ? 'selected' : ''}" id="toggleGerente" style="margin-bottom: 16px;">
          <div class="option-card-icon"><svg width="12" height="9" fill="none" viewBox="0 0 11 9"><polyline points="1 4.5 4 7.5 10 1"/></svg></div>
          <div class="option-card-content"><div class="option-card-title" style="font-size:14px">Enviar para outro gerente?</div></div>
        </div>
        <div id="gerenteInputWrap" style="display: ${formState.hasGerente ? 'block' : 'none'}; animation: slideDown 0.3s ease;">
          <input type="email" id="inputGerente" placeholder="Digite o e-mail" value="${formState.emailGerente}">
        </div>
      </div>
    </div>
  `;

  const list = container.querySelector('#equipesList');
  EQUIPES.forEach(eq => {
    const isSel = formState.equipes.includes(eq.value);
    const card = createOptionCard({
      title: eq.value, value: eq.value, isSelected: isSel,
      onClick: (val) => {
        if (formState.equipes.includes(val)) {
          formState.equipes = formState.equipes.filter(v => v !== val);
        } else {
          formState.equipes.push(val);
        }
        renderStep1(container);
        checkValidation();
      }
    });
    list.appendChild(card);
  });

  container.querySelector('#toggleGerente').addEventListener('click', () => {
    formState.hasGerente = !formState.hasGerente;
    if (!formState.hasGerente) formState.emailGerente = '';
    renderStep1(container);
    checkValidation();
  });

  const inp = container.querySelector('#inputGerente');
  if (inp) {
    inp.addEventListener('input', (e) => {
      formState.emailGerente = e.target.value;
      checkValidation();
    });
  }
}

function renderStep2(container) {
  container.innerHTML = `
    <div class="grid-2" style="max-width: 600px; margin: 0 auto;">
      <div class="field mono">
        <label>Meta Monitoria Closer Dia</label>
        <input type="number" id="metaMonCloser" placeholder="Ex: 20" min="0" value="${formState.indicadores.metaMonitoriaCloserDia}">
      </div>
      <div class="field mono">
        <label>Monitorias Closer Feitas Dia</label>
        <input type="number" id="feitasMonCloser" placeholder="Ex: 18" min="0" value="${formState.indicadores.feitasMonitoriaCloserDia}">
      </div>
      <div class="field mono">
        <label>Meta Monitoria SDR Dia</label>
        <input type="number" id="metaMonSDR" placeholder="Ex: 20" min="0" value="${formState.indicadores.metaMonitoriaSDRDia}">
      </div>
      <div class="field mono">
        <label>Monitorias SDR Feitas Dia</label>
        <input type="number" id="feitasMonSDR" placeholder="Ex: 18" min="0" value="${formState.indicadores.feitasMonitoriaSDRDia}">
      </div>
    </div>
  `;

  [
    { id: 'metaMonCloser', key: 'metaMonitoriaCloserDia' },
    { id: 'feitasMonCloser', key: 'feitasMonitoriaCloserDia' },
    { id: 'metaMonSDR', key: 'metaMonitoriaSDRDia' },
    { id: 'feitasMonSDR', key: 'feitasMonitoriaSDRDia' },
  ].forEach(({ id, key }) => {
    container.querySelector(`#${id}`).addEventListener('input', (e) => {
      formState.indicadores[key] = e.target.value;
      checkValidation();
    });
  });
}

function renderStep3(container) {
  const list = document.createElement('div');
  list.className = 'grid-1';
  list.style.maxWidth = '600px';
  list.style.margin = '0 auto';

  AUDITORIAS.forEach(a => {
    const isAtivo = formState.auditorias[a.key + '_ativo'] === 'Sim';
    const fieldsHTML = `
      <div class="grid-2">
        <div class="field mono"><label>Meta Dia</label><input type="number" data-key="${a.key}_meta" value="${formState.auditorias[a.key+'_meta']||''}" placeholder="0" min="0"></div>
        <div class="field mono"><label>Feitas Dia</label><input type="number" data-key="${a.key}_feitas" value="${formState.auditorias[a.key+'_feitas']||''}" placeholder="0" min="0"></div>
      </div>
    `;

    const card = createExpandableCard({
      id: a.key, color: a.color, title: a.label, isExpanded: isAtivo, fieldsHTML,
      onToggle: (val) => {
        formState.auditorias[a.key + '_ativo'] = val ? 'Sim' : 'Nao';
        if (!val) {
          formState.auditorias[a.key + '_meta'] = '';
          formState.auditorias[a.key + '_feitas'] = '';
        }
        renderStep3(container);
        checkValidation();
      }
    });

    card.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        formState.auditorias[e.target.dataset.key] = e.target.value;
        checkValidation();
      });
    });

    list.appendChild(card);
  });
  
  container.innerHTML = '';
  container.appendChild(list);
}

function renderStep4(container) {
  container.innerHTML = `
    <div class="grid-2">
      <div>
        <h4 style="color: var(--muted); text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; margin-bottom: 16px;">Qualitativo (Como a equipe opera)</h4>
        <div id="qualList" class="grid-1"></div>
      </div>
      <div>
        <h4 style="color: var(--muted); text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; margin-bottom: 16px;">Quantitativo (Esforço e Eficiência)</h4>
        <div id="quantList" class="grid-1"></div>
      </div>
    </div>
  `;

  const qualList = container.querySelector('#qualList');
  DIAGNOSTICO_QUALITATIVO.forEach(q => {
    const isSel = formState.diagnostico[q.key] === 'Sim';
    qualList.appendChild(createOptionCard({
      title: q.label, value: q.key, isSelected: isSel,
      onClick: (val) => {
        formState.diagnostico[val] = formState.diagnostico[val] === 'Sim' ? 'Nao' : 'Sim';
        renderStep4(container);
        checkValidation();
      }
    }));
  });

  const quantList = container.querySelector('#quantList');
  DIAGNOSTICO_QUANTITATIVO.forEach(q => {
    const isSel = formState.diagnostico[q.key] === 'Sim';
    quantList.appendChild(createOptionCard({
      title: q.label, value: q.key, isSelected: isSel,
      onClick: (val) => {
        formState.diagnostico[val] = formState.diagnostico[val] === 'Sim' ? 'Nao' : 'Sim';
        renderStep4(container);
        checkValidation();
      }
    }));
  });
}

function renderStep5(container) {
  const list = document.createElement('div');
  list.className = 'grid-1';
  list.style.maxWidth = '760px';
  list.style.margin = '0 auto';

  PLANOS.forEach(p => {
    const isAtivo = formState.planos[p.key + '_ativo'] === 'Sim';
    const fieldsHTML = `
      <div class="grid-3" style="align-items: start;">
        <div class="field"><label>Detalhe da Ação</label><textarea data-key="${p.key}_detalhe" placeholder="O que será feito...">${formState.planos[p.key+'_detalhe']||''}</textarea></div>
        <div class="field"><label>Resultado Esperado</label><input type="text" data-key="${p.key}_resultado" value="${formState.planos[p.key+'_resultado']||''}" placeholder="+15% conv."></div>
        <div class="field"><label>Prazo</label><input type="date" data-key="${p.key}_prazo" value="${formState.planos[p.key+'_prazo']||''}"></div>
      </div>
    `;

    const card = createExpandableCard({
      id: p.key, color: p.color, title: p.label, isExpanded: isAtivo, fieldsHTML,
      onToggle: (val) => {
        formState.planos[p.key + '_ativo'] = val ? 'Sim' : 'Nao';
        if (!val) {
          formState.planos[p.key + '_detalhe'] = '';
          formState.planos[p.key + '_resultado'] = '';
          formState.planos[p.key + '_prazo'] = '';
        }
        renderStep5(container);
        checkValidation();
      }
    });

    card.querySelectorAll('input, textarea').forEach(inp => {
      inp.addEventListener('input', (e) => {
        formState.planos[e.target.dataset.key] = e.target.value;
        checkValidation();
      });
    });

    list.appendChild(card);
  });
  
  container.innerHTML = '';
  container.appendChild(list);
}

function renderStep6(container) {
  container.innerHTML = `
    <div class="farol-grid" id="farolGrid"></div>
    <div class="field" style="margin-top: 32px; max-width: 600px; margin-left: auto; margin-right: auto;">
      <label>Observações Adicionais (Opcional)</label>
      <textarea id="farolObs" placeholder="Explique resumidamente o contexto da operação hoje...">${formState.farolObs}</textarea>
    </div>
  `;

  const grid = container.querySelector('#farolGrid');
  FAROIS.forEach(f => {
    const isSel = formState.farol === f.value;
    const item = document.createElement('div');
    item.className = `farol-label farol-option ${f.colorClass} ${isSel ? 'selected' : ''}`;
    item.innerHTML = `
      <div class="farol-circle" style="background: var(--${f.colorClass})"></div>
      <div class="farol-name" style="color: var(--${f.colorClass})">${f.label}</div>
      <div class="farol-desc">${f.desc}</div>
    `;
    item.addEventListener('click', () => {
      formState.farol = f.value;
      renderStep6(container);
      checkValidation();
    });
    grid.appendChild(item);
  });

  container.querySelector('#farolObs').addEventListener('input', (e) => {
    formState.farolObs = e.target.value;
    saveDraft(formState);
  });
}

// ================= ENVIO E INTEGRAÇÃO =================

async function processSend(isTeste = false, forcarEnvio = false) {
  if (isSubmitting) return;
  isSubmitting = true;

  const payload = montarPayload(formState, isTeste);
  if (forcarEnvio) payload.forcarEnvio = true;

  const chaveDup = `daily_qualidade_${payload.supervisor}_${payload.data}`;
  
  if (!forcarEnvio && !isTeste && localStorage.getItem(chaveDup)) {
    isSubmitting = false;
    createModal({
      id: 'modalDup',
      icon: '<svg width="40" height="40" fill="none" stroke="var(--amber)" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',
      title: 'Você já enviou um Daily hoje',
      sub: 'Deseja enviar novamente mesmo assim?',
      onConfirm: () => {
        document.getElementById('modalDup').classList.remove('active');
        processSend(false, true);
      }
    }).classList.add('active');
    return;
  }

  setLoading(true, isTeste ? 'Enviando teste...' : 'Enviando Daily de Qualidade...', isTeste ? 'Validando envio para e-mails de teste' : 'Gravando na planilha e disparando e-mails');
  
  const res = await enviarDaily(payload);
  
  if (res.sucesso) {
    if (res.duplicado && !forcarEnvio) {
      setLoading(false);
      isSubmitting = false;
      createModal({
        id: 'modalDup',
        icon: '<svg width="40" height="40" fill="none" stroke="var(--amber)" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',
        title: 'Você já enviou um Daily hoje (Detectado pelo servidor)',
        sub: 'Deseja enviar novamente mesmo assim?',
        onConfirm: () => {
          document.getElementById('modalDup').classList.remove('active');
          processSend(false, true);
        }
      }).classList.add('active');
      return;
    }

    if (!isTeste) {
      clearDraft();
      localStorage.setItem(chaveDup, Date.now());
    }
    showToast(isTeste ? '✅ Teste enviado!' : '✅ Daily enviada com sucesso!');
    setLoading(false);
    setTimeout(() => location.reload(), 2000);
  } else {
    showToast('❌ Erro ao enviar. Tente novamente.', true);
    setLoading(false);
    isSubmitting = false;
  }
}

function handleTestSend() {
  createModal({
    id: 'modalTest',
    icon: '<svg width="40" height="40" fill="none" stroke="var(--finx-yellow)" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 0 0-1.022-.547l-2.387-.477a6 6 0 0 0-3.86.517l-.318.158a6 6 0 0 1-3.86.517L6.05 15.21a2 2 0 0 0-1.806.547M8 4h8l-1 1v5.172a2 2 0 0 0 .586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 0 0 9 10.172V5L8 4z"/></svg>',
    title: 'Envio de Teste',
    sub: 'O e-mail será enviado para os endereços de teste e a planilha NÃO será alterada.',
    contentHTML: `
      <div class="field" style="margin-bottom: 16px;">
        <label style="text-align: center;">Senha de confirmação</label>
        <input type="password" id="inputSenhaTeste" placeholder="••••" style="text-align: center; font-size: 20px; letter-spacing: 0.2em;" autocomplete="off">
        <div id="erroSenhaTeste" style="color: var(--red); font-size: 13px; text-align: center; min-height: 20px; margin-top: 8px;"></div>
      </div>
    `,
    confirmText: 'Enviar Teste',
    confirmColor: 'test',
    onConfirm: () => {
      const senha = document.getElementById('inputSenhaTeste').value;
      if (senha !== '1234') {
        const inp = document.getElementById('inputSenhaTeste');
        document.getElementById('erroSenhaTeste').textContent = 'Senha incorreta. Tente novamente.';
        inp.style.borderColor = 'var(--red)';
        setTimeout(() => inp.style.borderColor = '', 1000);
      } else {
        document.getElementById('modalTest').classList.remove('active');
        processSend(true);
      }
    }
  }).classList.add('active');
  setTimeout(() => document.getElementById('inputSenhaTeste')?.focus(), 150);
}

function handleRealSend() {
  processSend(false);
}

function handleReset() {
  createModal({
    id: 'modalReset',
    icon: '<svg width="40" height="40" fill="none" stroke="var(--red)" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16"/></svg>',
    title: 'Limpar Formulário',
    sub: 'Tem certeza que deseja apagar todos os dados preenchidos?',
    confirmText: 'Sim, limpar',
    confirmColor: 'red',
    onConfirm: () => {
      clearDraft();
      location.reload();
    }
  }).classList.add('active');
}

// Inicia
document.addEventListener('DOMContentLoaded', initApp);
