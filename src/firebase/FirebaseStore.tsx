import { getStorage, ref, uploadBytes } from 'firebase/storage'
import useAuth from '../data/hook/useAuth'

export async function saveInFirebase(email: string, name: string, file: any) {
  const storage = getStorage()
  // Child references can also take paths delimited by '/'
  const spaceRef = ref(storage, `${email}/${name}`)
  // spaceRef now points to "images/space.jpg"
  // imagesRef still points to "images"
  await uploadBytes(spaceRef, file).then(snapshot => {
    console.log('Uploaded a blob or file!')
    console.log(snapshot)
  })
}
