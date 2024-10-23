import styles from "./message.module.scss";

interface Data {
  message: string;
  isCurrentUserMessage: boolean;
}

export default function Message(Data: Data) {

  return (
    <>
      {Data.isCurrentUserMessage ? (
        <div className={`${styles.ActiveUserMessage} ${styles.Message}`}><p>{Data.message}</p></div>
      ) : (
        <div className={`${styles.OtherUserMessage} ${styles.Message}`}><p>{Data.message}</p></div>
      )}
    </>
  );
}
