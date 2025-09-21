// Parallax blobs + skill bars + menú mobile + reveal + scrollspy + dark
const blobs = document.querySelectorAll('.blob');
const bars = document.querySelectorAll('.bars em');
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.hamburger');
const links = document.querySelector('.links');
const themeBtn = document.getElementById('themeToggle');

/* Parallax + nav state */
function onScroll(){
  const y = window.scrollY || 0;
  blobs.forEach((b,i)=> b.style.transform = `translateY(${y*((i+1)*0.03)}px)`);
  nav.classList.toggle('scrolled', y>4);
}
window.addEventListener('scroll', onScroll);
onScroll();

/* niveles en barras */
bars.forEach(el => el.style.setProperty('--lvl', el.dataset.level || 70));

/* menú mobile */
if(hamburger){
  hamburger.addEventListener('click', ()=>{
    const open = links.style.display === 'flex';
    links.style.display = open ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.gap = '8px';
  });
}

/* Reveal on scroll */
const revealEls = document.querySelectorAll('.reveal');
const ioReveal = new IntersectionObserver((entries)=>{
  entries.forEach((e)=>{
    if(e.isIntersecting){ e.target.classList.add('is-visible'); ioReveal.unobserve(e.target); }
  });
},{ threshold: 0.12 });
revealEls.forEach(el => ioReveal.observe(el));

/* Scroll suave */
document.querySelectorAll('.links a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if(target){ target.scrollIntoView({ behavior:'smooth', block:'start' }); }
  });
});

/* Scrollspy */
const navLinks = [...document.querySelectorAll('.links a[href^="#"]')];
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const ioSpy = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    const id = '#' + entry.target.id;
    const link = navLinks.find(a => a.getAttribute('href') === id);
    if(link){ link.classList.toggle('active', entry.isIntersecting); }
  });
},{ rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });
sections.forEach(sec => ioSpy.observe(sec));

/* Tema oscuro con persistencia */
function applyTheme(t){
  document.body.classList.toggle('dark', t==='dark');
  if(themeBtn){
    themeBtn.textContent = t==='dark' ? 'Modo claro' : 'Modo oscuro';
    themeBtn.setAttribute('aria-pressed', t==='dark');
  }
}
applyTheme(localStorage.getItem('pro-theme') || 'light');

if(themeBtn){
  themeBtn.addEventListener('click', ()=>{
    const next = document.body.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem('pro-theme', next);
    applyTheme(next);
  });
}
