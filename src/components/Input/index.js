import React from 'react'
import styles from './input.module.css'
import cn from 'classnames'
export default function index({ referance, className, ...props }) {
  return (
    <input className={cn(styles.input, className)} ref={referance} {...props} />
  )
}
