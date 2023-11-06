import merge from './merge';

type Indexed<T = unknown> = {
  [key in string]: T;
};

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be a string');
  }

  if (typeof object !== 'object' || object === null) {
    return object;
  }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as never);
    return merge(object as Indexed, result);
}

export default set;


// console.log(set({ foo: 5 }, 'bar.baz', 10)); // { foo: 5, bar: { baz: 10 } }
// console.log(set(3, 'foo.bar', 'baz')); // 3
