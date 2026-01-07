import { useState } from "react";
import { useStudyData } from "../data/useStudyData";

export default function QA() {
  const { chat, setChat } = useStudyData();
  const [input, setInput] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setChat((prev) => [...prev, { role: "user", content: input }]);
    // Simulate assistant echo reply
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: `You said: ${input}. (Dummy reply)` },
      ]);
    }, 400);
    setInput("");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Q&A</h2>
      <div className="bg-white rounded-xl border p-4 h-[60vh] overflow-y-auto space-y-3">
        {chat.map((m, idx) => (
          <div key={idx} className={`p-3 rounded-lg ${m.role === 'user' ? 'bg-indigo-50 ml-10' : 'bg-gray-50 mr-10'}`}>
            <div className="text-xs text-gray-500 mb-1">{m.role}</div>
            <div>{m.content}</div>
          </div>
        ))}
      </div>
      <form onSubmit={send} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 border rounded-lg p-3"
        />
        <button className="px-5 py-3 rounded-lg bg-indigo-600 text-white">Send</button>
      </form>
    </div>
  );
}
