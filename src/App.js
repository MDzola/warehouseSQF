import { useEffect, useState } from 'react';
import './App.css';
import Auth from "./components/auth.js";
import { db , auth, storage } from "./config/firebase-config.js";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';


function App() {


  // the firebase portion was built off the video https://www.youtube.com/watch?v=2hR-uWjBAgw 
 
  const [users, setUsers] = useState([])
  const [newUserFirstName, setNewUserFirstName] = useState("")
  const [newUserLastName, setNewUserLastName] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserPassword, setNewUserPassword] = useState("")

  const [updatedEmail, setUpdatedEmail] = useState("")

  const [fileUpload, setFileUpload] = useState(null)

  const usersCollectionRef = collection(db, "Users")

  const getUserList = async ()  => {
    try {
          const data = await getDocs(usersCollectionRef)
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
             id:doc.id,
            }));
            setUsers(filteredData)
          console.log(filteredData)
          console.log(auth)
        } catch (err) {
          console.error(err)
        }
  };

  useEffect(() => {
    getUserList()
  }, [])

  const onSubmit = async () => {
    try{
      await addDoc(usersCollectionRef, {
        Email: newUserEmail,
        Password: newUserPassword,
        FirstName: newUserFirstName,
        LastName: newUserLastName,
        UserID: auth?.currentUser?.uid,
      });
      getUserList()
    } catch (err) {
      console.error(err);
    }
    setNewUserFirstName("")
    setNewUserLastName("")
    setNewUserEmail("")
    setNewUserPassword("");
  };


  const deleteUser = async (id) => {
    const userDoc = doc(db, "Users", id )
    await deleteDoc(userDoc)
    getUserList()
  };

  const updateUserEmail = async (id) => {
    const userDoc = doc(db, "Users", id )
    await updateDoc(userDoc, {Email: updatedEmail })
    getUserList()
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `PicturesOfBolivar/${fileUpload.name}`)
    try{await uploadBytes(filesFolderRef, fileUpload)
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <div className="App">Firebase Course
      <Auth />
      <div>
        <label htmlFor="firstName">First Name</label>
        <input 
        id="firstName"
        type="text" 
        placeholder="First Name" 
        onChange = {(e) => setNewUserFirstName(e.target.value)}
        value={newUserFirstName}
        />
        <input 
        type="text" 
        placeholder="Last Name"
        onChange = {(e) => setNewUserLastName(e.target.value)}
        value={newUserLastName} 
        />
        <input 
        type="text" 
        placeholder="Email"
        onChange = {(e) => setNewUserEmail(e.target.value)}
        value={newUserEmail}  
        />
        <input 
        type="text" 
        placeholder="Password"
        onChange = {(e) => setNewUserPassword(e.target.value)}
        value={newUserPassword}   
        />
        <button onClick={onSubmit}>Submit User</button>
      </div>
      <div>
        {users.map((user) => (
          <div>
            <p>----------------------------------</p>
            <p>{user.FirstName} {user.LastName}</p>
            <p>{user.Email} : {user.Password}</p>
            <button onClick={() => deleteUser(user.id)}>Delete User</button>
            <p>---Update Info---</p>
            <input 
            type="text"
            placeholder="New Email"
            onChange = {(e) => setUpdatedEmail(e.target.value)} 
            />
            <button onClick={() =>updateUserEmail(user.id)}>Update Email</button>
          </div>
        ))}
      </div>
      <div>
        <input 
        type="file"
        onChange={(e) => setFileUpload(e.target.files[0])}
        />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
