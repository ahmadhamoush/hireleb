import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import style from '@/styles/Login.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'
const Signup = () => {
  //user properties
  const [type, setType] = useState('')
  const [fName, setFname] = useState('')
  const [lName, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  const router = useRouter()

  //check if inputs are not empty logic
  const validForm = (form) => {
    let invalid = []
    form.forEach((data) => {
      if (!data.length > 0) {
        invalid.push(data)
      }
    })
    return invalid.length ? false : true
  }

  const signUp = (e) => {
    e.preventDefault()

    try {
      // throw error if an input is empty
      if (!validForm([fName, lName, email, password, type])) {
        throw new Error('Check empty inputs')
      }
      // registering user to db
      axios
        .post('/api/auth/signup', {
          fName,
          lName,
          type,
          email,
          password,
        })
        .then(function (response) {
          const { data } = response
          if (!data.valid) {
            // displaying error
            setErr(data.message)
          } else {
            setErr('')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (err) {
      console.log(err)
      setErr(err.message)
    }
  }
  // style of btn when clicked
  const clicked = {
    backgroundColor: '#2D646D',
    color: '#fff',
  }

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
              <button
                type="button"
                style={type === 'client' ? clicked : {}}
                onClick={(e) => {
                  e.preventDefault()
                  setType('client')
                }}
              >
                Hire a Freelancer
              </button>
              <button
                type="button"
                style={type === 'freelancer' ? clicked : {}}
                onClick={(e) => {
                  e.preventDefault()
                  setType('freelancer')
                }}
              >
                Work as a Freelancer
              </button>
              <button
                type="button"
                style={type === 'company' ? clicked : {}}
                onClick={(e) => {
                  e.preventDefault()
                  setType('company')
                }}
              >
                Own An Agency
              </button>
            </div>
          </div>
          <div className={style.name}>
            <div className={style.userDetails}>
              {' '}
              <label htmlFor={style.fName}>First Name</label>
              <input
                value={fName}
                onChange={(e) => setFname(e.target.value)}
                type="text"
                placeholder="Enter First Name"
              />
            </div>
            <div className={style.userDetails}>
              {' '}
              <label htmlFor={style.lName}>Last Name</label>
              <input
                value={lName}
                onChange={(e) => setLname(e.target.value)}
                type="text"
                placeholder="Enter Last Name"
              />
            </div>
          </div>
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
          {err && <p className={style.err}>{err}</p>}
          <div className={style.btns}>
            <button type="subnit" onClick={signUp}>
              Sign Up
            </button>
            <button type="button" onClick={() => router.push('/')}>
              Cancel
            </button>
          </div>
          <p>
            Have an account? <Link href="/login">Login Now!</Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  )
}
export default Signup
