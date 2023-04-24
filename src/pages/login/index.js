import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import style from '@/styles/Login.module.css'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
const Login = () => {
  const session = useSession()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const onSubmit = async () => {
    //login logic
    try {
      if (!email.length > 0 || !password.length > 0) {
        throw new Error('Check empty inputs')
      }
      const loginData = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      if (loginData.status === 401) {
        setErr(loginData.error)
      } else {
        alert('Login Success')
      }
    } catch (err) {
      setErr(err.message)
    }
  }

  return (
    <>
      <Navbar />
      <div className={style.container}>
        <form>
          <h2>Login</h2>
          <div className={style.userDetails}>
            {' '}
            <label htmlFor={style.email}>email</label>
            <input
              id={style.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email"
            />
          </div>
          <div className={style.userDetails}>
            <label htmlFor={style.password}>password</label>
            <input
              id={style.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
            />
          </div>
          <div>
            <p className={style.err}>{err}</p>
          </div>
          <div className={style.btns}>
            <button type="button" onClick={onSubmit}>
              Login
            </button>
            <button onClick={() => router.push('/')}>Cancel</button>
          </div>
          <p>
            Don't have an account?{' '}
            <Link href="/signup">Sign Up Right Now!</Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default Login
