import { useState, useEffect } from "react";

const storageKey = "tasks";

export default function useTaskData() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    let jsonTasks = localStorage.getItem(storageKey);
    let tasksData = JSON.parse(jsonTasks);
    setTasks(tasksData ? tasksData : []);
  };

  const setData = (tasksData) => {
    let jsonData = JSON.stringify(tasksData);
    localStorage.removeItem(storageKey);
    localStorage.setItem(storageKey, jsonData);
    setTasks(tasksData ? tasksData : []);
  };

  const addNode = (parentId) => {
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
  };

  const deleteNode = (nodeId, parentId) => {
    let tasksData = JSON.parse(JSON.stringify(tasks));
    let parentNode = findById(tasksData, parentId);
    if (parentNode) {
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
      title: "untitle " + Math.floor(Math.random() * 10000),
      children: [],
    };
  }

  const moveNodeBack = (nodeId, parentId) => {
    if (parentId === 0) return;
    let tasksData = JSON.parse(JSON.stringify(tasks));

    let node = findById(tasksData, nodeId);
    let parentNode = findById(tasksData, parentId);

    tasksData = deleteNode(nodeId, parentId);
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
  };

  const moveNodeForward = (nodeId, parentId) => {
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
  };

  const updateNodeTitle = (nodeId, nodeTitle) => {
    if (!nodeId) return;

    let node = findById(tasks, nodeId);
    if (node) {
      node.title = nodeTitle;
    }

    setData(tasks);
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
  return {
    tasks,
    getData: loadData,
    setData,
    addNode,
    deleteNode,
    moveNodeBack,
    moveNodeForward,
    updateNodeTitle,
  };
}
