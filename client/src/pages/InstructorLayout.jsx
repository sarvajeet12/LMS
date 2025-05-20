import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from '../components/core/Instructor/Sidebar';

const InstructorLayout = () => {
    return (
        <div className='flex justify-between'>
            <Sidebar />
            {/* <div className='flex-1'> */}
            <Outlet />
            {/* </div> */}
        </div>
    )
}

export default InstructorLayout