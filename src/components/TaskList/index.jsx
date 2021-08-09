import React from "react";
import TaskItem from "../TaskItem";
import AddTask from "../AddTask";
import { useSelector } from "react-redux";
import "./taskList.scss";

const mapState = (state) => {
  return state;
};
export default function TaskList() {
  const tasks = useSelector(mapState);

  return (
    <div className="task-list-component">
      <div className="header">Workflowy</div>
      <div>
        {tasks.map((item) => {
          return (
            <TaskItem key={item.id} parentId={0} {...item} treeLevel={0} />
          );
        })}
      </div>
      <AddTask parentId={0} />
    </div>
  );
}
