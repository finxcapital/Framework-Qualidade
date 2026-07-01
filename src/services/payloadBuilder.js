import { buildEmailHTML } from './emailBuilder.js';
import { AUDITORIAS, PLANOS, DIAGNOSTICO_QUALITATIVO, DIAGNOSTICO_QUANTITATIVO } from '../data/constants.js';

export function montarPayload(state, isTeste) {
  const emailHTML = buildEmailHTML(state);

  const sheetRow = [
    state.data, 
    state.monitor, 
    state.equipes.join(', '),
    state.indicadores.metaMonitoriaCloserDia, 
    state.indicadores.feitasMonitoriaCloserDia,
    state.indicadores.metaMonitoriaSDRDia, 
    state.indicadores.feitasMonitoriaSDRDia,
    ...AUDITORIAS.flatMap(a => [
      state.auditorias[a.key+'_meta'] || '', 
      state.auditorias[a.key+'_feitas'] || ''
    ]),
    ...DIAGNOSTICO_QUALITATIVO.map(q => state.diagnostico[q.key] || 'Nao'),
    ...DIAGNOSTICO_QUANTITATIVO.map(q => state.diagnostico[q.key] || 'Nao'),
    ...PLANOS.flatMap(p => [
      state.planos[p.key+'_detalhe'] || '', 
      state.planos[p.key+'_resultado'] || '', 
      state.planos[p.key+'_prazo'] || ''
    ]),
    state.farol || '', 
    state.farolObs || '',
  ];

  return {
    sheetRow,
    emailHTML,
    emailSupervisor: state.emailMonitor,
    emailGerente:    state.emailGerente,
    supervisor:      state.monitor,
    data:            state.data,
    isTeste:         isTeste || false,
  };
}
