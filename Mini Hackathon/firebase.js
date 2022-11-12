import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { getFirestore, collection, addDoc, setDoc, doc, getDoc, getDocs, query, where, onSnapshot, orderBy } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChRvOnqAN5WsGJc1UX55zvYWKe-rUzSp8",
  authDomain: "attendance-6aa32.firebaseapp.com",
  projectId: "attendance-6aa32",
  storageBucket: "attendance-6aa32.appspot.com",
  messagingSenderId: "1022640123823",
  appId: "1:1022640123823:web:dc043e1ed422faec9ec95a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

function signInFirebase(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

function classDetail(teacher,time,schedule,section,course,batch) {
  return addDoc(collection(db, "course"), {teacher,time,schedule,section,course,batch})
}
async function uploadImage(image) {
  const storageRef = ref(storage, `images/${image.name}`)
  const snapshot = await uploadBytes(storageRef, image)
  const url = await getDownloadURL(snapshot.ref)
  return url
}

function studentInfo(name,fname,roll,cont,cnic,course,imageUrl) {

  return addDoc(collection(db, "student"), { name,fname,roll,cont,cnic,course,imageUrl })
}

async function options() {
  const querySnapshot = await getDocs(collection(db, "course"))
  const ads = []
  querySnapshot.forEach((doc) => {
      ads.push({ id: doc.id, ...doc.data() });
  })
  return ads
}
function realTime(Id,name1,fname,roll,course,teacher,schedule,time,section,batch,cnic,cont,image){
const q = query(collection(db, "student"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    if(doc.data().roll==Id){
      name1.innerHTML=doc.data().name
      fname.innerHTML=doc.data().fname
      roll.innerHTML=doc.data().roll
      cnic.innerHTML=doc.data().cnic
      cont.innerHTML=doc.data().cont
      image.setAttribute('src',doc.data().imageUrl)
      let tem=doc.data().course.split(',')
      tem.join('')
      course.innerHTML=tem[0]
      teacher.innerHTML=tem[1]
      schedule.innerHTML=tem[2]
      time.innerHTML=tem[3]
      section.innerHTML=tem[4]
      batch.innerHTML=tem[5]
      
    }
  });
  // const result = cities.filter(word => word.roll == Id);
  // console.log(result)
});
}


export {
  signInFirebase,
  classDetail,
  uploadImage,
  studentInfo,
  options,
  realTime
}