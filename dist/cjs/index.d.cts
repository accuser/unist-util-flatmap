import type { Node, Parent } from 'unist';
type FlatMapFunction = (node: Node, index: number, parent?: Parent) => import('unist').Node[];
/**
 * Create a new tree by mapping over all nodes and flattening the result without mutating the original tree.
 *
 * @param {Node} tree - Tree to flat map.
 * @param {FlatMapFunction} flatMapFunction - Function called with a node, its index, and its parent to produce new
 *   node(s).
 * @returns {Node} - New flat mapped tree.
 */
declare const _default: (tree: Node, flatMapFunction: FlatMapFunction) => Node;
export default _default;
