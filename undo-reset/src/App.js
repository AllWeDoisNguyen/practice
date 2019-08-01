import React, { useState } from 'react';
import './App.css';
import useApp from './useApp'

function App() {
  const { onSubmit } = useApp()
  const [name, setName] = useState('')
  const [gender, setGender] = useState('Male')
  const onNameChange = (e) => setName(e.target.value)
  const onGenderChange = (e) => setGender(e.target.value)
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Reset Abilities
        </h1>
      </header>
      <form className="form" onSubmit={onSubmit({name, gender})}>
        <div>
          <input
            onChange={onNameChange}
            value={name}
            type="text"
            name="name"
            placeholder="Friend's Name"
          />
        </div>
        <div>
          <select onChange={onGenderChange} name="gender" value={gender}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

export default App;
