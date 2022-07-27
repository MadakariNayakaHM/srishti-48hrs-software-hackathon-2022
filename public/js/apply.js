
const apply=async (name,email,phone,eventName,appliedRole)=>
{
 try{
    const res = await axios({
        method:'POST',
        url:'http://127.0.0.1:3000/cmrit/faculty/applyEvent',
        data:{name,email,phone,eventName,appliedRole}
     })
     console.log(res)
 }catch(err){console.log(err)}


}


document.querySelector('.apply-event').addEventListener('submit',(e)=>{
    e.preventDefault();
    const name=document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone=document.getElementById('phone').value;
    const eventName=document.getElementById('eventName').value;
    const appliedRole=document.getElementById('appliedRole').value;

    apply(name,email,phone,eventName,appliedRole);
    window.alert("successfully applied for event");
})