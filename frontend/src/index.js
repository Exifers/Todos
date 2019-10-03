import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { get, post, head } from '@exifers/fetch-utils'

class App extends Component {
  componentDidMount() {
    get('https://formmaker.herokuapp.com/forms/').then(console.log).catch(console.log);
  }

  render () {
    return (
      <div>Hello</div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
