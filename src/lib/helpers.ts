export function gramsToOunces(grams: number): string {
  const ounces = grams / 28.3495;
  return ounces.toFixed(2);
}

export function squareInchesToSquareCentimeters(squareInches: number): number {
  const squareCentimeters = squareInches * 6.4516;
  return squareCentimeters;
}
