const SHEET_ID = '1TScHJbfL67Lyb8Z-XYp8nrs5KbbEbTAuIU_lcD7lHSM';
const SHEET_NAME = 'Dailys de Qualidade';
const EMAIL_GERENTE_PADRAO = 'marcos.lourdes@finxcapital.com.br';
const ASSUNTO_EMAIL = 'Daily de Qualidade — ';

const CABECALHOS = [
  'Data', 'Monitor', 'Equipe',
  'Meta Monitoria Closer Dia', 'Monitorias Closer Feitas Dia',
  'Meta Monitoria SDR Dia', 'Monitorias SDR Feitas Dia',
  'Auditoria Rotina (Meta)', 'Auditoria Rotina (Feitas)',
  'Auditoria Vendas (Meta)', 'Auditoria Vendas (Feitas)',
  'Auditoria Perdidos (Meta)', 'Auditoria Perdidos (Feitas)',
  'Auditoria Estorno (Meta)', 'Auditoria Estorno (Feitas)',
  'Auditoria Documentos (Meta)', 'Auditoria Documentos (Feitas)',
  'Diag Qualitativo: Aderência', 'Diag Qualitativo: Técnicas', 'Diag Qualitativo: Registros', 'Diag Qualitativo: Cadência', 'Diag Qualitativo: Rotina',
  'Diag Quantitativo: Esforço', 'Diag Quantitativo: Massa Crítica',
  'Trein. Relâmpago Detalhe', 'Trein. Relâmpago Resultado', 'Trein. Relâmpago Prazo',
  'Monitoria Detalhe', 'Monitoria Resultado', 'Monitoria Prazo',
  'Feedback Detalhe', 'Feedback Resultado', 'Feedback Prazo',
  'Auditoria Detalhe', 'Auditoria Resultado', 'Auditoria Prazo',
  'Análise Detalhe', 'Análise Resultado', 'Análise Prazo',
  'Outro Detalhe', 'Outro Resultado', 'Outro Prazo',
  'Farol', 'Obs. Farol',
  'Timestamp Envio'
];

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var isTeste = payload.isTeste === true;
    const forcarEnvio = payload.forcarEnvio === true;

    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    if (!isTeste && !forcarEnvio) {
      const isDuplicado = verificarDuplicidade(sheet, payload.data, payload.supervisor);
      if (isDuplicado) {
        return resposta(false, 'duplicado', 'Daily já enviado para este supervisor nesta data.');
      }
    }

    if (!isTeste) {
      gravarNaPlanilha(sheet, payload);
    }

    enviarEmails(payload, isTeste);

    return resposta(true, 'ok', isTeste ? 'Teste enviado com sucesso.' : 'Daily gravado e e-mails enviados com sucesso.');
  } catch (err) {
    console.error(err);
    return resposta(false, 'erro', err.message);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'online', ts: new Date().toISOString() }))
    .setMimeType(ContentService.MimeType.JSON);
}

function verificarDuplicidade(sheet, data, monitor) {
  if (sheet.getLastRow() === 0) return false;

  var valores = sheet.getDataRange().getValues();

  for (var i = 1; i < valores.length; i++) {
    var dataRow    = valores[i][0];
    var monitorRow = valores[i][1];

    var dataRowStr = (dataRow instanceof Date)
      ? Utilities.formatDate(dataRow, Session.getScriptTimeZone(), 'yyyy-MM-dd')
      : String(dataRow).trim();

    if (dataRowStr === String(data).trim() && String(monitorRow).trim() === String(monitor).trim()) {
      return true;
    }
  }
  return false;
}

function gravarNaPlanilha(sheet, payload) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(CABECALHOS);
    sheet.getRange(1, 1, 1, CABECALHOS.length)
         .setFontWeight('bold')
         .setBackground('#142141')
         .setFontColor('#FCD02B');
    sheet.setFrozenRows(1);
  }

  var linha = payload.sheetRow || [];
  linha.push(new Date().toLocaleString('pt-BR'));

  sheet.appendRow(linha);
  sheet.autoResizeColumns(1, CABECALHOS.length);
}

function gerarPDF(htmlContent, monitor, data) {
  var nomeArquivo = 'DailyQualidade_' + monitor.replace(/\s+/g, '_') + '_' + data;
  var htmlBlob = Utilities.newBlob(htmlContent, 'text/html', nomeArquivo + '.html');
  var folder = DriveApp.getRootFolder();
  var htmlFile = folder.createFile(htmlBlob);
  var pdfBlob = htmlFile.getAs('application/pdf');
  pdfBlob.setName(nomeArquivo + '.pdf');
  htmlFile.setTrashed(true);
  return pdfBlob;
}

function enviarEmails(payload, isTeste) {
  var monitor     = payload.supervisor  || 'Monitor';
  var data        = payload.data        || '';
  var html        = payload.emailHTML   || '<p>Daily de Qualidade de <strong>' + monitor + '</strong> — ' + data + '</p>';
  var assunto     = ASSUNTO_EMAIL + monitor + ' — ' + data + (isTeste ? ' [TESTE]' : '');

  var emailMonitor  = isTeste ? 'lucca.moraes@finxcapital.com.br' : (payload.emailSupervisor || '');
  var emailGerente  = isTeste ? 'studio@finxcapital.com.br'    : (payload.emailGerente || EMAIL_GERENTE_PADRAO);

  var pdfBlob = null;
  try {
    pdfBlob = gerarPDF(html, monitor, data);
  } catch(err) {
    console.error('Erro ao gerar PDF:', err);
  }

  var optsBase = {
    htmlBody: html,
    name: 'Daily de Qualidade' + (isTeste ? ' [TESTE]' : ''),
  };

  if (pdfBlob) {
    optsBase.attachments = [pdfBlob];
  }

  if (emailMonitor) {
    GmailApp.sendEmail(emailMonitor, assunto, '', optsBase);
  }
  if (emailGerente && emailGerente !== emailMonitor) {
    GmailApp.sendEmail(emailGerente, assunto + (isTeste ? '' : ' [Gerente]'), '', optsBase);
  }
}

function resposta(ok, codigo, mensagem) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: ok, codigo: codigo, mensagem: mensagem }))
    .setMimeType(ContentService.MimeType.JSON);
}