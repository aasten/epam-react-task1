/*jshint esversion: 6 */

import DimensionConverter from './dimension-converter.js';
import decodePrefix from './prefix-decoder.js';

export default class Metric extends DimensionConverter {
  constructor(from, to) {
    super(decodeUnit(from) / decodeUnit(to));
  }


}
