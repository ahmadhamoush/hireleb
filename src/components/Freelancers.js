import style from '@/styles/Freelancers.module.css'
import { faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

const Freelancers = () => {
  return (
   <div className={style.wrapper}>
    <div className={style.container}>
    <div className={style.descriptionContainer}>
        <h2>Get the Job Done with Ease - Let Us Connect You with Top Talent!</h2>
        <div className={style.descriptions}>
            
                <div>
                    <Image src='/check-mark.png' width={40} height={40} />
                    <p>Access top talent, fast and effortlessly.</p>
                </div>
                <div>
                    <Image src='/check-mark.png' width={40} height={40} />
                    <p>Quick and streamlined hiring made easy.</p>
                </div>
                <div>
                    <Image src='/check-mark.png' width={40} height={40} />
                    <p>Guaranteed high-quality talent, every time.</p>
               
            </div>
        </div>
    </div>
    <div className={style.phone}>
    <div className={style.freelancer}>
    <div className={style.imageContainer}>
    <Image className={style.image} src='/guy.webp' fill/>
    </div>
    <p>Graphic Designer</p>
    <span>John Doe</span>
    <div className={style.rate}>
    <FontAwesomeIcon className={style.icon} icon={faStar}/>
    <p>4.9 (108)</p>
    </div>
    <p className={style.totalProjects}>Total Projects <span>180</span></p>
    <div className={style.rates}>
    <div className={style.rate}>
        <h3>Quality of work</h3>
    <div className={style.progressBar}>
        <div style={{ "--i": '30%' }} className={style.progress}></div>
    </div>
    </div>
    <div className={style.rate}>
    <h3>Adherence to deadlines</h3>
    <div className={style.progressBar}>
        <div style={{ "--i": '50%' }} className={style.progress}></div>
    </div>
    </div>
    <div className={style.rate}>
        <h3>Responsiveness</h3>
    <div className={style.progressBar}>
        <div style={{ "--i": '60%' }} className={style.progress}></div>
    </div>
    </div>
    <div className={style.rate}>
        <h3>Communication skills</h3>
    <div className={style.progressBar}>
        <div style={{ "--i": '60%' }} className={style.progress}></div>
    </div>
    </div>
    <div className={style.rate}>
        <h3>Satisfaction with outcome</h3>
    <div className={style.progressBar}>
        <div style={{ "--i": '60%' }} className={style.progress}></div>
    </div>
    </div>
    <div className={style.rate}>
        <h3>Satisfaction with outcome</h3>
    <div className={style.progressBar}>
        <div style={{ "--i": '60%' }} className={style.progress}></div>
    </div>
    </div>
    <div className={style.rate}>
        <h3>Satisfaction with outcome</h3>
    <div className={style.progressBar}>
        <div style={{ "--i": '60%' }} className={style.progress}></div>
    </div>
    </div>
    </div>
   </div>
    <Image className={style.phoneImage} src='/phone1.png' fill alt='Lebanese Freelancers'/>
    </div>
   </div>
     <Link href='/freelancers' className={style.all}><p>All Freelancers</p> <FontAwesomeIcon icon={faArrowRight}/></Link>
   </div>
  )
}

export default Freelancers
