/*jshint esversion: 6 */
/**
Immutable object for non-SI dimension units.
Contains mapped non-system units to theirs values in main dimension unit (e.g.,
'inch' is mapped to number 0.0258 which means value in meters as a main dimension
unit of length) which are in turn mapped to the dimenstion category name (Base
unit name).
*/
export default class NonSystemUnits {
  constructor() {
    this._nonSystemUnits = new Map();
    this._nonSystemUnits.set('metric', new Map(
    [
      ['inch',0.0254],
      ['\'\'',0.0254],
      ['angstrem',1e-10],
      // nautical mile international
      ['NM',1852],
      // nautical mile international
      ['nmi',1852],
    ]));
    this._nonSystemUnits.set('L',this._nonSystemUnits.get('metric'));
    // readonly property
    this.listCategory = function(category){ return this._nonSystemUnits.get(category);};
    this.getUnitFromCategory  = function(category,unitName){
      return this._nonSystemUnits.get(category).get(unitName);};
    Object.freeze(this);
  }

  // listCategory(category){ return _nonSystemUnits.get(category);}
  //
  // getUnitFromCategory(category,unitName){
  //   return _nonSystemUnits.get(category).get(unitName);
  // }

  static _mapped(nonSysUnitName,valueRelativeToMainUnit) {
    let ret = new Map();
    ret.set(nonSysUnitName,valueRelativeToMainUnit);
    return ret;
  }
}
