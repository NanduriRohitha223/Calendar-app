import { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export function Companies() {
  const [companies, setCompanies] = useState(() => {
    const savedCompanies = localStorage.getItem('companies');
    return savedCompanies ? JSON.parse(savedCompanies) : [];
  });

  const [isAddingCompany, setIsAddingCompany] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState(null);
  const [newCompany, setNewCompany] = useState({
    id: '',
    name: '',
    location: '',
    linkedinProfile: '',
    lastCommunication: new Date().toISOString(),
    nextCommunication: new Date().toISOString(),
    communicationPeriodicity: '14',
    communicationMethods: ['LinkedIn Post', 'Email'],
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies]);

  const handleAddCompany = () => {
    const companyToAdd = {
      ...newCompany,
      id: new Date().toISOString(),
      lastCommunication: new Date(newCompany.lastCommunication).toISOString(),
      nextCommunication: new Date(newCompany.nextCommunication).toISOString(),
    };
    setCompanies((prevCompanies) => [...prevCompanies, companyToAdd]);
    setIsAddingCompany(false);
    setNewCompany({
      id: '',
      name: '',
      location: '',
      linkedinProfile: '',
      lastCommunication: new Date().toISOString(),
      nextCommunication: new Date().toISOString(),
      communicationPeriodicity: '14',
      communicationMethods: ['LinkedIn Post', 'Email'],
      notes: ''
    });
  };

  const handleDeleteCompany = (id) => {
    const updatedCompanies = companies.filter((company) => company.id !== id);
    setCompanies(updatedCompanies);
  };

  const handleUpdateCompany = (company) => {
    setCompanyToEdit(company);
    setNewCompany({
      ...company,
      lastCommunication: new Date(company.lastCommunication).toISOString(),
      nextCommunication: new Date(company.nextCommunication).toISOString(),
      notes: company.notes || ''
    });
    setIsAddingCompany(true);
  };

  const handleSaveUpdate = () => {
    const updatedCompany = {
      ...newCompany,
      lastCommunication: new Date(newCompany.lastCommunication).toISOString(),
      nextCommunication: new Date(newCompany.nextCommunication).toISOString(),
    };
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      )
    );
    setIsAddingCompany(false);
    setCompanyToEdit(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
        <Button onClick={() => setIsAddingCompany(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {companyToEdit ? 'Edit Company' : 'Add Company'}
        </Button>
      </div>

      {isAddingCompany && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{companyToEdit ? 'Edit Company' : 'Add New Company'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Company Name</label>
                <input
                  type="text"
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium">Location</label>
                <input
                  type="text"
                  value={newCompany.location}
                  onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium">LinkedIn Profile</label>
                <input
                  type="text"
                  value={newCompany.linkedinProfile}
                  onChange={(e) => setNewCompany({ ...newCompany, linkedinProfile: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium">Last Communication</label>
                <input
                  type="date"
                  value={newCompany.lastCommunication.split('T')[0]}
                  onChange={(e) => setNewCompany({ ...newCompany, lastCommunication: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium">Next Communication</label>
                <input
                  type="date"
                  value={newCompany.nextCommunication.split('T')[0]}
                  onChange={(e) => setNewCompany({ ...newCompany, nextCommunication: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium">Communication Periodicity (Days)</label>
                <input
                  type="number"
                  value={newCompany.communicationPeriodicity}
                  onChange={(e) => setNewCompany({ ...newCompany, communicationPeriodicity: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium">Notes</label>
                <textarea
                  value={newCompany.notes}
                  onChange={(e) => setNewCompany({ ...newCompany, notes: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <Button variant="secondary" onClick={() => setIsAddingCompany(false)}>
                Cancel
              </Button>
              <Button onClick={companyToEdit ? handleSaveUpdate : handleAddCompany}>
                {companyToEdit ? 'Save Changes' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Last Communication</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Next Due</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Notes</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {companies.length > 0 ? (
              companies.map((company) => (
                <tr key={company.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="font-medium text-gray-900">{company.name}</div>
                    <div className="text-sm text-gray-500">{company.linkedinProfile}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{company.location}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(company.lastCommunication).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(company.nextCommunication).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{company.notes}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <Button variant="secondary" size="sm" className="mr-2" onClick={() => handleUpdateCompany(company)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteCompany(company.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-sm text-gray-500">No companies available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
