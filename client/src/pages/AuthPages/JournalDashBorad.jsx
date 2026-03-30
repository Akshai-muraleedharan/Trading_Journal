import React from 'react'
import { StatusLine } from '../../features/DashBoard/Component/StatusLine'
import JournalCards from '../../features/DashBoard/Component/JournalCards'

export const JournalDashBorad = () => {
    return (
        <>
            <StatusLine />
            <div>
                <JournalCards />
            </div>
        </>
    )
}
