import axios from 'axios';

export class BackendApi {
  constructor() {
    const apiUrl = process.env.REACT_APP_API_URL;
    this.api = axios.create({
      baseURL: apiUrl,
    });
  }

  async getTasks() {
    const res = await this.api.get('/tasks');
    return res.data;
  }

  async createTask(task) {
    if (task.id === undefined) {
      delete task.id;
    }
    const res = await this.api.post('/task', task);
    return res.data;
  }

  async updateTask(task) {
    const res = await this.api.put(`/tasks/${task.id}`, task);
    return res.data;
  }

  async deleteTask(taskId) {
    const res = await this.api.delete(`/tasks/${taskId}`);
    return res.data;
  }

  async searchTasks(query) {
    const res = await this.api.get('/tasks/search', {
      params: {
        query,
      },
    });

    return res.data;
  }
}
