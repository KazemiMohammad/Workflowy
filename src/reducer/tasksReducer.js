import actionTypes from "./actionTypes";
import ActionTypes from "./actionTypes";

const storageKey = "tasks";

export default function tasksReducer(state = loadData(), action) {
  switch (action.type) {
    case ActionTypes.LOAD_DATA:
      return loadData();
    case actionTypes.ADD_NODE:
      return addNode(state, action.payload.parentId);
    case actionTypes.DELETE_NODE:
      return deleteNode(state, action.payload.nodeId, action.payload.parentId);
    case actionTypes.MOVE_NODE_BACK:
      return moveNodeBack(
        state,
        action.payload.nodeId,
        action.payload.parentId
      );
    case actionTypes.MOVE_NODE_FORWARD:
      return moveNodeForward(
        state,
        action.payload.nodeId,
        action.payload.parentId
      );
    case actionTypes.UPDATE_NODE_TITLE:
      return updateNodeTitle(
        state,
        action.payload.nodeId,
        action.payload.title
      );
    default:
      return state;
  }
}

const loadData = () => {
  let jsonTasks = localStorage.getItem(storageKey);
  let tasksData = JSON.parse(jsonTasks);
  return tasksData ? tasksData : [];
};

const setData = (tasksData) => {
  let jsonData = JSON.stringify(tasksData);
  //   localStorage.removeItem(storageKey);
  localStorage.setItem(storageKey, jsonData);
};

const addNode = (tasks, parentId) => {
  let tasksData = JSON.parse(JSON.stringify(tasks));
  let newNode = createNewNode(parentId);

  if (parentId === 0) {
    tasksData.push(newNode);
  } else {
    let parentNode = findById(tasksData, parentId);
    if (parentNode) {
      parentNode.children.push(newNode);
    }
  }
  setData(tasksData);
  return tasksData;
};

const deleteNode = (tasks, nodeId, parentId) => {
  let tasksData = JSON.parse(JSON.stringify(tasks));
  let parentNode = findById(tasksData, parentId);
  
  if (parentId === 0) {
    let nodeIndex = tasksData.findIndex((node) => {
      return node.id === nodeId;
    });
    tasksData.splice(nodeIndex, 1);
  } else if (parentNode) {
    let nodeIndex = parentNode.children.findIndex((node) => {
      return node.id === nodeId;
    });
    parentNode.children.splice(nodeIndex, 1);
  }
  setData(tasksData);
  return tasksData;
};

function createNewNode(parentId) {
  return {
    id: Math.floor(Math.random() * 10000),
    parentId: parentId,
    title: "Untitled ",
    children: [],
  };
}

const moveNodeBack = (tasks, nodeId, parentId) => {
  if (parentId === 0) return;
  let tasksData = JSON.parse(JSON.stringify(tasks));

  let node = findById(tasksData, nodeId);
  let parentNode = findById(tasksData, parentId);

  tasksData = deleteNode(tasks, nodeId, parentId);
  if (parentNode.parentId === 0) {
    node.parentId = 0;
    tasksData.push(node);
  } else {
    let targetNode = findById(tasksData, parentNode.parentId);
    node.parentId = targetNode.id;
    console.log(targetNode);
    targetNode.children.push(node);
  }

  setData(tasksData);
  return tasksData;
};

const moveNodeForward = (tasks, nodeId, parentId) => {
  let tasksData = JSON.parse(JSON.stringify(tasks));

  let node = findById(tasksData, nodeId);
  let parentNode = findById(tasksData, parentId);

  if (node.parentId === 0) {
    if (tasksData.length === 1) return;
    let nodeIndex = tasksData.findIndex((node) => {
      return node.id === nodeId;
    });
    if (nodeIndex === 0) return;
    tasksData.splice(nodeIndex, 1);

    let targetNode = tasksData[nodeIndex - 1];
    node.parentId = targetNode.id;
    targetNode.children.push(node);
  } else if (parentNode.children.length > 1) {
    let nodeIndex = parentNode.children.findIndex((node) => {
      return node.id === nodeId;
    });
    if (nodeIndex === 0) return;

    parentNode.children.splice(nodeIndex, 1);

    let targetNode = parentNode.children[nodeIndex - 1];
    node.parentId = targetNode.id;
    targetNode.children.push(node);
  }

  setData(tasksData);
  return tasksData;
};

const updateNodeTitle = (tasks, nodeId, nodeTitle) => {
  if (!nodeId) return;

  let node = findById(tasks, nodeId);
  if (node) {
    node.title = nodeTitle;
  }
  console.log(tasks);
  setData(tasks);
  return tasks;
};

function findById(obj, id) {
  var result;
  for (var p in obj) {
    if (obj.id === id) {
      return obj;
    } else {
      if (typeof obj[p] === "object") {
        result = findById(obj[p], id);
        if (result) {
          return result;
        }
      }
    }
  }
  return result;
}
