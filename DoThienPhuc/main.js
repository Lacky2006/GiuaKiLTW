const menu=document.getElementById('menu'),links=document.getElementById('links');
menu.addEventListener('click',()=>links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  links.querySelectorAll('a').forEach(x=>x.classList.remove('active'));a.classList.add('active');links.classList.remove('open');
}));
