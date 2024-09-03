import { u } from 'unist-builder';
import { describe, expect, it, vi } from 'vitest';
import flatMap from './index.js';

describe('transform', () => {
	const tree = u('tree', [
		u('leaf', 'leaf 1'),
		u('node', [u('leaf', 'leaf 2')]),
		u('void'),
		u('leaf', 'leaf 3')
	]);

	it('should apply the callback function to each node in the tree', () => {
		const flatMapFunction = vi.fn((node: import('unist').Node) => [node]);

		const result = flatMap(tree, flatMapFunction);

		expect(flatMapFunction).toHaveBeenCalledTimes(6);
	});

	it('should return the modified tree', () => {
		const result = flatMap(tree, (node) =>
			node.type === 'leaf' ? [u('leaf', 'Modified')] : [node]
		);

		expect(result).toEqual(
			u('tree', [
				u('leaf', 'Modified'),
				u('node', [u('leaf', 'Modified')]),
				u('void'),
				u('leaf', 'Modified')
			])
		);
	});

	it('should not mutate the source tree', () => {
		void flatMap(tree, (node) => (node.type === 'leaf' ? [u('leaf', 'Modified')] : [node]));

		expect(tree).toEqual(
			u('tree', [
				u('leaf', 'leaf 1'),
				u('node', [u('leaf', 'leaf 2')]),
				u('void'),
				u('leaf', 'leaf 3')
			])
		);
	});
});
