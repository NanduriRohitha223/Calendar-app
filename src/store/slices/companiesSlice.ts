import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Company } from '../../types';

interface CompaniesState {
  companies: Company[];
  loading: boolean;
  error: string | null;
}

const initialState: CompaniesState = {
  companies: [],
  loading: false,
  error: null,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<Company>) => {
      const company = action.payload;

      // Convert Date objects to ISO strings
      const companyWithStringDates = {
        ...company,
        lastCommunication: company.lastCommunication.toISOString(),
        nextCommunication: company.nextCommunication.toISOString(),
      };

      state.companies.push(companyWithStringDates);
    },
    updateCompany: (state, action: PayloadAction<Company>) => {
      const updatedCompany = action.payload;
      const index = state.companies.findIndex(c => c.id === updatedCompany.id);

      if (index !== -1) {
        // Convert Date objects to ISO strings
        const companyWithStringDates = {
          ...updatedCompany,
          lastCommunication: updatedCompany.lastCommunication.toISOString(),
          nextCommunication: updatedCompany.nextCommunication.toISOString(),
        };

        state.companies[index] = companyWithStringDates;
      }
    },
    deleteCompany: (state, action: PayloadAction<string>) => {
      state.companies = state.companies.filter(c => c.id !== action.payload);
    },
  },
});

// To handle the conversion of ISO strings back to Date objects
export const selectCompaniesWithDates = (state: { companies: CompaniesState }) => {
  return state.companies.companies.map((company) => ({
    ...company,
    lastCommunication: new Date(company.lastCommunication),
    nextCommunication: new Date(company.nextCommunication),
  }));
};

export const { addCompany, updateCompany, deleteCompany } = companiesSlice.actions;
export default companiesSlice.reducer;
