import type { Node, Parent } from 'unist';

type FlatMapFunction = (
	node: import('unist').Node,
	index: number,
	parent?: import('unist').Parent
) => import('unist').Node[];

/**
 * Type guard to check if a node is a {@link Parent} node.
 *
 * @param {Node} node - The node to check.
 * @returns {boolean} - Whether the node is a {@link Parent} node.
 */
const isParent = (node: Node): node is Parent => 'children' in node && Array.isArray(node.children);

/**
 * Create a new tree by mapping over all nodes and flattening the result without mutating the original tree.
 *
 * @param {Node} tree - Tree to flat map.
 * @param {FlatMapFunction} flatMapFunction - Function called with a node, its index, and its parent to produce new
 *   node(s).
 * @returns {Node} - New flat mapped tree.
 */
export default (tree: Node, flatMapFunction: FlatMapFunction): Node => {
	const flatMap: FlatMapFunction = (node, index, parent) =>
		isParent(node)
			? flatMapFunction(
					{
						...node,
						children: node.children.reduce(
							(children, child, index) => [...children, ...flatMap(child, index, node)],
							[] as Node[]
						)
					} as Parent,
					index,
					parent
				)
			: flatMapFunction({ ...node }, index, parent);

	return flatMap(tree, 0)[0];
};
