import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivateElement({children,  allowedRoles}) {
    
    const profile = useSelector((state) => state.auth.profile)
    const getToken = localStorage.getItem('token')


    if(!getToken) return (
        <Navigate 
            to="/login"
            replace={true}
            state={{ msg: "Silahkan Login Terlebih Dahulu", isRedirected: true }}
        />
    )

    if(profile.role !== allowedRoles) {
        if(profile.role === 'admin') {return (
            <Navigate 
                to="/dashboardadmin"
                replace={true}
                state={{ msg: "Silahkan Login Terlebih Dahulu", isRedirected: true }}
            />
        )} else if (profile.role === 'owner') {return (
            <Navigate 
                to="/dashboardowner"
                replace={true}
                state={{ msg: "Silahkan Login Terlebih Dahulu", isRedirected: true }}
            />
        )} else {
            return (
                <Navigate 
                    to="/"
                    replace={true}
                    state={{ msg: "Silahkan Login Terlebih Dahulu", isRedirected: true }}
                />
            )
        }
    }

    return children
}

export default PrivateElement