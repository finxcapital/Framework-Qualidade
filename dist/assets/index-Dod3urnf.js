(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`finx_monitor_draft`;function t(t){localStorage.setItem(e,JSON.stringify(t))}function n(){let t=localStorage.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch(e){return console.error(`Erro ao ler rascunho`,e),null}}function r(){localStorage.removeItem(e)}function i(e,t){switch(e){case 0:return!!(t.data&&t.monitor);case 1:return t.equipes.length!==0;case 2:return!0;default:return!0}}function a(e,t,n=25){return new Promise(r=>{e.innerHTML=`<span class="step-question-typing"></span>`;let i=e.querySelector(`.step-question-typing`),a=0;function o(){if(a<t.length){let r=document.createTextNode(t.charAt(a));e.insertBefore(r,i),a++,setTimeout(o,n)}else setTimeout(()=>{i.classList.remove(`step-question-typing`),r()},300)}o()})}var o=[{value:`Alexandre Silva`,email:`alexandre.silva@finxcapital.com.br`},{value:`Lilian Martins`,email:`lilian.martins@finxcapital.com.br`},{value:`Lucca Moraes`,email:`lucca.moraes@finxcapital.com.br`}],s=[{value:`Movida`},{value:`Condicional`},{value:`Localiza`}],c=[{key:`audRotina`,label:`Auditoria de Rotina`,color:`#ffffff`},{key:`audVendas`,label:`Auditoria de Vendas`,color:`#cccccc`},{key:`audPerdidos`,label:`Auditoria de Perdidos`,color:`#999999`},{key:`audEstorno`,label:`Auditoria de Estorno`,color:`#666666`},{key:`audDocumentos`,label:`Auditoria de Documentos`,color:`#444444`}],l=[{key:`diagQualScript`,label:`Aderência ao Script/Processo`},{key:`diagQualVendas`,label:`Técnica de Vendas/Argumentação`},{key:`diagQualRegistros`,label:`Qualidade dos Registros (CRM)`},{key:`diagQualCadencia`,label:`Processo de Cadência de Ligação`},{key:`diagQualRotina`,label:`Rotina de Trabalho`}],u=[{key:`diagQuantEsforco`,label:`Eficiência - Esforço (Contatos)`},{key:`diagQuantMassa`,label:`Massa Crítica - Negócios (Leads)`}],d=[{key:`treinRelampago`,label:`Treinamento Relâmpago`,color:`#ffffff`},{key:`planoMonitoria`,label:`Monitoria`,color:`#cccccc`},{key:`planoFeedback`,label:`Feedback`,color:`#aaaaaa`},{key:`planoAuditoria`,label:`Auditoria`,color:`#888888`},{key:`planoAnalise`,label:`Análise`,color:`#666666`},{key:`planoOutro`,label:`Outro`,color:`#444444`}],f=[{value:`verde`,label:`Verde`,desc:`Provável - superaremos a meta operacional.`,colorClass:`verde`},{value:`amarelo`,label:`Amarelo`,desc:`Possível - há caminho, mas cenário é incerto.`,colorClass:`amarelo`},{value:`vermelho`,label:`Vermelho`,desc:`Impossível - sem chances tangíveis de bater a meta.`,colorClass:`vermelho`}];function p({title:e,desc:t,value:n,isSelected:r,onClick:i,multi:a=!1}){let o=document.createElement(`div`);return o.className=`option-card ${r?`selected`:``}`,o.dataset.value=n,o.innerHTML=`
    <div class="option-card-icon">
      <svg width="12" height="9" fill="none" viewBox="0 0 11 9"><polyline points="1 4.5 4 7.5 10 1"/></svg>
    </div>
    <div class="option-card-content">
      <div class="option-card-title">${e}</div>
      ${t?`<div class="option-card-desc">${t}</div>`:``}
    </div>
  `,o.addEventListener(`click`,()=>i(n)),o}function m({id:e,color:t,title:n,fieldsHTML:r,isExpanded:i,onToggle:a}){let o=document.createElement(`div`);return o.className=`exp-card ${i?`active`:``}`,o.id=`wrap_${e}`,o.innerHTML=`
    <div class="exp-header" id="head_${e}">
      <div class="option-card-icon ${i?`selected`:``}" style="${i?`background: var(--accent); border-color: var(--accent);`:``}">
        <svg width="12" height="9" fill="none" viewBox="0 0 11 9" style="${i?`display: block;`:``}"><polyline points="1 4.5 4 7.5 10 1"/></svg>
      </div>
      <div class="exp-dot" style="background:${t}; box-shadow: 0 0 8px ${t}80"></div>
      <div class="exp-title">${n}</div>
      <div style="font-size: 13px; color: var(--muted);">${i?`Preenchendo...`:`Marque para preencher`}</div>
    </div>
    <div class="exp-body" style="display: ${i?`grid`:`none`}; gap: 16px;">
      ${r}
    </div>
  `,o.querySelector(`.exp-header`).addEventListener(`click`,()=>{a(!i)}),o}function h({text:e,onClick:t,type:n=`button`,variant:r=`secondary`,icon:i=``,disabled:a=!1,id:o=``}){let s=document.createElement(`button`);return s.type=n,o&&(s.id=o),s.className=`btn btn-${r}`,s.disabled=a,s.innerHTML=`${i} ${e}`,s.addEventListener(`click`,t),s}function g(e,t=!1){let n=document.getElementById(`toast`);n||(n=document.createElement(`div`),n.id=`toast`,n.className=`toast`,document.body.appendChild(n)),n.textContent=e,n.style.background=t?`rgba(245,158,11,.2)`:`rgba(34, 197, 94, 0.2)`,n.style.borderColor=t?`#f59e0b`:`#22c55e`,n.style.color=t?`#fcd34d`:`#86efac`,n.classList.add(`show`),setTimeout(()=>n.classList.remove(`show`),4500)}function _(e,t=`Enviando...`,n=`Aguarde, isso pode levar alguns segundos`){let r=document.getElementById(`loadingOverlay`);r||(r=document.createElement(`div`),r.id=`loadingOverlay`,r.className=`loading-overlay`,r.innerHTML=`
      <div style="width: 52px; height: 52px; border-radius: 50%; border: 3px solid rgba(255,255,255,.1); border-top-color: var(--accent); border-right-color: var(--finx-yellow); animation: spin 0.85s linear infinite; margin-bottom: 20px;"></div>
      <div class="loading-text" id="loadingText" style="font-size: 15px; font-weight: 600; color: #fff; letter-spacing: .02em;"></div>
      <div class="loading-sub" id="loadingSub" style="font-size: 13px; color: var(--muted); margin-top: 6px;"></div>
    `,document.body.appendChild(r)),e?(document.getElementById(`loadingText`).textContent=t,document.getElementById(`loadingSub`).textContent=n,r.classList.add(`active`)):r.classList.remove(`active`)}function v({id:e,icon:t,title:n,sub:r,contentHTML:i,onConfirm:a,onCancel:o,confirmText:s=`Confirmar`,cancelText:c=`Cancelar`,confirmColor:l=`primary`}){let u=document.getElementById(e);return u||(u=document.createElement(`div`),u.id=e,u.className=`modal-backdrop`,document.body.appendChild(u)),u.innerHTML=`
    <div class="modal-box">
      <div style="font-size: 28px; margin-bottom: 12px; text-align: center;">${t}</div>
      <div style="font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 8px; text-align: center; line-height: 1.4;" id="${e}-title">${n}</div>
      <div style="font-size: 13px; color: var(--muted); text-align: center; line-height: 1.6; margin-bottom: 20px;" id="${e}-sub">${r}</div>
      ${i||``}
      <div style="display: flex; gap: 10px; margin-top: 20px;">
        <button class="btn btn-secondary" style="flex: 1; justify-content: center;" id="${e}-cancel">${c}</button>
        <button class="btn btn-${l}" style="flex: 1; justify-content: center; ${l===`test`?`background: var(--finx-yellow); color: var(--finx-dark); border: none;`:``}" id="${e}-confirm">${s}</button>
      </div>
    </div>
  `,document.getElementById(`${e}-cancel`).addEventListener(`click`,()=>{u.classList.remove(`active`),o&&o()}),document.getElementById(`${e}-confirm`).addEventListener(`click`,()=>{a&&a()}),u.addEventListener(`click`,e=>{e.target===u&&(u.classList.remove(`active`),o&&o())}),u}function y(e){let t=f.find(t=>t.value===e.farol),n=t?{verde:`#22c55e`,amarelo:`#f59e0b`,vermelho:`#ef4444`}[e.farol]:`#6b7280`,r=t?`${t.label} - ${t.desc.split(` - `)[0]}`:`Não informado`,i=l.map(t=>{let n=e.diagnostico[t.key]===`Sim`;return`<tr>
      <td width="20" style="padding:10px 0; border-bottom:1px solid #333333;"><div style="width:14px;height:14px;border-radius:4px;background:${n?`#ffffff`:`#333333`};"></div></td>
      <td style="padding:10px 0; border-bottom:1px solid #333333; font-size:14px; color:${n?`#ffffff`:`#8c9bba`}">${t.label}</td>
      <td align="right" style="padding:10px 0; border-bottom:1px solid #333333; font-size:13px; font-weight:700; color:${n?`#ffffff`:`#8c9bba`}">${n?`Sim`:`Não`}</td>
    </tr>`}).join(``)+u.map(t=>{let n=e.diagnostico[t.key]===`Sim`;return`<tr>
      <td width="20" style="padding:10px 0; border-bottom:1px solid #333333;"><div style="width:14px;height:14px;border-radius:4px;background:${n?`#ffffff`:`#333333`};"></div></td>
      <td style="padding:10px 0; border-bottom:1px solid #333333; font-size:14px; color:${n?`#ffffff`:`#8c9bba`}">${t.label}</td>
      <td align="right" style="padding:10px 0; border-bottom:1px solid #333333; font-size:13px; font-weight:700; color:${n?`#ffffff`:`#8c9bba`}">${n?`Sim`:`Não`}</td>
    </tr>`}).join(``),a=c.filter(t=>e.auditorias[t.key+`_ativo`]===`Sim`).map(t=>`
    <tr>
      <td style="padding:12px; border-bottom:1px solid #333333; font-weight:600; color:#ffffff">${t.label}</td>
      <td align="center" style="padding:12px; border-bottom:1px solid #333333; color:#e2e8f0; font-family:monospace">${e.auditorias[t.key+`_meta`]||`--`}</td>
      <td align="center" style="padding:12px; border-bottom:1px solid #333333; color:#e2e8f0; font-family:monospace">${e.auditorias[t.key+`_feitas`]||`--`}</td>
    </tr>`).join(``),o=d.filter(t=>e.planos[t.key+`_ativo`]===`Sim`).map(t=>`
    <tr>
      <td style="padding:12px; border-bottom:1px solid #333333; font-weight:600; color:#e5e5e5">${t.label}</td>
      <td style="padding:12px; border-bottom:1px solid #333333; color:#e2e8f0">${e.planos[t.key+`_detalhe`]||`--`}</td>
      <td style="padding:12px; border-bottom:1px solid #333333; color:#e2e8f0">${e.planos[t.key+`_resultado`]||`--`}</td>
      <td style="padding:12px; border-bottom:1px solid #333333; color:#e2e8f0; white-space:nowrap">${e.planos[t.key+`_prazo`]||`--`}</td>
    </tr>`).join(``),s=(e,t,n)=>`
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a; border:1px solid #333333; border-radius:16px; margin-bottom:24px;">
      <tr>
        <td style="padding:16px 24px; background:#1a1a1a; border-bottom:1px solid #333333; border-radius:16px 16px 0 0;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td width="36"><span style="font-size:12px;font-weight:700;background:#e5e5e5;color:#1a1a1a;border-radius:6px;padding:3px 10px">${e}</span></td>
            <td><span style="font-size:14px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#ffffff">${t}</span></td>
          </tr></table>
        </td>
      </tr>
      <tr><td style="padding:24px;">${n}</td></tr>
    </table>`;return`<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="font-family:'Inter', Arial, sans-serif;background:#0a0a0a;color:#ffffff;margin:0;padding:0">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0a0a;"><tr><td align="center" style="padding:40px 15px;">
  <table width="100%" style="max-width:700px;" cellpadding="0" cellspacing="0" border="0">
    <tr><td style="padding-bottom:30px; border-bottom:1px solid #333333; text-align:center;">
      <img src="https://github.com/user-attachments/assets/41e98109-418f-40d4-9c27-75a357726e0b" alt="FINX" height="40" style="margin-bottom: 20px;">
      <div style="font-size:12px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#e5e5e5;margin-bottom:8px">Daily de Qualidade</div>
      <div style="font-size:24px;font-weight:800;color:#ffffff">Framework do Monitor</div>
      <div style="font-size:14px;color:#8c9bba;margin-top:8px">${e.monitor} &nbsp;·&nbsp; ${e.equipes.join(`, `)} &nbsp;·&nbsp; ${e.data}</div>
    </td></tr>
    <tr><td height="30"></td></tr>
    <tr><td>
      ${s(`01`,`Indicadores do Dia`,(e=>{let t=``;for(let n=0;n<e.length;n+=2){let[r,i]=e[n],[a,o]=e[n+1]||[``,``];t+=`<tr>
        <td width="48%" style="padding:14px; background:#1a1a1a; border:1px solid #333333; border-radius:10px;">
          <div style="font-size:11px;color:#8c9bba;text-transform:uppercase;margin-bottom:6px;font-weight:600">${r}</div>
          <div style="font-size:16px;font-weight:700;color:#ffffff;">${i||`--`}</div>
        </td>
        <td width="4%"></td>
        ${a?`<td width="48%" style="padding:14px; background:#1a1a1a; border:1px solid #333333; border-radius:10px;">
          <div style="font-size:11px;color:#8c9bba;text-transform:uppercase;margin-bottom:6px;font-weight:600">${a}</div>
          <div style="font-size:16px;font-weight:700;color:#ffffff;">${o||`--`}</div>
        </td>`:`<td></td>`}
      </tr>
      <tr><td height="14"></td></tr>`}return`<table width="100%" cellpadding="0" cellspacing="0" border="0">${t}</table>`})([[`Meta Monitoria Dia`,e.indicadores.metaMonitoriaDia],[`Monitorias Feitas Dia`,e.indicadores.feitasMonitoriaDia]])+(a?`<div style="margin-top:16px;font-size:12px;font-weight:700;color:#8c9bba;text-transform:uppercase;margin-bottom:8px">Auditorias Realizadas</div>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; background:#1a1a1a; border-radius:10px; overflow:hidden;">
        <thead style="background:#333333"><tr>
          <th style="text-align:left;padding:10px 12px;font-size:11px;color:#8c9bba;">TIPO</th>
          <th style="text-align:center;padding:10px 12px;font-size:11px;color:#8c9bba;">META DIA</th>
          <th style="text-align:center;padding:10px 12px;font-size:11px;color:#8c9bba;">FEITAS DIA</th>
        </tr></thead><tbody>${a}</tbody>
      </table>`:``))}
      
      ${s(`02`,`Diagnóstico`,`<table width="100%" cellpadding="0" cellspacing="0">${i}</table>`)}
      
      ${o?s(`03`,`Plano de Ação`,`<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; background:#1a1a1a; border-radius:10px; overflow:hidden;">
        <thead style="background:#333333"><tr>
          <th style="text-align:left;padding:10px 12px;font-size:11px;color:#8c9bba;">AÇÃO</th>
          <th style="text-align:left;padding:10px 12px;font-size:11px;color:#8c9bba;">DETALHE</th>
          <th style="text-align:left;padding:10px 12px;font-size:11px;color:#8c9bba;">RESULTADO</th>
          <th style="text-align:left;padding:10px 12px;font-size:11px;color:#8c9bba;">PRAZO</th>
        </tr></thead><tbody>${o}</tbody>
      </table>`):``}
      
      ${s(`04`,`Farol de Confiança`,`<div style="text-align:center">
        <div style="display:inline-block;padding:14px 28px;border-radius:10px;font-size:16px;font-weight:800;border:2px solid ${n};color:${n};background:${n}15">${r}</div>
        ${e.farolObs?`<div style="margin-top:20px;font-size:14px;color:#8c9bba;font-style:italic">"${e.farolObs}"</div>`:``}
      </div>`)}
    </td></tr>
    <tr><td align="center" style="font-size:12px;color:#4a5b7c;padding:30px 0;">
      Framework Monitor FINX &nbsp;·&nbsp; ${new Date().toLocaleString(`pt-BR`)}
    </td></tr>
  </table>
</td></tr></table></body></html>`}function b(e,t){let n=y(e);return{sheetRow:[e.data,e.monitor,e.equipes.join(`, `),e.indicadores.metaMonitoriaDia,e.indicadores.feitasMonitoriaDia,...c.flatMap(t=>[e.auditorias[t.key+`_meta`]||``,e.auditorias[t.key+`_feitas`]||``]),...l.map(t=>e.diagnostico[t.key]||`Nao`),...u.map(t=>e.diagnostico[t.key]||`Nao`),...d.flatMap(t=>[e.planos[t.key+`_detalhe`]||``,e.planos[t.key+`_resultado`]||``,e.planos[t.key+`_prazo`]||``]),e.farol||``,e.farolObs||``],emailHTML:n,emailSupervisor:e.emailMonitor,emailGerente:e.emailGerente,supervisor:e.monitor,data:e.data,isTeste:t||!1}}var x=`https://script.google.com/macros/s/AKfycbx3FeiQuV8enCTQ17kBysKwoPEQ_-BnEPr71nWCGDrooC0kyXJs4wIbKcm09Oc7k9Mh6A/exec`;async function S(e){try{let t=null;try{let n=await(await fetch(x,{method:`POST`,headers:{"Content-Type":`text/plain`},body:JSON.stringify(e)})).text();try{t=JSON.parse(n)}catch{}}catch{await fetch(x,{method:`POST`,mode:`no-cors`,headers:{"Content-Type":`text/plain`},body:JSON.stringify(e)})}return await new Promise(e=>setTimeout(e,2200)),{sucesso:!0,duplicado:t?.codigo===`duplicado`}}catch(e){return console.error(`Erro no envio:`,e),{sucesso:!1,erro:e}}}var C=7,w=0,T=!1,E={data:new Date().toISOString().split(`T`)[0],monitor:``,emailMonitor:``,equipes:[],emailGerente:``,hasGerente:!1,indicadores:{metaMonitoriaDia:``,feitasMonitoriaDia:``},auditorias:{},diagnostico:{},planos:{},farol:``,farolObs:``},D=[`Quem é você?`,`Qual equipe está sendo analisada?`,`Quais foram os indicadores do dia?`,`Quais auditorias foram realizadas?`,`O que foi identificado no diagnóstico?`,`Quais ações serão tomadas?`,`Qual o farol de confiança?`],O=[`Identificação do monitor`,`Selecione a operação`,`Volume de monitorias`,`Marque as auditorias feitas`,`Aspectos qualitativos e quantitativos`,`Ações corretivas ou de melhoria`,`Viabilidade de bater a meta`];function k(){let e=n();e&&Object.assign(E,e),document.getElementById(`app`).innerHTML=`
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
  `,j(),F(!0),window.addEventListener(`beforeunload`,e=>{(E.monitor||E.equipes.length>0)&&!T&&(e.preventDefault(),e.returnValue=``)})}function A(){let e=Math.round(w/(C-1)*100);document.getElementById(`progressBar`).style.width=`${e}%`,document.getElementById(`progressPct`).textContent=`${e}%`}function j(){let e=document.getElementById(`controlsLeft`),t=document.getElementById(`controlsRight`);e.innerHTML=``,t.innerHTML=``,e.appendChild(h({text:`Limpar`,variant:`secondary`,id:`btnReset`,icon:`<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path stroke-linecap="round" stroke-linejoin="round" d="M3 3v5h5"/></svg>`,onClick:K})),w>0&&e.appendChild(h({text:`Voltar`,variant:`secondary`,icon:`<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>`,onClick:()=>P()}));let n=i(w,E);w===C-1?(t.appendChild(h({text:`Enviar Teste`,variant:`test`,id:`btnTest`,disabled:!n,icon:`<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>`,onClick:W})),t.appendChild(h({text:`Enviar Daily`,variant:`primary`,id:`btnSubmit`,disabled:!n,icon:`<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,onClick:G}))):t.appendChild(h({text:`Continuar`,variant:`primary`,id:`btnNext`,disabled:!n,icon:`<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>`,onClick:()=>N()}))}function M(){let e=i(w,E),n=document.getElementById(`btnNext`),r=document.getElementById(`btnTest`),a=document.getElementById(`btnSubmit`);n&&(n.disabled=!e),r&&(r.disabled=!e),a&&(a.disabled=!e),t(E)}function N(){if(w<C-1&&i(w,E)){let e=document.getElementById(`stepInner`);e?(e.classList.remove(`enter-backward`,`active`),e.classList.add(`exit`),setTimeout(()=>{w++,F(!0,!1)},300)):(w++,F(!0,!1))}}function P(){if(w>0){let e=document.getElementById(`stepInner`);e?(e.classList.remove(`exit`,`active`),e.classList.add(`exit-backward`),setTimeout(()=>{w--,F(!1,!0)},300)):(w--,F(!1,!0))}}async function F(e=!0,t=!1){let n=document.getElementById(`stepQuestion`),r=document.getElementById(`stepSubtext`),i=document.getElementById(`stepContent`);r.textContent=O[w],e?(n.innerHTML=``,a(n,D[w],30)):n.textContent=D[w],A(),j();let o=document.createElement(`div`);switch(o.className=`step-container ${t?`enter-backward`:`active`}`,o.id=`stepInner`,w){case 0:I(o);break;case 1:L(o);break;case 2:R(o);break;case 3:z(o);break;case 4:B(o);break;case 5:V(o);break;case 6:H(o);break}i.innerHTML=``,i.appendChild(o);let s=o.querySelector(`input:not([type="hidden"]):not([type="radio"]):not([type="checkbox"])`);s&&!s.value&&setTimeout(()=>s.focus(),500)}function I(e){e.innerHTML=`
    <div class="grid-1" style="max-width: 400px; margin: 0 auto;">
      <div class="field">
        <label>Data de Referência</label>
        <input type="date" id="inputData" value="${E.data}">
      </div>
      <div class="field" style="margin-top: 16px;">
        <label>Selecione seu perfil</label>
        <div id="monitoresList" class="grid-1"></div>
      </div>
    </div>
  `,e.querySelector(`#inputData`).addEventListener(`change`,e=>{E.data=e.target.value,M()});let t=e.querySelector(`#monitoresList`);o.forEach(n=>{let r=p({title:n.value,desc:n.email,value:n.value,isSelected:E.monitor===n.value,onClick:t=>{E.monitor=t,E.emailMonitor=n.email,I(e),M(),setTimeout(()=>N(),200)}});t.appendChild(r)})}function L(e){e.innerHTML=`
    <div class="grid-2">
      <div class="field">
        <label>Equipe (Múltipla escolha)</label>
        <div id="equipesList" class="grid-1"></div>
      </div>
      <div class="field">
        <label>E-mail Alternativo (Opcional)</label>
        <div class="option-card ${E.hasGerente?`selected`:``}" id="toggleGerente" style="margin-bottom: 16px;">
          <div class="option-card-icon"><svg width="12" height="9" fill="none" viewBox="0 0 11 9"><polyline points="1 4.5 4 7.5 10 1"/></svg></div>
          <div class="option-card-content"><div class="option-card-title" style="font-size:14px">Enviar para outro gerente?</div></div>
        </div>
        <div id="gerenteInputWrap" style="display: ${E.hasGerente?`block`:`none`}; animation: slideDown 0.3s ease;">
          <input type="email" id="inputGerente" placeholder="Digite o e-mail" value="${E.emailGerente}">
        </div>
      </div>
    </div>
  `;let t=e.querySelector(`#equipesList`);s.forEach(n=>{let r=E.equipes.includes(n.value),i=p({title:n.value,value:n.value,isSelected:r,onClick:t=>{E.equipes.includes(t)?E.equipes=E.equipes.filter(e=>e!==t):E.equipes.push(t),L(e),M()}});t.appendChild(i)}),e.querySelector(`#toggleGerente`).addEventListener(`click`,()=>{E.hasGerente=!E.hasGerente,E.hasGerente||(E.emailGerente=``),L(e),M()});let n=e.querySelector(`#inputGerente`);n&&n.addEventListener(`input`,e=>{E.emailGerente=e.target.value,M()})}function R(e){e.innerHTML=`
    <div class="grid-2" style="max-width: 600px; margin: 0 auto;">
      <div class="field mono">
        <label>Meta Monitoria Dia</label>
        <input type="number" id="metaMon" placeholder="Ex: 20" min="0" value="${E.indicadores.metaMonitoriaDia}">
      </div>
      <div class="field mono">
        <label>Monitorias Feitas Dia</label>
        <input type="number" id="feitasMon" placeholder="Ex: 18" min="0" value="${E.indicadores.feitasMonitoriaDia}">
      </div>
    </div>
  `,[`metaMon`,`feitasMon`].forEach(t=>{e.querySelector(`#${t}`).addEventListener(`input`,e=>{E.indicadores[t===`metaMon`?`metaMonitoriaDia`:`feitasMonitoriaDia`]=e.target.value,M()})})}function z(e){let t=document.createElement(`div`);t.className=`grid-1`,t.style.maxWidth=`600px`,t.style.margin=`0 auto`,c.forEach(n=>{let r=E.auditorias[n.key+`_ativo`]===`Sim`,i=`
      <div class="grid-2">
        <div class="field mono"><label>Meta Dia</label><input type="number" data-key="${n.key}_meta" value="${E.auditorias[n.key+`_meta`]||``}" placeholder="0" min="0"></div>
        <div class="field mono"><label>Feitas Dia</label><input type="number" data-key="${n.key}_feitas" value="${E.auditorias[n.key+`_feitas`]||``}" placeholder="0" min="0"></div>
      </div>
    `,a=m({id:n.key,color:n.color,title:n.label,isExpanded:r,fieldsHTML:i,onToggle:t=>{E.auditorias[n.key+`_ativo`]=t?`Sim`:`Nao`,t||(E.auditorias[n.key+`_meta`]=``,E.auditorias[n.key+`_feitas`]=``),z(e),M()}});a.querySelectorAll(`input`).forEach(e=>{e.addEventListener(`input`,e=>{E.auditorias[e.target.dataset.key]=e.target.value,M()})}),t.appendChild(a)}),e.innerHTML=``,e.appendChild(t)}function B(e){e.innerHTML=`
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
  `;let t=e.querySelector(`#qualList`);l.forEach(n=>{let r=E.diagnostico[n.key]===`Sim`;t.appendChild(p({title:n.label,value:n.key,isSelected:r,onClick:t=>{E.diagnostico[t]=E.diagnostico[t]===`Sim`?`Nao`:`Sim`,B(e),M()}}))});let n=e.querySelector(`#quantList`);u.forEach(t=>{let r=E.diagnostico[t.key]===`Sim`;n.appendChild(p({title:t.label,value:t.key,isSelected:r,onClick:t=>{E.diagnostico[t]=E.diagnostico[t]===`Sim`?`Nao`:`Sim`,B(e),M()}}))})}function V(e){let t=document.createElement(`div`);t.className=`grid-1`,t.style.maxWidth=`760px`,t.style.margin=`0 auto`,d.forEach(n=>{let r=E.planos[n.key+`_ativo`]===`Sim`,i=`
      <div class="grid-3" style="align-items: start;">
        <div class="field"><label>Detalhe da Ação</label><textarea data-key="${n.key}_detalhe" placeholder="O que será feito...">${E.planos[n.key+`_detalhe`]||``}</textarea></div>
        <div class="field"><label>Resultado Esperado</label><input type="text" data-key="${n.key}_resultado" value="${E.planos[n.key+`_resultado`]||``}" placeholder="+15% conv."></div>
        <div class="field"><label>Prazo</label><input type="date" data-key="${n.key}_prazo" value="${E.planos[n.key+`_prazo`]||``}"></div>
      </div>
    `,a=m({id:n.key,color:n.color,title:n.label,isExpanded:r,fieldsHTML:i,onToggle:t=>{E.planos[n.key+`_ativo`]=t?`Sim`:`Nao`,t||(E.planos[n.key+`_detalhe`]=``,E.planos[n.key+`_resultado`]=``,E.planos[n.key+`_prazo`]=``),V(e),M()}});a.querySelectorAll(`input, textarea`).forEach(e=>{e.addEventListener(`input`,e=>{E.planos[e.target.dataset.key]=e.target.value,M()})}),t.appendChild(a)}),e.innerHTML=``,e.appendChild(t)}function H(e){e.innerHTML=`
    <div class="farol-grid" id="farolGrid"></div>
    <div class="field" style="margin-top: 32px; max-width: 600px; margin-left: auto; margin-right: auto;">
      <label>Observações Adicionais (Opcional)</label>
      <textarea id="farolObs" placeholder="Explique resumidamente o contexto da operação hoje...">${E.farolObs}</textarea>
    </div>
  `;let n=e.querySelector(`#farolGrid`);f.forEach(t=>{let r=E.farol===t.value,i=document.createElement(`div`);i.className=`farol-label farol-option ${t.colorClass} ${r?`selected`:``}`,i.innerHTML=`
      <div class="farol-circle" style="background: var(--${t.colorClass})"></div>
      <div class="farol-name" style="color: var(--${t.colorClass})">${t.label}</div>
      <div class="farol-desc">${t.desc}</div>
    `,i.addEventListener(`click`,()=>{E.farol=t.value,H(e),M()}),n.appendChild(i)}),e.querySelector(`#farolObs`).addEventListener(`input`,e=>{E.farolObs=e.target.value,t(E)})}async function U(e=!1,t=!1){if(T)return;T=!0;let n=b(E,e);t&&(n.forcarEnvio=!0);let i=`daily_qualidade_${n.supervisor}_${n.data}`;if(!t&&!e&&localStorage.getItem(i)){T=!1,v({id:`modalDup`,icon:`<svg width="40" height="40" fill="none" stroke="var(--amber)" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,title:`Você já enviou um Daily hoje`,sub:`Deseja enviar novamente mesmo assim?`,onConfirm:()=>{document.getElementById(`modalDup`).classList.remove(`active`),U(!1,!0)}}).classList.add(`active`);return}_(!0,e?`Enviando teste...`:`Enviando Daily de Qualidade...`,e?`Validando envio para e-mails de teste`:`Gravando na planilha e disparando e-mails`);let a=await S(n);if(a.sucesso){if(a.duplicado&&!t){_(!1),T=!1,v({id:`modalDup`,icon:`<svg width="40" height="40" fill="none" stroke="var(--amber)" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,title:`Você já enviou um Daily hoje (Detectado pelo servidor)`,sub:`Deseja enviar novamente mesmo assim?`,onConfirm:()=>{document.getElementById(`modalDup`).classList.remove(`active`),U(!1,!0)}}).classList.add(`active`);return}e||(r(),localStorage.setItem(i,Date.now())),g(e?`✅ Teste enviado!`:`✅ Daily enviada com sucesso!`),_(!1),setTimeout(()=>location.reload(),2e3)}else g(`❌ Erro ao enviar. Tente novamente.`,!0),_(!1),T=!1}function W(){v({id:`modalTest`,icon:`<svg width="40" height="40" fill="none" stroke="var(--finx-yellow)" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 0 0-1.022-.547l-2.387-.477a6 6 0 0 0-3.86.517l-.318.158a6 6 0 0 1-3.86.517L6.05 15.21a2 2 0 0 0-1.806.547M8 4h8l-1 1v5.172a2 2 0 0 0 .586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 0 0 9 10.172V5L8 4z"/></svg>`,title:`Envio de Teste`,sub:`O e-mail será enviado para os endereços de teste e a planilha NÃO será alterada.`,contentHTML:`
      <div class="field" style="margin-bottom: 16px;">
        <label style="text-align: center;">Senha de confirmação</label>
        <input type="password" id="inputSenhaTeste" placeholder="••••" style="text-align: center; font-size: 20px; letter-spacing: 0.2em;" autocomplete="off">
        <div id="erroSenhaTeste" style="color: var(--red); font-size: 13px; text-align: center; min-height: 20px; margin-top: 8px;"></div>
      </div>
    `,confirmText:`Enviar Teste`,confirmColor:`test`,onConfirm:()=>{if(document.getElementById(`inputSenhaTeste`).value!==`1234`){let e=document.getElementById(`inputSenhaTeste`);document.getElementById(`erroSenhaTeste`).textContent=`Senha incorreta. Tente novamente.`,e.style.borderColor=`var(--red)`,setTimeout(()=>e.style.borderColor=``,1e3)}else document.getElementById(`modalTest`).classList.remove(`active`),U(!0)}}).classList.add(`active`),setTimeout(()=>document.getElementById(`inputSenhaTeste`)?.focus(),150)}function G(){U(!1)}function K(){v({id:`modalReset`,icon:`<svg width="40" height="40" fill="none" stroke="var(--red)" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16"/></svg>`,title:`Limpar Formulário`,sub:`Tem certeza que deseja apagar todos os dados preenchidos?`,confirmText:`Sim, limpar`,confirmColor:`red`,onConfirm:()=>{r(),location.reload()}}).classList.add(`active`)}document.addEventListener(`DOMContentLoaded`,k);