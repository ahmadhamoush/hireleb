import style from '@/styles/Navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const session = useSession()

  return (
    <>
      <nav className={style.nav}>
        <Link href="/">
          {' '}
          <h1>
            Hire<span>Leb</span>
          </h1>
        </Link>
        <input id={style.menu} type="checkbox" />
        <label className={style.menuIcon} htmlFor={style.menu}></label>
        <div className={style.responsive}>
          <div className={style.search}>
            <input type="text" placeholder="search" />
            <FontAwesomeIcon className={style.icon} icon={faSearch} />
          </div>
          <div className={style.links}>
            <ul>
              <li>
                <Link href="/">How it works</Link>
              </li>
              {/* display login and sign up if no user is logged in else display logout */}
              {!session.data?.user && <li onClick={() => signIn()}>Login</li>}
              {session.data?.user && <li onClick={() => signOut()}>Logout</li>}
              {!session.data?.user && (
                <li>
                  <Link href="/signup">signup</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <hr />
    </>
  )
}

export default Navbar
