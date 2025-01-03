import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from './slices/companiesSlice';
import communicationsReducer from './slices/communicationsSlice';
import methodsReducer from './slices/methodsSlice';

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    communications: communicationsReducer,
    methods: methodsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;