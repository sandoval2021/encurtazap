export async function copyToClipboard(text) {
  if (!text) {
    throw new Error('Não existe conteúdo para copiar.');
  }

  if (
    typeof navigator !== 'undefined' &&
    navigator.clipboard &&
    window.isSecureContext
  ) {
    await navigator.clipboard.writeText(text);
    return;
  }

  if (typeof document === 'undefined') {
    throw new Error('Área de transferência indisponível.');
  }

  const textarea = document.createElement('textarea');

  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';

  document.body.appendChild(textarea);

  textarea.select();
  textarea.setSelectionRange(
    0,
    textarea.value.length,
  );

  const copied = document.execCommand('copy');

  textarea.remove();

  if (!copied) {
    throw new Error(
      'Não foi possível copiar automaticamente.',
    );
  }
}
