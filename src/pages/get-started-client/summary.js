import style from '@/styles/getStarted.module.css'
import axios from 'axios'
import { Animate } from 'react-simple-animate'
import { useSession } from 'next-auth/react'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import GetStartedContext from '@/components/GetStartedContext'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faUser } from '@fortawesome/free-solid-svg-icons'
import Layout from '@/components/Layout'
import { toast } from 'react-toastify'
import Loader from '@/components/Loader'

const index = () => {
  const session = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  function navigateBack() {
    router.push('/get-started-freelancer/hourly-rate')
  }

  const {
    hourlyrate,
    selectedFile,
    selectedImage,
    setSelectedFile,
    setSelectedImage,
    title,
    about,
    category,
    subcategory,
    skills,
    experience,
  } = useContext(GetStartedContext)

  const handleUpload = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      if (selectedFile !== '') {
        formData.append('email', session.data.user.email)
        formData.append('hourlyrate', hourlyrate)
        formData.append('title', title)
        formData.append('about', about)
        formData.append('category', category)
        formData.append('skills', skills)
        formData.append('subcategory', subcategory)
        formData.append('experience', experience)
        formData.append('img', selectedFile)
        const { data } = await axios.post('/api/complete-profile', formData)
        if (data.done === 'ok') {
          setLoading(false)
          toast('Setup Complete')
          router.push('/get-started-client/options')
        }
      } else {
        setLoading(false)
        toast('Select Image')
        throw new Error('Values should not be empty')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout>
      {loading && <Loader />}
      <Animate play start={{ width: '80%' }} end={{ width: '100%' }}>
        <div className={style.scroll}></div>
      </Animate>
      <div className={style.container}>
        <div className={style.header}>
          <h1>Welcome {session.data?.user.email},</h1>
          <p>
            Complete your profile today and start showcasing your skills as a
            freelancer on our platform!
          </p>
        </div>
        <Animate
          className={style.animate}
          play
          start={{ opacity: 0 }}
          end={{ opacity: 1 }}
        >
          <div className={style.freelanceDetails}>
            <h2>Summary</h2>
            <div className={style.summary}>
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
                <div>
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
                      <FontAwesomeIcon
                        className={style.user}
                        icon={faUser}
                      />{' '}
                      <FontAwesomeIcon className={style.add} icon={faAdd} />
                    </p>
                  )}
                </div>
              </label>
              <div>
                <h3>Job Title</h3>
                <p>{title}</p>
                <h3>About You</h3>
                <p>{about}</p>
                <h3>Category</h3>
                <p>{category}</p>
                <h3>Subcategory</h3>
                <p>{subcategory}</p>
                <h3>Skills</h3>
                <div className={style.displayedSkillsContainer}>
                  {skills.map((skill, index) => {
                    return (
                      <div key={index} className={style.displayedSkills}>
                        {skills.length && <p>{skill}</p>}
                      </div>
                    )
                  })}
                </div>
                <h3>Experience</h3>
                <p>{experience}</p>
                <h3>Hourly rate</h3>
                <p>{hourlyrate} credits/hr</p>
              </div>
            </div>
          </div>
          <div className={style.btns}>
            <button type="button" onClick={navigateBack}>
              Back
            </button>
            <button type="button" onClick={handleUpload}>
              Get Started
            </button>
          </div>
        </Animate>
      </div>
    </Layout>
  )
}

export default index
