import Header from 'components/Header'
import React from 'react'
import styles from './layout.module.css'
export default function index({ children }) {
  return (
    <div>
      <Header />
      <div
        className={styles.main}
        style={{ backgroundImage: "url('images/hand.svg')" }}
      >
        {children}
      </div>
    </div>
  )
}
