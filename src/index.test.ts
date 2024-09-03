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

	const flatMapFunction = (node: import('unist').Node) =>
		node.type === 'leaf' ? [u('leaf', 'Modified')] : [node];

	it('should apply the callback function to each node in the tree', () => {
		const flatMapFunction = vi.fn((node: import('unist').Node) => [node]);

		void flatMap(tree, flatMapFunction);

		expect(flatMapFunction).toHaveBeenCalledTimes(6);
	});

	it('should return the modified tree', () => {
		const result = flatMap(tree, flatMapFunction);

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
		void flatMap(tree, flatMapFunction);

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
