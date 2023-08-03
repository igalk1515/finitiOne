import React, { Component } from 'react';
import './CreateTask.css';

class CreateTask extends Component {
  constructor(props) {
    super(props);
    let date = new Date();
    let options = {
      timeZone: 'Asia/Jerusalem',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    let formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
    formattedDate = formattedDate.split('/').reverse().join('-'); // Convert to YYYY-MM-DD format

    this.state = {
      task: {
        title: props.task ? props.task.title : '',
        description: props.task ? props.task.description : '',
        dueDate: formattedDate,
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

  handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save the task
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    const { title, description, dueDate } = this.state.task;
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
              name="dueDate"
              value={dueDate}
              onChange={this.handleChange}
              className="date-input" // Apply the class
            />
            <button
              type="submit"
              className="form-control-btn"
              onClick={this.handleSubmit}
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateTask;
