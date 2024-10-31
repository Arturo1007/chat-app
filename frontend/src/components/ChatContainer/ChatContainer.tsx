import styles from "./chat_container.module.scss";
import UserBox from "../UserBox/UserBox";
import Chat from "../Conversation/Conversation";
import logOutIcon from "../../assets/icons/logout.png";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { SideBarUserType } from "../../types/userTypes";

export default function ChatContainer() {
  const [sidebarUsers, setSideBarUser] = useState<SideBarUserType[]>([]);
  const { setAuthUser } = useAuthContext();

  async function handleLougOut() {
    try {
      await axios.post("/api/auth/logout");
      setAuthUser(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.error);
      } else {
        alert("An unexpected error ocurred, please try again later.");
        console.log(error);
      }
    } finally {
      setAuthUser(null);
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get<SideBarUserType[]>(
          "/api/messages/sidebarUsers/"
        );
        setSideBarUser(data);
      } catch (error) {
        console.log("Error getting sidebar users");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className={styles.ChatContainer}>
      <div className={styles.UserListSection}>
        <div className={styles.TopSection}>
          <div>
            <button className={styles.LogOutButton} onClick={handleLougOut}>
              <img src={logOutIcon} alt="Log out Icon" title="log out"/>
            </button>
            <h2>Users list</h2>
          </div>

          <label className={styles.Search}>
            Search: <input type="text" placeholder="Look for.." />
          </label>
        </div>
        <div className={styles.ListOfUsers}>
          {sidebarUsers.length > 0 &&
            sidebarUsers.map((user) => (
              <UserBox
                key={user.id}
                id={user.id}
                fullName={user.fullName}
                profilePic={user.profilePic}
              />
            ))}
        </div>
      </div>
      <div className={styles.ChattingSection}>
        <Chat />
      </div>
    </div>
  );
}
