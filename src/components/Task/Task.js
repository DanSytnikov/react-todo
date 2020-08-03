import React, {Component} from 'react';
import classes from './Task.module.css'

class Task extends Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  deleteBtnClasses = ['fa', 'fa-close', classes.DeleteBtn];
  taskClasses = [classes.Task];

  render() {

    if (this.props.done) {
      this
        .taskClasses
        .push(classes.done);
    }
    return (
      <div className={this
        .taskClasses
        .join(' ')}>
        <header className={classes.TaskHeader}>
          <button
            type="button"
            className={this
            .deleteBtnClasses
            .join(' ')}
            onClick={this.props.onDelete}></button>
        </header>
        {this.props.isEdit
          ? <div className={classes.TaskEdit}>
              <form className={classes.TaskInfoEdit} onSubmit={this.props.onSave}>
                <label >Title:
                  <input
                    name="editTitle"
                    className={classes.EditTitle}
                    type="text"
                    autoComplete="off"
                    onChange={this.props.onEditInput}
                    value={this.props.editTitle}/>
                </label>
                <label>
                  Description:
                  <textarea
                    name="editDescription"
                    className={classes.EditDescription}
                    autoComplete="off"
                    onChange={this.props.onEditInput}
                    value={this.props.editDescription}
                    />
                </label>
                <div className={classes.EditButtons}>
                  <button className={classes.EditSave}>Save</button>
                  <button type="button" className={classes.EditCancel} onClick={this.props.onEdit}>Cancel</button>
                </div>
              </form>
            </div>
          : <div className={classes.TaskInfo}>
            <h2 className={classes.TaskTitle}>{this.props.title}</h2>
            <h4 className={classes.TaskDescription}>{this.props.description}</h4>

            {this.props.done
              ? null
              : <React.Fragment>

                <button className={classes.EditBtn} onClick={this.props.onEdit}>Edit</button>
                <button className={classes.DoneBtn} onClick={this.props.onDone}>Done</button>
              </React.Fragment>
}
          </div>
}

      </div>
    )
  }
}

export default Task