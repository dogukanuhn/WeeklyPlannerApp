import React from 'react'
import styles from './input.module.css'
export default function index({ referance, ...props }) {
  return <input className={styles.input} ref={referance} {...props} />
}
