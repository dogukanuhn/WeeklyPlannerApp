import React from 'react'
import styles from './button.module.css'
export default function index({ children, ...props }) {
  return (
    <button className={styles.blackButton} {...props}>
      {children}
    </button>
  )
}
