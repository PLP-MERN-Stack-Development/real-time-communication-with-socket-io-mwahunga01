import { useState } from 'react';

export default function Login({ onJoin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onJoin(username.trim());
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Join Chat
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-500 text-lg"
          autoFocus
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition text-lg"
        >
          Join Chat Room
        </button>
      </form>
    </div>
  );
}
