// Action Types (as constants)
export const ADD_COMPANY = 'ADD_COMPANY';
export const DELETE_COMPANY = 'DELETE_COMPANY';
export const UPDATE_COMPANY = 'UPDATE_COMPANY';
export const LOG_COMMUNICATION = 'LOG_COMMUNICATION';
export const ADD_COMMUNICATION = 'ADD_COMMUNICATION';
export const ADD_METHOD = 'ADD_METHOD';
export const EDIT_METHOD = 'EDIT_METHOD'; // Consider renaming to 'UPDATE_METHOD' for consistency
export const DELETE_METHOD = 'DELETE_METHOD'; // Action type for deleting methods
export const SET_METHODS = 'SET_METHODS'; // Action type for setting methods

// Action creator for logging communication
export const logCommunication = (communication: any) => ({
  type: LOG_COMMUNICATION,
  payload: communication,
});

// Action creator for adding a new communication
export const addCommunication = (communication: any) => ({
  type: ADD_COMMUNICATION,
  payload: communication,
});

// Action creator for adding a company
export const addCompany = (company: Company) => ({
  type: ADD_COMPANY,
  payload: company,
});

// Action creator for deleting a company by ID
export const deleteCompany = (id: string) => ({
  type: DELETE_COMPANY,
  payload: id,
});

// Action creator for updating an existing company
export const updateCompany = (company: Company) => ({
  type: UPDATE_COMPANY,
  payload: company,
});

// Action creator for adding a new communication method
export const addMethod = (method: CommunicationMethod) => ({
  type: ADD_METHOD,
  payload: method,
});

// Action creator for editing (updating) an existing communication method
// Renaming from editMethod to updateMethod for better consistency
export const updateMethod = (method: CommunicationMethod) => ({
  type: 'UPDATE_METHOD', // Make sure to use the correct action type 'UPDATE_METHOD'
  payload: method,
});

// Action creator for deleting a communication method by ID
export const deleteMethod = (id: string) => ({
  type: DELETE_METHOD,
  payload: id,
});

// Action creator for setting methods (to be used for initializing state from localStorage)
export const setMethods = (methods: CommunicationMethod[]) => ({
  type: SET_METHODS,
  payload: methods,
});
