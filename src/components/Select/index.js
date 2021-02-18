import React from 'react'
import styles from './select.module.css'
export default function index({ children, reference, ...props }) {
  return (
    <select ref={reference} className={styles.input} {...props}>
      {children}
    </select>
  )
}
