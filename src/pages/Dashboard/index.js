import axios from 'axios'
import Board from 'components/Board'
import Button from 'components/Button'
import Input from 'components/Input'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import styles from './dash.module.css'
export default function Index() {
  const user = useSelector((state) => state['auth'].user)

  const [selectedTeam, setSelectedTeam] = useState(0)

  const [boards, setBoards] = useState([])

  const { register, handleSubmit } = useForm()

  const getTeams = () => {
    axios.get('https://localhost:5001/api/Dashboard/teams').then((x) => {
      if (!x.data.hasError) setBoards(x.data.teams)
    })
  }
  useEffect(() => {
    getTeams()
  }, [])

  const createDashboard = (data) => {
    console.log(data.teamName)
    axios
      .post('https://localhost:5001/api/Dashboard', {
        team: data.teamName,
        tables: ['Yapılacaklar', 'Tamamlanmış']
      })
      .then((x) => {
        if (!x.data.hasError) {
          getTeams()
        }
      })
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.team}>
        <div>
          <form id="1" onSubmit={handleSubmit(createDashboard)}>
            <Input
              className={styles.teamInput}
              name="teamName"
              placeholder="Takım Adı"
              referance={register({ required: true })}
            />
            <Button className={styles.addTeamButton}>Takım Ekle</Button>
          </form>
        </div>
        <div></div>
        <div className={styles.teams}>
          {boards &&
            boards.map((x, i) => {
              return (
                <Button
                  className={selectedTeam === i && styles.selectedTab}
                  onClick={(x) => setSelectedTeam(i)}
                >
                  {x}
                </Button>
              )
            })}
        </div>
      </div>

      <Board team={boards[selectedTeam]} />
    </div>
  )
}
