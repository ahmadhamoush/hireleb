import Layout from '@/components/Layout'
import { getSession, signOut } from 'next-auth/react'
import style from '@/styles/Settings.module.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faUser } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { initMongoose } from '../../../lib/initMongoose'
import { getUser } from '../api/get-user'

const Settings = ({ user }) => {
  const [namedClicked, setNameClicked] = useState(false)
  const [fName, setFname] = useState('')
  const [lName, setLname] = useState('')
  const [emailClicked, setEmailClicked] = useState(false)
  const [email, setEmail] = useState('')
  const [selectedImage, setSelectedImage] = useState(user?.image)
  const [selectedFile, setSelectedFile] = useState('')
  const [typeClicked, setTypeClicked] = useState(false)
  const [deleteClicked, setDeleteClicked] = useState(false)
  return (
    <Layout>
      <div className={style.container}>
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
              <FontAwesomeIcon className={style.user} icon={faUser} />{' '}
              <FontAwesomeIcon className={style.add} icon={faAdd} />
            </p>
          )}
        </label>
        <div>
          <p>
            Current name : {user?.fName} {user?.lName}
          </p>
          <h3 onClick={() => setNameClicked((prev) => !prev)}>Change Name</h3>
          {namedClicked && (
            <>
              <input
                value={fName}
                onChange={(e) => setFname(e.target.value)}
                placeholder="New First Name"
              />
              <input
                value={lName}
                onChange={(e) => setLname(e.target.value)}
                placeholder="New Last Name"
              />
              <button>Update</button>
            </>
          )}
        </div>
        <div>
          <p>Current email : {user?.email}</p>
          <h3 onClick={() => setEmailClicked((prev) => !prev)}>Change Email</h3>
          {emailClicked && (
            <>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="New Email"
              />
              <button>Update</button>
            </>
          )}
        </div>
        <div>
          {' '}
          <p>Current Account Type : {user?.type}</p>{' '}
          <h3
            onClick={() => {
              setTypeClicked((prev) => !prev)
            }}
          >
            Switch to {user.type === 'freelancer' ? 'Client' : 'Freelancer'}{' '}
            Account
          </h3>
          {typeClicked && (
            <div>
              <button>Switch</button>
              <button
                onClick={() => setTypeClicked((prev) => !prev)}
                style={{ background: '#1e1e1e' }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div>
          <h3 onClick={() => signOut()}>Logout</h3>
        </div>
        <div>
          {' '}
          <h3
            onClick={() => {
              setDeleteClicked((prev) => !prev)
            }}
            className={style.delete}
          >
            Delect Account
          </h3>
          {deleteClicked && (
            <div>
              <button style={{ background: 'red' }}>Delete</button>
              <button
                onClick={() => setTypeClicked((prev) => !prev)}
                style={{ background: '#1e1e1e' }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Settings
export async function getServerSideProps(context) {
  const session = getSession(context)
  await initMongoose()
  return {
    props: {
      user: JSON.parse(
        JSON.stringify(await getUser((await session).user.email)),
      ),
    },
  }
}
