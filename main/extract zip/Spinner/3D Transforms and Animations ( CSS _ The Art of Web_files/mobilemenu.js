(function() {

  var menuTrigger = document.getElementById("menuTrigger");
  var menuContainer = document.getElementById("submenu");
  if(menuContainer.getElementsByTagName("OL")) {
    var menuNode = menuContainer.getElementsByTagName("OL")[0];
  }

  var showHideMenu = function(e) {
    if(menuContainer.className == "active") {
      menuContainer.className = "";
    } else {
      menuContainer.className = "active";
    }
    e.preventDefault();
  };
  menuTrigger.addEventListener("click", showHideMenu, false);
  menuTrigger.addEventListener("touchstart", showHideMenu, false);

  var hideMenu = function(e) { menuContainer.className = ""; };
  document.addEventListener("click", hideMenu, false);
  document.addEventListener("touchstart", hideMenu, false);

  var cancelBubble = function(e) { e.stopPropagation(); };
  menuNode.addEventListener("click", cancelBubble, false);
  menuNode.addEventListener("touchstart", cancelBubble, false);

})();
