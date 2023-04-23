import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import style from '@/styles/Login.module.css'
import Link from "next/link"
import { useRouter } from "next/router"
const Signup = () => {
    const router = useRouter()
  return (
    <>
    <Navbar />
    <div className={style.container}>
        <form>
        <h2>Sign Up</h2>
        <h4>Turn Your Work Dreams into Reality</h4>
    <div className={style.career}>
    <p>Define Your Career Path with Us</p>
    <div className={style.careerBtns}>
        <button>Hire a Freelancer</button>
        <button>Work as a Freelancer</button>
        <button>Own An Agency</button>
    </div>
    </div>
    <div className={style.name}>
        <div className={style.userDetails}> <label htmlFor={style.fName}>First Name</label>
        <input type="text" placeholder="Enter First Name"/></div>
        <div className={style.userDetails}> <label htmlFor={style.lName}>Last Name</label>
        <input type="text" placeholder="Enter Last Name"/></div>
        </div>
    <div className={style.userDetails}> <label htmlFor={style.email}>email</label>
        <input type="email" placeholder="Enter Email"/></div>
       <div className={style.userDetails}>
       <label htmlFor={style.username}>password</label>
        <input type="password" placeholder="Enter Password"/>
       </div>
      <div className={style.btns}>
      <button>Sign Up</button>
       <button onClick={()=>router.push('/')}>Cancel</button>
      </div>
        <p>Have an account? <Link href='/login'>Login Now!</Link></p>
        </form>
    </div>
    <Footer />
    </>
  )
}

export default Signup