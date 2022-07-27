const updateEvent= async (CoOrdinator1,CoOrdinator2,volenteer1,volenteer2,volenteer3,volenteer4)=>
{
const res= await axios({
    method:'PATCH',
    url:'127.0.0.1:3000/cmrit/faculty/updateEvent/:id',
   
    data:{CoOrdinator1,CoOrdinator2,volenteer1,volenteer2,volenteer3,volenteer4,photo}
})
}

document.querySelector('.update-event').addEventListener('submit',e=>{
    e.preventDefault();
    const form = new FormData();
    form.append('CoOrdinator1', document.getElementById('CoOrdinator1').value);
    form.append('CoOrdinator2', document.getElementById('CoOrdinator2').value);
    form.append('volenteer1', document.getElementById('volenteer1').value);
    form.append('volenteer2', document.getElementById('volenteer2').value);
    form.append('volenteer3', document.getElementById('volenteer3').value);
    form.append('volenteer4', document.getElementById('volenteer4').value);
    form.append('photo', document.getElementById('photo').files[0]);
   

    // updateEvent(form);
    window.alert("event details updated");
})
        

