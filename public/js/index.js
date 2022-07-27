let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

window.onscroll = () =>{
    
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    
}

document.querySelector('.fa-bar').addEventListener('click', () =>{
    document.querySelector('.fa-bar').classList.toggle('fa-times');
    document.querySelector('.navbar').classList.toggle('active');
});