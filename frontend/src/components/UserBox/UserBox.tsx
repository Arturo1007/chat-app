import React from 'react'
import styles from './user_box.module.scss';
export default function () {
  return (
    <div className={styles.userBoxContainer} tabIndex={0} >
      <div className={styles.profileImageContainer}> <img src="https://d22e6o9mp4t2lx.cloudfront.net/cms/pfp2_11cfcec183.webp" alt="" /></div>
      <div className={styles.dataContainer}>
        <div><span className='isOnline'></span><p>Arturo Batista Quiroz</p></div>
        <small className={styles.lastMessage}>Last message...</small>
      </div>
    </div>
  )
}
