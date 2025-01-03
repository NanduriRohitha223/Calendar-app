// src/store/slices/methodsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommunicationMethod } from '../../types'; // Assuming types are defined


interface MethodsState {
  methods: CommunicationMethod[];
  loading: boolean;
  error: string | null;
}

const initialState: MethodsState = {
  methods: [],
  loading: false,
  error: null,
};

const methodsSlice = createSlice({
  name: 'methods',
  initialState,
  reducers: {
    // Action to set methods data
    setMethods(state, action: PayloadAction<CommunicationMethod[]>) {
      state.methods = action.payload;
    },
    // Action to add a new communication method
    addMethod(state, action: PayloadAction<CommunicationMethod>) {
      state.methods.push(action.payload);
    },
    // Action to update an existing communication method
    updateMethod(state, action: PayloadAction<CommunicationMethod>) {
      const index = state.methods.findIndex(
        (method) => method.id === action.payload.id
      );
      if (index !== -1) {
        state.methods[index] = action.payload;
      }
    },
    // Action to delete a communication method
    deleteMethod(state, action: PayloadAction<string>) {
      state.methods = state.methods.filter(
        (method) => method.id !== action.payload
      );
    },
    // Action to set loading state
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    // Action to set error message
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const {
  setMethods,
  addMethod,
  updateMethod,
  deleteMethod,
  setLoading,
  setError,
} = methodsSlice.actions;

export default methodsSlice.reducer;
