import React from 'react'

const StatusCard = ({ title, value }) => {
    return (
        <div className="stats shadow bg-white">
            <div className="stat">
                <div className="stat-title text-gray-800">{title}</div>
                <div className="stat-value text-gray-800">{value}</div>
            </div>
        </div>
    )
}

export default StatusCard