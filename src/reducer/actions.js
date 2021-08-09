import ActionTypes from "./actionTypes";

export const addNode = (parentId) => {
  return {
    type: ActionTypes.ADD_NODE,
    payload: { parentId },
  };
};

export const getData = () => {
  return {
    type: ActionTypes.LOAD_DATA,
  };
};

export const deleteNode = (nodeId, parentId) => {
  return {
    type: ActionTypes.DELETE_NODE,
    payload: { nodeId, parentId },
  };
};

export const moveNodeBack = (nodeId, parentId) => {
  return {
    type: ActionTypes.MOVE_NODE_BACK,
    payload: { nodeId, parentId },
  };
};

export const moveNodeForward = (nodeId, parentId) => {
  return {
    type: ActionTypes.MOVE_NODE_FORWARD,
    payload: { nodeId, parentId },
  };
};

export const updateNodeTitle = (nodeId, title) => {
  console.log(nodeId, title);
  return {
    type: ActionTypes.UPDATE_NODE_TITLE,
    payload: { nodeId, title },
  };
};
