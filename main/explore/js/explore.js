function flipfun1(category)
{
  $("#nextExplore").show();
  $("#subHeader").animate({'width': 0},400,function(){
      $("#subHeader").remove();

  });
  // html5 storage
  sessionStorage.category = category;
  // code to flip div
  $("#wrapper").animate({'padding-left': 0},600,function(){
      //$("#wrapper").css('display','none');
      var directionArray = new Array('RIGHT','LEFT','TOP','BOTTOM');
      var DIRECTION = directionArray[Math.floor(Math.random()*directionArray.length)];
      $("#getHome").show();
      $("#wrapper").css({'padding-left' : '0px'});
          $("#flipbox").flippy({
            direction: DIRECTION,
            duration: "400",
            onFinish: function(){
              $("#flipbox").remove();
              loadData(category); // now load data 
            }
        });  
      });
}
function loadData(category)
{

  $("#waiting").hide();
  var data = "category="+category;
  $.get("explore/exploreGetData.php",data,function(result){
    //alert(result);
    if(result != '')
      fileGetContent(result);
    else
    {
      //alert("Sorry We are getting results after some time");
      var data1 = "keyword="+category;
      $("#waiting").show();
      $.get("explore/findLinksFromInternet.php",data1,function(informer){
          //alert(informer);
          if(informer !='notDone')
            {
              $("#waiting").hide();
              loadData(category);
            }
          //else
            //alert(informer);
      });
    }
  });
}
function fileGetContent(href)
{
  
  if(href !='')
  {
    if (href.match("^www")) {
      var href1="http://"+href;
      $("#loadContent").show();
      var myURL = document.location;
      document.location = myURL + "#@"+href1;
      $('<iframe class="iframe" id="iframe123" X-Frame-Options="allow" frameBorder="0" style="width: 100%; height: 100%;position:fixed;overflow:auto" data-bind="attr: { src: key }"></iframe>').appendTo('#loadContent');
        function AppViewModel() 
        {
          this.key = href1;
        }
        //ko.cleanNode($("#iframe"));
        document.body.innerHtml = document.body.innerHtml; 
        ko.applyBindings(new AppViewModel()); 
      }
    else if(href.match("^http"))
    {
      var href1="http://www."+href;
      $("#loadContent").show();
      var myURL = document.location;
      document.location = myURL + "#@"+href1;
      $('<iframe class="iframe" id="iframe123" X-Frame-Options="allow" frameBorder="0" style="width: 100%; height: 100%;position:fixed;overflow:auto" data-bind="attr: { src: key }"></iframe>').appendTo('#loadContent');
        function AppViewModel() 
        {
          this.key = href1;
        }
        //ko.cleanNode($("#iframe"));
        document.body.innerHtml = document.body.innerHtml; 
        ko.applyBindings(new AppViewModel()); 
    }
    else
    {
      var href1="http://www."+href;
      $("#loadContent").show();
      var myURL = document.location;
      document.location = myURL + "#@"+href1;
      $('<iframe class="iframe" id="iframe123" X-Frame-Options="allow" frameBorder="0" style="width: 100%; height: 100%;position:fixed;overflow:auto" data-bind="attr: { src: key }"></iframe>').appendTo('#loadContent');
        function AppViewModel() 
        {
          this.key = href1;
        }
        //ko.cleanNode($("#iframe"));
        document.body.innerHtml = document.body.innerHtml; 
        ko.applyBindings(new AppViewModel()); 
    }
  } // if close
} // fun close