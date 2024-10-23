import styles from "./message.module.scss";

interface Data {
  message: string;
  isCurrentUserMessage: boolean;
  imageLink: string;
}

export default function Message(Data: Data) {
  return (
    <>
      {Data.isCurrentUserMessage ? (
        <div className={`${styles.ActiveUserMessage} ${styles.Message}`}><p>{Data.message}</p><img src={Data.imageLink} alt="User Avatar" className={styles.MessageImage} /></div>
      ) : (
        <div className={`${styles.OtherUserMessage} ${styles.Message}`}><img src={Data.imageLink} alt="User Avatar" className={styles.MessageImage} /><p>{Data.message}</p></div>
      )}
    </>
  );
}
