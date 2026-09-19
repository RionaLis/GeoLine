(function(){
  document.querySelectorAll('.gl-block-toggle').forEach(function(button){
    button.addEventListener('click',function(){
      var block=button.closest('.gl-course-block');
      var open=!block.classList.contains('open');
      block.classList.toggle('open',open);
      button.setAttribute('aria-expanded',String(open));
    });
  });
  var menu=document.querySelector('.gl-menu-button'),nav=document.querySelector('.gl-sitebar nav');
  if(menu&&nav)menu.addEventListener('click',function(){nav.classList.toggle('open')});
})();
