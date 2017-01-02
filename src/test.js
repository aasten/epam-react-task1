// jshint esversion: 6
import createConverter from './meas-units-converter.js';

try {

console.log(createConverter({'from': 'cm', 'to': 'mm'}).convert(10));
// '' is an inch
console.log(createConverter({'from': "''", 'to': 'mm'}).convert('10'));
// nmi - nautical mile international
console.log(createConverter({'from': 'nmi', 'to': 'km'}).convert([10,20]));

} catch(e) {
  console.log(e);
}
