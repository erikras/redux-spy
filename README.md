# Redux Spy

[![NPM Version](https://img.shields.io/npm/v/redux-spy.svg?style=flat)](https://www.npmjs.com/package/redux-spy) 
[![NPM Downloads](https://img.shields.io/npm/dm/redux-spy.svg?style=flat)](https://www.npmjs.com/package/redux-spy)
[![Build Status](https://img.shields.io/travis/erikras/redux-spy/master.svg?style=flat)](https://travis-ci.org/erikras/redux-spy)
[![codecov.io](https://codecov.io/github/erikras/redux-spy/coverage.svg?branch=master)](https://codecov.io/github/erikras/redux-spy?branch=master)

`redux-spy` works like `react-redux`'s `connect()` decorator, except that, rather than subscribe 
to changes in the Redux store, which causes a rerender, it gives its wrapped component a function
with which to query specific slices of the Redux store.

It works by using a non-rendering child component that _is_ subscribed to the Redux store.

## Screencast

This is a screencast of the [example app](example) running.

![screencast](screencast.gif)

## Why???

This will not be a hugely popular library because it is only useful in rare edge cases.

I am currently working on a redesign of `redux-form`, which contains a large outer component, that
is very expensive to rerender, but that _occasionally_ (e.g. form submit) needs access to state in
Redux that changes on every single keystroke. Rather than rerender the whole form every time, 
`redux-spy` will allow my large component to _spy_ on the Redux state only when it needs to.

## API

### `reduxSpy(mapStateToKeys)`

> `mapStateToKeys` is very similar to `mapStateToProps` that you would give to `connect()`, except 
it doesn't accept an `ownProps` second parameter.

### Props provided to your decorated component

#### `spy(key:String)` : `Function`

> A function to call to get the corresponding value from the Redux state. The `key` parameter much 
match on the keys in the map returned from `mapStateToKeys`.

