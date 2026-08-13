import { ApiError } from "../errors/api-error";

export function normalizeMacAddress(value: unknown): string {
  const identifier = String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-F0-9]/g, "");

  if (/^[A-F0-9]{16}$/.test(identifier)) {
    return identifier;
  }

  if (/^[A-F0-9]{12}$/.test(identifier)) {
    return identifier.match(/.{1,2}/g)!.join(":");
  }

  throw new ApiError(
    400,
    "Invalid identifier (12-char MAC or 16-char EUI64 hex)",
  );
}

export function normalizeEui64(value: unknown): string {
  const eui64 = String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-F0-9]/g, "");
  if (!/^[A-F0-9]{16}$/.test(eui64)) {
    throw new ApiError(400, "Invalid EUI-64");
  }
  return eui64;
}
