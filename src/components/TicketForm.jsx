// src/components/TicketForm.jsx
import React, { useState } from 'react';

export default function TicketForm({ onSubmit, initial = {} }) {
  const [title, setTitle] = useState(initial.title || '');
  const [description, setDescription] = useState(initial.description || '');

  const handle = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onSubmit(
      { title, description, status: initial.id ? initial.status : 'Open' },
      initial.id
    );
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handle} className="border rounded p-4 shadow-sm">
      <div className="mb-2">
        <label htmlFor="title" className="block text-sm">Title</label>
        <input
            id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-1"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="description" className="block text-sm">Description</label>
        <textarea
        id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-1"
          required
        />
      </div>
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
        {initial.id ? 'Update Ticket' : 'Create Ticket'}
      </button>
    </form>
  );
}

