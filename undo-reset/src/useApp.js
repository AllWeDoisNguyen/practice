//using React hook API
import { useReducer } from 'react'

// define state structure
const initialState = {
    friends: [],
    history: [],
    theme: 'light',
}

const insertToHistory = (state) => {
    if (state && Array.isArray(state.history)) {
        // do not mutate
        const newHistory = [...state.history]
        newHistory.push(state)
        return newHistory
    }
    console.warn(
        'WARNING! The state was attempting capture but something went wrong. Please check if the state is controlled correctly.',
    )
    return state.history || []
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'set-theme':
            return {...state, theme: action.theme, history: insertToHistory(state) }
        case 'add-friend':
            return {
                ...state,
                friends: [...state.friends, action.friend],
                history: insertToHistory(state),
            }
        case 'undo':
            {
                const isEmpty = !state.history.length
                if (isEmpty) return state
                return {...state.history[state.history.length - 1] }
            }
        case 'reset':
            return {...initialState, history: insertToHistory(state) }
        default:
            return state
    }
}

const useApp = () => {
    //define the useReducer implementation inside our custom hook so that we acquire the API to send signals to update our local state:
    const [state, dispatch] = useReducer(reducer, initialState)

    const onSubmit = (friend, resetValues) => (e) => {
        e.preventDefault()
            // console.log(friend)
        if (!friend.name) return
        dispatch({ type: 'add-friend', friend })
        resetValues()
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