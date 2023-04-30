import Layout from '@/components/Layout'
import React, { useState } from 'react'
import style from '@/styles/Add.module.css'
import { Animate } from 'react-simple-animate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faCamera } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const AddProject = () => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [url, setUrl] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const session = useSession()
  const router = useRouter()

  const handleUpload = async () => {
    try {
      const formData = new FormData()
      formData.append('email', session.data.user.email)
      formData.append('name', name)
      formData.append('desc', desc)
      formData.append('url', url)
      formData.append('img', selectedFile)
      const { data } = await axios.post('/api/add-project', formData)
      if (data) {
        router.push(`/freelancer/${session.data.user.email}`)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Layout>
      <Animate
        className={style.animate}
        play
        start={{ opacity: 0 }}
        end={{ opacity: 1 }}
      >
        <div className={style.container}>
          <div className={style.header}>
            <h1>Add New Project</h1>
            <p>
              Share your talents with the world by adding your project to our
              platform
            </p>
          </div>
          <div className={style.projectDetails}>
            <h3>SHARE YOUR PROJECT DETAILS</h3>
            <div>
              <label htmlFor={style.name}>Project Name*</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id={style.name}
                placeholder="Enter Project Name"
              />
            </div>
            <div>
              <label htmlFor={style.desc}>Project Description*</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows="8"
                cols="30"
                id={style.desc}
                placeholder="Describe your project"
              />
            </div>
            <div>
              <label htmlFor={style.name}>Project URL*</label>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                id={style.url}
                placeholder="Enter Project URL"
              />
            </div>
            <div className={style.imgContainer}>
              <label htmlFor={style.name}>Project Image*</label>
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
                        className={style.camera}
                        icon={faCamera}
                      />{' '}
                      <FontAwesomeIcon className={style.add} icon={faAdd} />
                    </p>
                  )}
                </div>
              </label>
            </div>
            <button onClick={handleUpload}>ADD</button>
          </div>
        </div>
      </Animate>
    </Layout>
  )
}

export default AddProject
