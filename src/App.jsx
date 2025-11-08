import React from 'react'
import UserState from './Context/User/UserState'
import Participantes from './pages/Participantes'

const App = () => {
  return (
<UserState>
  <Participantes></Participantes>
</UserState>  )
}

export default App