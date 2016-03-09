import { Component } from 'react'
import { connect } from 'react-redux'

class Spy extends Component {
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
