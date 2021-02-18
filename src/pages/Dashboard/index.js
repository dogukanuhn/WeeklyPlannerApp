import React from 'react'
import { useSelector } from 'react-redux'

export default function Index() {
  const user = useSelector((state) => state['auth'].user)
  return <div>{user && user.Email}</div>
}
