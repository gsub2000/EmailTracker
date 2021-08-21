console.log("Extension working.");


// Sends information from content.js (webpage) to background.js
// 2 parameters: TO, FROM


// Writes down the word "seen" on the email (by the sender)
// TODO: add conditional to writing (currently does it all the time)
function checkSeen(){
	var element = document.getElementsByClassName("c2");
    console.log(element);
	
	if (element.length > 0)
	{
		// creates element of a div tag
		// <div></div>
		const divTag = document.createElement('div');
		divTag.className = "tracker";

		let ind = window.location.href.indexOf("#sent/");
		let emailCode = window.location.href.substring(ind + 6);
		
		chrome.runtime.sendMessage(emailCode, function(response){
			console.log(response);
			divTag.textContent = response;
		});

		// <td><h3></h3></td>
		var item = element.item(0);	
		console.log(item);
		
		if (item.getElementsByTagName('div').length == 0 )
		{
			item.appendChild(divTag);
		}
		console.log("Done");
	}
}

function run(){
	console.log(window.location.href);
	//https://mail.google#.com/mail/u/0/#sent
	
	// make a variable that holds everything after the '#'
	// const emailType = window.location.href.split("#")[1]
	
	if (window.location.href.indexOf("#sent/") > -1)
		// send back to python: QgrcJHrtqfmLRdjhfzkRGdzmQMsJZfRgBHQ
		
		// QgrcJHrtqfmLRdjhfzkRGdzmQMsJZfRgBHQ, img (whether it's been seen)
		
		var delay = setTimeout(checkSeen, 5000);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log(request);
	let ind = window.location.href.indexOf("#sent/");
	let emailCode = window.location.href.substring(ind + 6);
	sendResponse(emailCode);
})
run();
window.addEventListener('hashchange', run);

