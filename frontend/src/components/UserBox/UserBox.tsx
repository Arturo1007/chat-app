import { SideBarUserType } from '../../types/userTypes';
import styles from './user_box.module.scss';
export default function (user: SideBarUserType) {
  return (
    <div className={styles.userBoxContainer} tabIndex={0} >
      <div className={styles.profileImageContainer}> <img src={user.profilePic} alt="User profile picture" /></div>
      <div className={styles.dataContainer}>
        <div><span className='isOnline'></span><p>{user.fullName}</p></div>
        <small className={styles.lastMessage}>Last message...</small>
      </div>
    </div>
  )
}
