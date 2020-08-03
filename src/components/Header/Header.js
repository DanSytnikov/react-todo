import React from 'react';
import classes from './Header.module.css'
import Creator from './Creator/Creator';

const Header = props => (

  <div className={classes.HeaderBar}>
    {props.addNewIsActive
      ? <Creator
          toggleCreator={props.toggleCreator}
          onInput={props.onInput}
          titleValue={props.titleValue}
          onSubmit={props.onSubmit}/>
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
          onChange={props.onSearch}
          value={props.searchValue}
          />
      </form>
    </div>
  </div>
)

export default Header