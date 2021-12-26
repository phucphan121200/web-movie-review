import storage from "../utils/firebase";

export const checkImage = (file) => {
  const types = ['image/png', 'image/jpeg']
  let err = ''
  if (!file) return err = "File does not exist."

  if (file.size > 1024 * 1024) // 1mb
    err = "The largest image size is 1mb"

  if (!types.includes(file.type))
    err = "The image type is png / jpeg"

  return err;
}

export const imageUpload = async (file) => {
  const uploadTask = storage.ref(`images/${file.name}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
    }
  )
  let urlImage;
  await uploadTask.snapshot.ref.getDownloadURL().then((url) => {
    //console.log(url)
    urlImage = url
  }
  )
  return urlImage
}
