var firstPlaythrough = false;
var tutorialCompleted = true;
var lastPlayed;
var inventory = [];
var tutorialStep = 0

function loadCookieData() {
	if (Cookies.get("lastPlayed")) {
		lastPlayed = Cookies.get("lastPlayed");
		firstPlaythrough = false;
		tutorialCompleted = (Cookies.get("tutorialCompleted") === 'true');
		inventory = Cookies.get("inventory");
	} else {
		firstPlaythrough = true;
		tutorialCompleted = false;
		lastPlayed = Date.now();
		inventory = [];
	}
}

function saveCookieData() {
	Cookies.set("lastPlayed",Date.now());
	Cookies.set("inventory",inventory);
	Cookies.set("tutorialCompleted",tutorialCompleted);
}

loadCookieData();

window.onbeforeunload = function(){
   //saveCookieData();
}

function updateInventory() {
	document.getElementById("inventory").innerHTML = "";
	var countedInventory = {}
	for (var item of inventory) {
		if (countedInventory[item]) {
			countedInventory[item] = countedInventory[item]+1;
		} else {
			countedInventory[item] = 1;
		}
	}
	//ADD HTML LIST
	for (var [item, amt] of Object.entries(countedInventory)) {
		var text = `${amt}x <span class="invItemName">${items[item].name}</span>`;
		var elem = document.createElement("li");
		elem.innerHTML = text;
		elem.classList.add("inventoryItem");
		document.getElementById("inventory").appendChild(elem);
	}
}

inventory = ["test"];

function selectTab(tab,tabs,tabPages) {
	if (!tab.classList.contains("locked")) {
		for (var loopTab of tabs) {
			if (loopTab.dataset.tabgroup == tab.dataset.tabgroup) {
				loopTab.classList.remove("selected");
			}
		}
		tab.classList.add("selected");
		for (var page of tabPages) {
			if (page.dataset.tab == tab.dataset.tab) {
				page.classList.remove("hide");
			} else {
				page.classList.add("hide");
			}
		}
	}
}

function updateTabs() {
	var tabs = document.getElementsByClassName("tab");
	var tabPages = document.getElementsByClassName("tabContents");
	for (var tab of tabs) {
		tab.onclick = function(){ selectTab(this,tabs,tabPages); }
		if (tab.classList.contains("selected")) {
			tab.click();
		}
	}
}

updateTabs();

if (!tutorialCompleted) {
	document.getElementById("menu").classList.add("hide");
	document.getElementById("tutorial").classList.remove("hide");
}

function tutorialContinue(increment=true) {
	if (increment) {
		tutorialStep += 1
	}
	var steps = document.getElementsByClassName("tutorial-step");
	var stepShown = false
	for (var i = 0; i < steps.length; i++) {
		if (steps[i].id.slice(9) == tutorialStep){
			steps[i].classList.remove("hide")
			stepShown = true
		} else {
			steps[i].classList.add("hide")
		}
	}
	if (tutorialStep == steps.length - 1) {
		document.getElementById("tutorialContinue").innerHTML = "Play"
	}
	if (!stepShown) {
		document.getElementById("menu").classList.remove("hide");
		document.getElementById("tutorial").classList.add("hide");
	}

}
tutorialContinue(false)