import style from '@/styles/Login.module.css'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Layout from '@/components/Layout'
import { toast } from 'react-toastify'
import Loader from '@/components/Loader'
import { Animate } from 'react-simple-animate'
const Login = () => {
  const session = useSession()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const onSubmit = async () => {
    setLoading(true)
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
        toast(loginData.error)
        setLoading(false)
      } else {
        toast('Login Success')
        setLoading(false)
      }
    } catch (err) {
      setErr(err.message)
      toast(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session.status === 'authenticated') {
      if (session.data.user.type === 'freelancer') {
        router.push(`/freelancer/${session.data.user.email}`)
      } else if (session.data.user.type === 'client') {
        router.push(`/client/${session.data.user.email}`)
      }
    }
  }, [session, router])

  return (
    <Layout>
      {loading && <Loader />}
      <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
        <div className={style.container}>
          <form>
            <h2>Login</h2>
            <div className={style.userDetails}>
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
              Dont have an account?{' '}
              <Link href="/signup">Sign Up Right Now!</Link>
            </p>
          </form>
        </div>
      </Animate>
    </Layout>
  )
}

export default Login
