import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import style from '@/styles/Login.module.css'
import Link from "next/link"
import { useRouter } from "next/router"
const Login = () => {
    const router = useRouter()
  return (
    <>
    <Navbar />
    <div className={style.container}>
        <form>
        <h2>Login</h2>
       <div className={style.userDetails}> <label htmlFor={style.email}>email</label>
        <input type="email" placeholder="Enter Email"/></div>
       <div className={style.userDetails}>
       <label htmlFor={style.username}>password</label>
        <input type="password" placeholder="Enter Password"/>
       </div>
      <div className={style.btns}>
      <button>Login</button>
       <button onClick={()=>router.push('/')}>Cancel</button>
      </div>
        <p>Don't have an account? <Link href='/signup'>Sign Up Right Now!</Link></p>
        </form>
    </div>
    <Footer />
    </>
  )
}

export default Login