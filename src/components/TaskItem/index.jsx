import React, { useState } from "react";
import "./task-item.scss";
import AddTask from "../AddTask";
import { useDispatch } from "react-redux";
import {
  addNode,
  deleteNode,
  updateNodeTitle,
  moveNodeBack,
  moveNodeForward,
} from "../../reducer/actions";
function Task(props) {
  const dispatch = useDispatch();

  const [controlPressed, setControlPressed] = useState(false);
  const [shiftPressed, setShiftPressed] = useState(false);
  const [deletePressed, setDeletePressed] = useState(false);
  const [tabPressed, setTabPressed] = useState(false);
  const [title, setTitle] = useState(props.title);

  const handleKeyDown = (e) => {
    switch (e.key.toLowerCase()) {
      case "enter":
        dispatch(addNode(props.parentId));
        e.preventDefault();
        break;
      case "tab":
        setTabPressed(true);
        e.preventDefault();
        break;
      case "control":
        setControlPressed(true);
        e.preventDefault();
        break;
      case "shift":
        setShiftPressed(true);
        e.preventDefault();
        break;
      case "delete":
        setDeletePressed(true);
        break;

      default:
        setDeletePressed(false);
        setControlPressed(false);
        break;
    }
  };

  const handleKeyUp = (e) => {
    if (controlPressed && deletePressed) {
      dispatch(deleteNode(props.id, props.parentId));
      e.preventDefault();
    }
    if (shiftPressed && tabPressed) {
      dispatch(moveNodeBack(props.id, props.parentId));
      e.preventDefault();
    }
    if (!shiftPressed && tabPressed) {
      dispatch(moveNodeForward(props.id, props.parentId));
      e.preventDefault();
    }
    resetPressedKeyes();
  };

  const resetPressedKeyes = () => {
    setControlPressed(false);
    setShiftPressed(false);
    setDeletePressed(false);
    setTabPressed(false);
  };

  return (
    <div className="task" style={{ paddingLeft: props.treeLevel * 15 }}>
      <button
        className={`btn-show-child ${!props.showChildren ? "collapse" : ""}`}
        onClick={props.handleShowChildren}
      />
      <input
        type="text"
        className="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        onBlur={(e) => {
          dispatch(updateNodeTitle(props.id, title));
        }}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
      <button
        className="btn-add-inline"
        onClick={(e) => {
          dispatch(addNode(props.id));
        }}
      >
        +
      </button>
    </div>
  );
}

export default function TaskItem(props) {
  const [showChildren, setShowChildren] = useState(false);

  const handleShowChildren = (e) => {
    setShowChildren(!showChildren);
  };

  let children = props.children.map((item) => {
    return (
      <TaskItem
        key={item.id}
        parentId={props.id}
        {...item}
        treeLevel={props.treeLevel + 1}
      />
    );
  });

  return (
    <div className="task-item">
      <Task
        key={props.id}
        title={props.title}
        id={props.id}
        parentId={props.parentId}
        handleShowChildren={handleShowChildren}
        showChildren={showChildren}
        treeLevel={props.treeLevel}
      />
      {showChildren && (
        <>
          {children}
          {!children.length && (
            <AddTask treeLevel={props.treeLevel} parentId={props.id} />
          )}
        </>
      )}
    </div>
  );
}

/*

*/
