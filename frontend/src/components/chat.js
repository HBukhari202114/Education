import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
const Chat = ({ sender, receiver }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const messagesEndRef = useRef(null); // Auto-scroll reference
  
    // 🔹 Fetch messages between sender & receiver in real-time
    useEffect(() => {
      if (!sender || !receiver) return;
  
      const q = query(
        collection(db, "messages"),
        where("sender", "in", [sender, receiver]),
        where("receiver", "in", [sender, receiver]),
        orderBy("timestamp", "asc")
      );
  
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  
      return () => unsubscribe();
    }, [sender, receiver]);
  
    // 🔹 Function to send a message
    const sendMessage = async () => {
      if (text.trim()) {
        await addDoc(collection(db, "messages"), {
          sender,
          receiver,
          text,
          timestamp: serverTimestamp(), // 🔥 Firestore Server Timestamp
        });
        setText("");
      }
    };
  
    // 🔹 Auto-scroll to latest message
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
    return (
      <div style={{ maxWidth: "400px", margin: "auto", border: "1px solid #ddd", padding: "10px" }}>
        <h2>Chat with {receiver}</h2>
        <div style={{ height: "300px", overflowY: "scroll", padding: "10px" }}>
          {messages.map((msg, index) => (
            <p key={index}><b>{msg.sender}:</b> {msg.text}</p>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={{ width: "80%" }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    );
  };
  
  export default Chat;
  