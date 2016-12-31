// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.

(function(targetId, headingTag) {
  var target = document.getElementById(targetId);
  var headings = document.getElementsByTagName(headingTag || "h2");

  if(headings.length > 1) {
    var menuList = document.createElement("OL");

    var menuLink = document.createElement("A");
    menuLink.setAttribute("href", "#");
    menuLink.appendChild(document.createTextNode("\u2630 Menu"));

    var listItem = document.createElement("LI");
    listItem.id = "menuTrigger";
    listItem.className = "mobileonly";
    listItem.appendChild(menuLink);

    menuList.appendChild(listItem);

    for(var i=0; i < headings.length; i++) {
      var anchorName = "";
      if(headings[i].id) {
        anchorName = headings[i].id;
      } else {
        anchorName = "section_" + i;
        headings[i].setAttribute("id", anchorName);
      }

      var headingText = headings[i].firstChild.nodeValue

      headings[i].firstChild.nodeValue = (i+1) + ". " + headingText;

      var menuLink = document.createElement("A");
      menuLink.setAttribute("href", "#" + anchorName);
      menuLink.appendChild(document.createTextNode(headingText));

      var listItem = document.createElement("LI");
      listItem.appendChild(menuLink);

      menuList.appendChild(listItem);

      (function(idx) {
        menuLink.addEventListener("click", function(e) {
          headings[idx].scrollIntoView(true);
          e.preventDefault();
        }, false);
      })(i);
    }

    while(target.hasChildNodes()) target.removeChild(target.firstChild);

    target.appendChild(menuList);
  } else {
    target.parentNode.removeChild(target);
  }
})("submenu");
