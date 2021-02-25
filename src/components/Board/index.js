import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios from 'axios'
import styles from './board.module.css'
export default function Index({ team }) {
  const [board, setBoard] = useState(null)

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

  const updateDB = (tables) => {
    axios
      .post(`https://localhost:5001/api/Dashboard/UpdateTables`, {
        team: team,
        tables: tables
      })
      .then((x) => {
        console.log(x)
      })
  }

  useEffect(() => {
    axios.get(`https://localhost:5001/api/Dashboard?team=${team}`).then((x) => {
      if (!x.data.hasError) setBoard(x.data.dashboard['tables'])
    })
  }, [team])

  return (
    <div className={styles.board}>
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
                    <span className={styles.tableName}>{x.tableName}</span>
                    {board &&
                      x['assignments'].map((x, i) => {
                        return (
                          <Draggable key={i} draggableId={x['title']} index={i}>
                            {(provided) => (
                              <li
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                              >
                                {x['title']}
                              </li>
                            )}
                          </Draggable>
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
  )
}
