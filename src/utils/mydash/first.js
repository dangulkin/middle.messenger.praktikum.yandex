/* eslint-disable @typescript-eslint/no-unused-vars */
// [1, 2, 3, 4] => 4

function first(list) {
  return (Array.isArray(list) && list.length) ? list[0] : undefined;  
}
