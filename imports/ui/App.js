import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import Task from './Task.js';
import AccountUIWapper from './AccountsUIWrapper.js';
import Weather from './Weather.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;

    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }

    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task 
        key={task._id} 
        task={task} 
        showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    const weather_data = this.state.weather_data;
    return (
      <div className="container">
        <Weather />
        <header>

          <h1>Todo List ({this.props.incompleteCount})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            /> Hide Completed Tasks
          </label>

          <AccountUIWapper />

          {this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
              <input
                type="text"
                ref="textInput"
                placeholder="Add new task"
              />
            </form> : ''
          }

        </header>

        <ul>
          {this.renderTasks()}
        </ul>

        <div className="container">
          <header>
            <h1>Emails </h1>

          </header>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);