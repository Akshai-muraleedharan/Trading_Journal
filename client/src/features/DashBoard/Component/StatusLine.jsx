import React from 'react'
import StatusCard from '../../../shared/components/StatusCard'

export const StatusLine = () => {
    return (
        <div className='w-full'>
            <div className='flex justify-center gap-10 flex-wrap '>
                <StatusCard title={"Total Journal"} value={12} />
                <StatusCard title={"Capital"} value={20000} />
                <StatusCard title={"Total Profit"} value={1000} />
                <StatusCard title={"Total Loss"} value={5000} />
            </div>
        </div>
    )
}
