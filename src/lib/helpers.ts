export function gramsToOunces(grams: number): string {
  const ounces = grams / 28.3495;
  return ounces.toFixed(2);
}

export function squareInchesToSquareCentimeters(squareInches: number): string {
  const squareCentimeters = squareInches * 6.4516;
  return squareCentimeters.toFixed(2);
}

export function gaugeToMM(gauge: string): string {
  switch (gauge) {
    case '16':
      return '1.30mm';
    case '16L':
      return '1.25mm';
    case '17':
      return '1.20mm';
    default:
      // 18 gauge
      return '1.15mm';
  }
}
