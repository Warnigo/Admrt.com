import { auth } from "../firebase/firebase";

let setUserId = '';
const userId = setUserId;

const generateID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%#!)_=+-';
    let id = '';
    for (let i = 0; i < 12; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
  };

  const unsubscripbe = auth.onAuthStateChanged(user => {
    if(user){
      setUserId = user.uid;
    }else{
      setUserId = ''
    }
  })

  unsubscripbe()
const Id = generateID()
export {
    Id,
    userId,
}
