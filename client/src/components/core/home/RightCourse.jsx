import React from 'react'
import { Link } from 'react-router-dom'

const RightCourse = () => {

    const rightCoursePara = `It is important to consider various factors such as your interests skills, academic background, and future aspirations. Researching the different options available and seeking advice.`


    return (
        <div className='bg-primary text-white py-20'>
            <div className='container mx-auto px-4 gap-10 sm:px-6 lg:px-8 mt-10 flex flex-col sm:flex-row sm:justify-between sm:items-center'>
                <div className='w-full sm:w-1/2'>
                    <h1 className='text-4xl md:text-5xl'>Finding Your Right Courses</h1>
                    <p className='text-base mt-10'>{rightCoursePara}</p>
                </div>
                <div className='w-full sm:w-1/2 text-center'>
                    <Link to={"/courses-list"}>
                        <button className='btn bg-primary-dark'>
                            Get Started Now
                            &rarr;
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RightCourse