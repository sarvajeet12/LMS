import React from 'react'
import { Link } from 'react-router-dom'
import { logoAssets } from '../../data/image-data'
import { socialIcon } from '../../data/footer-data'
import { footerExplore } from '../../data/footer-data'
import { footerContact } from '../../data/footer-data'



const Footer = () => {

    const footerPara = `Start, switch, or advance your career with more than 5,400 courses. Professional Certificate, and degrees from world-class universities and companies.`


    return (
        <div className='bg-primary-dark py-10'>

            <div className='container mx-auto px-4 sm:px-6 lg:px-8 mt-10 '>
                <div className='grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>

                    {/* upper */}
                    {/* left */}
                    <div>
                        {/* heading */}
                        <Link to={"/"} className='flex items-center text-white'>
                            <img src={logoAssets.logo} alt="logo" className='size-10' />
                            <h2 className='ml-2 font-medium text-xl'>Edu</h2><h2 className='font-medium text-xl'>Vista</h2>
                        </Link>


                        {/* para */}
                        <p className='text-slate-300 text-sm mt-4 mb-10'>{footerPara}</p>


                        {/* social icon */}
                        <div className='flex gap-10'>
                            {
                                socialIcon.map((socialIcon) => {
                                    const SocialIconComponent = socialIcon.icon;

                                    return (
                                        <a key={socialIcon.id} href={"#"} target="_blank"
                                            className='transition duration-300 ease-in-out text-white text-xl hover:text-secondary '
                                        >
                                            <SocialIconComponent />
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* center || explore */}
                    <div className='flex justify-start sm:justify-center'>
                        <div>
                            <h2 className='text-white text-lg font-medium'>Explore</h2>
                            <div className='flex flex-col gap-4 mt-4'>
                                {
                                    footerExplore.map((explore, index) => (
                                        <p key={index} className='text-slate-300 text-sm hover:text-secondary transition duration-300 ease-in-out'>{explore}</p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    {/* right || Contact info */}
                    <div>
                        <h2 className='text-white text-lg font-medium mb-2'>Contact Info</h2>
                        <div className='flex flex-col gap-4 mt-4'>
                            {
                                footerContact.map((contact) => {
                                    const ContactIconComponent = contact.icon;
                                    return (
                                        <div key={contact.id} className='flex items-center text-sm gap-4 text-slate-300'>
                                            <span className='border border-secondary-dark rounded-full size-10 flex justify-center items-center' ><ContactIconComponent /></span>
                                            <span>{contact.contact}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                {/* hr line */}
                <hr className='text-slate-300 my-10 opacity-30' />

                {/* bottom */}
                <div className='flex gap-10 flex-col sm:flex-row sm:justify-between'>
                    <p className='text-slate-300 text-sm'>Copyright {new Date().getFullYear()} &copy; LMS: All Rights Reserved.</p>
                    <p className='flex gap-10'>
                        <Link to={"/privacy-policy"} className='text-slate-300 text-sm hover:underline transition duration-300 ease-in-out hover:text-secondary'>Terms of Service</Link>
                        <Link to={"/term-service"} className='text-slate-300 text-sm hover:underline transition duration-300 ease-in-out hover:text-secondary'>Privacy Policy</Link>
                    </p>
                </div>
            </div>
        </div >

    )
}

export default Footer