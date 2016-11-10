import React from 'react'
import { connect } from 'react-redux'

class Spy extends React.Component {
  getProp(key) {
    return this.props[ key ]
  }

  render() {
    return false // render nothing
  }
}

export default connect(
  (state, ownProps) => ownProps.mapStateToKeys(state),
  undefined, // mapDispatchToProps
  undefined, // mergeProps
  { withRef: true }
)(Spy)
