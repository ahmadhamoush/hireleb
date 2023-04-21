
import style from '@/styles/Navbar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
const Navbar = () => {
  return (
   <>
    <nav className={style.nav}>
        <h1>Hire<span>Leb</span></h1>
        <input id={style.menu} type="checkbox" />
        <label className={style.menuIcon} htmlFor={style.menu}>
        </label>
        <div className={style.responsive}>
        <div className={style.search}>
            <input type="text" placeholder="search"/>
            <FontAwesomeIcon className={style.icon} icon={faSearch} />
        </div>
        <div className={style.links}>
            <ul>
            <li><Link href='/'>How it works</Link></li>
               <li><Link href='/services'>login</Link></li>
               <li>Sign up</li>
            </ul>
        </div>
      
        </div>
   
    </nav>
    <hr/>
    </>
  )
}

export default Navbar
