$('#sidebarCollapse').off('click').on('click', function () {
  $('#sidebar').toggleClass('active');
  $('.main-content').toggleClass('active');
});
$('#sidebarCollapse2').off('click').on('click', function () {
  $('#sidebar').toggleClass('active2');
  $('.brand').toggleClass('active');
});

$('#userlayoutCollapse').off('click').on('click', function () {
  $('#user-layout').toggleClass('active');
  $('.main-content .posts').toggleClass('active');
});

function hideSidepanel() {
  $('#sidebar').toggleClass('active2');
  $('.brand').toggleClass('active');
}
