import React from 'react'
import styles from './card.module.css'
import cn from 'classnames'

const Title = ({ children }) => children;
Title.displayName = 'Title';


const Body = ({ children }) => children;
Body.displayName = 'Body';

const Warning = ({ children }) => children;
Warning.displayName = 'Warning';

index.Title = Title;
index.Body = Body;
index.Warning = Warning;



export default function index({ className, children }) {

    const title = React.Children.map(children, child => child.type.displayName === 'Title' ? child : null)
    const body = React.Children.map(children, child => child.type.displayName === 'Body' ? child : null)
    const warning = React.Children.map(children, child => child.type.displayName === 'Warning' ? child : null)




    return (
        <div className={cn(styles.card, className)}>
            <div className={styles.title}>{title}</div>
            <div className={styles.body}>{body}</div>
            <div className={styles.warning}>{warning}</div>

        </div>
    )
}
