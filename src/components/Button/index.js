import React from 'react'
import styles from './button.module.css'
import cn from 'classnames'
export default function index({ className, children, ...props }) {
  return (
    <button className={cn(styles.blackButton, className)} {...props}>
      {children}
    </button>
  )
}
