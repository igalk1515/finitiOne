import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';
import CreateTask from './pages/CreateTask';
import ShowTasks from './pages/ShowTasks';
import ShowUsers from './pages/ShowUsers';

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <NavLink to="/"> Tasks </NavLink>
          <NavLink to="/create"> Create Task </NavLink>
          <NavLink to="/users"> Users </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ShowTasks />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/users" element={<ShowUsers />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
