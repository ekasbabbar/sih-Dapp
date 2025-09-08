export function isPositiveNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0;
}

export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function isValidAddress(addr) {
  return /^0x[a-fA-F0-9]{40}$/.test(addr || "");
}


