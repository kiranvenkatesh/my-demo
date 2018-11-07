const INITIAL_STATE = {}

const main = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'expression':
      return {
        ...state
      }

    default:
      return state
  }
}

export default main
