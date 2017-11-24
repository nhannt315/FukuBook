$('#sidebarCollapse').on('click', function () {
  $('#sidebar').toggleClass('active');
  $('.main-content').toggleClass('active');
});
$('#sidebarCollapse2').on('click', function () {
  $('#sidebar').toggleClass('active2');
  $('.brand').toggleClass('active');
})

$('#userlayoutCollapse').on('click', function () {
  $('#user-layout').toggleClass('active');
  $('.main-content .posts').toggleClass('active');
})

function hideSidepanel() {
  $('#sidebar').toggleClass('active2');
  $('.brand').toggleClass('active');
}

