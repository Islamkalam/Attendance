import { signInFirebase,classDetail,uploadImage,studentInfo,realTime } from "./firebase.js"




window.signIn =async function(){
    var email=document.getElementById("email").value
    var password=document.getElementById("password").value
    var p=document.getElementById("para")

    try {
        await signInFirebase(email,password)
        p.innerHTML=""
        window.location.href="view/home.html"
    } catch (e) {
        p.innerHTML=e.message
    }
}
window.addClass =async function(){
    var teacher=document.getElementById("teacher")
    var time=document.getElementById("time")
    var schedule=document.getElementById("schedule")
    var section=document.getElementById("section")
    var course=document.getElementById("course")
    var batch=document.getElementById("batch")
    

    try {
        await classDetail(teacher.value,time.value,schedule.value,section.value,course.value,batch.value)
        alert("Successfully upload")
        teacher.value=""
        time.value=""
        schedule.value=""
        section.value=""
        course.value=""
        batch.value=""
        console.log(class_id.id)
    } catch (e) {
        alert(e.message)
    }
}



window.studentInfo =async function(){
    var name=document.getElementById("name")
    var fname=document.getElementById("fname")
    var roll=document.getElementById("roll")
    var cont=document.getElementById("cont")
    var cnic=document.getElementById("cnic")
    var course=document.getElementById("course")
    var image = document.getElementById("image").files[0]

    try {
        const imageUrl = await uploadImage(image)
        await studentInfo(name.value,fname.value,roll.value,cont.value,cnic.value,course.value,imageUrl)
        alert("Successfully upload")
        name.value=""
        fname.value=""
        roll.value=""
        cont.value=""
        cnic.value=""
        course.value=""
        image.value=""
    } catch (e) {
        alert(e.message)
    }
}

window.real=function(){
    let image=document.getElementById('spanimg')
    let name1=document.getElementById('spanname')
    let fname=document.getElementById('spanfname')
    let roll=document.getElementById('spanroll')
    let course=document.getElementById('spancourse')
    let teacher=document.getElementById('spanteacher')
    let schedule=document.getElementById('spanschedule')
    let time=document.getElementById('spantime')
    let section=document.getElementById('spansection')
    let batch=document.getElementById('spanbatch')
    let cnic=document.getElementById('spancnic')
    let cont=document.getElementById('spancont')
    console.log('hi')
    var id=document.getElementById('roll_id').value
    let tem =  realTime(id,name1,fname,roll,course,teacher,schedule,time,section,batch,cnic,cont,image)
    console.log(tem)
}