import React, { useRef, useState, useEffect } from "react";
import styles from "./chat_container.module.scss";
import Message from "../Message/Message";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversations";
import axios from "axios";

export default function Conversation() {

  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const {authUser} = useAuthContext();
  const {messages, setMessages, selectedConversation} = useConversation();

  const handleTextAreaSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }

  const handleSubmit = async () => {
    try {
      const trimedMessage = message.trim();
      const payload: {message: string} = {
        message: trimedMessage,
      };
      if(!trimedMessage) return

      const {data} = await axios.post(`/api/messages/send/${selectedConversation?.id}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      setMessages([...messages, data]);
      setMessage('');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if(error.response.data.error != "Message is empty"){
          alert(error.response.data.error);
        }
      } else {
        alert("An unexpected error ocurred, please try again later.");
        console.log(error);
      }
    }
  }

  // Scroll to the bottom whenever the messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={styles.ChatContainer}>
      <div className={styles.topSection}>
        <span className="isOnline"></span>
        <p>{selectedConversation?.fullName}</p>
      </div>
      <div className={styles.messagesSection}>
        {(messages?.length) ? 
        messages.map((message)=> {
          let isCurrentUserMessage = false;
          let profileImage = selectedConversation?.profilePic;
          if(authUser?.id === message.senderId) {
            isCurrentUserMessage = true  ;
            profileImage = authUser.profilePic;
          }
          return <Message key={message.id} createAt={message.createAt} message={message.body} isCurrentUserMessage={isCurrentUserMessage} imageLink={profileImage} />
        }) : ''}       
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
        <button type="submit" onClick={handleSubmit}></button>
      </div>
    </div>
  );
}
