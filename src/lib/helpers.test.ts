import { describe, expect, it } from 'vitest';
import * as helpers from './helpers';

describe('gaugeToMM', () => {
  it('should return gauge in MM', () => {
    expect(helpers.gaugeToMM('16')).toEqual('1.30mm');
    expect(helpers.gaugeToMM('16L')).toEqual('1.25mm');
    expect(helpers.gaugeToMM('17')).toEqual('1.20mm');
    expect(helpers.gaugeToMM('18')).toEqual('1.15mm');
  });

  it('should return error with invalid string gauge', () => {
    expect(helpers.gaugeToMM('100')).toEqual('unknown');
  });
});

describe('gramsToOunces', () => {
  it('should return proper ounces for given grams', () => {
    expect(helpers.gramsToOunces(2)).toEqual('0.07');
    expect(helpers.gramsToOunces(20)).toEqual('0.71');
    expect(helpers.gramsToOunces(200)).toEqual('7.05');
  });
});

describe('squareInchesToSqaureCentimeters', () => {
  it('should reutrn cm^2 for given in^2', () => {
    expect(helpers.squareInchesToSquareCentimeters(95)).toEqual('612.90');
    expect(helpers.squareInchesToSquareCentimeters(97)).toEqual('625.81');
    expect(helpers.squareInchesToSquareCentimeters(98)).toEqual('632.26');
    expect(helpers.squareInchesToSquareCentimeters(100)).toEqual('645.16');
  });
});
