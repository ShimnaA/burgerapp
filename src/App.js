import React, { Component } from 'react';

import './App.css';


class App extends Component {
  
  state = {
    todolist: []
  }


  handleSubmit = (event) => {
    var taskDesc = event.target.elements.todotask.value;
    if (taskDesc.length > 0){
        this.setState({
          todolist: [...this.state.todolist, taskDesc]
        })
        event.target.reset();
    }
    event.preventDefault();

  }

  btnclickHandler = (newtask) => {
    this.setState({todolist: [
      newtask[0],
      newtask[1],
      newtask[2]

    ]})
  }
  
  render() {
   

    return (
      <div>
        <div className="jumbotron jumbotron-fluid py-2">
          <div className="container">
            <h1 className="display-4">Todo App</h1>
            
          </div>
        </div>
          <form className="mb-2" onSubmit={this.handleSubmit}>
           <div className="input-group mb-3">
              <input type="text" name="todotask" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"/>
              <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Button</button>
              </div>
            </div>
          </form>
          <div>
            <button onClick={this.btnclickHandler.bind(this,["datas", "shim", "do"])}>hello</button>
            <p>{this.state.todolist[0]}</p>
            <p>{this.state.todolist[1]}</p>
            <p>{this.state.todolist[2]}</p>
          </div>

      </div>
    );
   
  }
}

export default App;
