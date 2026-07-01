const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbxn093zHAIEtTq6eAV57ujN_X1r7BR-CmDUua3RG008R0HKmHrH4ohmE2Ufu4AhFGR77A/exec';

export async function enviarDaily(payload) {
  try {
    let responseData = null;
    try {
      const resp = await fetch(BACKEND_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'text/plain' },
        body:    JSON.stringify(payload),
      });
      const text = await resp.text();
      try { responseData = JSON.parse(text); } catch(_) {}
    } catch (_corsErr) {
      await fetch(BACKEND_URL, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body:    JSON.stringify(payload),
      });
    }

    // Aguarda um pouco por conta da latência do Google Apps Script
    await new Promise(r => setTimeout(r, 2200));

    return { sucesso: true, duplicado: responseData?.codigo === 'duplicado' };
  } catch (err) {
    console.error('Erro no envio:', err);
    return { sucesso: false, erro: err };
  }
}
