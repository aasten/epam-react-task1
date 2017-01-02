/*jshint esversion: 6 */

/**
Immutable object for non-SI dimension units.
Contains mapped non-system units to theirs values in main dimension unit (e.g.,
'inch' is mapped to number 0.0258 which means value in meters as a main dimension
unit of length) which are in turn mapped to the dimenstion category name (Base
unit name).
*/
class NonSystemUnits {
  constructor() {
    this._nonSystemUnits = new Map();
    this._nonSystemUnits.set('L', new Map(
    [
      ['inch',0.0254],
      ['\'\'',0.0254],
      ['angstrem',1e-10],
      // nautical mile international
      ['NM',1852],
      // nautical mile international
      ['nmi',1852],
    ]));
    // readonly methods
    this.getMappedUnits = function() { return this._nonSystemUnits; };
    this.listCategory = function(category){ return this._nonSystemUnits.get(category);};
    this.getUnitFromCategory  = function(category,unitName){
      return this._nonSystemUnits.get(category).get(unitName);};
    Object.freeze(this);
  }
}

const nonSystemUnits = new NonSystemUnits();
export default nonSystemUnits;
