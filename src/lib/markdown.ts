import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitiza o HTML (já convertido de Markdown) antes de injetar com
 * dangerouslySetInnerHTML. Mesmo sendo conteúdo de admin, centralizar a
 * sanitização remove o risco latente de XSS se a fonte do conteúdo mudar.
 */
export function renderMarkdown(html: string): string {
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
}
