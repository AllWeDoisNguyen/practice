import React, { useState } from 'react';
import cx from 'classnames';
import './App.css';
import useApp from './useApp';
import female from './images/female.jpg'
import male from './images/male.jpg'

const FriendBox = ({ gender, ...props }) => (
  <div
    className={cx('box', {
      'teal-border': gender === "Male",
      'hotpink-border': gender === 'Female',
    })}
    {...props}
  />
)

function App() {
  const { onSubmit, friends, undo, theme, onThemeChange, reset } = useApp()

  const [name, setName] = useState('')
  const [gender, setGender] = useState('Male')
  const onNameChange = (e) => setName(e.target.value)
  const onGenderChange = (e) => setGender(e.target.value)

  const resetValues = () => {
    setName('')
    setGender('Male')
  }

  return (
    <div className={cx({
      'theme-light': theme === 'light',
      'theme-dark': theme === 'dark',
    })}>
      <div>
        <h3>What theme would you like to display?</h3>
        <div>
          <select onChange={onThemeChange} name="theme" value={theme}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      <form className="form" onSubmit={onSubmit({ name, gender }, resetValues)}>
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
      <div>
        <h3>Made a mistake?</h3>
        <div className="undo-actions">
          <div>
            <button type="button" onClick={undo}>
              Undo
            </button>
          </div>
          <div>
            <button type="button" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="boxes">
        {friends.map(({ name, gender }, index) => (
          <FriendBox key={`friend_${index}`} gender={gender}>
            <div className="box-name">Name: {name}</div>
            <div className="gender-container">
              <img src={gender === 'Female' ? female : male} alt="" />
            </div>
          </FriendBox>

        ))}
      </div>
    </div>
  );
}

export default App;
