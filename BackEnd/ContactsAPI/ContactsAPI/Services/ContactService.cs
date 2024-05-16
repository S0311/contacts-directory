using ContactsAPI.Models;
using ContactsAPI.Services;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;

public class ContactService : IContactService
{
    private readonly AppDbContext _context;

    public ContactService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Contact>> GetAllContacts()
    {
        return await _context.Contacts.ToListAsync();
    }

    public async Task<Contact> GetContactById(int id)
    {
        return await _context.Contacts.FindAsync(id);
    }

    public async Task<Contact> CreateContact(Contact contact)
    {
        _context.Contacts.Add(contact);
        await _context.SaveChangesAsync();
        return contact;
    }

    public async Task<Contact> UpdateContact(int id, Contact contact)
    {
        if (!_context.Contacts.Any(c => c.Id == id))
            throw new ArgumentException($"Contact with ID {id} not found");

        _context.Entry(contact).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return contact;
    }

    public async Task<bool> DeleteContact(int id)
    {
        var contact = await _context.Contacts.FindAsync(id);
        if (contact == null)
            return false;

        _context.Contacts.Remove(contact);
        await _context.SaveChangesAsync();
        return true;
    }
}
