//core values
var cookies = 0;
var upgrade = 0;
var multi = 1;
var bestCookies = 0;

//time values
var timeElapsed = 0;
var timerID = -1;

//upgrade one values
var oneBought = false;
var oneCount = 0;
var oneFirst = 10;
var oneCost = 10;
var oneCostNext = 11;

//oven values
var ovenBought = false;
var ovenCount = 0;
var ovenFirst = 500;
var ovenCost = 500;
var ovenCostNext = 750;

//bakery values
var bakeryBought = false;
var bakeryCost = 10000

function tick() {
    timeElapsed++
    document.getElementById("time").innerHTML = timeElapsed;
}

function start() {
    if(timerID == -1){
        timerID = setInterval(tick, 1000);
    }
}

function stop() {
    if(timerID != -1){
		clearInterval(timerID)
        timerID = -1
    }
}

start();

function cookieUpdate(number, upgradeCalc) {
	if (upgradeCalc == true) {
		cookies = cookies + ((number + upgrade) * multi);
	} else {
		cookies = cookies + number;
	}
	if (cookies > bestCookies) {
		bestCookies = cookies;
	}
	textUpdater();
	document.getElementById("cookies").innerHTML = cookies;
	if (cookies >= 10 && oneBought == false) {
		document.getElementById("one").innerHTML = "<button id=\"oneButton\" onclick=\"oneAdd()\">Bake an extra cookie! (<span id=\"oneCost\">10</span> Cookies)</button>";
		oneButton.removeAttribute("disabled");
	} else if (oneBought == true) {
		if (cookies >= oneCostNext) {
			oneButton.removeAttribute("disabled");
		} else {
			oneButton.setAttribute("disabled", "disabled");
		}
	}
	if (cookies >= 500 && ovenBought == false) {
		document.getElementById("oven").innerHTML = "<button id=\"ovenButton\" onclick=\"ovenAdd()\">Buy new ovens! (<span id=\"ovenCost\">500</span> Cookies)</button>";
		ovenButton.removeAttribute("disabled");
	} else if (ovenBought == true) {
		if (cookies >= ovenCostNext) {
			ovenButton.removeAttribute("disabled");
		} else {
			ovenButton.setAttribute("disabled", "disabled");
		}
	}
	if (cookies >= 10000 && bakeryBought == false) {
		document.getElementById("bakery").innerHTML = "<button id=\"bakeryButton\" onclick=\"bakeryBought()\">Construct a bakery! (<span id=\"bakeryCost\">10000</span> Cookies)</button>";
	}
	if (cookies >= 100000) {
		stop();
		document.getElementById("timer").innerHTML = "Congratulations! Your Time: <span class=\"time\" id=\"time\">0</span><span class=\"time\">s</span>";
		document.getElementById("time").innerHTML = timeElapsed;
	}
}

function oneAdd() {
	oneCost = Math.floor(10 * Math.pow(1.1,oneCount));
	oneBought = true;
	if (cookies >= oneCost) {
		upgrade += 1;
		textUpdater();
		cookieUpdate(-(oneCost), false);
		document.getElementById("bakeCount").innerHTML = (upgrade + 1) * multi;
		oneCount += 1;
		oneCostNext = Math.floor(10 * Math.pow(1.1,oneCount));
		document.getElementById("oneCost").innerHTML = oneCostNext;
	}
}

function ovenAdd() {
	ovenCost = Math.floor(ovenCost * Math.pow(1.5,ovenCount));
	ovenBought = true;
	if (cookies >= oneCost) {
		multi *= 2;
		textUpdater();
		cookieUpdate(-(ovenCost), false);
		document.getElementById("bakeCount").innerHTML = (upgrade + 1) * multi;
		ovenCount += 1;
		ovenCostNext = Math.floor(ovenCost * Math.pow(1.5,ovenCount));
		document.getElementById("ovenCost").innerHTML = ovenCostNext;
	}
}

function bakeryAdd() {
	updateCookies(-(bakeryCost), false);
	element.remove(bakeryButton);
	bakeryBought = true;
}

function textUpdater() {
	document.getElementById("bakeCount").innerHTML = (upgrade + 1) * multi;
	switch (true) {
		case (bestCookies < oneFirst):
			document.getElementById("nextUpgrade").innerHTML = oneCost;
			break;
		case (bestCookies < ovenFirst):
			document.getElementById("nextUpgrade").innerHTML = ovenCost;
			break;
		case (bestCookies < 10000):
			document.getElementById("nextUpgrade").innerHTML = 10000;
			break;
		case (bestCookies < 100000):
			document.getElementById("nextUpgrade").innerHTML = 100000;
			break;
		default:
			document.getElementById("nextText").innerHTML = "Game Complete! (for now...)";
	}
	if ((upgrade + 1) * multi > 1) {
		document.getElementById("cookieText").innerHTML = "Cookies!";
	} else {
		document.getElementById("cookieText").innerHTML = "Cookie!";
	}
}
