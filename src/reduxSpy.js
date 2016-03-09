import React, { Component } from 'react'
import hoistStatics from 'hoist-non-react-statics'
import Spy from './Spy'

const reduxSpy = (mapStateToKeys = () => ({})) => WrappedComponent => {
  class ReduxSpy extends Component {
    render() {
      return (
        <div>
          <Spy ref="spyComponent" mapStateToKeys={mapStateToKeys}/>
          <WrappedComponent
            {...this.props}
            spy={key => this.refs.spyComponent.getWrappedInstance().getProp(key)}/>
        </div>
      )
    }
  }
  return hoistStatics(ReduxSpy, WrappedComponent)
}

export default reduxSpy
