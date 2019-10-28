const storiesListReducer = (state = [], action) => 
  {
  console.log(action.payload);
  console.log(action.type);
  switch(action.type)
    {
    case 'RELOAD':
      return state = action.payload;

    default:
      return state;
    }
  }

export default storiesListReducer;