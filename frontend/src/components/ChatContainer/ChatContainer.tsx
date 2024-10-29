import styles from "./chat_container.module.scss";
import UserBox from "../UserBox/UserBox";
import Chat from "../Conversation/Conversation";
import logOutIcon from "../../assets/icons/logout.png";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

export default function ChatContainer() {
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

  return (
    <div className={styles.ChatContainer}>
      <div className={styles.UserListSection}>
        <div className={styles.TopSection}>
          <div>
            <button className={styles.LogOutButton} onClick={handleLougOut}>
              <img src={logOutIcon} alt="Log out Icon" />
            </button>
            <h2>Users list</h2>
          </div>

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
        </div>
      </div>
      <div className={styles.ChattingSection}>
        <Chat />
      </div>
    </div>
  );
}
