/*jshint esversion: 6 */

/**
Function decoding prefixes for the dimension units.
@param {string} prefixedUnit entirely unit name, e.g., 'km', 'mA', 'MW'
@param {string} ownUnit base unit name, e.g., 'm', 'A', 'W'
@returns numeric representation of prefixed unit relative to the own unit, e.g.,
for own unit 'W' (watt) prefixed unit 'kW' should be 1000;
*/
export default function decodePrefix(prefixedUnit, ownUnit) {
  // decoding only prefix from prefixed unit, e.g. "km" -> k (kilo, 1000)
  // removing own unit from prefixed one, e.g. ("km", "m") - removing "m" ("k" remains)
  let regex = new RegExp(ownUnit+'$');
  switch(prefixedUnit.replace(regex,'')) {
    case 'k': return 1e3;
    case '': return 1e0;
    case 'd': return 1e-1;
    case 'c': return 1e-2;
    case 'm': return 1e-3;
    default: throw `Unsupported metric unit given: ${prefixedUnit}`;
  }
}
