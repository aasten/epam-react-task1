/*jshint esversion: 6 */

/**
Base class for all dimensions storing coefficient of recalculation from unit
to unit and delivers one method of converting.
*/
export default class DimensionConverter {

  constructor(coefficient) {
    this.coefficient = coefficient;
  }

  convert(value) {
    if(value instanceof Object) {
      if(Array.isArray(value)) {
        return _convertArray(value);
      }
    }
  }

  _convertNumber(num) {
    return num * this.coefficient;
  }

  _convertString(str) {
    return String(_convertNumber(parseInt(str)));
  }

  _convertArray(array) {
    return array.map(convert);
  }

}
