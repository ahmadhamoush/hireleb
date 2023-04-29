import { createContext, useState } from 'react'
import useSessionStorageState from 'use-session-storage-state'

export const GetStartedContext = createContext({})

export function GetStartedContextProvide({ children }) {
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
  const [lbpChecked, setLBPChecked] = useSessionStorageState('lbp', {
    defaultValue: false,
  })
  const [usdChecked, setUSDChecked] = useSessionStorageState('usd', {
    defaultValue: false,
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
    lbpChecked,
    setLBPChecked,
    usdChecked,
    setUSDChecked,
  }
  return (
    <GetStartedContext.Provider value={value}>
      {children}
    </GetStartedContext.Provider>
  )
}

export default GetStartedContext
