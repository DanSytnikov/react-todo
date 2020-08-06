import React, {Component} from 'react'
import classes from './Todo.module.css'
import Header from '../../components/Header/Header'
import {TaskList} from '../TaskList/TaskList'

class Todo extends Component {

  // dev /////////////////////////////////////////////////////////////////////////
  makeTaskList = (listLen) => {
    function makeid(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }

    let randomtitle,
      randomDescr,
      timestamp;
    let list = [];
    for (let i = 0; i < listLen; i++) {
      randomtitle = makeid(8);
      randomDescr = makeid(22);
      timestamp = Date.now()
      list.push({
        key: randomtitle + '__' + timestamp,
        title: randomtitle,
        description: randomDescr,
        timestamp: timestamp,
        done: false,
        editTitle: randomtitle,
        editDescription: randomDescr,
        isEdit: false
      })
    }
    return list;
  }
  // /////////////////////////////////////////////////////////////////////////////

  state = {
    addNewIsActive: false,
    title: '',
    description: '',
    search: '',
    searchRes: [],
    tasks: this.makeTaskList(8)
  }

  updateTasks(tasks) {

    this.setState({tasks: tasks});
    if (this.state.searchRes.length) {
      const newSearchRes = this
        .state
        .searchRes
        .filter(searchItem => tasks.includes(searchItem))
      this.setState({searchRes: newSearchRes})
    }
  }

  toggleCreator = () => {

    this.setState((prevState) => {
      return {
        title: '',
        description: '',
        addNewIsActive: !prevState.addNewIsActive
      }
    });
  }

  handleChange = (event) => {

    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleSearchChange(searchVal, searchList) {

    this.setState({search: searchVal, searchRes: searchList});
  }

  render() {
    return (
      <div className={classes.Todo}>
        <Header
          addNewIsActive={this.state.addNewIsActive}
          titleValue={this.state.title}
          descriptionValue={this.state.description}
          toggleCreator={this.toggleCreator}
          onInput={this.handleChange}
          updateTasks={this
          .updateTasks
          .bind(this)}
          onSearch={this
          .handleSearchChange
          .bind(this)}
          searchValue={this.state.search}
          allTasks={this.state.tasks}/>

        <TaskList
          list={this.state.search === ''
          ? this.state.tasks
          : this.state.searchRes}
          allTasks={this.state.tasks}
          updateTasks={this
          .updateTasks
          .bind(this)}/>

      </div>
    )
  }
}

export default Todo