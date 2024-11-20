import styles from './no_chat_selected_container.module.scss';
import { useAuthContext } from '../../context/AuthContext';

export default function NoChatSelectedContainer() {
  const {authUser} = useAuthContext();
  return (
    <div className={styles.NoChatSelectedContainer}>
      <h2>Hello {authUser?.fullName}</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos aspernatur rem veritatis. 
      Explicabo nesciunt odio libero porro modi dolores, temporibus velit veritatis voluptas error.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos aspernatur rem veritatis. 
      Explicabo nesciunt odio libero porro modi dolores, temporibu</p>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum, quaerat.</p>
    </div>
  )
}
