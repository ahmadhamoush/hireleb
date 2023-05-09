import Layout from '@/components/Layout'
import { getSession, signOut, useSession } from 'next-auth/react'
import style from '@/styles/Settings.module.css'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faUser } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { initMongoose } from '../../../lib/initMongoose'
import { getUser } from '../api/get-user'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '@/components/Loader'
import { useRouter } from 'next/router'
import { Animate } from 'react-simple-animate'

const Settings = ({ user }) => {
  const [namedClicked, setNameClicked] = useState(false)
  const [fName, setFname] = useState('')
  const [lName, setLname] = useState('')
  const [emailClicked, setEmailClicked] = useState(false)
  const [email, setEmail] = useState('')
  const [selectedImage, setSelectedImage] = useState(user?.image)
  const [selectedFile, setSelectedFile] = useState('')
  const [typeClicked, setTypeClicked] = useState(false)
  const [deleteClicked, setDeleteClicked] = useState(false)
  const [loading, setLoading] = useState(false)
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (selectedFile) {
      changePicture()
    }
  }, [selectedFile])

  const deleteAccount = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('email', session.data.user.email)
      const { data } = await axios.post(
        '/api/settings/delete-account',
        formData,
      )
      if (data.done == 'ok') {
        setLoading(false)
        toast('Account Deleted')
        signOut()
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const changeName = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('email', session.data.user.email)
      formData.append('fName', fName)
      formData.append('lName', lName)
      const { data } = await axios.post('/api/settings/update-name', formData)
      if (data.done === 'ok') {
        setLoading(false)
        toast('Name Updated')
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  const changeEmail = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('email', session.data.user.email)
      formData.append('newEmail', email)
      const { data } = await axios.post('/api/settings/update-email', formData)
      if (data.done === 'ok') {
        setLoading(false)
        toast('Email Updated')
        signOut()
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  const switchAccount = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('email', session.data.user.email)
      formData.append(
        'type',
        user?.type === 'freelancer' ? 'client' : 'freelancer',
      )
      const { data } = await axios.post('/api/settings/update-type', formData)
      if (data.done == 'ok') {
        setLoading(false)
        toast('Account Type Updated')
        if (user?.type === 'freelancer') {
          if (!user.client) {
            router.push('/get-started-client')
          } else {
            router.push(`/client/${session.data.user.email}`)
          }
        }
        if (user?.type === 'client') {
          if (!user.freelancer) {
            router.push('/get-started-freelancer')
          } else {
            router.push(`/freelancer/${session.data.user.email}`)
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  const changePicture = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('email', session.data.user.email)
      formData.append('img', selectedFile)
      const { data } = await axios.post(
        '/api/settings/update-picture',
        formData,
      )
      if (data.done === 'ok') {
        setLoading(false)
        toast('Picture Updated')
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  return (
    <Layout>
      {loading && <Loader />}
      <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
        <div className={style.container}>
          <label>
            <input
              type="file"
              hidden
              onChange={({ target }) => {
                //types of images allowed
                const types = [
                  'image/jpeg',
                  'image/jpg',
                  'image/png',
                  'image/webp',
                ]
                //accessing files
                if (target.files) {
                  // getting first file
                  const file = target.files[0]
                  //checking if type of image is valid
                  if (types.includes(file.type)) {
                    //creating a new url image to display selected image on frontend
                    setSelectedImage(window.URL.createObjectURL(file))
                    setSelectedFile(file)
                  } else {
                    toast('File Type Not Accepted')
                  }
                }
              }}
            />

            {/* displaying selected image */}
            {selectedImage ? (
              <Image
                className={style.display}
                src={selectedImage}
                alt="profile picture"
                width={120}
                height={120}
              />
            ) : (
              <p className={style.select}>
                {' '}
                <FontAwesomeIcon className={style.user} icon={faUser} />{' '}
                <FontAwesomeIcon className={style.add} icon={faAdd} />
              </p>
            )}
          </label>
          <div>
            <p>
              Current name : {user?.fName} {user?.lName}
            </p>
            <h3 onClick={() => setNameClicked((prev) => !prev)}>Change Name</h3>
            {namedClicked && (
              <>
                <input
                  value={fName}
                  onChange={(e) => setFname(e.target.value)}
                  placeholder="New First Name"
                />
                <input
                  value={lName}
                  onChange={(e) => setLname(e.target.value)}
                  placeholder="New Last Name"
                />
                <button onClick={changeName}>Update</button>
              </>
            )}
          </div>
          <div>
            <p>Current email : {user?.email}</p>
            <h3 onClick={() => setEmailClicked((prev) => !prev)}>
              Change Email
            </h3>
            {emailClicked && (
              <>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="New Email"
                />
                <button onClick={changeEmail}>Update</button>
              </>
            )}
          </div>
          <div>
            {' '}
            <p>Current Account Type : {user?.type}</p>{' '}
            <h3
              onClick={() => {
                setTypeClicked((prev) => !prev)
              }}
            >
              Switch to {user?.type === 'freelancer' ? 'Client' : 'Freelancer'}{' '}
              Account
            </h3>
            {typeClicked && (
              <div>
                <button onClick={switchAccount}>Switch</button>
                <button
                  onClick={() => setTypeClicked((prev) => !prev)}
                  style={{ background: '#1e1e1e' }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div>
            <h3 onClick={() => signOut()}>Logout</h3>
          </div>
          <div>
            {' '}
            <h3
              onClick={() => {
                setDeleteClicked((prev) => !prev)
              }}
              className={style.delete}
            >
              Delect Account
            </h3>
            {deleteClicked && (
              <div>
                <button onClick={deleteAccount} style={{ background: 'red' }}>
                  Delete
                </button>
                <button
                  onClick={() => setDeleteClicked((prev) => !prev)}
                  style={{ background: '#1e1e1e' }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </Animate>
    </Layout>
  )
}

export default Settings
export async function getServerSideProps(context) {
  const session = getSession(context)
  await initMongoose()
  return {
    props: {
      user: JSON.parse(
        JSON.stringify(await getUser((await session)?.user.email)),
      ),
    },
  }
}
