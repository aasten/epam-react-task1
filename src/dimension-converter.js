/*jshint esversion: 6 */
import sysUnits from './si-units.js';
import decodePrefix from './decode-prefix.js';
import nonSystem from './non-system.js';

/**
@returns value of from in base units
@throws {string} if specified unitName or dimensionCategory cannot be processed.
*/
function baseUnitsValueOf(dimensionCategory,unitName) {
  try {
    // try as system unit which may be prefixed
    return decodePrefix(unitName,sysUnits.get(dimensionCategory));
  } catch (e) {
    // try non-system unit
    try {
      return nonSystem.getUnitFromCategory(dimensionCategory,unitName);
    } catch(e) {
      throw `Given unsupported unit name \'${unitName}\' for the given dimension
        category \'${dimensionCategory}\'`;
    }
  }
}

/**
Base class for all dimensions storing coefficient of recalculation from unit
to unit and delivers one method of converting.
*/
export default class DimensionConverter {

  constructor(dimensionCategory,from,to) {
    this.coefficient = baseUnitsValueOf(dimensionCategory,from) /
      baseUnitsValueOf(dimensionCategory,to);
  }

  convert(value) {
    if(typeof value === 'number') {
      return this._convertNumber(value);
    } else if(typeof value === 'string') {
      return this._convertString(value);
    } else if(value instanceof Object) {
      if(Array.isArray(value)) {
        return this._convertArray(value);
      }
    }
    // otherwise throwing an exception
    throw `Cannot convert ${value} which is neither string nor number nor array`;
  }

  _convertNumber(num) {
    return num * this.coefficient;
  }

  _convertString(str) {
    return String(this._convertNumber(parseInt(str)));
  }

  _convertArray(array) {
    return array.map(this.convert,this);
  }

}
