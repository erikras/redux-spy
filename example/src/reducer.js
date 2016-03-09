// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux
const INCREMENT = 'redux-spy/example/INCREMENT'

const reducer = (state = 0, action = {}) =>
  action.type === INCREMENT ? state + 1 : state

export function increment() {
  return { type: INCREMENT }
}

export default reducer
