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
  const [lbpChecked, setLBPChecked] = useSessionStorageState('lbpChecked', {
    defaultValue: false,
  })
  const [usdChecked, setUSDChecked] = useSessionStorageState('usdChecked', {
    defaultValue: false,
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
  const [jobHourlyrate, setJobHourlyRate] = useSessionStorageState(
    'hourlyrate',
    {
      defaultValue: '',
    },
  )
  const [jobLbpChecked, setJobLBPChecked] = useSessionStorageState(
    'jobLbpChecked',
    {
      defaultValue: false,
    },
  )
  const [jobUsdChecked, setJobUSDChecked] = useSessionStorageState(
    'jobUsdChecked',
    {
      defaultValue: false,
    },
  )

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
    lbpChecked,
    setLBPChecked,
    usdChecked,
    setUSDChecked,
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
    jobHourlyrate,
    setJobHourlyRate,
    jobLbpChecked,
    setJobLBPChecked,
    jobUsdChecked,
    setJobUSDChecked,
  }
  return (
    <GetStartedContext.Provider value={value}>
      {children}
    </GetStartedContext.Provider>
  )
}

export default GetStartedContext
