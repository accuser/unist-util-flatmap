import { u } from 'unist-builder';
import { describe, expect, it, vi } from 'vitest';
import flatMap from './index.js';

describe('flatMap', () => {
	const tree = u('tree', [
		u('leaf', 'leaf 1'),
		u('node', [u('leaf', 'leaf 2')]),
		u('void'),
		u('leaf', 'leaf 3')
	]);

	const fn = vi.fn((node: import('unist').Node) => [
		node.type === 'leaf' ? u('leaf', 'Modified') : node
	]);

	it('should apply the callback function to each node in the tree', () => {
		void flatMap(tree, fn);

		expect(fn).toHaveBeenCalledTimes(6);
	});

	it('should return the modified tree', () => {
		const result = flatMap(tree, fn);

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
		void flatMap(tree, fn);

		expect(tree).toEqual(
			u('tree', [
				u('leaf', 'leaf 1'),
				u('node', [u('leaf', 'leaf 2')]),
				u('void'),
				u('leaf', 'leaf 3')
			])
		);
	});

	it('should return a new tree deeply structually equal to the original', () => {
		const isParent = (node: import('unist').Node): node is import('unist').Parent =>
			'children' in node && Array.isArray(node.children);

		const deepStructualEquality = (a: import('unist').Node, b: import('unist').Node) => {
			expect(a).not.toBe(b);
			expect(a).toEqual(b);

			if (isParent(a) && isParent(b)) {
				expect(a.children).not.toBe(b.children);
				expect(a.children).toEqual(b.children);

				a.children.forEach((child, i) => deepStructualEquality(child, b.children[i]));
			} else if (isParent(a) || isParent(b)) {
				throw new Error('Nodes are not of the same type');
			}
		};

		const result = flatMap(tree, (node) => [node]);

		expect(() => deepStructualEquality(result, tree)).not.toThrow();
	});
});
