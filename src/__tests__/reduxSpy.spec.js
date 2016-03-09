/* eslint react/no-multi-comp:0 */
import expect, { createSpy } from 'expect'
import React, { Component } from 'react'
import TestUtils from 'react-addons-test-utils'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reduxSpy from '../reduxSpy'

describe('reduxSpy', () => {
  const reducer = (state, action) => ({  // simplest reducer ever?
    ...state,
    [action.key]: action.value
  })
  const makeStore = (initialState = {}) => createStore(reducer, initialState)
  class TestComponent extends Component {
    render() {
      const { report, spy, rendered } = this.props
      if (rendered) {
        rendered()
      }
      return <button onClick={() => report(spy('arbitraryKey'))}/>
    }
  }

  it('should return a decorator function', () => {
    expect(reduxSpy).toBeA('function')
  })

  it('should render without error with no slices', () => {
    const store = makeStore()
    expect(() => {
      const Decorated = reduxSpy()(TestComponent)
      TestUtils.renderIntoDocument(<Provider store={store}><Decorated/></Provider>)
    }).toNotThrow()
  })

  it('should pass props through', () => {
    const store = makeStore()
    const Decorated = reduxSpy()(TestComponent)
    const dom = TestUtils.renderIntoDocument(<Provider store={store}>
      <Decorated foo="bar" dog="Snoopy" answer={42}/>
    </Provider>)
    const stub = TestUtils.findRenderedComponentWithType(dom, TestComponent)
    expect(stub.props.foo).toBe('bar')
    expect(stub.props.dog).toBe('Snoopy')
    expect(stub.props.answer).toBe(42)
  })

  it('should render once', () => {
    const store = makeStore()
    const rendered = createSpy()
    const Decorated = reduxSpy()(TestComponent)
    TestUtils.renderIntoDocument(<Provider store={store}>
      <Decorated rendered={rendered}/>
    </Provider>)
    expect(rendered).toHaveBeenCalled()
    expect(rendered.calls.length).toBe(1)
  })

  it('should fetch slice', () => {
    const store = makeStore({ foo: 'bar' })
    const rendered = createSpy()
    const report = createSpy()
    const Decorated = reduxSpy(state => ({ arbitraryKey: state.foo }))(TestComponent)
    const dom = TestUtils.renderIntoDocument(<Provider store={store}>
      <Decorated rendered={rendered} report={report}/>
    </Provider>)
    expect(rendered).toHaveBeenCalled()
    expect(rendered.calls.length).toBe(1)
    expect(report).toNotHaveBeenCalled()
    const button = TestUtils.findRenderedDOMComponentWithTag(dom, 'button')
    TestUtils.Simulate.click(button)
    expect(report)
      .toHaveBeenCalled()
      .toHaveBeenCalledWith('bar')
  })

  it('should fetch slice but not rerender when state changes', () => {
    const store = makeStore({ foo: 'bar' })
    const rendered = createSpy()
    const report = createSpy()
    const Decorated = reduxSpy(state => ({ arbitraryKey: state.foo }))(TestComponent)
    const dom = TestUtils.renderIntoDocument(<Provider store={store}>
      <Decorated rendered={rendered} report={report}/>
    </Provider>)
    expect(rendered).toHaveBeenCalled()
    expect(rendered.calls.length).toBe(1)
    expect(report).toNotHaveBeenCalled()
    const button = TestUtils.findRenderedDOMComponentWithTag(dom, 'button')
    TestUtils.Simulate.click(button)
    expect(report.calls.length).toBe(1)
    expect(report.calls[ 0 ].arguments).toEqual([ 'bar' ])

    store.dispatch({ type: 'CHANGE', key: 'foo', value: 'baz' })

    expect(rendered.calls.length).toBe(1)
    TestUtils.Simulate.click(button)
    expect(report.calls.length).toBe(2)
    expect(report.calls[ 1 ].arguments).toEqual([ 'baz' ])
  })
})
