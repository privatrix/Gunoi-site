/* gunoi.md — shared service-page JS */
(function(){
  /* GA4 conversion events */
  document.querySelectorAll('a[href^="tel:"]').forEach(function(el){
    el.addEventListener('click',function(){
      if(typeof gtag!=='undefined') gtag('event','phone_click',{page_location:location.href});
    });
  });
  document.querySelectorAll('a[href*="wa.me"]').forEach(function(el){
    el.addEventListener('click',function(){
      if(typeof gtag!=='undefined') gtag('event','whatsapp_click',{page_location:location.href});
    });
  });
  /* form submit event */
  var form=document.getElementById('leadForm');
  if(form){
    form.addEventListener('submit',function(){
      if(typeof gtag!=='undefined') gtag('event','form_submit',{page_location:location.href});
    });
  }
  /* smooth anchor scroll */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var id=a.getAttribute('href').slice(1);
      var el=document.getElementById(id);
      if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});}
    });
  });
})();
