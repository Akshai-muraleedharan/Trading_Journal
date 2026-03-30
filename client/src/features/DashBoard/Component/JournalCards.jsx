import React from 'react'
import { useJournals } from '../hook/useJournals'

const JournalCards = () => {

    const { journalData, setLimit, loading } = useJournals()

    const dateFormat = (date) => {
        const sliceDate = date.slice(0, 10)
        const [year, month, day] = sliceDate.split("-")
        return `${day}-${month}-${year}`
    }


    const handleLoadMore = () => {
        setLimit((prev) => prev + 5)
    }

    return (
        <section className='mt-10'>
            <h2 className='text-gray-800 text-3xl font-bold'>Journals</h2>
            <div className='mt-5 w-full flex flex-wrap gap-10'>
                {loading === false && journalData?.totalCount === 0 ? <p>Data not found</p> : null}
                {journalData?.data.map((journal) => (
                    <div key={journal?._id} className="card w-full  md:w-72  card-xs shadow-sm bg-white">
                        <div className="card-body">
                            <div className='flex justify-between items-center'>
                                <h2 className="card-title text-gray-800">{journal?.title}</h2>
                                <div className="badge badge-neutral badge-xs badge-outline">{journal?.mode}</div>
                            </div>
                            <div className='mt-2'>
                                <p className='text-gray-800 text-sm'>{journal?.notes}</p>
                            </div>
                            <div className='mt-1 flex justify-between'>
                                <div className={`badge text-white font-medium badge-xs ${journal?.isProfit === "PROFIT" ? "badge-success" : "badge-error"}  tracking-wider`}>{journal?.isProfit}</div>
                                <p className='text-gray-600 text-xs text-end w-full'>{dateFormat(journal?.tradeDate)}</p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <div className='mt-10 flex flex-col items-center justify-center w-full'>
                <button disabled={!journalData?.hasmore || journalData?.totalCount === 0} onClick={handleLoadMore} className='btn disabled:bg-gray-600 btn-neutral btn-sm'>{journalData?.hasmore ? "Load more" : "No more data"}</button>
                <p className='text-gray-600 mt-3'>{loading ? "Loading..." : null}</p>
            </div>
        </section>
    )
}

export default JournalCards