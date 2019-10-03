import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { get } from '@exifers/fetch-utils'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    get('/api/todos').then(todos => {
      this.setState({
        todos
      })
    })
  }

  render () {
    return (
      <div>
        <ul>{this.state.todos.map(todo => (
          <li>{todo.text} : {todo.done.toString()}</li>
        ))}</ul>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
