import { useState } from 'react';
import { useSocket } from '../socket/socket';
import MessageList from './MessageList';
import UserList from './UserList';

export default function Chat() {
  const { messages, users, typingUsers, sendMessage, setTyping, sendPrivateMessage, disconnect } = useSocket();
  const [input, setInput] = useState('');
  const [privateTo, setPrivateTo] = useState(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      if (privateTo) {
        sendPrivateMessage(privateTo.id, input);
        setPrivateTo(null);
      } else {
        sendMessage(input);
      }
      setInput('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-screen max-h-screen">
      <div className="flex-1 flex flex-col">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Chat Room</h1>
            <button onClick={disconnect} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg">
              Leave
            </button>
          </div>
          {privateTo && <p className="mt-2">Private to: <strong>{privateTo.username}</strong></p>}
        </div>

        <MessageList messages={messages} />

        {typingUsers.length > 0 && (
          <div className="px-6 py-2 bg-gray-100 text-sm italic">
            {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
          </div>
        )}

        <form onSubmit={handleSend} className="p-6 bg-gray-50 border-t">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setTyping(e.target.value.length > 0);
              }}
              onBlur={() => setTyping(false)}
              placeholder={privateTo ? `Message ${privateTo.username}...` : "Type a message..."}
              className="flex-1 px-5 py-4 rounded-xl border focus:outline-none focus:ring-4 focus:ring-purple-500"
            />
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold">
              Send
            </button>
          </div>
        </form>
      </div>

      <UserList users={users} onPrivateMessage={setPrivateTo} currentPrivate={privateTo} />
    </div>
  );
}
