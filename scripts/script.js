try {
	var repoUrl = 'https://api.github.com/users/cclifto/repos?access_token=' + ACCESS_TOKEN
	var profileUrl = 'https://api.github.com/users/cclifto?access_token=' + ACCESS_TOKEN
}
catch (error) {
	var repoUrl = 'https://api.github.com/users/cclifto/repos'
	var profileUrl = 'https://api.github.com/users/cclifto'
}

//gitURL is the variable that will store the location of all the data we will be requesting
//"promise" will make a request for data from "gitURL"; ".getJSON" will translate the JQuery (or, '$') results into
//a more readable object
var promise = $.getJSON(profileUrl)

var profileIMG = document.querySelector('.profile-img'),
	username = document.querySelector('.username'),
	dateJoined = document.querySelector('.date-joined')
	repo = document.querySelector('.repo')

var responseHandler = function(response){
	var gitObj = response,
		imgTag = document.createElement('img')
	profileIMG.appendChild(imgTag)
	imgTag.src = gitObj.avatar_url
	username.textContent = gitObj.login
	dateJoined.textContent = gitObj.created_at
}
// "promise.then" will run right away; responseHandler will run once the data request has returned from the server
promise.then(responseHandler)


var otherPromise = $.getJSON(repoUrl)

var otherHandler = function(response){
	var repoArray = response
	for (var i = 0; i < repoArray.length; i ++){
		var currentObj = repoArray[i]
		var repoNode = document.createElement('div')
		repoNode.innerHTML += '<p>' + currentObj.name + '</p>'
		repoNode.innerHTML += '<p>' + currentObj.description + '</p>'
		repo.appendChild(repoNode)
	}
}

otherPromise.then(otherHandler)
console.log("this is working")
