import { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button'; // Assuming Button is a custom component
import type { CommunicationMethod } from '../types'; // Ensure correct import

export function Settings() {
  const [methods, setMethods] = useState<CommunicationMethod[]>([]); // Temporarily store methods in state
  const [methodName, setMethodName] = useState('');
  const [methodDescription, setMethodDescription] = useState('');
  const [methodSequence, setMethodSequence] = useState(1);
  const [isMandatory, setIsMandatory] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false); // Control visibility of the form
  const [searchTerm, setSearchTerm] = useState(''); // Search filter for methods

  // Dummy data setup (can be removed when using real data source like API or localStorage)
  useEffect(() => {
    const dummyData: CommunicationMethod[] = [
      { id: '1', name: 'Phone Call', description: 'Calling via phone', sequence: 1, isMandatory: true },
      { id: '2', name: 'Email', description: 'Sending email messages', sequence: 2, isMandatory: false },
      { id: '3', name: 'LinkedIn', description: 'Connecting via LinkedIn', sequence: 3, isMandatory: false },
    ];
    setMethods(dummyData); // Set the dummy data as initial state
  }, []);

  // Handle adding a new method
  const handleAddMethod = () => {
    if (!methodName || !methodDescription) {
      alert('Please fill in all fields.');
      return;
    }

    const newMethod: CommunicationMethod = {
      id: Math.random().toString(), // Generate a random ID (you might want a more reliable ID system)
      name: methodName,
      description: methodDescription,
      sequence: methodSequence,
      isMandatory: isMandatory,
    };

    setMethods([...methods, newMethod]); // Add the new method to the current state

    // Clear the input fields after adding
    setMethodName('');
    setMethodDescription('');
    setMethodSequence(1);
    setIsMandatory(false);
    setIsFormVisible(false); // Hide form after saving
  };

  // Handle deleting a method
  const handleDeleteMethod = (id: string) => {
    setMethods(methods.filter((method) => method.id !== id)); // Remove method from state
  };

  // Filter methods based on search term
  const filteredMethods = methods.filter((method) =>
    method.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-900">Communication Methods</h2>
        <p className="mt-1 text-sm text-gray-500">
          Configure the types of communication methods available in the system.
        </p>

        <div className="mt-6">
          <Button variant="primary" onClick={() => setIsFormVisible(!isFormVisible)}>
            {isFormVisible ? 'Cancel' : 'Add Method'}
          </Button>

          {/* Show form when isFormVisible is true */}
          {isFormVisible && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900">Add New Method</h3>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Select Method</label>
                <select
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={methodName}
                  onChange={(e) => setMethodName(e.target.value)}
                >
                  <option value="">Select a method</option>
                  <option value="Phone Call">Phone Call</option>
                  <option value="Email">Email</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={methodDescription}
                  onChange={(e) => setMethodDescription(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Sequence</label>
                <input
                  type="number"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={methodSequence}
                  onChange={(e) => setMethodSequence(Number(e.target.value))}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Mandatory</label>
                <input
                  type="checkbox"
                  checked={isMandatory}
                  onChange={(e) => setIsMandatory(e.target.checked)}
                  className="mt-1"
                />
              </div>

              <div className="mt-6 flex justify-end">
                <Button variant="primary" onClick={handleAddMethod}>
                  Add Method
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search methods..."
            className="block w-full px-4 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Displaying the Saved Methods below the form */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900">Saved Communication Methods</h3>
          <p className="text-sm text-gray-500">Below are the communication methods that have been saved:</p>

          <div className="mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Sequence</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Mandatory</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMethods.length > 0 ? (
                  filteredMethods.map((method) => (
                    <tr key={method.id}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{method.name}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{method.description}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{method.sequence}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{method.isMandatory ? 'Yes' : 'No'}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <Button variant="danger" onClick={() => handleDeleteMethod(method.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-sm text-gray-500">
                      No methods available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
