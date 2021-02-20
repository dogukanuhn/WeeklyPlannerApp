import React from 'react'
import styles from './card.module.css'
import cn from 'classnames'

const Title = ({ children }) => children
Title.displayName = 'Title'

const Body = ({ children }) => children
Body.displayName = 'Body'

const Warning = ({ children, className }) => children
Warning.displayName = 'Warning'

index.Title = Title
index.Body = Body
index.Warning = Warning

export default function index({ className, children }) {
  const title = React.Children.map(children, (child) =>
    child.type.displayName === 'Title' ? child : null
  )
  const body = React.Children.map(children, (child) =>
    child.type.displayName === 'Body' ? child : null
  )
  const warning = React.Children.map(children, (child) =>
    child.type.displayName === 'Warning' ? child : null
  )
  console.log(warning)
  return (
    <div className={cn(styles.card, className)}>
      {title.length > 0 && <div className={styles.title}>{title}</div>}
      <div className={styles.body}>{body}</div>

      {warning.length > 0 && (
        <div className={cn(styles.warning, warning[0].props.className)}>
          {warning}
        </div>
      )}
    </div>
  )
}
