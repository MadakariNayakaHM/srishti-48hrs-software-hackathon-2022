const createEvent=async (eventName,eventDate,eventTime,organizedBy)=>
{
 try{
    const res = axios({
        method:'POST',
        url:"http://127.0.0.1:3000/cmrit/faculty/createEvent",
        data:{eventName,eventDate,eventTime,organizedBy}
    })
 }
 catch(err){console.log(err)}
}

document.querySelector('.create').addEventListener('submit',e=>{
    e.preventDefault();
    const eventName=document.getElementById('eventName').value
    const eventDate=document.getElementById('eventDate').value
    const eventTime=document.getElementById('eventTime').value
    const organizedBy=document.getElementById('OrganizedBy').value

    createEvent(eventName,eventDate,eventTime,organizedBy);
    window.alert("successfully created an event !!");
})