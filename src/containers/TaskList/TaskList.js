import React from 'react'
import classes from './TaskList.module.css'
import Task from '../../components/Task/Task'

export const TaskList = (props) => {

  const filterTasks = (list, foo) => {

    return (list.filter(foo));
  }

  const onDelete = (key) => {

    const newList = filterTasks(props.allTasks, taskItem => taskItem.key !== key)
    props.updateTasks(newList);
  }

  const onDone = (key) => {
    const newList = filterTasks(props.allTasks, taskItem => {
      if (taskItem.key === key) {
        taskItem.done = true
      }
      return taskItem
    });
    props.updateTasks(newList)
  }

  const toggleEdit = (key) => {
    const newList = filterTasks(props.allTasks, taskItem => {
      if (taskItem.key === key) {
        taskItem.isEdit = !taskItem.isEdit
      }
      return taskItem
    });
    props.updateTasks(newList)
  }

  const inputHandler = (key, name, value) => {
    const newTasks = filterTasks(props.allTasks, taskItem => {
      if (taskItem.key === key) 
        taskItem[name] = value;
      return taskItem;
    })
    props.updateTasks(newTasks);
  }

  const onSave = (key) => {
    const newList = filterTasks(props.allTasks, taskItem => {
      if (taskItem.key === key) {
        taskItem.title = taskItem.editTitle;
        taskItem.description = taskItem.editDescription;
      }
      return taskItem;
    })
    props.updateTasks(newList);
    toggleEdit(key);
  }

  return (
    <div className={classes.TaskList}>
      {props.list.length > 0
        ? [...props.list].map((task) => {
          if (props.allTasks.filter(taskItem => taskItem.key === task.key).length) 
            return (<Task
              key={task.key}
              title={task.title}
              description={task.description}
              timestamp={task.timestamp}
              done={task.done}
              editTitle={task.editTitle}
              editDescription={task.editDescription}
              isEdit={task.isEdit}
              onDelete={onDelete}
              onDone={onDone}
              toggleEdit={toggleEdit}
              inputHandler={inputHandler}
              onSave={onSave}/>)
          else 
            return null;
          }
        )
        : null}
    </div>
  )

}
