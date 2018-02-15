var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var url;
var status;
var logo;
var url ="https://www.twitch.tv/";
var streamAPI = "https://wind-bow.glitch.me/twitch-api/streams/";
var channelAPI = "https://wind-bow.glitch.me/twitch-api/channels/";

$(document).ready(function(){
  
  $(".all-filter").click(function(){
    
   $(".online, .offline").removeClass('hidden');	
  });
  $(".online-filter").click(function(){
   $(".offline").addClass('hidden');
  $(".online").removeClass('hidden');
   
  });
  $(".offline-filter").click(function(){ 
  	$(".online").addClass('hidden');
   $(".offline").removeClass('hidden');
  });
  $('.clear-button').click(function(){
       clear()
    
  })
  $('#search-input').on('input', function() {
    clear()
    
   var query = $('#search-input').val();
   console.log(query)
   var result = find(query.toLowerCase())
   for(var i = 0 ;i < result.length;i++){
   ajax_request(result[i]);
   }
   
 });


 
});
for(var i = 0 ; i < channels.length;i++)
  {
    ajax_request(channels[i]);
  } 

function ajax_request(data) {

		$.ajax({
			url: streamAPI + data + "?callback=?",
			dataType: "jsonp",
		
			success: function (data) {
				responseData(data);
			},
			error: function () {
				console.log("unable to access json");
			}
		});
	}

function responseData(data){
    
  if(data.stream === null){
    url = data._links.channel.substr(38);
    offlineUser();
    }
  else{
    status = "<a href='" + data.stream.channel.url + "' target='blank'" + ">" + data.stream.channel.display_name +"'</a>" + data.stream.channel.status ;
    logo = data.stream.channel.logo;
    display(".online");
  }
  
}
function offlineUser(){
  
  	$.ajax({ 
			url: channelAPI + url + "?callback=?",
			dataType: "jsonp",
			success: function (data) {
				status = "<a href='" + data.url + "' target='blank'" + "'>" + data.display_name + "</a>" + " is currently offline";
     logo = data.logo;
       
     display(".offline"); 
			 }
		
		});
  
}


function display(area) 
{
  if(area ==".online"){
  $(area).append("<div class = 'online-display'" +">" + "<img src='" + logo + "'>"+"<p>"+ status+ "</p>"+"</div>");
  }
 else 
   {
  $(area).append("<div class = 'offline-display'" +">" + "<img src='" + logo + "'>"+"<p>"+ status+ "</p>"+"</div>");
   }
}

// $(".search-button").click(function(){
    
//    var query = $('#search-input').val();
//    console.log(query)
// //   var result = find(query)
// //   for(var i = 0 ;i < result.length;i++)
// //   ajax_request(result[i]);
// });

function find(data){
  
  var result = []
  for(var i = 0; i < channels.length;i++){
    if(channels[i].toLowerCase().includes(data)){
      result.push(channels[i])
    }
  }
  //callback(result)
  return result;
}
function clear(){
  $(".online-display,.offline-display").remove()
}






   