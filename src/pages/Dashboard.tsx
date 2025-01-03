import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react'; // For the new communication button icon

export function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal visibility
  const [selectedCommunication, setSelectedCommunication] = useState<any | null>(null); // State to hold the selected communication
  const [newCommunication, setNewCommunication] = useState<any>({
    companyId: '',
    date: selectedDate,
    details: '',
    status: 'pending',
  }); // State for the new communication form

  // Load communications from localStorage on initial render
  const loadCommunications = () => {
    const savedCommunications = localStorage.getItem('communications');
    return savedCommunications ? JSON.parse(savedCommunications) : [];
  };

  const [communications, setCommunications] = useState(loadCommunications()); // State for the list of communications

  // Map communications to events for FullCalendar
  const events = communications.map(comm => ({
    id: comm.id,
    title: `Communication with ${comm.companyId}`,
    date: comm.date,
    backgroundColor:
      comm.status === 'completed' ? '#10B981' :
      comm.status === 'overdue' ? '#EF4444' : '#F59E0B',
    extendedProps: {
      details: comm.details, // Store additional information in the event
    },
  }));

  useEffect(() => {
    // Update localStorage whenever communications change
    localStorage.setItem('communications', JSON.stringify(communications));
  }, [communications]);

  const handleLogCommunication = () => {
    // Open modal when button is clicked
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setIsModalOpen(false);
    setNewCommunication({ companyId: '', date: selectedDate, details: '', status: 'pending' }); // Reset form
  };

  const handleCommunicationDetails = (comm: any) => {
    // Set the selected communication for details view
    setSelectedCommunication(comm);
  };

  const handleSaveCommunication = () => {
    // Ensure date is serialized correctly
    const communicationToSave = {
      ...newCommunication,
      date: newCommunication.date ? newCommunication.date.toISOString() : '',
      id: new Date().getTime(), // Generate a unique ID based on the current timestamp
    };
    
    // Add the new communication to the state (which will update localStorage)
    setCommunications([...communications, communicationToSave]);
    handleCloseModal(); // Close the modal after saving
  };

  const handleDeleteCommunication = (id: number) => {
    // Filter out the communication with the given id
    const updatedCommunications = communications.filter(comm => comm.id !== id);
    setCommunications(updatedCommunications); // Update the state
    if (selectedCommunication?.id === id) {
      setSelectedCommunication(null); // Close the details modal if it was showing this communication
    }
  };

  const overdueCommunications = communications.filter(comm => comm.status === 'overdue');
  const dueTodayCommunications = communications.filter(comm => new Date(comm.date).toLocaleDateString() === new Date().toLocaleDateString());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Button onClick={handleLogCommunication}>
          <Plus className="mr-2 h-4 w-4" />
          New Communication
        </Button>
      </div>

      {/* Notification Section */}
      <div className="flex space-x-6">
        <div className="bg-red-100 p-4 rounded-lg flex-1">
          <h3 className="font-semibold text-gray-700">Overdue Communications</h3>
          <ul className="mt-2">
            {overdueCommunications.length === 0 ? (
              <li>No overdue communications</li>
            ) : (
              overdueCommunications.map(comm => (
                <li key={comm.id} className="flex justify-between items-center">
                  {`Company: ${comm.companyId}, Date: ${new Date(comm.date).toLocaleDateString()}`}
                  <Button onClick={() => handleDeleteCommunication(comm.id)} variant="danger" className="ml-2">Delete</Button>
                  <Button onClick={() => handleCommunicationDetails(comm)} variant="outline" className="ml-2">View Details</Button>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg flex-1">
          <h3 className="font-semibold text-gray-700">Today’s Communications</h3>
          <ul className="mt-2">
            {dueTodayCommunications.length === 0 ? (
              <li>No communications due today</li>
            ) : (
              dueTodayCommunications.map(comm => (
                <li key={comm.id} className="flex justify-between items-center">
                  {`Company: ${comm.companyId}, Date: ${new Date(comm.date).toLocaleDateString()}`}
                  <Button onClick={() => handleDeleteCommunication(comm.id)} variant="danger" className="ml-2">Delete</Button>
                  <Button onClick={() => handleCommunicationDetails(comm)} variant="outline" className="ml-2">View Details</Button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <FullCalendar
          key={communications.length} // Forces re-render when communications change
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek',
          }}
          height="auto"
          selectable={true}
          select={(info) => setSelectedDate(info.start)}
          eventClick={(info) => handleCommunicationDetails(info.event)}
        />
      </div>

      {/* Communication Details Modal */}
      {selectedCommunication && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Communication Details</h2>
            <div className="space-y-4">
              <div>
                <strong>Company ID: </strong>{selectedCommunication.companyId}
              </div>
              <div>
                <strong>Date: </strong>{new Date(selectedCommunication.date).toLocaleDateString()}
              </div>
              <div>
                <strong>Status: </strong>{selectedCommunication.status}
              </div>
              <div>
                <strong>Details: </strong>
                <p>{selectedCommunication.details}</p>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button onClick={() => setSelectedCommunication(null)} variant="secondary">Close</Button>
              <Button onClick={() => handleDeleteCommunication(selectedCommunication.id)} variant="danger">Delete</Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for logging new communication */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Log Communication</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Company ID</label>
                <input
                  type="text"
                  value={newCommunication.companyId}
                  onChange={(e) => setNewCommunication({ ...newCommunication, companyId: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium">Date</label>
                <input
                  type="date"
                  value={newCommunication.date ? newCommunication.date.toISOString().split('T')[0] : ''}
                  onChange={(e) => setNewCommunication({ ...newCommunication, date: new Date(e.target.value) })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium">Details</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter communication details..."
                  rows={4}
                  value={newCommunication.details}
                  onChange={(e) => setNewCommunication({ ...newCommunication, details: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-medium">Status</label>
                <select
                  value={newCommunication.status}
                  onChange={(e) => setNewCommunication({ ...newCommunication, status: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <Button onClick={handleCloseModal} variant="secondary">Cancel</Button>
              <Button onClick={handleSaveCommunication}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
