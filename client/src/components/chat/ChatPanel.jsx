import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { Card } from '../common/Card.jsx';
import { Textarea } from '../common/Textarea.jsx';
import { formatDate } from '../../utils/formatters.js';

export const ChatPanel = ({ chats, projectId, onSend, loading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    await onSend({ projectId, userMessage: message });
    setMessage('');
  };

  return (
    <Card>
      <h2 className="text-lg font-bold">AI QA Assistant</h2>
      <div className="mt-4 max-h-[420px] space-y-3 overflow-auto rounded-lg border border-slate-200 p-3 dark:border-slate-800">
        {chats.length ? (
          chats.map((chat) => (
            <div key={chat._id} className="space-y-2">
              <div className="rounded-md bg-slate-100 p-3 text-sm dark:bg-slate-800">
                <p className="font-semibold">You</p>
                <p>{chat.userMessage}</p>
              </div>
              <div className="rounded-md bg-blue-50 p-3 text-sm dark:bg-blue-950/30">
                <p className="font-semibold">Assistant</p>
                <pre>{chat.assistantMessage}</pre>
                <p className="mt-2 text-xs text-slate-500">{formatDate(chat.createdAt)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-400">Ask for missing tests, better assertions, or coverage gaps.</p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <Textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Identify missing edge cases" />
        <Button type="submit" disabled={!message.trim() || loading}>
          <Send size={16} />
          Send
        </Button>
      </form>
    </Card>
  );
};

