import React from 'react'
import { VscEmptyWindow } from "react-icons/vsc";

const EmptyMessage = () => {
    return (
        <div className='p-6 border m-4 rounded-lg overflow-auto'>
            <VscEmptyWindow className='w-80 h-80 text-gray-400' />
            <h1 className='text-gray-400 text-center'>Message</h1>
        </div>
    )
}

export default EmptyMessage;
