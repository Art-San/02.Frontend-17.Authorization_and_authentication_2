import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import { toast } from 'react-toastify' // закоментировано так как реализация будет дальше

// Создаем Comment Hook

const CommentsContext = React.createContext()

export const useComments = () => {
    return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
    // const [isLoading, setLoading] = useState(true) // закоментировано так как реализация будет дальше
    const [comments, setComments] = useState([])
    // const [error, setError] = useState(null) // закоментировано так как реализация будет дальше
    useEffect(() => {
        setComments(null)
    }, [])

    return (
        <CommentsContext.Provider value={{ comments }}>
            {children}
        </CommentsContext.Provider>
    )
}

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
