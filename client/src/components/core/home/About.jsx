import React from 'react'
import { instructorAssets } from '../../../data/image-data'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import { iconAssets } from '../../../data/image-data';

const About = () => {

    const aboutPara = `Our eLearning platform is a dynamic and innovative online education hub designed to meet the needs of students. educators and lifelong learners. We believe that learning should be accessible to everyone.`


    return (
        <div
            className=' bg-gray-100 py-20 mt-30
        '>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 px-4 sm:px-6 lg:px-8 '>

                {/* left box */}
                <div className='relative'>
                    <img src={instructorAssets.instructorImage1} className='md:h-96 md:w-full w-full h-auto' alt="" />
                    <div className='h-15 sm:h-20 border bg-white border-gray-100 shadow-sm absolute bottom-5 sm:bottom-25 right-[40%]  gap-4 flex justify-between items-center p-2'>
                        <img src={iconAssets.successIcon} className='size-10  sm:size-15' alt="" />
                        <span>
                            <p className='text-base sm:text-3xl font-medium'>85%</p>
                            <p className='text-xs sm:text-base font-medium'>Success Rate</p>
                        </span>
                    </div>
                </div>



                {/* right box */}
                <div>
                    {/* heading and subheading*/}
                    <p className=' text-secondary-dark'>About us</p>
                    <h2 className='text-3xl font-bold'>Ways we can help</h2>
                    <p className='text-base w-full lg:max-w-[80%] my-10 text-secondary-dark'>{aboutPara}</p>
                    <div className='flex flex-col gap-4 mt-2 mb-15'>
                        <p className='flex items-center gap-4'><span><IoMdCheckmarkCircleOutline className='text-primary text-2xl' /></span> <span className='text-secondary-dark font-medium'>Personalized learning experience</span></p>
                        <p className='flex items-center gap-4'><span><IoMdCheckmarkCircleOutline className='text-primary text-2xl' /></span> <span className='text-secondary-dark font-medium'>Access to a wide range of resources</span></p>
                        <p className='flex items-center gap-4'><span><IoMdCheckmarkCircleOutline className='text-primary text-2xl' /></span> <span className='text-secondary-dark font-medium'>Flexibility and convenience</span></p>
                    </div>
                    <Link to={"/courses-list"} className=''>
                        <button className='btn'>
                            Explore Course
                            &rarr;
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default About