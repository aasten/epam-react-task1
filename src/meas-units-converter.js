/*jshint esversion: 6 */
import baseUnits from './si-units.js';
import nonSystemUnits from './non-system.js';
import decodePrefix from './decode-prefix.js';
import LengthConverter from './length-converter.js';

class DimensionConverterFactory {
  static lengthConverter(from, to) {
    return new LengthConverter(from,to);
  }
}

function detectDimensionCategory(unitName) {
  let detectedCategory;
  let found = false;
  baseUnits.forEach(function(baseUnit,dimensionCategory) {
    if(!found) {
      try {
        decodePrefix(unitName,baseUnit);
        detectedCategory = dimensionCategory;
        found = true;
      } catch (e) { // decoding prefix fault
        // skipping error, because of looking for an appropriate category
      }
    }
  });
  if(!found) {
    // looking for in non-system units
    nonSystemUnits.getMappedUnits().forEach(function(nonSysUnitsMappedToValue,dimensionCategory) {
      if(!found) {
        // iterating through non-system units in each dimension category
        nonSysUnitsMappedToValue.forEach(function(value,nonSysUnit) {
          if(!found) {
            if(nonSysUnit == unitName) {
              found = true;
              detectedCategory = dimensionCategory;
            }
          }
        });
      }
    });
  }
  return detectedCategory;
}

export default function createConverter(fromTo) {
  let dimensionCategoryFrom = detectDimensionCategory(fromTo.from);
  if(dimensionCategoryFrom === undefined) {
    throw `Unknown dimension unit found in 'from' field: ${fromTo.from}`;
  }
  let dimensionCategoryTo = detectDimensionCategory(fromTo.to);
  if(dimensionCategoryTo === undefined) {
    throw `Unknown dimension unit found in 'to' field: ${fromTo.to}`;
  }
  if(dimensionCategoryFrom != dimensionCategoryTo) {
    throw `Specification of different dimension categories detected in ${fromTo}`;
  }

  switch(dimensionCategoryTo) {
    case 'L' : return DimensionConverterFactory.lengthConverter(fromTo.from,fromTo.to);
    default: throw `Dimension category ${dimensionCategoryTo} is not supported yet, sorry`;
  }

}
