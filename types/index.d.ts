type FlatMapFunction = (
	node: import('unist').Node,
	index: number,
	parent?: import('unist').Parent
) => import('unist').Node[];
