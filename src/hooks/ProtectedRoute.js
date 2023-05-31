import React from 'react';
import {useLocation, Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props  }) => {
    return (
        props.loggedIn ? <Component {...props} /> : <Navigate to="/signin" replace/>
    )}

export default ProtectedRouteElement;