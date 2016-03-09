import React, { Component } from 'react'
import reduxSpy from 'redux-spy'

let renderCount = 0

class ShowState extends Component {
  render() {
    const { spy } = this.props
    renderCount++
    return (
      <div>
        <div>I am NOT connected to the Redux store, but I can tell you the count without rerendering.</div>
        <button onClick={() => alert(`The count is ${spy('count')}`)}>Alert Count</button>
        <div className="render-count">Render Count: {renderCount}</div>
      </div>
    )
  }
}

export default reduxSpy(
  state => ({ count: state })
)(ShowState)
