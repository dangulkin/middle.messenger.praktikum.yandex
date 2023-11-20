function trim(str: string, characters?: string): string {
  if (!characters)
    return str.trim();

  const pattern = new RegExp(`^[${characters}]+|[${characters}]+$`, 'g');

  return str.replace(pattern, '');
}

// trim('  abc  '); // => 'abc'
// trim('-_-abc-_-', '_-'); // => 'abc'
// trim('\xA0foo'); // "foo"
// trim('\xA0foo', ' '); // " foo"
// trim('-_-ab c -_-', '_-'); // ab c

// ['  foo  ', '  bar  '].map(value => trim(value)); // => ['foo', 'bar']

export default trim;
