// // src/services/api.ts

// // Function to fetch companies from the API
// export const fetchCompanies = async () => {
//     try {
//       const response = await fetch('/api/companies');  // Adjust the endpoint as needed
//       if (!response.ok) {
//         throw new Error('Failed to fetch companies');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching companies:', error);
//       throw error; // Rethrow error to be handled by the caller
//     }
//   };
  
//   // Function to log communication
//   export const logCommunication = async (companyId: string, communicationDetails: any) => {
//     try {
//       const response = await fetch('/api/logs', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ companyId, ...communicationDetails }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to log communication');
//       }
  
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error logging communication:', error);
//       throw error;
//     }
//   };
  