type StringIndexed = Record<string, unknown>;

function queryStringify(data: StringIndexed, prefix = ''): string | never {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Input must be an object');
  }

  const result = Object.keys(data)
    .map((key) => {
      const value = data[key];
      const fullKey = prefix ? `${prefix}[${key}]` : key;

      if (Array.isArray(value)) {
        return value
          .map((item, index) =>
            queryStringify({ [index]: item }, fullKey)
          )
          .join('&');
      } else if (typeof value === 'object') {
        return queryStringify(value as StringIndexed, fullKey);
      } else {
        return `${fullKey}=${value}`;
      }
    })
    .join('&');

  return result;
}

export default queryStringify;

const obj: StringIndexed = {
  key: 1,
  key2: 'test',
  key3: false,
  key4: true,
  key5: [1, 2, 3],
  key6: { a: 1 },
  key7: { b: { d: 2 } },
};

const queryString = queryStringify(obj);
console.log(queryString);
