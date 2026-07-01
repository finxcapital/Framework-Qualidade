import { AUDITORIAS, PLANOS, FAROIS, DIAGNOSTICO_QUALITATIVO, DIAGNOSTICO_QUANTITATIVO } from '../data/constants.js';

export function buildEmailHTML(state) {
  const farolInfo = FAROIS.find(f => f.value === state.farol);
  const farolColor = { verde:'#22c55e', amarelo:'#f59e0b', vermelho:'#ef4444' };
  const fc = farolInfo ? farolColor[state.farol] : '#6b7280';
  const fl = farolInfo ? `${farolInfo.label} - ${farolInfo.desc.split(' - ')[0]}` : 'Não informado';

  const diagQualiRows = DIAGNOSTICO_QUALITATIVO.map(q => {
    const isSim = state.diagnostico[q.key] === 'Sim';
    return `<tr>
      <td width="20" style="padding:10px 0; border-bottom:1px solid #333333;"><div style="width:14px;height:14px;border-radius:4px;background:${isSim?'#ffffff':'#333333'};"></div></td>
      <td style="padding:10px 0; border-bottom:1px solid #333333; font-size:14px; color:${isSim?'#ffffff':'#8c9bba'}">${q.label}</td>
      <td align="right" style="padding:10px 0; border-bottom:1px solid #333333; font-size:13px; font-weight:700; color:${isSim?'#ffffff':'#8c9bba'}">${isSim ? 'Sim' : 'Não'}</td>
    </tr>`;
  }).join('');

  const diagQuantiRows = DIAGNOSTICO_QUANTITATIVO.map(q => {
    const isSim = state.diagnostico[q.key] === 'Sim';
    return `<tr>
      <td width="20" style="padding:10px 0; border-bottom:1px solid #333333;"><div style="width:14px;height:14px;border-radius:4px;background:${isSim?'#ffffff':'#333333'};"></div></td>
      <td style="padding:10px 0; border-bottom:1px solid #333333; font-size:14px; color:${isSim?'#ffffff':'#8c9bba'}">${q.label}</td>
      <td align="right" style="padding:10px 0; border-bottom:1px solid #333333; font-size:13px; font-weight:700; color:${isSim?'#ffffff':'#8c9bba'}">${isSim ? 'Sim' : 'Não'}</td>
    </tr>`;
  }).join('');

  const diagItems = diagQualiRows + diagQuantiRows;

  const audAtivas = AUDITORIAS.filter(a => state.auditorias[a.key + '_ativo'] === 'Sim');
  const audRows = audAtivas.map(a => `
    <tr>
      <td style="padding:12px; border-bottom:1px solid #333333; font-weight:600; color:#ffffff">${a.label}</td>
      <td align="center" style="padding:12px; border-bottom:1px solid #333333; color:#e2e8f0; font-family:monospace">${state.auditorias[a.key+'_meta']||'--'}</td>
      <td align="center" style="padding:12px; border-bottom:1px solid #333333; color:#e2e8f0; font-family:monospace">${state.auditorias[a.key+'_feitas']||'--'}</td>
    </tr>`).join('');

  const planosAtivos = PLANOS.filter(p => state.planos[p.key + '_ativo'] === 'Sim');
  const planosRows = planosAtivos.map(p => `
    <tr>
      <td style="padding:12px; border-bottom:1px solid #333333; font-weight:600; color:#e5e5e5">${p.label}</td>
      <td style="padding:12px; border-bottom:1px solid #333333; color:#e2e8f0">${state.planos[p.key+'_detalhe']||'--'}</td>
      <td style="padding:12px; border-bottom:1px solid #333333; color:#e2e8f0">${state.planos[p.key+'_resultado']||'--'}</td>
      <td style="padding:12px; border-bottom:1px solid #333333; color:#e2e8f0; white-space:nowrap">${state.planos[p.key+'_prazo']||'--'}</td>
    </tr>`).join('');

  const card = (num, title, body) => `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a; border:1px solid #333333; border-radius:16px; margin-bottom:24px;">
      <tr>
        <td style="padding:16px 24px; background:#1a1a1a; border-bottom:1px solid #333333; border-radius:16px 16px 0 0;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td width="36"><span style="font-size:12px;font-weight:700;background:#e5e5e5;color:#1a1a1a;border-radius:6px;padding:3px 10px">${num}</span></td>
            <td><span style="font-size:14px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#ffffff">${title}</span></td>
          </tr></table>
        </td>
      </tr>
      <tr><td style="padding:24px;">${body}</td></tr>
    </table>`;

  const kvTable = pairs => {
    let rows = '';
    for(let i=0; i<pairs.length; i+=2) {
      const [l1, v1] = pairs[i];
      const [l2, v2] = pairs[i+1] || ['',''];
      rows += `<tr>
        <td width="48%" style="padding:14px; background:#1a1a1a; border:1px solid #333333; border-radius:10px;">
          <div style="font-size:11px;color:#8c9bba;text-transform:uppercase;margin-bottom:6px;font-weight:600">${l1}</div>
          <div style="font-size:16px;font-weight:700;color:#ffffff;">${v1||'--'}</div>
        </td>
        <td width="4%"></td>
        ${l2 ? `<td width="48%" style="padding:14px; background:#1a1a1a; border:1px solid #333333; border-radius:10px;">
          <div style="font-size:11px;color:#8c9bba;text-transform:uppercase;margin-bottom:6px;font-weight:600">${l2}</div>
          <div style="font-size:16px;font-weight:700;color:#ffffff;">${v2||'--'}</div>
        </td>` : `<td></td>`}
      </tr>
      <tr><td height="14"></td></tr>`;
    }
    return `<table width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>`;
  };

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="font-family:'Inter', Arial, sans-serif;background:#0a0a0a;color:#ffffff;margin:0;padding:0">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0a0a;"><tr><td align="center" style="padding:40px 15px;">
  <table width="100%" style="max-width:700px;" cellpadding="0" cellspacing="0" border="0">
    <tr><td style="padding-bottom:30px; border-bottom:1px solid #333333; text-align:center;">
      <img src="https://github.com/user-attachments/assets/41e98109-418f-40d4-9c27-75a357726e0b" alt="FINX" height="40" style="margin-bottom: 20px;">
      <div style="font-size:12px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#e5e5e5;margin-bottom:8px">Daily de Qualidade</div>
      <div style="font-size:24px;font-weight:800;color:#ffffff">Framework do Monitor</div>
      <div style="font-size:14px;color:#8c9bba;margin-top:8px">${state.monitor} &nbsp;·&nbsp; ${state.equipes.join(', ')} &nbsp;·&nbsp; ${state.data}</div>
    </td></tr>
    <tr><td height="30"></td></tr>
    <tr><td>
      ${card('01','Indicadores do Dia', kvTable([
        ['Meta Monitoria Closer Dia', state.indicadores.metaMonitoriaCloserDia], ['Monitorias Closer Feitas Dia', state.indicadores.feitasMonitoriaCloserDia],
        ['Meta Monitoria SDR Dia', state.indicadores.metaMonitoriaSDRDia], ['Monitorias SDR Feitas Dia', state.indicadores.feitasMonitoriaSDRDia],
      ]) + (audRows ? `<div style="margin-top:16px;font-size:12px;font-weight:700;color:#8c9bba;text-transform:uppercase;margin-bottom:8px">Auditorias Realizadas</div>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; background:#1a1a1a; border-radius:10px; overflow:hidden;">
        <thead style="background:#333333"><tr>
          <th style="text-align:left;padding:10px 12px;font-size:11px;color:#8c9bba;">TIPO</th>
          <th style="text-align:center;padding:10px 12px;font-size:11px;color:#8c9bba;">META DIA</th>
          <th style="text-align:center;padding:10px 12px;font-size:11px;color:#8c9bba;">FEITAS DIA</th>
        </tr></thead><tbody>${audRows}</tbody>
      </table>` : ''))}
      
      ${card('02','Diagnóstico', `<table width="100%" cellpadding="0" cellspacing="0">${diagItems}</table>`)}
      
      ${planosRows ? card('03','Plano de Ação', `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; background:#1a1a1a; border-radius:10px; overflow:hidden;">
        <thead style="background:#333333"><tr>
          <th style="text-align:left;padding:10px 12px;font-size:11px;color:#8c9bba;">AÇÃO</th>
          <th style="text-align:left;padding:10px 12px;font-size:11px;color:#8c9bba;">DETALHE</th>
          <th style="text-align:left;padding:10px 12px;font-size:11px;color:#8c9bba;">RESULTADO</th>
          <th style="text-align:left;padding:10px 12px;font-size:11px;color:#8c9bba;">PRAZO</th>
        </tr></thead><tbody>${planosRows}</tbody>
      </table>`) : ''}
      
      ${card('04','Farol de Confiança', `<div style="text-align:center">
        <div style="display:inline-block;padding:14px 28px;border-radius:10px;font-size:16px;font-weight:800;border:2px solid ${fc};color:${fc};background:${fc}15">${fl}</div>
        ${state.farolObs ? `<div style="margin-top:20px;font-size:14px;color:#8c9bba;font-style:italic">"${state.farolObs}"</div>` : ''}
      </div>`)}
    </td></tr>
    <tr><td align="center" style="font-size:12px;color:#4a5b7c;padding:30px 0;">
      Framework Monitor FINX &nbsp;·&nbsp; ${new Date().toLocaleString('pt-BR')}
    </td></tr>
  </table>
</td></tr></table></body></html>`;
}
