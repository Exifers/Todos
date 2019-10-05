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
    let formData = new FormData()
    formData.append('text', 'TOTOTOTOTO')
    formData.append('done', 'false')
    post('/api/todos/', formData)
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
