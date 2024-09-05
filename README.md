# unist-util-flatmap

[![npm version](https://badge.fury.io/js/%40accuser%2Fmdast-util-flatmap.svg)](https://badge.fury.io/js/%40accuser%2Fmdast-util-flatmap)

Create a new [unist](https://github.com/syntax-tree/unist) tree by mapping over all nodes and flattening the result *without* mutating the original tree.

## Installation

```bash
npm install @accuser/unist-util-flatmap
```

## Usage

```javascript
import flatmap from '@accuser/unist-util-flatmap';

const tree = {
  type: 'root',
  children: [
	{
	  type: 'paragraph',
	  children: [
		{ type: 'text', value: 'Hello, World!' },
	  ]
	}
  ]
};

const result = flatmap(tree, (node) => {
  if (node.type === 'text') {
	return [
	  { type: 'text', value: node.value.toUpperCase() }
	];
  }

  return [node];
});

console.log(result);
```

Output:

```javascript
{ type: 'root',	children: [{ type: 'paragraph',	children: [{ type: 'text', value: 'HELLO, WORLD!' }] }] }
```

## Tests

```bash
npm test
```

## License

[MIT](https://raw.githubusercontent.com/accuser/unist-util-flatmap/main/LICENSE)
