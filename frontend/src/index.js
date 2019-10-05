import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {get, post} from '@exifers/fetch-utils'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    get('/api/todos/').then(todos => {
      this.setState({
        todos
      })
    })
    post('/api/todos/', {text: Math.random().toString(36).substring(7), done: false})
  }

  render() {
    return (
      <div>
        <ul>{this.state.todos.map(todo => (
          <li>{todo.text} : {todo.done.toString()}</li>
        ))}</ul>
        {this.state.todos.length === 0 && <span>Empty</span>}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
