function validate() {

	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	if (username === "mifos_customer" && password === "password") {
		alert("Login successful!");
		window.location.href = "account.html";
		loggedIn = true;
	} else {
		alert("Wrong credentials");
	}

	return false;
}

function getDate() {

	var currentDate = new Date();
	currentDate = currentDate.toISOString();

	document.getElementById("currentDate").innerHTML = currentDate;

	return currentDate;
}

function makeRequest() {

	var debitParty = "+44012345678";
	var creditParty = document.getElementById("recipient_msisdn").value;
	var amount = document.getElementById("amount").value;
	var transactionType = document.getElementById("type").value;
	var desc = document.getElementById("desc").value;
	var currency = document.getElementById("currency").value;
	var subType = document.getElementById("subtype").value;
	var currentDate = getDate();

	var transactionBody = {
		"amount": amount,
		"currency": currency,
		"type": transactionType,
		"subType": subType,
		"descriptionText": desc,
		"requestDate":  currentDate,
		"requestingOrganisationTransactionReference": "string",
		"oneTimeCode": "string",
		"geoCode": "37.423825,-122.082900",
		"debitParty": [
			{
				"key": "msisdn",
				"value": debitParty
			}
		],
		"creditParty" : [
			{
				"key": "msisdn",
				"value": creditParty
			}
		]
	};

	console.log(JSON.stringify(transactionBody));

	var url = "http://localhost:8081/";

	var request = new XMLHttpRequest();

	if (transactionType == "transfer") {
		url = url + "transfer";
	} else if (transactionType == "merchantpayment") {
		url = url + "merchantpayment";
	}

	request.open("post", url, true);
	request.withCredentials = true;
	request.setRequestHeader("Content-Type", "application/json");
	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			console.log(this.reponseText);
			console.log(this.status);
		}
	};

	request.send(JSON.stringify(transactionBody));

	window.location.href = "account.html";
}
