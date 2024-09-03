"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Type guard to check if a `node` is a parent node.
 *
 * @param {Node} node - The node to check.
 * @returns {boolean} - Whether the node is a `Parent` node.
 */
const isParent = (node) => 'children' in node && Array.isArray(node.children);
/**
 * Create a new tree by flat mapping all nodes with the given function.
 *
 * @param {Node} tree - Tree to flat map.
 * @param {FlatMapFunction} flatMapFunction - Function called with a node, its index, and its parent to produce new
 *   node(s).
 * @returns {Node} - New flat mapped tree.
 */
exports.default = (tree, flatMapFunction) => {
    const flatMap = (node, index, parent) => isParent(node)
        ? flatMapFunction({
            ...node,
            children: node.children.reduce((children, child, index) => [...children, ...flatMap(child, index, node)], [])
        }, index, parent)
        : flatMapFunction({ ...node }, index, parent);
    return flatMap(tree, 0)[0];
};
