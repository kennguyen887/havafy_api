import Decimal from 'decimal.js';
export const DECIMAL_ROUND_CEIL = 2;

export function addDecimal(numA: number, numB: number): number {
  return new Decimal(numA).add(new Decimal(numB)).toNumber();
}

export function roundDecimal(value: number, rounding: number): number {
  return new Decimal(value)
    .toDecimalPlaces(rounding, Decimal.ROUND_CEIL)
    .toNumber();
}

export function isGreaterOrEqualZero(value: unknown): boolean {
  if (typeof value !== 'number') return false;

  return new Decimal(value).greaterThanOrEqualTo(0);
}

export function isEqual(
  numA: number,
  numB: number,
  rounding: number = DECIMAL_ROUND_CEIL,
): boolean {
  return new Decimal(numA)
    .toDecimalPlaces(rounding, Decimal.ROUND_CEIL)
    .eq(new Decimal(numB).toDecimalPlaces(rounding, Decimal.ROUND_CEIL));
}
