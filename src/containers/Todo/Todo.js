import React, {Component} from 'react'
import classes from './Todo.module.css'
import Header from '../../components/Header/Header'
import Task from '../../components/Task/Task'

class Todo extends Component {

  state = {
    addNewIsActive: false,
    title: '',
    description: '',
    search: '',
    searchRes: [],
    tasks: [

      //dev
      // this.createTask(),
      // this.createTask(),
      // this.createTask(),
      // this.createTask()
    ]
  }

  clearInputs = () => {

    this.setState({title: '', description: ''})
  }

  updateTasks(tasks) {

    this.setState({tasks: tasks});
  }

  toggleCreator = () => {

    this.clearInputs();
    this.setState((prevState) => {
      return {
        addNewIsActive: !prevState.addNewIsActive
      }
    });
  }

  doSmthWithTasks(foo) {

    const newTasks = this
      .state
      .tasks
      .filter(foo);
    return newTasks;
  }

  handleSearchChange(event) {

    this.setState({search: event.target.value});

    const searchRes = this.doSmthWithTasks((taskItem => taskItem.title.toString().toLowerCase().concat(' ', taskItem.description.toString().toLowerCase()).includes(event.target.value.toString().toLowerCase())))
    console.log('Search', event.target.value);

    this.setState({searchRes: searchRes});
  }

  handleChange = (event) => {

    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleEditChange(task, event) {

    const name = event.target.name;
    const newTasks = this.doSmthWithTasks((taskItem) => {
      if (taskItem.key === task.key) {
        taskItem[name] = event.target.value;
      }
      return taskItem;
    })
    this.updateTasks(newTasks);
  }

  createTask(obj) {

    const timestamp = Date.now();
    if (obj) {

      const newTask = {
        key: obj.title + '__' + timestamp,
        title: obj.title,
        description: obj.description,
        timestamp: timestamp,
        done: false,
        editTitle: obj.title,
        editDescription: obj.description,
        isEdit: false
      }
      return newTask;
    } else {

      // НЕ ЗАБЫТЬ УДАЛИТЬ (dev)

      const title = Math.random() * 100;
      const desc = Math.random() * 10000;
      const newTask = {
        key: title + '__' + timestamp,
        title: title,
        description: desc,
        timestamp: timestamp,
        done: false,
        editTitle: title,
        editDescription: desc,
        isEdit: false
      }
      return newTask;
    }
  }

  onDeleteHandle(task) {

    const newTasks = this.doSmthWithTasks((taskItem) => taskItem.key !== task.key);
    this.updateTasks(newTasks)
  }

  onDone(task) {

    const newTasks = this.doSmthWithTasks((taskItem) => {
      if (taskItem.key === task.key) {
        taskItem.done = true;
      }
      return taskItem;
    })
    this.updateTasks(newTasks);
  }

  onSave(task, event) {

    event.preventDefault();
    const newTasks = this.doSmthWithTasks((taskItem) => {
      if (taskItem.key === task.key) {
        taskItem.title = taskItem.editTitle;
        taskItem.description = taskItem.editDescription;
      }
      return taskItem;
    })
    this.updateTasks(newTasks);
    this.onEditToggle(task);
  }

  handleSubmit = (event) => {

    event.preventDefault();
    if (!this.state.title) 
      return;
    const newTask = this.createTask(this.state);
    const tasks = this
      .state
      .tasks
      .concat();
    tasks.push(newTask);
    this.setState({tasks: tasks});

    this.toggleCreator();
    this.clearInputs();

  }

  onEditToggle(task) {

    const newTasks = this.doSmthWithTasks((taskItem) => {
      if (taskItem.key === task.key) {
        taskItem.isEdit = !taskItem.isEdit;
      }
      console.log(taskItem);
      return taskItem;
    })
    this.updateTasks(newTasks);
  }

  render() {
    return (
      <div className={classes.Todo}>
        <Header
          addNewIsActive={this.state.addNewIsActive}
          toggleCreator={this.toggleCreator}
          onInput={this.handleChange}
          onSubmit={this.handleSubmit}
          titleValue={this.state.title}
          descriptionValue={this.state.description}
          onSearch={this
          .handleSearchChange
          .bind(this)}
          searchValue={this.state.search}/> {this.state.search === ''
          ? this
            .state
            .tasks
            .map((task) => {
              return (<Task
                key={task.key}
                title={task.title}
                description={task.description}
                timestamp={task.timestamp}
                done={task.done}
                editTitle={task.editTitle}
                editDescription={task.editDescription}
                isEdit={task.isEdit}
                onEdit={this
                .onEditToggle
                .bind(this, task)}
                onDelete={this
                .onDeleteHandle
                .bind(this, task)}
                onDone={this
                .onDone
                .bind(this, task)}
                onEditInput={this
                .handleEditChange
                .bind(this, task)}
                onSave={this
                .onSave
                .bind(this, task)}
                onSearch={this
                .handleSearchChange
                .bind(this)}/>)
            }) // Кусок, ответственный за поиск. Подлежит --выпиливанию-- рефакторингу
          : this
            .state
            .searchRes
            .map((task) => {
              return (<Task
                key={task.key}
                title={task.title}
                description={task.description}
                timestamp={task.timestamp}
                done={task.done}
                editTitle={task.editTitle}
                editDescription={task.editDescription}
                isEdit={task.isEdit}
                onEdit={this
                .onEditToggle
                .bind(this, task)}
                onDelete={this
                .onDeleteHandle
                .bind(this, task)}
                onDone={this
                .onDone
                .bind(this, task)}
                onEditInput={this
                .handleEditChange
                .bind(this, task)}
                onSave={this
                .onSave
                .bind(this, task)}
                onSearch={this
                .handleSearchChange
                .bind(this)}/>)
            })}
      </div>
    )
  }
}

export default Todo