/* eslint-disable no-irregular-whitespace */
/*
isEmpty(null); // => true
isEmpty(true); // => true
isEmpty(1); // => true
isEmpty([1, 2, 3]); // => false
isEmpty({ 'a': 1 }); // => false
isEmpty('123'); // => false
isEmpty(123); // => true
isEmpty(''); // => true
isEmpty(0); // => true
isEmpty(undefined) // => true
isEmpty(new Map([['1', 'str1'], [1, 'num1'], [true, 'bool1']])) // => false
isEmpty(new Set(['value1', 'value2', 'value3'])) // => false
*/

export function isEmpty(value: unknown): boolean{
  let  empty = true;
  
  switch (typeof value){
    case 'object':
      if(value && Object.keys(value).length !== 0 || value instanceof Map || value instanceof Set) empty = false;
      break;
      
    case 'string':
      empty = !value.length;
      break;
  }
  
  return empty;
}
