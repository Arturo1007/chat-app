import React, { useRef, useState, useEffect } from "react";
import styles from "./chat.module.scss";
import Message from "../Message/Message";

export default function Chat() {

  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleTextAreaSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
    console.log('Submiting...')
  }

  const handleButtonSubmit = () => {
    console.log('Submiting...')
  }

  // Scroll to the bottom whenever the messages change
  useEffect(() => {
    console.log('hola')
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  return (
    <div className={styles.ChatContainer}>
      <div className={styles.topSection}>
        <span className="isOnline"></span>
        <p>Arturo Batista Quiroz</p>
      </div>
      <div className={styles.messagesSection}>
        <Message message="Hola" isCurrentUserMessage={true} />
        <Message message="Hola BB" isCurrentUserMessage={false} />
        <Message message="Como estas?" isCurrentUserMessage={true} />
        <Message message="Muy bien!" isCurrentUserMessage={false} />
        <Message message="Me alegro rey." isCurrentUserMessage={true} />
        <Message message="Me alegro rey." isCurrentUserMessage={true} />
        <Message message="Me alegro rey." isCurrentUserMessage={true} />
        <Message message="Adios" isCurrentUserMessage={false} />
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputContainer}>
        <textarea
          placeholder="Write a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTextAreaSubmit}
          rows={1}
        ></textarea>
        <button type="submit" onClick={handleButtonSubmit}></button>
      </div>
    </div>
  );
}
