/*
rangeRight(4); // => [3, 2, 1, 0]
rangeRight(-4); // => [-3, -2, -1, 0]
rangeRight(1, 5); // => [4, 3, 2, 1]
rangeRight(0, 20, 5); // => [15, 10, 5, 0]
rangeRight(1, 4, 0); // => [1, 1, 1]
rangeRight(0); // => []
*/

function rangeRight(start, end, step) {
	return range(start, end, step, true);
}

function range(start = 0, end, step=1, isRight=false) {
  if(end === undefined) {
    end = parseInt(start);
    start = 0; 
  }
  
  if(start) start = parseInt(start);
  end = parseInt(end);
  step = parseInt(step);
  
  let numberOfSteps = Math.abs(end) - Math.abs(start); 
  numberOfSteps = step ? Math.abs(Math.floor(numberOfSteps / step)) : numberOfSteps;
  
  
  const sign = (end < 0 && step > 0) ? -1 : 1; 
  const arr = [];
  let elem;
  
  for (let i=0; i < numberOfSteps; i++){
    elem = start + sign*i*step;
    if(isRight) arr.unshift(elem);
    else arr.push(elem);
  }
   
  return arr;
}
