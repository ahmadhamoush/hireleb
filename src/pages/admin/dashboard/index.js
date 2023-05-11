import style from '@/styles/Admin.module.css'
import { useState } from 'react'
import { initMongoose } from '../../../../lib/initMongoose'
import { getUsers } from '@/pages/api/get-user'
import Image from 'next/image'
import { getJobs } from '@/pages/api/get-jobs'
import { getTransactions } from '@/pages/api/get-transactions'
import { getDeposits } from '@/pages/api/get-deposits'
import { getAllServices } from '@/pages/api/get-services'
import Loader from '@/components/Loader'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import { getWithdraws } from '@/pages/api/get-withdraws'


const Dashboard = ({users,jobs,services,deposits,withdraws}) => {
    const [isUsers,setIsUsers] = useState(true)
    const [isJobs,setIsJobs] = useState(false)
    const [isServices,setIsServices] = useState(false)
    const [isDeposits,setIsDeposits] = useState(false)
    const [isWithdraws,setIsWithdraws] = useState(false)
    const [loading,setLoading] = useState(false)
    const router = useRouter()

    const approve = async (id, user,credits) => {
        setLoading(true)
          try {
            const formData = new FormData()
            formData.append('id', id)
            formData.append('user', user)
            formData.append('credits', credits)
            const { data } = await axios.post('/api/approve-deposit', formData)
            if (data) {
              toast('Deposit Approved')
              setLoading(false)
              const refreshData = () => router.replace(router.asPath)
              refreshData()
            }
          } catch (err) {
            console.log(err)
          }
 
      }
      const decline = async (id) => {
        setLoading(true)
          try {
            const formData = new FormData()
            formData.append('id', id)
            const { data } = await axios.post('/api/deline-deposit', formData)
            if (data) {
              toast('Deposit Declined')
              setLoading(false)
              const refreshData = () => router.replace(router.asPath)
              refreshData()
            }
          } catch (err) {
            console.log(err)
          }
 
      }

  return (
    <>
    <nav className={style.nav}>
    
    <h1>
      Hire<span>Leb</span>
    </h1>
  
    <div className={style.links}>
      <ul>
        <li onClick={() => signOut()}>Logout</li>         
      </ul>
    </div>
 
</nav>
    <div className={style.container}>
        {loading && <Loader />}
    

      <hr />
 
  <div className={style.header}>
            <input
              checked={isUsers}
              onChange={(e) => {
                setIsUsers(true)
                setIsJobs(false)
                setIsServices(false)
                setIsDeposits(false)
                setIsWithdraws(false)
              }}
              id={style.label1}
              hidden
              type="checkbox"
            />
            <label htmlFor={style.label1} className={isUsers && style.selected}>
              Users ({users.length})
            </label>
            <input
              checked={isJobs}
              onChange={() => {
                setIsUsers(false)
                setIsJobs(true)
                setIsServices(false)
                setIsDeposits(false)
                setIsWithdraws(false)
              }}
              id={style.label}
              hidden
              type="checkbox"
            />
            <label
              htmlFor={style.label}
              onClick={() => {
                setIsUsers(false)
                setIsJobs(true)
                setIsServices(false)
                setIsDeposits(false)
                setIsWithdraws(false)
              }}
              className={isJobs && style.selected}
            >
              Jobs ({jobs.length})
            </label>
            <input
              checked={isServices}
              onChange={() => {
                setIsUsers(false)
                setIsJobs(false)
                setIsServices(true)
                setIsDeposits(false)
                setIsWithdraws(false)
              }}
              id={style.label3}
              hidden
              type="checkbox"
            />
            <label
              htmlFor={style.label3}
              onClick={() => {
                setIsUsers(false)
                setIsJobs(false)
                setIsServices(true)
                setIsDeposits(false)
                setIsWithdraws(false)
              }}
              className={isServices && style.selected}
            >
              Services ({services.length})
            </label>
            <input
              checked={isDeposits}
              onChange={() => {
                setIsUsers(false)
                setIsJobs(false)
                setIsServices(false)
                setIsDeposits(true)
                setIsWithdraws(false)
              }}
              id={style.label4}
              hidden
              type="checkbox"
            />
            <label
              htmlFor={style.label4}
              onClick={() => {
                setIsUsers(false)
                setIsJobs(false)
                setIsServices(false)
                setIsWithdraws(false)
                setIsDeposits(true)
              }}
              className={isDeposits && style.selected}
            >
              Deposits ({deposits.length})
            </label>
            <input
              checked={isDeposits}
              onChange={() => {
                setIsUsers(false)
                setIsJobs(false)
                setIsServices(false)
                setIsDeposits(false)
                setIsWithdraws(true)
              }}
              id={style.label5}
              hidden
              type="checkbox"
            />
            <label
              htmlFor={style.label5}
              onClick={() => {
                setIsUsers(false)
                setIsJobs(false)
                setIsServices(false)
                setIsWithdraws(true)
                setIsDeposits(false)
              }}
              className={isWithdraws && style.selected}
            >
              Withdraws ({withdraws.length})
            </label>
          </div>

          {/* displaying users */}
          {isUsers &&  <div className={style.wrapper}>
         {users.map(user=> {  return user.type!== 'admin' && <div key={user._id} className={style.card}>
             <div className={style.infos}>
                 <Image alt='user' src={user.image} width={100} height={100} className={style.image}/>
                 <div className={style.info}>
                     <div>
                         <p className={style.name}>
                             {user.fName} {user.lName}
                         </p>
                         <p className={style.function}>
                            {user.type}
                         </p>
                     </div>
                     <div className={style.stats}>
                             <p className={`${style.flex} ${style.flexCol}`}>
                                 Rates
                                 <span className={style.stateValue}>
                                     {user.rates.length}
                                 </span>
                             </p>
                             <p className={style.flex}>
                                 Credits
                                 <span className={style.stateValue}>
                                     {user.credits}
                                 </span>
                             </p>
                             
                     </div>
                 </div>
             </div>
         </div>
         })}
          </div>

}
            {/* displaying jobs */}
            {isJobs &&  <div className={style.wrapper}>
         {jobs.map(job=> {  return  <div key={job._id} className={style.card}>
             <div className={style.infos}>
                 <div className={style.info}>
                     <div>
                         <p className={style.name}>
                            {job.title} 
                         </p>
                         <p className={style.function}>
                          Desc  {job.description}
                         </p>
                         <p className={style.function}>
                           Category {job.category}
                         </p>
                         <p className={style.function}>
                           Skills  {job.skills}
                         </p>
                         <p className={style.function}>
                           Posted By  {job.postedBy}
                         </p>
                     </div>
                     <div className={style.stats}>
                             <p className={style.flex}>
                                 Credits
                                 <span className={style.stateValue}>
                                     {job.credits}
                                 </span>
                             </p>
                             
                     </div>
                 </div>
             </div>
         </div>
         })}
          </div>

}
{/* displaying services */}
{isServices &&  <div className={style.wrapper}>
         {services.map(service=> {  return  <div key={service._id} className={style.card}>
             <div className={style.infos}>
                 <div className={style.info}>
                     <div>
                         <p className={style.name}>
                         {service.name} 
                         </p>
                         <p className={style.function}>
                          Desc  {service.desc}
                         </p>
                         <p className={style.function}>
                           Category {service.category}
                         </p>
                         <p className={style.function}>
                           Skills  {service.skills}
                         </p>
                         <p className={style.function}>
                           Posted By  {service.freelancer}
                         </p>
                     </div>
                     <div className={style.stats}>
                             <p className={style.flex}>
                                 Credits
                                 <span className={style.stateValue}>
                                     {service.credits}
                                 </span>
                             </p>
                             
                     </div>
                 </div>
             </div>
         </div>
         })}
          </div>

}
{/* displaying deposits */}
{isDeposits &&  <div className={style.wrapper}>
         {deposits.map(deposit=> {  return <div key={deposit._id} className={style.card}>
             <div className={style.infos}>
                 <Image alt='receipt' src={deposit.receipt} width={100} height={100} className={style.image}/>
                 <div className={style.info}>
                     <div>
                         <p className={style.name}>
                             {deposit.user}
                         </p>
                         <p className={style.function}>
                            {deposit.date}
                         </p>
                     </div>
                     <div className={style.stats}>
                             <p className={`${style.flex} ${style.flexCol}`}>
                                 Status
                                 <span className={style.stateValue}>
                                     {deposit.status}
                                 </span>
                             </p>
                             <p className={style.flex}>
                                 Credits
                                 <span className={style.stateValue}>
                                     {deposit.credits}
                                 </span>
                             </p>
                             
                     </div>
                   {deposit.status === 'pending' && <div className={style.btns}>
                   <button onClick={()=>approve(deposit._id,deposit.user,deposit.credits)}>Approve</button>
                     <button onClick={()=>decline(deposit._id)}>Decline</button>
                   </div>}
                 </div>
             </div>
         </div>
         })}
          </div>

}
{/* displaying withdrawals */}
{isWithdraws &&  <div className={style.wrapper}>
         {withdraws.map(withdraw=> {  return <div key={withdraw._id} className={style.card}>
             <div className={style.infos}>
                 <div className={style.info}>
                     <div>
                         <p className={style.name}>
                             {withdraw.user}
                         </p>
                         <p className={style.function}>
                            {withdraw.date}
                         </p>
                     </div>
                     <div className={style.stats}>
                             <p className={`${style.flex} ${style.flexCol}`}>
                                 Status
                                 <span className={style.stateValue}>
                                     {withdraw.status}
                                 </span>
                             </p>
                             <p className={style.flex}>
                                 Credits
                                 <span className={style.stateValue}>
                                     {withdraw.credits}
                                 </span>
                             </p>
                             
                     </div>
                   {withdraw.status === 'pending' && <div className={style.btns}>
                   <button onClick={()=>approve(withdraw._id,withdraw.user,withdraw.credits)}>Approve</button>
                     <button onClick={()=>decline(withdraw._id)}>Decline</button>
                   </div>}
                 </div>
             </div>
         </div>
         })}
          </div>

}
    </div>
    </>
  )
}

export default Dashboard
export async function getServerSideProps(){
    await initMongoose()

    return{
        props:{
            users: JSON.parse(JSON.stringify(await getUsers())),
            jobs: JSON.parse(JSON.stringify(await getJobs())),
            services: JSON.parse(JSON.stringify(await getAllServices())),
            transactions: JSON.parse(JSON.stringify(await getTransactions())),
            deposits: JSON.parse(JSON.stringify(await getDeposits())),
            withdraws: JSON.parse(JSON.stringify(await getWithdraws())),
        }
    }
}