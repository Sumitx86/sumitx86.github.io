function home(id)
{
	var data = "a";
	$("#subHeader").find('li').each(function(){
		var newId = this.id;
		$("#"+newId).removeClass("active");
	});
	$("#"+id).addClass("active");
	$.post("homeData.html",data,function(data){
		$("#content").html(data);
	});
}
function blog(id)
{
	var data = "a";
	$("#subHeader").find('li').each(function(){
		var newId = this.id;
		$("#"+newId).removeClass("active");
	});
	$("#"+id).addClass("active");
	$.post("blog/blogData.html",data,function(data){
		$("#content").html(data);
		var myURL = document.location;
		document.location = myURL + "blog";
	});
}
function vocab(id)
{
	var data = "a";
	$("#subHeader").find('li').each(function(){
		var newId = this.id;
		$("#"+newId).removeClass("active");
	});
	$("#"+id).addClass("active");
	$.post("vocab/vocabData.html",data,function(data){
		$("#content").html(data);
		var myURL = document.location;
		document.location = myURL + "vocab";
	});
}
function explore(id)
{
	var data = "a";
	$("#subHeader").find('li').each(function(){
		var newId = this.id;
		$("#"+newId).removeClass("active");
	});
	$("#"+id).addClass("active");
	window.location = "explore.php";		
	/*
	$.post("explore/exploreData.html",data,function(data){
		$("#content").html(data);
		var myURL = document.location;
		document.location = myURL + "explore";
	});
	*/
}
function getExplore(id)
{
	$("#iframe123").remove();
	$("#loadContent").html('');
	$("#wrapper").css({'padding-left' : ''});
    $("#getHome").hide();
    $("#headerSection").html('');
    $("#headerSection").load("header/header.html");
    var data = "a";
	window.location = "explore.php";
	/*
	$.post("explore/exploreData.html",data,function(data){
		//$("#"+id).addClass("active");
		$("#content").html(data);
		var myURL = document.location;
		document.location = myURL + "explore";
	});
    */
}
function nextExplore(id)
{

	$("#"+id).hide();
	$("#waiting").show();
	$("#scriptContainer").html('');
	$("#loadingHeader").animate({'width': '100%'},2000,function(){
 		$("#loadingHeader").animate({'width': '0'},200,function(){
	  		$("#"+id).show();
	  		var data = "demo";
	  		// get next link
	  		//var category = $("#categoryInput").val();
	  		var data = "category="+sessionStorage.category;
	  		//alert(data);
		  	$.get("explore/exploreGetData.php",data,function(result){
		    	//alert(result);
		    	$.get("explore/scriptContainer.html",data,function(resultGet){
					$("#scriptContainer").html(resultGet);
					if(result != '')
					fileGetContent(result);
					else
				    {
				      //alert("Sorry We are getting results after some time");
				      var data1 = "keyword="+category;
				      $("#waiting").hide();
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
				    }// else close
				});	
		    });
	  	});
  	});
}
function  flipFun(category)
{
	var data = "demo";
	$("#scriptContainer").html('');
	$.get("explore/scriptContainer.html",data,function(resultGet){
                $("#scriptContainer").html(resultGet);
              	 flipfun1(category); // now load data
              });
}
