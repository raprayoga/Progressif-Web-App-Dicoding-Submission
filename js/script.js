$(document).ready(function(){
  $('.sidenav').sidenav();
  
  // navigation response
  $(".sidenav a, .topnav a").on('click', function(e) {
    let page = e.target.getAttribute("href").substr(1)
    $('.sidenav').sidenav('close');
    loadContent(page)
  });
  
  // Load page content
  let page = window.location.hash.substr(1);
  if (page == "") page = "home";
  loadContent(page);

  function loadContent(page) {
    $.ajax({
      url: `pages/${page}.html`,
      type: 'get',
      dataType: 'html',
      success: function(data) {
        $('main').html("")
        if (data.length === 0) {
          $('main').append("<h2> PAGE NOT FOUND </h2>")
        } else {
          $('main').append(data)

          // materializeCss plugin
          $('.slider').slider({
            interval: 4000,
            height: 600
          });
          $('select').formSelect();
          
          // All button response
          $('.product a, .btn-large').on('click', function(e) {
            let page = e.target.getAttribute("href").substr(1);
            loadContent(page)
          })
        }
      }
    });
  }
});