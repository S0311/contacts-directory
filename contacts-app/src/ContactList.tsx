import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Contact {
  Id: number;
  Name: string;
  ContactNumber: string;
  Email: string;
}

interface ContactListProps {
  onSelect: (contactId: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onSelect }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllContacts();
  }, []);

  const getAllContacts = async () => {
    try {
      const response = await axios.get<Contact[]>('http://localhost:5000/api/ContactController');
      setContacts(response.data);
    } catch (error:any) {
      setError(error.message);
    }
  };

  const handleSelect = (contactId: number) => {
    onSelect(contactId);
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.Id} onClick={() => handleSelect(contact.Id)}>
            {contact.Name} {contact.ContactNumber} {contact.Email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
