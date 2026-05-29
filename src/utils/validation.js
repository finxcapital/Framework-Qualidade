export function validateStep(stepIndex, formState) {
  switch (stepIndex) {
    case 0: // Tela 1: Data e Monitor
      return !!(formState.data && formState.monitor);
    
    case 1: // Tela 2: Equipe
      if (formState.equipes.length === 0) return false;
      // Se tiver gerente alternativo ativado, o e-mail não deve estar vazio se a checkbox estiver marcada (verificado via UI state)
      return true;

    case 2: // Tela 3: Indicadores do Dia
      // Se preencher a meta, deve preencher as feitas e vice versa (recomendado)
      return true;

    default:
      // Outras telas são opcionais (auditorias, diagnósticos, planos)
      // O farol na última etapa será validado antes de enviar se quisermos obrigar.
      // O formulário original não obrigava farol.
      return true;
  }
}
