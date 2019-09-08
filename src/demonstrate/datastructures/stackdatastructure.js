const nodeFactory = (next, value) => ({
    next,
    data: { value }
})

const terminalNode = {
    data: {}
};
terminalNode["next"] = terminalNode;

const emptyStack = () => terminalNode;
const push = nodeFactory;
const pop = (stack) => {
    const next = stack.next;

    return {
	value: stack.data,
	remainder: next
    }
}
const isEmpty = (stack) => stack === terminalNode;
const stackToList = (stack) => {
    let pointerNode = stack;
    const result = [];
    while (!isEmpty(pointerNode)) {
	result.push(pointerNode.data);
	pointerNode = pointerNode.next;
    }

    return result;
}
const size = (stack) => {
    let pointerNode = stack;
    let result = 0

    while(!isEmpty(pointerNode)) {
	pointerNode = pointerNode.next;
	result++;
    }
    return result;
}

export {
    emptyStack
    , push
    , pop
    , stackToList
    , isEmpty
    , size
};
