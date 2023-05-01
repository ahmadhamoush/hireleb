import { createContext, useState } from 'react'
import useSessionStorageState from 'use-session-storage-state'
export const GetStartedContext = createContext({})

export function GetStartedContextProvide({ children }) {
  // get started context
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [title, setTitle] = useSessionStorageState('title', {
    defaultValue: '',
  })
  const [about, setAbout] = useSessionStorageState('about', {
    defaultValue: '',
  })
  const [category, setCategory] = useSessionStorageState('category', {
    defaultValue: '',
  })
  const [subcategory, setSubCategory] = useSessionStorageState('subcategory', {
    defaultValue: '',
  })
  const [skills, setSkills] = useSessionStorageState('skills', {
    defaultValue: [],
  })
  const [experience, setExperience] = useSessionStorageState('experience', {
    defaultValue: '',
  })
  const [hourlyrate, setHourlyRate] = useSessionStorageState('hourlyrate', {
    defaultValue: '',
  })

  // post a job context
  const [jobTitle, setJobTitle] = useSessionStorageState('jobTitle', {
    defaultValue: '',
  })
  const [jobAbout, setJobAbout] = useSessionStorageState('jobAbout', {
    defaultValue: '',
  })
  const [jobCategory, setJobCategory] = useSessionStorageState('jobCategory', {
    defaultValue: '',
  })
  const [jobSubcategory, setJobSubCategory] = useSessionStorageState(
    'jobSubcategory',
    {
      defaultValue: '',
    },
  )
  const [jobSkills, setJobSkills] = useSessionStorageState('jobSkills', {
    defaultValue: [],
  })
  const [jobExperience, setJobExperience] = useSessionStorageState(
    'jobExperience',
    {
      defaultValue: '',
    },
  )
  const [jobCredits, setJobCredits] = useSessionStorageState('jobCredits', {
    defaultValue: '',
  })
  const [jobPayment, setJobPayment] = useSessionStorageState('jobPayment', {
    defaultValue: '',
  })

  const value = {
    selectedImage,
    setSelectedImage,
    selectedFile,
    setSelectedFile,
    title,
    setTitle,
    about,
    setAbout,
    category,
    setCategory,
    subcategory,
    setSubCategory,
    skills,
    setSkills,
    experience,
    setExperience,
    hourlyrate,
    setHourlyRate,
    jobTitle,
    setJobTitle,
    jobAbout,
    setJobAbout,
    jobCategory,
    setJobCategory,
    jobSubcategory,
    setJobSubCategory,
    jobSkills,
    setJobSkills,
    jobExperience,
    setJobExperience,
    jobCredits,
    setJobCredits,
    jobPayment,
    setJobPayment,
  }
  return (
    <GetStartedContext.Provider value={value}>
      {children}
    </GetStartedContext.Provider>
  )
}

export default GetStartedContext
