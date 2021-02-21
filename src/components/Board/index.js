import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function Index() {
  const [dashboard, setDashboard] = useState(null)

  useEffect(() => {
    // axios.get("https://localhost:5001/api/Dashboard").then(x=>{
    //     !x.data.HasError ? setDashboard(x.data):
    // })
  }, [])

  return <div>asdf</div>
}
