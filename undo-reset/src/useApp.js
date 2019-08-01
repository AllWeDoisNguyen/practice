//using React hook API
import { useReducer } from 'react'

// define state structure
const initialState = {
    friends: [],
    history: [],
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'add-friend':
            return {
                ...state,
                friends: [...state.friends, action.friend],
                history: [...state.history, state],
            }
        case 'undo':
            {
                const isEmpty = !state.history.length
                if (isEmpty) return state
                return {...state.history[state.history.length - 1] }
            }
        default:
            return state
    }
}

const useApp = () => {
    //define the useReducer implementation inside our custom hook so that we acquire the API to send signals to update our local state:
    const [state, dispatch] = useReducer(reducer, initialState)
    const onSubmit = (friend) => (e) => {
        e.preventDefault()
            // console.log(friend)
        if (!friend.name) return
        dispatch({ type: 'add-friend', friend })
    }
    const undo = () => {
        dispatch({ type: 'undo' })
    }
    return {
        ...state,
        onSubmit,
        undo,
    }
}

export default useApp