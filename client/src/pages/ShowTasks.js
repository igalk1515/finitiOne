import React, { Component } from 'react';
import Task from './CreateTask';
import CreateTask from './CreateTask';
import { BackendApi } from '../BackendApi';

import './ShowTasks.css';

class ShowTasks extends Component {
  constructor() {
    super();
    this.api = new BackendApi();
    this.state = {
      tasks: [
        {
          title: 'Task 1',
          description: 'Description 1',
          due_date: '2021-01-01',
        },
        {
          title: 'Task 2',
          description: 'Description 2 ssssssspppssssssssssssssssss',
          due_date: '2021-01-02',
        },
        {
          title: 'Task 3',
          description: 'Description 3',
          due_date: '2021-01-03',
        },
        {
          title: 'Task 4',
          description: 'Description 4',
          due_date: '2021-01-04',
        },
        {
          title: 'Task 5',
          description: 'Description 5',
          due_date: '2021-01-05',
        },
      ],
      draggingTask: null,
      editingTask: null,
      editingContent: null,
      currentPage: 1,
      tasksPerPage: 5,
      searchTitle: '',
      searchDescription: '',
      searchDate: '',
    };
  }

  componentDidMount() {
    // fetch tasks from server
    this.updateTasks();
  }

  updateTasks = async () => {
    const tasks = await this.api.getTasks();
    this.setState({ tasks });
    this.forceUpdate();
    console.log('updateTasks: ', tasks);
  };

  handleSearchChangeTitle = (e) => {
    this.setState({ searchTitle: e.target.value, currentPage: 1 });
  };

  handleSearchChangeDescription = (e) => {
    this.setState({ searchDescription: e.target.value, currentPage: 1 });
  };

  handleSearchChangeDate = (e) => {
    this.setState({ searchDate: e.target.value, currentPage: 1 });
  };

  async handleSearch() {
    console.log('handleSearch');
    const { searchTitle, searchDescription, searchDate } = this.state;
    console.log('searchTitle: ', searchTitle);
    console.log('searchDescription: ', searchDescription);
    console.log('searchDate: ', searchDate);
    const tasks = await this.api
      .searchTasks({
        title: searchTitle,
        description: searchDescription,
        due_date: searchDate,
      })
      .then((res) => {
        console.log('res: ', res);
        this.setState({ tasks: res });
      });
  }

  handleNextPage = () => {
    this.setState((prevState) => ({ currentPage: prevState.currentPage + 1 }));
  };

  handlePrevPage = () => {
    this.setState((prevState) => ({ currentPage: prevState.currentPage - 1 }));
  };

  handleDragStart = (e, index) => {
    this.setState({ draggingTask: index });
  };

  handleDragOver = (e, index) => {
    e.preventDefault();

    const { tasks, draggingTask } = this.state;
    if (index !== draggingTask) {
      const newTasks = [...tasks];
      const [draggedTask] = newTasks.splice(draggingTask, 1);
      newTasks.splice(index, 0, draggedTask);

      this.setState({ tasks: newTasks, draggingTask: index });
    }
  };

  handleDragEnd = (e) => {
    this.setState({ draggingTask: null });
  };

  handleEdit = (index) => {
    const task = this.state.tasks[index];
    console.log(task);
    this.setState({
      editingTask: index,
      editingContent: task,
    });
  };

  handleSave = () => {
    const newTasks = [...this.state.tasks];
    newTasks[this.state.editingTask] = this.state.editingContent;
    this.setState({ tasks: newTasks, editingTask: null, editingContent: null });
  };

  handleComplete = (e) => {
    console.log('Complete');
  };

  handleDelete = async (index) => {
    console.log('Delete');
    const taskId = this.state.tasks[index].id;
    console.log('Delete task id: ', taskId);
    await this.api.deleteTask(taskId);
    this.updateTasks();
  };

  handleRemoveOverlay = (e) => {
    this.setState({ editingTask: null, editingContent: null });
  };

  render() {
    const { tasks, currentPage, tasksPerPage } = this.state;

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    const hasMorePages = tasks.length > indexOfLastTask;
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <div>
        <h1>Tasks</h1>
        {this.state.editingTask !== null ? (
          <div className="overlay">
            <div className="overlay-content">
              <button
                className="close-btn"
                onClick={() => this.handleRemoveOverlay()}
              >
                X
              </button>
              <CreateTask
                task={this.state.editingContent}
                onChange={(task) => this.setState({ editingContent: task })}
                onSave={this.handleSave}
                onClose={() => this.handleRemoveOverlay()}
                updateTasks={this.updateTasks}
              />
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="search">
          <input
            type="text"
            placeholder="Search by title"
            value={this.state.searchTitle}
            onChange={this.handleSearchChangeTitle}
          />
          <input
            type="text"
            placeholder="Search by description"
            value={this.state.searchDescription}
            onChange={this.handleSearchChangeDescription}
          />
          <input
            type="date"
            placeholder="Search by due date"
            value={this.state.searchDate}
            onChange={this.handleSearchChangeDate}
          />
        </div>
        <button className="btn-search" onClick={() => this.handleSearch()}>
          Search
        </button>
        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => this.setState({ currentPage: number })}
              className={number === currentPage ? 'active-page' : ''}
            >
              {number}
            </button>
          ))}
        </div>
        <ul>
          {currentTasks.map((task, index) => (
            <li
              key={index}
              draggable
              onDragStart={(e) => this.handleDragStart(e, index)}
              onDragOver={(e) => this.handleDragOver(e, index)}
              onDragEnd={this.handleDragEnd}
            >
              <div className="task-container">
                <div className="tools">
                  <button
                    className="btn-edit"
                    onClick={() => this.handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-complete"
                    onClick={this.handleComplete}
                  >
                    Complete
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => this.handleDelete(index)}
                  >
                    Delete Task
                  </button>
                </div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>{task.due_date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ShowTasks;
