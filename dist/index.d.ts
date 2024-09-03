import type { Node } from 'unist';
/**
 * Create a new tree by flat mapping all nodes with the given function.
 *
 * @param {Node} tree - Tree to flat map.
 * @param {FlatMapFunction} flatMapFunction - Function called with a node, its index, and its parent to produce new
 *   node(s).
 * @returns {Node} - New flat mapped tree.
 */
declare const _default: (tree: Node, flatMapFunction: FlatMapFunction) => Node;
export default _default;
