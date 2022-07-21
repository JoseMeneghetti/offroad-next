import { deleteObject, ref, uploadBytes } from 'firebase/storage'
import { storage } from './config'

export async function saveInFirebase(email: string, name: string, file: any) {
  // Child references can also take paths delimited by '/'
  const spaceRef = ref(storage, `${email}/${name}`)
  // spaceRef now points to "images/space.jpg"
  // imagesRef still points to "images"

  try {
    const snapshot = await uploadBytes(spaceRef, file)
    const bucket = snapshot.metadata.bucket
    const fullPath = snapshot.metadata.fullPath
    const link = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
      fullPath
    )}?alt=media`
    return [link, fullPath]
  } catch (error) {
    throw new Error(error)
  }
}

export async function deletePhotos(path: string) {
  // Create a reference to the file to delete
  const desertRef = ref(storage, path)

  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      return true
    })
    .catch(error => {
      throw new Error(error)
    })
}
