const storiesListReducer = (state = {isLoading: true}, action) => 
  {
  switch(action.type)
    {
    case 'RELOAD_REQUESTED':
      return {isLoading: true};

    case 'RELOAD_SUCCES':
      return {isLoading: false, stories: action.payload};

    case 'SET_CHART_DATA':
      return {...state, chartData: action.payload};

    case 'RELOAD_FAILED':
      return {isLoading: false, isError: true};

    // case 'UPDATE_COMMENT':
    //   return state.map(
    //     (comment, i) => comment.i === action.payload.id ? {...comment} : comment);

    default:
      return state;
    }
  }

export default storiesListReducer;