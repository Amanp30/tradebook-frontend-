// Define an initial state with an empty array
const initialState = [];

// Create a Redux action type to add a URL to the state
const ADD_URL_TO_STATE = "ADD_URL_TO_STATE";

// Define a Redux reducer function called "previousUrls"
export const Previousurls = (state = initialState, action) => {
  switch (action.type) {
    case ADD_URL_TO_STATE:
      // Use window.location.href to get the current URL
      const currentUrl = window.location.href;
      // Limit the number of previous URLs stored in the state to 5
      const newState = [...state.slice(-4), currentUrl];
      // Return the new state array
      return newState;
    default:
      return state;
  }
};
