import React, { useState } from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

interface Contact {
    Id?: number;
    Name: string;
    ContactNumber: string;
    Email: string;
}
const App: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectContact = async (contactId: number) => {
    try {
      const response = await axios.get<Contact>(`/api/contacts/${contactId}`);
      setSelectedContact(response.data);
      setError(null);
    } catch (error:any) {
      setError(error.message);
    }
  };

  const handleSubmitContact = async (contactData: Contact) => {
    try {
      if (selectedContact) {
        await axios.put(`http://localhost:5000/api/ContactController/${selectedContact.Id}`, contactData);
      } else {
        await axios.post('/api/contacts', contactData);
      }
      // Refresh contact list
      setSelectedContact(null);
      await getAllContacts();
    } catch (error:any) {
      setError(error.message);
    }
  };

  const handleDeleteContact = async (contactId: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/ContactController/${contactId}`);
      // Refresh contact list
      await getAllContacts();
      setSelectedContact(null);
    } catch (error:any) {
      setError(error.message);
    }
  };

  const getAllContacts = async () => {
    try {
      const response = await axios.get<Contact[]>('/api/contacts');
      setError(null);
      return response.data;
    } catch (error:any) {
      setError(error.message);
      return [];
    }
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <ContactList onSelect={handleSelectContact}></ContactList>
      <ContactForm contact={selectedContact} onSubmit={handleSubmitContact} />
      {selectedContact && (
        <button onClick={() => handleDeleteContact(selectedContact.Id?selectedContact.Id : 0)}>Delete Contact</button>
      )}
    </div>
  );
};

export default App;
