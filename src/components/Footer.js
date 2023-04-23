
import style from '@/styles/Footer.module.css'
import Link from "next/link"
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
   <div className={style.container}>
    <div className={style.banner}>
            <h2>Start Now and Explore the Best Freelancers and Agencies Worldwide, for Free</h2>
            <div className={style.btns}>
                <button>Create Profile</button>
                <button>Search Profiles</button>
            </div>
    </div>
    <div className={style.footerContainer}>
    <h1>Hire<span>Leb</span></h1>
    <div>
        <div>
            <ul>
                <li>Browse Jobs</li>
                <li>Find Talent</li>
                <li>Looking For Work</li>
            </ul>
            <ul>
                <li>Post a Job</li>
                <li>Become a Freelancer</li>
                <li>How it Works</li>
            </ul>
        </div>
    </div>
    </div>
    <p>© Hireleb All rights reserved</p>
   </div>
  )
}

export default Footer
