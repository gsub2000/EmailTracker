console.log("This is the background script.");

// request: data coming from content's sendMessage to background's onMessage
// response: what we would send back from here to the content.js
chrome.runtime.onMessage.addListener(
	function(request, sender, response){
	console.log(request);
	var d = JSON.stringify({"word": request});
	
	$.ajax({
		type: 'POST',
		url: 'https://emailtracker-ext.herokuapp.com/check',
		encoding: 'UTF-8',
		data: d,
		success: function (resp) {
			response(resp);
		},
		error: function(er,a,b){
			console.log("error");
		}
	});
	return true;
});

