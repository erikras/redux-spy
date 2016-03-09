import React from 'react'
import { connect } from 'react-redux'
import { increment } from './reducer'

let renderCount = 0

const Increment = ({ count, increment }) => {
  renderCount++
  return (
    <div>
      <div className="count">{count}</div>
      <div>I am connected to the Redux store</div>
      <button onClick={increment}>Increment</button>
      <div className="render-count">Render Count: {renderCount}</div>
    </div>
  )
}

export default connect(
  state => ({ count: state }),
  { increment }
)(Increment)
