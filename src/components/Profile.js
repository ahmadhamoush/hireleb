import style from '@/styles/Service.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Profile = ({ user }) => {
  const router = useRouter()
  return (
    <div
      onClick={() =>
        user.type === 'freelancer'
          ? router.push(`/profiles/freelancer/${user.email}`)
          : router.push(`/profiles/client/${user.email}`)
      }
      className={style.wrapper}
    >
      <div key={user._id} className={style.card}>
        <div className={style.infos}>
          <Image
            alt="user"
            src={user.image}
            width={100}
            height={100}
            className={style.image}
          />
          <div className={style.info}>
            <div>
              <p className={style.name}>
                {user.fName} {user.lName}
              </p>
              <p className={style.function}>{user.type}</p>
            </div>
            <div className={style.stats}>
              <p className={`${style.flex} ${style.flexCol}`}>
                Rates
                <span className={style.stateValue}>{user.rates.length}</span>
              </p>
              <p className={style.flex}>
                Credits
                <span className={style.stateValue}>{user.credits}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
