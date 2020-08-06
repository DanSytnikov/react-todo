import React from 'react';
import classes from './Header.module.css'
import Creator from './Creator/Creator';

const Header = props => {

  const createTask = (obj) => {

    const timestamp = Date.now();
    if (obj) {
      return {
        key: obj.title + '__' + timestamp,
        title: obj.title,
        description: obj.description,
        timestamp: timestamp,
        done: false,
        editTitle: obj.title,
        editDescription: obj.description,
        isEdit: false
      };
    }
  }

  const addTask = (event) => {

    event.preventDefault();

    if (!props.titleValue) 
      return;
    
    const tasks = [
      ...props.allTasks,
      createTask({title: props.titleValue, description: props.descriptionValue})
    ];
    props.updateTasks(tasks);
    props.toggleCreator();
  }

  const handleSearch = (event) => {
    const searchRes = props
      .allTasks
      .filter((taskItem => taskItem.title.toString().toLowerCase().concat(' ', taskItem.description.toString().toLowerCase()).includes(event.target.value.toString().toLowerCase())))

    props.onSearch(event.target.value, searchRes);
  }

  return (

    <div className={classes.HeaderBar}>
      {props.addNewIsActive
        ? <Creator
            toggleCreator={props.toggleCreator}
            onInput={props.onInput}
            titleValue={props.titleValue}
            onSubmit={addTask}/>
        : null}

      <button
        className={classes.AddButton}
        onClick={() => {
        props.toggleCreator()
      }}>Add new</button>
      <h1>TodoList</h1>
      <div className={classes.SearchWrapper}>
        <form className={classes.SearchForm}>
          <input
            className={classes.Search}
            type="text"
            name="search"
            placeholder="Search.."
            onChange={handleSearch}
            value={props.searchValue}/>
        </form>
      </div>
    </div>
  )
}

export default Header