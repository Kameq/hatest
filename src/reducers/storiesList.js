const storiesListReducer = (state = {isLoading: true}, action) => 
  {
  switch(action.type)
    {
    case 'RELOAD_REQUESTED':
      return {...state, isLoading: true};

    case 'RELOAD_SUCCES':
      return {...state, isLoading: false, stories: action.payload};

    case 'RELOAD_FAILED':
      return {...state, isLoading: false, isError: true};

    default:
      return state;
    }
  }

export default storiesListReducer;