"use client";

/** Caixa de consentimento LGPD com link para a Política de Privacidade. */
export function ConsentCheckbox({
  checked,
  onChange,
  dark = true,
  id = "consent",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  dark?: boolean;
  id?: string;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed ${
        dark ? "text-paper/55" : "text-muted"
      }`}
    >
      <input
        id={id}
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-amber"
      />
      <span>
        Concordo em receber conteúdos e li a{" "}
        <a
          href="/privacidade"
          target="_blank"
          rel="noopener noreferrer"
          className={dark ? "text-amber-light hover:underline" : "text-amber-deep hover:underline"}
        >
          Política de Privacidade
        </a>
        .
      </span>
    </label>
  );
}
