import styles from "./app_container.module.scss";
import UserBox from "../UserBox/UserBox";
import ChatContainer from "../ChatContainer/ChatContainer";
import logOutIcon from "../../assets/icons/logout.png";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { SideBarUserType } from "../../types/userTypes";
import useConversation from "../../zustand/useConversations";
import NoChatSelectedContainer from "../NoChatSelectedContainer/NoChatSelectedContainer";

export default function AppContainer() {
  const [sidebarUsers, setSideBarUser] = useState<SideBarUserType[]>([]);
  const { setAuthUser, authUser } = useAuthContext();
  const {selectedConversation} = useConversation();

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
    <div className={styles.AppContainer}>
      <div className={styles.UserListSection}>
        <div className={styles.TopSection}>
          <div className={styles.FirstRow}>
            <button className={styles.LogOutButton} onClick={handleLougOut}>
              <img src={logOutIcon} alt="Log out Icon" title="Log out"/>
            </button>
            <img src={authUser?.profilePic} alt="User Avatar" className={styles.MessageImage} />
            <h2>{authUser?.fullName}</h2>
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
        {selectedConversation ? <ChatContainer /> : <NoChatSelectedContainer /> }
      </div>
    </div>
  );
}
