import styles from "./message.module.scss";

interface Data {
  message: string;
  isCurrentUserMessage: boolean;
  imageLink: string | undefined;
  createAt: string;
}

export default function Message(Data: Data) {
  const dateTimeString = Data.createAt;
  const date = new Date(dateTimeString);
  const hours = date.getHours(); // Retrieves the hour (0-23)
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensures two digits for minutes
  return (
    <>
      {Data.isCurrentUserMessage ? (
        <div className={`${styles.ActiveUserMessage} ${styles.Message}`}><p>{Data.message}</p><img src={Data.imageLink} alt="User Avatar" className={styles.MessageImage} /><small className={styles.Time}>{`${hours} : ${minutes}`}</small></div>
      ) : (
        <div className={`${styles.OtherUserMessage} ${styles.Message}`}><img src={Data.imageLink} alt="User Avatar" className={styles.MessageImage} /><p>{Data.message}</p><small className={styles.Time}>{`${hours} : ${minutes}`}</small></div>
      )}
    </>
  );
}
