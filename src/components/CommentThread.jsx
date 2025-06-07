
// src/components/CommentThread.jsx
import React, { useState, useEffect } from 'react';
import * as api from '../api/tickets';

export default function CommentThread({ ticket }) {
  const [comments, setComments] = useState(ticket.comments || []);
  const [text, setText] = useState('');

  const fetchComments = async () => {
    try {
      const { data } = await api.getTickets(ticket.status);
      const updated = data.find((t) => t.id === ticket.id);
      setComments(updated.comments || []);
    } catch (err) {
      console.error('Failed to fetch comments', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await api.addComment(ticket.id, { text });
    setText('');
    fetchComments();
  };

  return (
    <div className="mt-4 border-t pt-2">
      <h4 className="font-medium">Comments</h4>
      {comments.map((c) => (
        <div key={c.id} className="text-sm text-gray-800 mt-1">
          <p>{c.text}</p>
          <p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</p>
        </div>
      ))}
      <form onSubmit={handleAdd} className="mt-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border rounded p-1"
          placeholder="Add a comment"
        />
        <button type="submit" className="mt-1 px-3 py-1 bg-green-600 text-white rounded text-sm">
          Post Comment
        </button>
      </form>
    </div>
  );
}

