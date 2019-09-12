import React, {Component} from 'react';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

import TodosList from './components/todos-list.component';
import EditTodo from './components/edit-todo.component';
import CreateTodos from './components/create-todo.component';

import logo from './logo.svg';

class App extends Component {
  render() {
    return(

      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="https://github.com/georgealexandruiancu" target="_blank" rel="noopener noreferrer">
            <img src={logo} width="60" height="60" alt="Alex Iancu" />
          </a>
          <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
          <div className="collpase nav-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Todos</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Todo</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Route path="/"  exact component={TodosList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodos} />
      </Router>
    );
  }
}

export default App;
