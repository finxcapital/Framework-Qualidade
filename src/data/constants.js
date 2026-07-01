export const MONITORES = [
  { value: 'Alexandre Silva', email: 'alexandre.silva@finxcapital.com.br' },
  { value: 'Lilian Martins', email: 'lilian.martins@finxcapital.com.br' },
  { value: 'Lucca Moraes', email: 'lucca.moraes@finxcapital.com.br' }
];

export const EQUIPES = [
  { value: 'Movida' },
  { value: 'Condicional' },
  { value: 'Localiza' },
  { value: 'SDR' }
];

export const AUDITORIAS = [
  { key: 'audRotina',     label: 'Auditoria de Rotina',     color: '#ffffff' },
  { key: 'audVendas',     label: 'Auditoria de Vendas',     color: '#cccccc' },
  { key: 'audPerdidos',   label: 'Auditoria de Perdidos',   color: '#999999' },
  { key: 'audEstorno',    label: 'Auditoria de Estorno',    color: '#666666' },
  { key: 'audDocumentos', label: 'Auditoria de Documentos', color: '#444444' }
];

export const DIAGNOSTICO_QUALITATIVO = [
  { key: 'diagQualScript',    label: 'Aderência ao Script/Processo' },
  { key: 'diagQualVendas',    label: 'Técnica de Vendas/Argumentação' },
  { key: 'diagQualRegistros', label: 'Qualidade dos Registros (CRM)' },
  { key: 'diagQualCadencia',  label: 'Processo de Cadência de Ligação' },
  { key: 'diagQualRotina',    label: 'Rotina de Trabalho' }
];

export const DIAGNOSTICO_QUANTITATIVO = [
  { key: 'diagQuantEsforco',  label: 'Eficiência - Esforço (Contatos)' },
  { key: 'diagQuantMassa',    label: 'Massa Crítica - Negócios (Leads)' }
];

export const PLANOS = [
  { key: 'treinRelampago', label: 'Treinamento Relâmpago', color: '#ffffff' },
  { key: 'planoMonitoria', label: 'Monitoria',             color: '#cccccc' },
  { key: 'planoFeedback',  label: 'Feedback',              color: '#aaaaaa' },
  { key: 'planoAuditoria', label: 'Auditoria',             color: '#888888' },
  { key: 'planoAnalise',   label: 'Análise',               color: '#666666' },
  { key: 'planoOutro',     label: 'Outro',                 color: '#444444' },
];

export const FAROIS = [
  { 
    value: 'verde', 
    label: 'Verde', 
    desc: 'Provável - superaremos a meta operacional.',
    colorClass: 'verde'
  },
  { 
    value: 'amarelo', 
    label: 'Amarelo', 
    desc: 'Possível - há caminho, mas cenário é incerto.',
    colorClass: 'amarelo'
  },
  { 
    value: 'vermelho', 
    label: 'Vermelho', 
    desc: 'Impossível - sem chances tangíveis de bater a meta.',
    colorClass: 'vermelho'
  }
];
