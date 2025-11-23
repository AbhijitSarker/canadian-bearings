"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, Loader2, User, Headphones } from "lucide-react";
import { addMessageToCase, getSupportCaseDetails } from "@/lib/api/services/support";
import toast from "react-hot-toast";

export default function SupportCaseSidebar({ caseId, onClose, onUpdate }) {
  const [caseDetails, setCaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (caseId) {
      fetchDetails();
    }
  }, [caseId]);

  useEffect(() => {
    scrollToBottom();
  }, [caseDetails?.messages]);

  const fetchDetails = async () => {
    setLoading(true);
    const res = await getSupportCaseDetails(caseId);
    if (res.success) {
      setCaseDetails(res.data);
    } else {
      toast.error(res.error);
    }
    setLoading(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setSending(true);
    const res = await addMessageToCase(caseDetails.uniqueId, messageText);
    if (res.success) {
      setMessageText("");
      // Refresh details to show new message
      await fetchDetails();
      if (onUpdate) onUpdate();
    } else {
      toast.error(res.error);
    }
    setSending(false);
  };

  if (!caseId) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 transition-opacity" onClick={onClose}>
      <div 
        className="w-full max-w-md h-full bg-white shadow-xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white z-10">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Case Details</h2>
            {caseDetails && <p className="text-xs text-gray-500">{caseDetails.caseNo}</p>}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition">
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          </div>
        ) : caseDetails ? (
          <>
            {/* Case Info */}
            <div className="p-4 bg-gray-50 border-b border-gray-100 space-y-3">
              <h3 className="font-medium text-gray-900">{caseDetails.title}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500 text-xs block">Status</span>
                  <span className="font-medium text-gray-900">{caseDetails.statusLabel}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-xs block">Priority</span>
                  <span className="font-medium text-gray-900">{caseDetails.priorityLabel}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-xs block">Category</span>
                  <span className="font-medium text-gray-900">{caseDetails.categoryLabel}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-xs block">Date</span>
                  <span className="font-medium text-gray-900">{new Date(caseDetails.dateCreated).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
              {caseDetails.messages && caseDetails.messages.length > 0 ? (
                caseDetails.messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.isFromSupport ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`flex max-w-[85%] ${msg.isFromSupport ? 'flex-row' : 'flex-row-reverse'} gap-2`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.isFromSupport ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                        {msg.isFromSupport ? <Headphones size={14} /> : <User size={14} />}
                      </div>
                      <div>
                        <div 
                          className={`p-3 rounded-lg text-sm ${
                            msg.isFromSupport 
                              ? 'bg-gray-100 text-gray-800 rounded-tl-none' 
                              : 'bg-green-50 text-gray-800 rounded-tr-none border border-green-100'
                          }`}
                        >
                          {msg.messageText}
                        </div>
                        <div className={`text-[10px] text-gray-400 mt-1 ${msg.isFromSupport ? 'text-left' : 'text-right'}`}>
                          {new Date(msg.sentAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400 text-sm">
                  No messages yet. Start the conversation!
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={sending}
                />
                <button 
                  type="submit" 
                  disabled={!messageText.trim() || sending}
                  className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="p-4 text-center text-red-500">Failed to load case details</div>
        )}
      </div>
    </div>
  );
}
