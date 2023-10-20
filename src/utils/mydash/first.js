// [1, 2, 3, 4] => 4

function first(list) {
  return (Array.isArray(list) && list.length) ? list[0] : undefined;  
}
