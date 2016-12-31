// function for creating folder
function createNewFolder()
{
	var categoryName = prompt("Enter Name Of Category");
	var content  =  '<div class="col-lg-2 col-sm-2" id="'+categoryName+'">'+
						'<div id="folderShow" onClick="openFolder('+"\'"+categoryName+"\'"+')">'+
							'<div id="folderImage"><img src="blog/image/folder.png"/></div>'+
							'<div id="folderName"><h5 style="margin-left:2%;margin-top:0%;">'+categoryName+'</h5></div>'+
						'</div>'+
					'</div>';
		//alert(content);
    $("#folderAndFileContainer").append(content);	    
}
// function for creating new blog
function createNewBlog()
{
	var blogName = prompt("Enter Name Of Blog");
	var content  =  '<div class="col-lg-1 col-sm-1" id="'+blogName+'">'+
						'<div id="blogShow" onClick="openBlog('+"\'"+blogName+"\'"+')">'+
							'<div id="blogImage"><img src="blog/image/blankFile.png"/></div>'+
							'<div id="blogName"><h5 style="margin-left:2%;margin-top:0%;">'+blogName+'</h5></div>'+
						'</div>'+
					'</div>';
		//alert(content);
    $("#folderAndFileContainer").append(content);	    	
}
// funciton for entering into folder
function openFolder(folderId)
{
	//alert(folderId);
	var data = "demo";
	$("#createNewFolder").hide();
	$("#createNewBlog").show();
	$("#back").show();
	$("#folderAndFileContainer").html('');
	$.get("blog/getBlogFolderContent.php",data,function(folderContent){
		$("#folderAndFileContainer").html(folderContent);
	});
}
// function for opening blog
function openBlog(blogId)
{
	document.location = "openBlog.php?blogInfo="+blogId;
}
function back()
{
	//alert(folderId);
	var data = "demo";
	$("#createNewBlog").hide();
	$("#back").hide();
	$("#createNewFolder").show();
	$("#folderAndFileContainer").html('');
	$.get("blog/getBlogHomeContent.php",data,function(folderContent){
		$("#folderAndFileContainer").html(folderContent);
	});
}