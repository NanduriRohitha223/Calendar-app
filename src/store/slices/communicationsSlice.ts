const initialState = {
  communications: [],
};

const communicationsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'LOG_COMMUNICATION':
      return {
        ...state,
        communications: [...state.communications, action.payload],
      };
    default:
      return state;
  }
};

export default communicationsReducer;
