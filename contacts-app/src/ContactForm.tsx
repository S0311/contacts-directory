import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Contact {
    Id?: number;
    Name: string;
    ContactNumber: string;
    Email: string;
}

interface ContactFormProps {
  contact: Contact | null;
  onSubmit: (formData: Contact) => Promise<void>;
}

const ContactForm: React.FC<ContactFormProps> = ({ contact, onSubmit }) => {
  const [formData, setFormData] = useState<Contact>({ Name: '', ContactNumber: '', Email: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setError(null);
    } catch (error) {
        let errorMessage: any=error
      setError(errorMessage.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <label>
        Name:
        <input type="text" name="name" value={formData.Name} onChange={handleChange} />
      </label>
      <label>
        Contact Number:
        <input type="text" name="contactNumber" value={formData.ContactNumber} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.Email} onChange={handleChange} />
      </label>
      <button type="submit">{contact ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default ContactForm;
