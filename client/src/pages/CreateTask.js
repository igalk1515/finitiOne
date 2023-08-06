import React, { Component } from 'react';
import { BackendApi } from '../BackendApi';
import './CreateTask.css';

class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.api = new BackendApi();
    let date = new Date();
    let options = {
      timeZone: 'Asia/Jerusalem',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    let formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
    formattedDate = formattedDate.split('/').reverse().join('-');

    this.state = {
      task: {
        id: props.task ? props.task.id : undefined,
        title: props.task ? props.task.title : '',
        description: props.task ? props.task.description : '',
        due_date: formattedDate,
      },
    };
  }

  componentDidMount() {
    if (this.props.onClose) {
      document.addEventListener('keydown', this.handleKeyDown);
    }
  }

  handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleChange = (e) => {
    this.setState({
      task: {
        ...this.state.task,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = async (e) => {
    const SERVER_URL = process.env.REACT_APP_API_URL;

    e.preventDefault();
    const { title, description, due_date } = this.state.task;
    if (title.trim() === '' || description.trim() === '') {
      return;
    }
    try {
      if (this.props.task && this.props.task.id) {
        await this.api.updateTask(this.state.task);
      } else {
        await this.api.createTask(this.state.task);
      }
      if (this.props.onClose) {
        await this.props.updateTasks();
        this.props.onClose();
      }
    } catch (err) {}
    this.setState({
      task: {
        id: undefined,
        title: '',
        description: '',
        due_date: '',
      },
    });
  };

  render() {
    const { title, description, due_date } = this.state.task;
    return (
      <div>
        <h1>Create Task</h1>
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <input
              name="title"
              value={title}
              onChange={this.handleChange}
              placeholder="Title"
              className="form-control" // Apply the class
            />
            <textarea
              name="description"
              value={description}
              onChange={this.handleChange}
              placeholder="Description"
              className="form-control" // Apply the class
            />
            <input
              type="date"
              name="due_date"
              value={due_date}
              onChange={this.handleChange}
              className="date-input"
            />
            <button
              type="submit"
              className="form-control-btn"
              onClick={this.handleSubmit}
            >
              {this.props.task ? 'Update' : 'Create'} Task
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateTask;
