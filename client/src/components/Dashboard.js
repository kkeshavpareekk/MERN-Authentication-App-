import React from 'react'
import LogoutBtn from './LogoutBtn'

const Dashboard = () => {
    return (
        <div style={{textAlign: "center", margin:"5rem"}}>
            <p>This is a private dashboard</p>
            <LogoutBtn />
        </div>
    )
}

export default Dashboard
