import Card from 'components/Card'
import Input from 'components/Input'
import React, { useState } from 'react'
import styles from './cdashboard.module.css'

export default function Index() {
  const [team, setTeam] = useState(null)
  const [tables, setTables] = useState([''])

  return (
    <div>
      <Card className={styles.teamCard}>
        <Card.Body>
          <Input placeholder="Takım adını belirtiniz " />
        </Card.Body>
        <Card.Warning className={styles.teamCardWarning}>
          <div className="warning-content">
            Dashboard ekranında daha fazla takım ekleyebilirsiniz
          </div>
        </Card.Warning>
      </Card>
      {tables.map((x, i) => {
        return (
          <Card className={styles.tableCard} key={i}>
            <Card.Title>{i + 1}. Kart</Card.Title>
          </Card>
        )
      })}
    </div>
  )
}
