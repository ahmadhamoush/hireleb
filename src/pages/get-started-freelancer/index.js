import style from '@/styles/getStarted.module.css'
import Image from 'next/image'
import { faAdd, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Animate } from 'react-simple-animate'
import GetStartedContext from '@/components/GetStartedContext'
import Layout from '@/components/Layout'
import { toast } from 'react-toastify'

const Home = () => {
  const session = useSession()
  const router = useRouter()
  const { selectedImage, setSelectedImage, selectedFile, setSelectedFile } =
    useContext(GetStartedContext)

  function navigate() {
    if (selectedImage === '') {
      toast('Select Image')
    } else {
      router.push('/get-started-freelancer/details')
    }
  }

  return (
    <Layout>
      <Animate play start={{ width: 0 }} end={{ width: '20%' }}>
        <div className={style.scroll}></div>
      </Animate>
      <div className={style.container}>
        <div className={style.header}>
          <h1>Welcome {session.data?.user.email},</h1>
          <p>
            Create a strong profile and start applying to jobs today! Showcase
            your skills and expertise to potential clients and stand out from
            the competition.
          </p>
        </div>
        <Animate
          className={style.animate}
          play
          start={{ opacity: 0 }}
          end={{ opacity: 1 }}
        >
          <div className={style.displayPicture}>
            <h3>TELL US ABOUT YOURSELF IN THE NEXT SLIDES</h3>
            <label>Profile Picture*</label>
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
            <button type="button" onClick={navigate}>
              Next
            </button>
          </div>
        </Animate>
      </div>
    </Layout>
  )
}

export default Home
