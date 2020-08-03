import React from 'react'
import classes from './Creator.module.css'

const Creator = props => (

  <div className={classes.Creator}>
    <form className={classes.CreatorForm}  onSubmit={props.onSubmit}>
      <h2>Create Task</h2>
      <input
        className={classes.CreatorTitle}
        onChange={props.onInput}
        value={props.titleValue}
        name="title"
        type="text"
        placeholder="Title"
        autoComplete="off"/>
      <textarea
        className={classes.CreatorDescription}
        onChange={props.onInput}
        value={props.descriptionValue}
        name="description"
        placeholder="Description"
        autoComplete="off"/>
      <div className={classes.CreatorButtons}>
        <button className={classes.CreatorSubmitBtn}>Submit</button>
        <button
          className={classes.CreatorCancelBtn}
          type="button"
          onClick={() => {
          props.toggleCreator()
        }}>Cancel</button>
      </div>
    </form>
  </div>
)

export default Creator