import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios from 'axios'
import styles from './board.module.css'
import Button from 'components/Button'
import Input from 'components/Input'
import { useForm } from 'react-hook-form'
export default function Index({ team }) {
  const [board, setBoard] = useState(null)

  const { register: register2, handleSubmit: handleSubmit2 } = useForm()

  const [modal, setModal] = useState({ visible: false, table: null })

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone

    return result
  }

  function onDragEnd(result) {
    const { source, destination } = result
    console.log(result)
    // dropped outside the list
    if (!destination) {
      return
    }
    const sInd = +source.droppableId
    const dInd = +destination.droppableId

    const items = Array.from(board)
    if (sInd === dInd) {
      const [reorderedItem] = items[sInd]['assignments'].splice(
        result.source.index,
        1
      )
      items[sInd]['assignments'].splice(
        result.destination.index,
        0,
        reorderedItem
      )
      console.log(items)
      setBoard(items)
    } else {
      const result = move(
        items[sInd]['assignments'],
        items[dInd]['assignments'],
        source,
        destination
      )

      const newState = [...board]
      newState[sInd]['assignments'] = result[sInd]
      newState[dInd]['assignments'] = result[dInd]
      updateDB([newState[sInd], newState[dInd]])
      setBoard(newState)
    }
  }

  const deleteAssignment = (data) => {
    console.log(data)
    axios
      .post(`https://localhost:5001/api/Dashboard/DeleteAssignment`, {
        team: team,
        table: data.table,
        title: data.title
      })
      .then((x) => {
        getDashboard()
      })
  }

  const updateDB = (tables) => {
    axios
      .post(`https://localhost:5001/api/Dashboard/UpdateTables`, {
        team: team,
        tables: tables
      })
      .then((x) => {
        getDashboard()
      })
  }

  const getDashboard = () => {
    axios.get(`https://localhost:5001/api/Dashboard?team=${team}`).then((x) => {
      if (!x.data.hasError) setBoard(x.data.dashboard['tables'])
    })
  }

  useEffect(() => {
    if (team) getDashboard()
  }, [team])

  const { register, handleSubmit, watch, errors } = useForm()

  const createAssignment = (data) => {
    axios
      .post(`https://localhost:5001/api/dashboard/AddAssignment`, {
        tableName: modal.table,
        assignment: {
          title: data.title,
          content: data.content
        },
        team: team
      })
      .then((x) => {
        if (!x.data.hasError) {
          getDashboard()
        }
      })
  }

  const createTable = (data) => {
    axios
      .post('https://localhost:5001/api/Dashboard/CreateTable', {
        team: team,
        tableName: data.tableName
      })
      .then((x) => {
        if (!x.data.hasError) {
          getDashboard()
        }
      })
  }

  return (
    <div>
      <div className={styles.form}>
        <CreateTableComp
          handleSubmit2={handleSubmit2}
          register2={register2}
          createTable={createTable}
        />
      </div>
      <div className={styles.board}>
        {modal.visible && (
          <div className={styles.modal}>
            <div
              className={styles.modalOverlay}
              onClick={() => setModal({ visible: false, table: null })}
            ></div>
            <div className={styles.modalContent}>
              <span className={styles.modalTitle}>Yeni Görev ekle</span>
              <div>
                <CreateAssignmentComp
                  handleSubmit={handleSubmit}
                  register={register}
                  createAssignment={createAssignment}
                />
              </div>
            </div>
          </div>
        )}

        <DragDropContext onDragEnd={onDragEnd}>
          {board &&
            board.map((x, i) => {
              return (
                <Droppable droppableId={`${i}`}>
                  {(provided) => (
                    <ul
                      className={styles.table}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <div className={styles.top}>
                        <span className={styles.tableName}>{x.tableName}</span>

                        <Button
                          className={styles.addButton}
                          onClick={() => {
                            setModal({ visible: true, table: x['tableName'] })
                          }}
                        >
                          EKLE
                        </Button>
                      </div>
                      {board &&
                        x['assignments'].map((y, i) => {
                          return (
                            <DraggableComp
                              i={i}
                              y={y}
                              x={x}
                              deleteAssignment={deleteAssignment}
                            />
                          )
                        })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              )
            })}
        </DragDropContext>
      </div>
    </div>
  )
}

export const CreateTableComp = ({ handleSubmit2, register2, createTable }) => {
  return (
    <form id="2" onSubmit={handleSubmit2(createTable)}>
      <Input
        className={styles.teamInput}
        name="tableName"
        placeholder="Tablo Adı"
        referance={register2({ required: true })}
      />
      <Button className={styles.addTeamButton}>Tablo Ekle</Button>
    </form>
  )
}

export const CreateAssignmentComp = ({
  handleSubmit,
  register,
  createAssignment
}) => {
  return (
    <form onSubmit={handleSubmit(createAssignment)}>
      <Input
        name="title"
        className={styles.input}
        placeholder="Başlık"
        referance={register({ required: true })}
      />
      <Input
        name="content"
        className={styles.input}
        placeholder="Başlık"
        referance={register({ required: true })}
      />
      <Button>Gönder</Button>
    </form>
  )
}

export const DraggableComp = ({ i, y, x, deleteAssignment }) => {
  return (
    <Draggable key={i} draggableId={y['title']} index={i}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <div>{y['title']}</div>
          <span
            onClick={() =>
              deleteAssignment({
                title: y['title'],
                table: x['tableName']
              })
            }
          >
            X
          </span>
        </li>
      )}
    </Draggable>
  )
}
