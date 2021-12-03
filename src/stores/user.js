import {
  createStore
} from '@harlem/core'

const STATE = {
  userId: '12343554',
  email: 'user@app.com',
  isVerified: true
}

export const {
  state,
  mutation,
  getter,
  ...store
} = createStore('user', STATE)

export const isVerified = getter('isVerified', state => {
  return state.isVerified
})

export const setEmail = mutation('', (state, payload) => {
  state.email = payload
})
