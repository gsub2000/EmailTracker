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

		/*let ind = window.location.href.indexOf("#sent/");
		let emailCode = window.location.href.substring(ind + 6);*/
		
		var name = document.getElementsByClassName("gD")[0].innerText;
		console.log(name);

		var subj = document.getElementsByClassName("hP")[0].innerText;
		console.log(subj);

		chrome.runtime.sendMessage(name, function(response){
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
	console.log("here1");
	if (window.location.href.indexOf("compose=") > -1){
		//var delay = setTimeout(compose, 2000);
	}
	
	if (window.location.href.indexOf("#sent/") > -1)
		// send back to python: QgrcJHrtqfmLRdjhfzkRGdzmQMsJZfRgBHQ
		// QgrcJHrtqfmLRdjhfzkRGdzmQMsJZfRgBHQ, img (whether it's been seen)
		var delay = setTimeout(checkSeen, 5000);
}

function compose(){
	var btn = document.getElementsByClassName("T-I J-J5-Ji aoO v7 T-I-atl L3");
	if (btn){
		btn[0].addEventListener("click", function click() {
			console.log("hellooo")
			console.log(document.getElementsByClassName("vR"))
			// myStorage = window.localStorage;
			// myStorage.setItem("email","subject")
			// console.log(myStorage.getItem("email"));

		},false);
	}
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if(request.action == "getInfo"){
		console.log("works!!!!!");
		// email OR recipient name
		console.log(document.getElementsByClassName("vR")[0].innerText);
		var recipient = document.getElementsByClassName("vR")[0].innerText;
		// email subject
		console.log(document.getElementsByClassName("aoT")[0].value)
		var subj = document.getElementsByClassName("aoT")[0].value;

		myStorage = window.localStorage;
		myStorage.setItem(recipient, subj);
		console.log(myStorage.getItem(recipient));

		sendResponse("https://emailtracker-ext.herokuapp.com/test?email="+ recipient.split(' ').join('') + "&subject=" + subj.split(' ').join(''))
	}
	else {
		console.log(request);
	}
})
run();
window.addEventListener('hashchange', run);
