type Indexed<T = unknown> = {
  [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (Object.prototype.hasOwnProperty.call(rhs, p)) {
      try {
        if (typeof rhs[p] === "object") {
          rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
        } else {
          lhs[p] = rhs[p];
        }
      } catch (e) {
        lhs[p] = rhs[p];
      }
    }
  }
  return lhs;
}

export default merge;

// merge({a: {b: {a: 2}}, d: 5}, {a: {b: {c: 1}}});
/*
{
	a: {
		b: {
			a: 2,
			c: 1,
		}
	},
	d: 5,
}
*/
