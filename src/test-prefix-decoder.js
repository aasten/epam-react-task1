/*jshint esversion: 6 */
import decodePrefix from './prefix-decoder.js';
import NonSystemUnits from './non-system.js';

console.log(decodePrefix('kamper/sec','amper/sec'));

{
  let testNonSys = new NonSystemUnits();
  console.log(`One inch is ${testNonSys.getUnitFromCategory('L',"''")} meters`);
}
