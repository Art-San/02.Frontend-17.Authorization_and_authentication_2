import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const { currentUser } = useAuth()
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!currentUser) {
                    return (
                        <Redirect
                            to={{
                                // Переадресация после входа на у страницу на которой был ранее исли есть в истории "history.location.state.from.pathname"
                                pathname: '/login',
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    )
                }
                return Component ? <Component {...props} /> : children
            }}
        />
    )
}
ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object, // Переадресация после входа на у страницу на которой был ранее исли есть в истории
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default ProtectedRoute
