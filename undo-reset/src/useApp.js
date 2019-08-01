const useApp = () => {
    const onSubmit = (friend) => (e) => {
        e.preventDefault()
        console.log('Submitted')
        console.log(friend)
    }
    return {
        onSubmit,
    }
}

export default useApp