import Layout from '@/components/Layout'
import { useState } from 'react'
import style from '@/styles/Deposit.module.css'
import { Animate } from 'react-simple-animate'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faCamera } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { toast } from 'react-toastify'
import Loader from '@/components/Loader'

const Withdraw = () => {
  const [credits, setCredits] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [loading, setLoading] = useState(false)
  const session = useSession()
  const router = useRouter()

  function navigateBack() {
    router.back()
  }
  const handleUpload = async () => {
    setLoading(true)
    let valid = true
    if (credits === '') {
      valid = false
      toast('Credits is not valid')
    }
    if (valid) {
      try {
        const formData = new FormData()
        formData.append('user', session.data.user.email)
        formData.append('credits', credits)
        const { data } = await axios.post('/api/request-withdraw', formData)
        if (data) {
          toast('Withdraw Requested')
          setLoading(false)
          setCredits('')
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      setLoading(false)
    }
  }
  return (
    <Layout>
      {loading && <Loader />}
      <Animate
        className={style.animate}
        play
        start={{ opacity: 0 }}
        end={{ opacity: 1 }}
      >
        <div className={style.container}>
          <div className={style.header}>
            <h1>Withdraw Credits</h1>
            <p>
              Pay and get paid with ease - Use credits to power your freelance
              needs!
            </p>
          </div>
          <div className={style.details}>
            <h3>Withdraw Details</h3>
            <div>
              <label htmlFor={style.name}>Credits*  (1 Credit = 1USD)</label>
              <input
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                id={style.name}
                type="number"
                placeholder="Enter Credits to be withdrawed"
              />
            </div>

            <div className={style.paymentWrapper}>
              <div>
                <ul>
                  <li>
                    To withdraw credits, enter amount of credits to be withdrawed
                  </li>
                  <li>
                    It may take some time to verify the withdraw, but once its
                    verified, the credits will be withdraw and an omt receipt will be sent to you.
                  </li>
                  <li>
                    You will receive a notification once the withdraw has been
                    verified and the credits have been deposited.
                  </li>
                </ul>
              </div>
            </div>
            <div className={style.btns}>
              <button type="button" onClick={navigateBack}>
                Back
              </button>
              <button type="button" onClick={handleUpload}>
                Withdraw
              </button>
            </div>
          </div>
          <ul className={style.info}>
            <li>
              Our platform allows you to easily pay for freelancer services or
              receive payment as a client using credits. Credits can be
              purchased through our website or earned by completing tasks within
              the platform.
            </li>
            <li>
              When you pay for a freelancers services, the payment will be
              deducted from your credit balance. The freelancer will then
              receive the payment in credits, which they can use to purchase
              services or withdraw as cash.
            </li>
            <li>
              As a freelancer, you can also receive payment in credits from
              clients. When a client pays for your services, the payment will be
              made in credits, which you can use to purchase other services on
              the platform or withdraw as cash.
            </li>
            <li>
              By using credits for payments and transactions, you can avoid the
              hassle of traditional payment methods and enjoy faster, more
              secure transactions. Plus, earning and using credits can also give
              you access to exclusive perks and discounts on the platform.
            </li>
            <li>
              Overall, our credit system provides a convenient and flexible way
              to pay for and receive payment for freelancer services, making it
              easier for you to get the work you need done and earn money for
              your skills and expertise.
            </li>
          </ul>
        </div>
      </Animate>
    </Layout>
  )
}

export default Withdraw
