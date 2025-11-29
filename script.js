/* script.js - interactions for Styzz portfolio */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const topPos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: topPos, behavior: 'smooth' });
        // close mobile menu
        navLinks?.classList.remove('open');
      }
    });
  });

  // Portfolio modal
  const modal = document.querySelector('.modal');
  const modalCard = document.querySelector('.modal-card');
  const modalImg = document.querySelector('.modal-img');
  const modalDownload = document.querySelector('.modal-download');
  function openModalWith(title, desc, img){
    if(!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    if(modalCard){
      const mTitle = modalCard.querySelector('.modal-title');
      const mDesc = modalCard.querySelector('.modal-desc');
      if(mTitle) mTitle.textContent = title || '';
      if(mDesc) mDesc.textContent = desc || '';
    }
    if(modalImg){
      modalImg.src = img || '';
      modalImg.alt = title || 'Aperçu';
    }
    if(modalDownload){
      modalDownload.href = img || '#';
      if(img) modalDownload.setAttribute('download','');
    }
  }

  document.querySelectorAll('.card .preview').forEach(el => {
    el.addEventListener('click', () => {
      const title = el.dataset.title || '';
      const desc = el.dataset.desc || '';
      const img = el.dataset.img || '';
      openModalWith(title, desc, img);
    });
    // keyboard access (Enter/Space)
    el.addEventListener('keydown', (ev)=>{
      if(ev.key === 'Enter' || ev.key === ' '){
        ev.preventDefault();
        const title = el.dataset.title || '';
        const desc = el.dataset.desc || '';
        const img = el.dataset.img || '';
        openModalWith(title, desc, img);
      }
    });
  });

  // 'Voir' links should also open modal
  document.querySelectorAll('.see-link').forEach(link => {
    link.addEventListener('click', (ev) => {
      ev.preventDefault();
      const img = link.dataset.img || link.getAttribute('data-img') || '';
      const title = link.dataset.title || link.getAttribute('data-title') || '';
      const desc = link.dataset.desc || link.getAttribute('data-desc') || '';
      openModalWith(title, desc, img);
    });
  });
  document.querySelectorAll('.modal-close, .modal').forEach(el => {
    el.addEventListener('click', (ev) => {
      if (ev.target === el || el.classList.contains('modal-close')) {
        modal?.classList.remove('open');
        modal?.setAttribute('aria-hidden','true');
      }
    });
  });
  // Close modal with Escape
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') modal?.classList.remove('open');
  });

  // No form: Contact is via mailto link or Discord copy button

  // Copy discord handle
  const copyBtn = document.querySelector('#copy-discord');
  const discordHandle = document.querySelector('#discord-handle');
  if (copyBtn && discordHandle) {
    copyBtn.addEventListener('click', async ()=>{
      try {
        await navigator.clipboard.writeText(discordHandle.textContent.trim());
        const original = copyBtn.textContent;
        copyBtn.textContent = 'Copié ✓';
        showToast('Discord copié !');
        setTimeout(()=> copyBtn.textContent = original, 1800);
      } catch (e) {
        alert('Impossible de copier le handle. Copiez manuellement: ' + discordHandle.textContent);
      }
    });
  }

  // Copy email button
  const copyEmailBtn = document.querySelector('#copy-email');
  const emailLink = document.querySelector('.contact-email');
  if(copyEmailBtn && emailLink){
    copyEmailBtn.addEventListener('click', async ()=>{
      const mail = emailLink.getAttribute('href').replace('mailto:', '');
      try{
        await navigator.clipboard.writeText(mail);
        const original = copyEmailBtn.textContent;
        copyEmailBtn.textContent = 'Copié ✓';
        showToast('Email copié !');
        setTimeout(()=> copyEmailBtn.textContent = original, 1600);
      }catch(e){
        alert('Impossible de copier l\'email, copiez manuellement : ' + mail);
      }
    });
  }

  // Discord profile placeholder
  const discordInvite = document.querySelector('#discord-invite');
  if(discordInvite){
    discordInvite.addEventListener('click', (e)=>{
      e.preventDefault();
      showToast('Lien Discord indisponible (handle : styz_.)');
    });
  }

  // Toast helper
  const toast = document.querySelector('#toast');
  function showToast(msg, timeout=2200){
    if(!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(()=> toast.classList.remove('show'), timeout);
  }

  // Show toast on email click
  const mailLink = document.querySelector('a[href^="mailto:"]');
  if(mailLink){
    mailLink.addEventListener('click', ()=> showToast('Ouverture du client email...'));
  }
});
