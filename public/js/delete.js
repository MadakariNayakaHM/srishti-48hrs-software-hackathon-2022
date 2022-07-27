const { default: axios } = require("axios")

const deleteEvent=async ()=>{
  try{
    await axios({
        method:'DELETE',
        url:"http://127.0.0.1:3000/cmrit/faculty/deleteEvent/:id/",
        data:null
    })
  }catch(err){console.log("error at delete event");
console.log(err);}
}

deleteEvent();