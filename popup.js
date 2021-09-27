document.addEventListener('DOMContentLoaded', function () {
	var btn = document.getElementById('mybtn');
	if (btn){
		btn.addEventListener("click", onclick, false)
	}

	function onclick(){
		console.log("In the onclick function");
		chrome.tabs.query({currentWindow: true, active: true},
		function (tabs) {
			console.log(tabs[0].url);
			if(tabs[0].url.indexOf("compose=") > -1){
				chrome.tabs.sendMessage(tabs[0].id, { action: "getInfo", index: tabs[0].index })
			}
			else{
				var field = document.getElementById("myfield");
				field.setAttribute("value", "URL unavailable.");
			}
		})
	}

	function printUrl(res){
		console.log(res)
	}
	
}, false)

/*
chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
  document.querySelector('.info').textContent = tab.title;
});

function onclick() {
	console.log("hello")
	chrome.tabs.query({currentWindow: true, active: true},
	function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, 'track', trackEmail);
	})
}

function trackEmail (res) {
	console.log("hello2");
	const div = document.createElement('div');
	//div.textContent = "Tracking Email (popup)";
	//document.body.appendChild(div);
	$.ajax({
		type: 'POST',
		url: 'http://127.0.0.1:5000/track',
		encoding: 'UTF-8',
		data: JSON.stringify({'id': res}),
		success: function (resp) {
			div.textContent = resp;
			document.body.appendChild(div)
			//response(resp);
		},
		error: function(er,a,b){
			console.log("error");
		}
	});
	return true;
}
*/