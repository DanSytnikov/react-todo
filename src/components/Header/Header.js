import React from 'react';
import classes from './Header.module.css'
import Creator from './Creator/Creator';

const Header = ({
  addNewIsActive,
  searchValue,
  toggleCreator,
  onSearch,
  addTask,
  allTasks
}) => {

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

  const serializeForm = function (form) {
    var obj = {};
    var formData = new FormData(form);
    for (let key of formData.keys()) {
      obj[key] = formData.get(key);
    }
    return obj;
  };

  const handleSearch = (event) => {
    const searchRes = allTasks
      .filter((taskItem => taskItem.title.toString().toLowerCase().concat(' ', taskItem.description.toString().toLowerCase()).includes(event.target.value.toString().toLowerCase())))

    onSearch(event.target.value, searchRes);
  }

  return (

    <div className={classes.HeaderBar}>
      {addNewIsActive
        ? <Creator
            toggleCreator={toggleCreator}
            onSubmit={e => {
            e.preventDefault();
            addTask(createTask(serializeForm(e.target)));
          }}/>
        : null}

      <button
        className={classes.AddButton}
        onClick={() => {
        toggleCreator()
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
            value={searchValue}/>
        </form>
      </div>
    </div>
  )
}

export default Header