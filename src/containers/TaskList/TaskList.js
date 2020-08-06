import React from 'react'
import classes from './TaskList.module.css'
import Task from '../../components/Task/Task'

export const TaskList = ({list, allTasks, updateTasks}) => {

  const filterTasks = (list, foo) => {

    return (list.filter(foo));
  }

  const onDelete = (key) => {

    const newList = filterTasks(allTasks, taskItem => taskItem.key !== key)
    updateTasks(newList);
  }

  const onDone = (key) => {
    const newList = filterTasks(allTasks, taskItem => {
      if (taskItem.key === key) {
        taskItem.done = true
      }
      return taskItem
    });
    updateTasks(newList)
  }

  const toggleEdit = (key) => {
    const newList = filterTasks(allTasks, taskItem => {
      if (taskItem.key === key) {
        taskItem.isEdit = !taskItem.isEdit
      }
      return taskItem
    });
    updateTasks(newList)
  }

  const inputHandler = (key, name, value) => {
    const newTasks = filterTasks(allTasks, taskItem => {
      if (taskItem.key === key) 
        taskItem[name] = value;
      return taskItem;
    })
    updateTasks(newTasks);
  }

  const onSave = (key) => {
    const newList = filterTasks(allTasks, taskItem => {
      if (taskItem.key === key) {
        taskItem.title = taskItem.editTitle;
        taskItem.description = taskItem.editDescription;
      }
      return taskItem;
    })
    updateTasks(newList);
    toggleEdit(key);
  }

  return (
    <div className={classes.TaskList}>
      {list.length > 0
        ? [...list].map((task) => {
          if (allTasks.filter(taskItem => taskItem.key === task.key).length) 
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
