/*jshint esversion: 6 */
import decodePrefix from './decode-prefix.js';
import nonSystemUnits from './non-system.js';

console.log(decodePrefix('kamper/sec','amper/sec'));

{
  console.log(`One inch is ${nonSystemUnits.getUnitFromCategory('L',"''")} meters`);
}
