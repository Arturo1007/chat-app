import { SideBarUserType } from '../../types/userTypes';
import styles from './user_box.module.scss';
import useConversation from '../../zustand/useConversations';
export default function (user: SideBarUserType) {

  const {setSelectedConversation, selectedConversation} = useConversation();

  const isSelected = selectedConversation?.id === user.id;

  async function handleActivation() {
    if(isSelected){
      setSelectedConversation(null);
    }
    else {
      const {id, fullName, profilePic} = user;
      setSelectedConversation({id, fullName, profilePic});
    }
  }; 

  return (
    <div className={`${styles.userBoxContainer} ${isSelected ? styles.selected : ''}`} tabIndex={0} onClick={handleActivation} >
      <div className={styles.profileImageContainer}> <img src={user.profilePic} alt="User profile picture" /></div>
      <div className={styles.dataContainer}>
        <div><span className='isOnline'></span><p>{user.fullName}</p></div>
        <small className={styles.lastMessage}>Last message...</small>
      </div>
    </div>
  )
}
