import React from 'react'
import ChatContainer from '../../components/ChatContainer/ChatContainer'
import styles from './home.module.scss'

export default function Home() {
  return (
    <div className={styles.HomeContainer}> <ChatContainer /></div>
  )
}
