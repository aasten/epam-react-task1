/*jshint esversion: 6 */

import DimensionConverter from './dimension-converter.js';
import decodePrefix from './prefix-decoder.js';

export default class LengthConverter extends DimensionConverter {
  constructor(from, to) {
    super('L',from,to);
  }
}
