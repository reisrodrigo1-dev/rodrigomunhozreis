import { describe, it, expect } from "vitest";
import { maskPhone, maskName, isValidPhone } from "./format";
import { slugify, toIsoDate } from "./posts";

describe("maskPhone", () => {
  it("formata celular com 11 dígitos", () => {
    expect(maskPhone("11912345678")).toBe("(11) 91234-5678");
  });
  it("formata fixo com 10 dígitos", () => {
    expect(maskPhone("1123456789")).toBe("(11) 2345-6789");
  });
  it("ignora não-dígitos e limita a 11", () => {
    expect(maskPhone("abc11912345678999")).toBe("(11) 91234-5678");
  });
  it("string vazia vira vazia", () => {
    expect(maskPhone("")).toBe("");
  });
});

describe("maskName", () => {
  it("capitaliza cada palavra", () => {
    expect(maskName("rodrigo munhoz reis")).toBe("Rodrigo Munhoz Reis");
  });
  it("colapsa espaços", () => {
    expect(maskName("ana   paula")).toBe("Ana Paula");
  });
});

describe("isValidPhone", () => {
  it("aceita 10+ dígitos", () => {
    expect(isValidPhone("(11) 2345-6789")).toBe(true);
  });
  it("rejeita menos de 10 dígitos", () => {
    expect(isValidPhone("(11) 9999")).toBe(false);
  });
});

describe("slugify", () => {
  it("remove acentos e usa kebab-case", () => {
    expect(slugify("Olá Mundo Técnico!")).toBe("ola-mundo-tecnico");
  });
  it("colapsa hifens", () => {
    expect(slugify("a -- b")).toBe("a-b");
  });
});

describe("toIsoDate", () => {
  it("converte número (ms) para ISO", () => {
    expect(toIsoDate(0)).toBeUndefined();
    expect(toIsoDate(1717804800000)).toBe(new Date(1717804800000).toISOString());
  });
  it("converte Timestamp do Firestore (toMillis)", () => {
    const ts = { toMillis: () => 1717804800000 };
    expect(toIsoDate(ts)).toBe(new Date(1717804800000).toISOString());
  });
  it("valores vazios viram undefined", () => {
    expect(toIsoDate(null)).toBeUndefined();
    expect(toIsoDate(undefined)).toBeUndefined();
  });
});
