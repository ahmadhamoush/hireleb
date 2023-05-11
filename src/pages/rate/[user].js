import Layout from "@/components/Layout"
import style from '@/styles/Rate.module.css'
import { initMongoose } from "../../../lib/initMongoose"
import { getUser } from "../api/get-user"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import Loader from "@/components/Loader"
import { toast } from "react-toastify"
import { useSession } from "next-auth/react"
import axios from "axios"
import { useRouter } from "next/router"
const User = ({user}) => {
    const session = useSession()

    const [quality,setQuality] = useState('')
    const [deadline,setDeadline] = useState('')
    const [responsive,setResponsive] = useState('')
    const [communication,setCommunication] = useState('')
    const [outcome,setOutcome] = useState('')
    const [loading,setLoading] = useState(false)
    const router = useRouter()

    const rate = async () => {
        setLoading(true)
        let valid = true
        if (quality === '') {
          toast('quality is not valid')
          valid = false
        }
        if (deadline === '') {
          toast('deadline is not valid')
          valid = false
        }
        if (responsive === '') {
          toast('responsive is not valid')
          valid = false
        }
        if (communication === '') {
            toast('communication is not valid')
          valid = false
        }
        if (outcome === '') {
            toast('outcome is not valid')
          valid = false
        }
    
        if (valid) {
          try {
            const formData = new FormData()
            formData.append('ratedBy', session.data.user.email)
            formData.append('rated', user.email)
            formData.append('quality', quality)
            formData.append('deadline', deadline)
            formData.append('responsive', responsive)
            formData.append('communication', communication)
            formData.append('outcome', outcome)
            const { data } = await axios.post('/api/rate', formData)
            if (data) {
              toast('Rate Success')
              setLoading(false)
              router.push(`/`)
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
        <div className={style.container}>
    <div className={style.freelancer}>
            <div className={style.imageContainer}>
              <Image alt='img' className={style.image} src={user.image} fill />
            </div>
            <p style={{textTransform:'capitalize'}} >{user.type}</p>
            <span style={{textTransform:'capitalize'}}>{user.fName} {user.lName}</span>
            <div className={style.rates}>
              <div className={style.rate}>
                <h3>Quality of work</h3>
                <div className={style.rating    } >
  <input type="radio" onChange={(e)=>setQuality(e.target.value)} id="star25" name="rate5" value="5"/>
  <label htmlFor="star25" title="text"></label>
  <input type="radio" onChange={(e)=>setQuality(e.target.value)}  id="star24" name="rate5" value="4"/>
  <label htmlFor="star24" title="text"></label>
  <input  type="radio" onChange={(e)=>setQuality(e.target.value)}  id="star23" name="rate5" value="3"/>
  <label htmlFor="star23" title="text"></label>
  <input type="radio" onChange={(e)=>setQuality(e.target.value)}  id="star22" name="rate5" value="2"/>
  <label htmlFor="star22" title="text"></label>
  <input type="radio" onChange={(e)=>setQuality(e.target.value)}  id="star21" name="rate5" value="1"/>
  <label htmlFor="star21" title="text"></label>
</div>
              </div>
              <div className={style.rate}>
                <h3>Adherence to deadlines</h3>
                <div className={style.rating    } >
  <input type="radio" onChange={(e)=>setDeadline(e.target.value)} id="star20" name="rate4" value="5"/>
  <label htmlFor="star20" title="text"></label>
  <input type="radio" onChange={(e)=>setDeadline(e.target.value)} id="star19" name="rate4" value="4"/>
  <label htmlFor="star19" title="text"></label>
  <input  type="radio" onChange={(e)=>setDeadline(e.target.value)} id="star18" name="rate4" value="3"/>
  <label htmlFor="star18" title="text"></label>
  <input type="radio" onChange={(e)=>setDeadline(e.target.value)} id="star17" name="rate4" value="2"/>
  <label htmlFor="star17" title="text"></label>
  <input type="radio" onChange={(e)=>setDeadline(e.target.value)} id="star16" name="rate4" value="1"/>
  <label htmlFor="star16" title="text"></label>
</div>
              </div>
              <div className={style.rate}>
                <h3>Responsiveness</h3>
                <div className={style.rating    } >
  <input type="radio" onChange={(e)=>setResponsive(e.target.value)} id="star15" name="rate3" value="5"/>
  <label htmlFor="star15" title="text"></label>
  <input type="radio" onChange={(e)=>setResponsive(e.target.value)} id="star14" name="rate3" value="4"/>
  <label htmlFor="star14" title="text"></label>
  <input  type="radio" onChange={(e)=>setResponsive(e.target.value)} id="star13" name="rate3" value="3"/>
  <label htmlFor="star13" title="text"></label>
  <input type="radio" onChange={(e)=>setResponsive(e.target.value)} id="star12" name="rate3" value="2"/>
  <label htmlFor="star12" title="text"></label>
  <input type="radio" onChange={(e)=>setResponsive(e.target.value)} id="star11" name="rate3" value="1"/>
  <label htmlFor="star11" title="text"></label>
</div>
              </div>
              <div className={style.rate}>
                <h3>Communication skills</h3>
                <div className={style.rating    } >
  <input type="radio" onChange={(e)=>setCommunication(e.target.value)} id="star10" name="rate2" value="5"/>
  <label htmlFor="star10" title="text"></label>
  <input type="radio" onChange={(e)=>setCommunication(e.target.value)} id="star9" name="rate2" value="4"/>
  <label htmlFor="star9" title="text"></label>
  <input  type="radio" onChange={(e)=>setCommunication(e.target.value)} id="star8" name="rate2" value="3"/>
  <label htmlFor="star8" title="text"></label>
  <input type="radio" onChange={(e)=>setCommunication(e.target.value)} id="star7" name="rate2" value="2"/>
  <label htmlFor="star7" title="text"></label>
  <input type="radio" onChange={(e)=>setCommunication(e.target.value)} id="star6" name="rate2" value="1"/>
  <label htmlFor="star6" title="text"></label>
</div>
              </div>
              <div className={style.rate}>
                <h3>Satisfaction with outcome</h3>
                <div className={style.rating    } >
  <input type="radio" onChange={(e)=>setOutcome(e.target.value)} id="star5" name="rate1" value="5"/>
  <label htmlFor="star5" title="text"></label>
  <input type="radio" onChange={(e)=>setOutcome(e.target.value)} id="star4" name="rate1" value="4"/>
  <label htmlFor="star4" title="text"></label>
  <input  type="radio" onChange={(e)=>setOutcome(e.target.value)} id="star3" name="rate1" value="3"/>
  <label htmlFor="star3" title="text"></label>
  <input type="radio" onChange={(e)=>setOutcome(e.target.value)} id="star2" name="rate1" value="2"/>
  <label htmlFor="star2" title="text"></label>
  <input type="radio" onChange={(e)=>setOutcome(e.target.value)} id="star1" name="rate1" value="1"/>
  <label htmlFor="star1" title="text"></label>
</div>
              </div>
         
               
            </div>
            <button onClick={rate}>Rate</button>
          </div>
        </div>
    </Layout>
  )
}

export default User
export async function getServerSideProps(context){

    const {query} = context
    const  {user} = query
    await initMongoose()

    return{
        props:{
            user : JSON.parse(JSON.stringify(await getUser(user)))
        }
    }
}