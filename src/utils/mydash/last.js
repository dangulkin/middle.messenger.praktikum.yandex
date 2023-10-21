/* eslint-disable @typescript-eslint/no-unused-vars */
// [1, 2, 3, 4] => 4

function last(list) {
  return (Array.isArray(list) && list.length) ? list[list.length - 1] : undefined;  
}
