import Layout from '@/components/Layout'
import style from '@/styles/Proposals.module.css'
import { getSession, useSession } from 'next-auth/react'
import { useState } from 'react'
import { initMongoose } from '../../../../lib/initMongoose'
import Loader from '@/components/Loader'
import { useRouter } from 'next/router'
import { Animate } from 'react-simple-animate'
import { getTransactions } from '@/pages/api/get-transactions'
const Proposals = ({ transactions }) => {
  const [isDeposit, setIsDeposit] = useState(true)
  const [isReceived, setIsReceived] = useState(false)
  const [isTransfers, setIsTransfers] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const session = useSession()

console.log(transactions)
  return (
    <Layout>
      {loading && <Loader />}
      <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
      
          <div className={style.container}>
            <div className={style.header}>
              <input
                checked={isDeposit}
                onChange={(e) => {
                  setIsDeposit(true)
                  setIsReceived(false)
                  setIsTransfers(false)
                }}
                id={style.label1}
                hidden
                type="checkbox"
              />
              <label
                htmlFor={style.label1}
                className={isDeposit && style.selected}
              >
                Deposits ({transactions.deposits.length})
              </label>
              <input
                checked={isReceived}
                onChange={() => {
                    setIsDeposit(false)
                    setIsTransfers(false)
                    setIsReceived(true)
                }}
                id={style.label}
                hidden
                type="checkbox"
              />
              <label
                htmlFor={style.label}
           
                className={isReceived && style.selected}
              >
               Received ({transactions.received.length})
              </label>
              <input
                checked={isTransfers}
                onChange={() => {
                    setIsDeposit(false)
                    setIsTransfers(true)
                    setIsReceived(false)
                }}
                id={style.label3}
                hidden
                type="checkbox"
              />
              <label
                htmlFor={style.label3}
                onClick={() => {
                  setIsDeposit(false)
                  setIsTransfers(true)
                  setIsReceived(false)
                }}
                className={isTransfers && style.selected}
              >
                Transfers ({transactions.transfers.length})
              </label>
            
            </div>

            {isReceived && <div className={style.transactionsContainer}>
                {transactions.received.map(receive=>{
                    return(<div className={style.transactions}>
                        <h3>Credits <span>({receive.credits})</span></h3>
                        <h4>From {receive.from}</h4>
                        <h5><span>Received on </span> {receive.date}</h5>
                    </div>)
                })}
                </div>}
                {isDeposit && <div className={style.transactionsContainer}>
                {transactions.deposits.map(deposit=>{
                    return(<div className={style.transactions}>
                        <h3>Credits <span>({deposit.credits})</span></h3>
                        <h4>From {deposit.from}</h4>
                        <h5><span>Deposited on </span> {deposit.date}</h5>
                    </div>)
                })}
                </div>}
                {isTransfers && <div className={style.transactionsContainer}>
                {transactions.transfers.map(transfer=>{
                     return(<div className={style.transactions}>
                        <h3>Credits <span>({transfer.credits})</span></h3>
                        <h4>to {transfer.to}</h4>
                        <h5><span>Transfered on </span> {transfer.date}</h5>
                    </div>)
                })}
                </div>}
          </div>
       
   
      </Animate>
    </Layout>
  )
}

export default Proposals

export async function getServerSideProps(context) {
  const session = getSession(context)
  await initMongoose()
  
  return {
    props: {
      transactions: JSON.parse(JSON.stringify(await getTransactions((await session).user.email))),
    },
  }
}
