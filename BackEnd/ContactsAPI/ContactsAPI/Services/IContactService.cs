using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public interface IContactService
    {
         Task<IEnumerable<Contact>> GetAllContacts();
 Task<Contact> GetContactById(int id);
 Task<Contact> CreateContact(Contact contact);
 Task<Contact> UpdateContact(int id, Contact contact);
 Task<bool> DeleteContact(int id);
        
    }
}
