import React from "react";
import styles from "./chat_container.module.scss";
import UserBox from "../UserBox/UserBox";
import Chat from "../Conversation/Conversation";

export default function ChatContainer() {
  return (
    <div className={styles.ChatContainer}>
      <div className={styles.UserListSection}>
        <div className={styles.TopSection}>
          <h2>List of Users</h2>
          <label className={styles.Search}>
            Search: <input type="text" placeholder="Look for.." />
          </label>
        </div>
        <div className={styles.ListOfUsers}>
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
        </div>
      </div>
      <div className={styles.ChattingSection}> 
        <Chat />
      </div>
    </div>
  );
}
