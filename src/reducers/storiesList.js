const storiesListReducer = (state = [], action) => 
  {
  switch(action.type)
    {
    case 'RELOAD':
      return state = action.payload;

    default:
      return state;
    }
  }

export default storiesListReducer;