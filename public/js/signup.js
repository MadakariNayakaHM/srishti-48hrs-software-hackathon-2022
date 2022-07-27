
const signup=async (name,email,passsword,designation,organizationName,phone)=>
{
 try{
    const res = await axios({
        method:'POST',
        url:'http://127.0.0.1:3000/cmrit/faculty/signup',
        data:{name,email,passsword,designation,organizationName,phone}
     })
     console.log(res)
 }catch(err){console.log(err)}


}


document.querySelector('.signup-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const name=document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password=document.getElementById('password').value;
    // const confirmPassword=document.getElementById('confirmPassword').value;
    const designation=document.getElementById('designation').value;
    const organizationName=document.getElementById('organizationName').value;
    const phone=document.getElementById('phone').value;

    signup(name,email,password,designation,organizationName,phone);
    window.alert("welcome to code-hackers , you are successfully signed in!!");
})