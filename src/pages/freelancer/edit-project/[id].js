import Layout from '@/components/Layout'
import React, { useState } from 'react'
import style from '@/styles/Add.module.css'
import { Animate } from 'react-simple-animate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faCamera } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import axios from 'axios'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { getProject } from '@/pages/api/get-projects'
import { initMongoose } from '../../../../lib/initMongoose'
import Loader from '@/components/Loader'
import { toast } from 'react-toastify'

const EditProject = ({ project }) => {
  const [name, setName] = useState(project[0].name)
  const [desc, setDesc] = useState(project[0].desc)
  const [url, setUrl] = useState(project[0].url)
  const [selectedImage, setSelectedImage] = useState(project[0].image)
  const [selectedFile, setSelectedFile] = useState('')
  const[loading,setLoading] = useState(false)
  const session = useSession()
  const router = useRouter()

  function navigateBack() {
    router.back()
  }

  const handleUpload = async () => {
    setLoading(true)
    let valid = true
    if(name ===''){
      toast('Name is not valid')
      valid = false
    }
    if(desc ===''){
      toast('Description is not valid')
      valid = false
    }
    if(url ===''){
      toast('Url is not valid')
      valid = false
    }
    if(selectedImage ===''){
      toast('Please upload image')
      valid = false
    }
    if(valid){
      try {
        const formData = new FormData()
        formData.append('id', project[0]._id)
        formData.append('email', session.data.user.email)
        formData.append('name', name)
        formData.append('desc', desc)
        formData.append('url', url)
        formData.append('img', selectedFile)
        const { data } = await axios.post('/api/edit-project', formData)
        if (data) {
          setLoading(false)
          toast('Project Saved')
          router.push(`/freelancer/${session.data.user.email}`)
        }
      } catch (err) {
        console.log(err)
      }
    }else{
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
            <h1>Edit Project ({project[0].name})</h1>
          </div>
          <div className={style.projectDetails}>
            <h3>SHARE PROJECT DETAILS</h3>
            <div>
              <label htmlFor={style.name}>Project Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id={style.name}
                placeholder="Enter Project Name"
              />
            </div>
            <div>
              <label htmlFor={style.desc}>Project Description</label>
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
            <div className={style.btns}>
              <button type="button" onClick={navigateBack}>
                Back
              </button>
              <button type="button" onClick={handleUpload}>
                SAVE
              </button>
            </div>
          </div>
        </div>
      </Animate>
    </Layout>
  )
}

export default EditProject

export async function getServerSideProps(context) {
  //destructuring context object to get id param
  const { query } = context
  const { id } = query
  //getting session details
  const session = await getSession(context)
  //connecting to db
  await initMongoose()
  //getting project based on query id
  let project = await getProject(id)
  let authenticated = false
  //checking if logged user owns the project
  if (session.user.email === project[0].owner) {
    authenticated = true
  } else {
    project = []
  }

  return {
    props: {
      project: JSON.parse(JSON.stringify(project)),
      authenticated,
    },
  }
}
