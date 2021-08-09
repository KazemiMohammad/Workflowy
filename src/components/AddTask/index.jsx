import React from "react";
import "./add-task.scss";
import { useDispatch } from "react-redux";
import { addNode } from "../../reducer/actions";

export default function AddTask(props) {
  const dispatch = useDispatch();
  let treeLevel = props.treeLevel!==undefined ? props.treeLevel : -1;
  console.log(props.treeLevel);
  return (
    <div className="add-task-component" style={{ paddingLeft: (treeLevel + 1) * 15 }}>
      <button
        className="btn-add"
        onClick={() => {
          dispatch(addNode(props.parentId));
        }}
      >
        <span className="plus-caption">+</span>New node
      </button>
    </div>
  );
}
