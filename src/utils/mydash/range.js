/*
	* range(4); // => [0, 1, 2, 3] 
	* range(-4); // => [0, -1, -2, -3]
	* range(1, 5); // => [1, 2, 3, 4]
	* range(0, 20, 5); // => [0, 5, 10, 15]
	* range(0, -4, -1); // => [0, -1, -2, -3]
	* range(1, 4, 0); // => [1, 1, 1]
	* range(0); // => []
*/

function range(start = 0, end, step=1) {
  if(end === undefined) {
    end = parseInt(start);
    start = 0; 
  }
  
  if(start) start = parseInt(start);
  end = parseInt(end);
  step = parseInt(step);
  
  let numberOfSteps = Math.abs(end) - Math.abs(start);
  numberOfSteps = step ? Math.floor(numberOfSteps / step) : numberOfSteps;
  
  const sign = (end < 0 && step > 0) ? -1 : 1; 
  const arr = [];
  
  for (let i=0; i < numberOfSteps; i++){
    arr.push(start + sign*i*step);
  }
   
  return arr;
}
