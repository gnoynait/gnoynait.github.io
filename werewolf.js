var Role = {
	description: "",
	createNew: function () {
		var r = {};
		return r;
	}
};

var Judge = {
	count: 0,
	judge: null,
	name: "Judge",
	createNew: function () {
		if (Judge.judge == null) 
			Judge.judge = Role.createNew();
		Judge.judge.role = Judge;
		return Judge.judge;
	}
};

var Player = {
	aliveNumber: 0,
	createNew: function () {
		var player = Role.createNew();
		player.isAlive = true;
		return player;
	},
	update: function () {
		if (poinsoned || (killed && !guarded && !antidote)) {
			this.die();
		}
	}
};

var Werewolf = {
	aliveNumber: 0,
	count: 0,
	name: "Werewolf",
	createNew: function () {
		var werewolf = Player.createNew();
		werewolf.role = Werewolf;
		werewolf.die = function () {
			werewolf.isAlive = false;
			aliveNumber--;
		};
		return werewolf;
	}
};

var Villager = {
	aliveNumber: 0,
	count: 0,
	createNew: function () {
		var villager = Player.createNew ();
		villager.die = function () {
			villager.isAlive = false;
			aliveNumber--;
		};
		return villager;
	}
};

var Miller = {
	lovers: [0, 0],
	miller: null,
	count: 0,
	name: "Miller",
	createNew: function () {
		if (Miller.miller == null)
			Miller.miller = Villager.createNew();
		Miller.miller.role = Miller;
		return Miller.miller;
	}
};

var Oracle = {
	oracle: null,
	count: 0,
	name: "Oracle",
	createNew: function () {
		if (Oracle.oracle == null)
			Oracle.oracle = Villager.createNew ();
		Oracle.oracle.role = Oracle;
		return Oracle.oracle;
	}
};

var Wizard = {
	hasPoison: true,
	hasAntidote: true,
	wizard: null,
	count: 0,
	name: "Wizard",
	createNew: function () {
		if (Wizard.wizard == null)
			Wizard.wizard = Villager.createNew ();
		Wizard.wizard.role = Wizard;
		return Wizard.wizard;
	}
};

var Hunter = {
	hunter: null,
	count: 0,
	name: "Hunter",
	createNew: function () {
		if (Hunter.hunter == null)
			Hunter.hunter = Villager.createNew ();
		Hunter.hunter.role = Hunter;
		return Hunter.hunter;
	}
};

var Guardian = {
	guardian: null,
	count: 0,
	name: "Guardian",
	createNew: function () {
		if (Guardian.guadian == null)
			Guardian.guadian = Villager.createNew ();
		Guardian.guadian.role = Guardian;
		return Guardian.guadian;
	}
};

var Elder = {
	elder: null,
	count: 0,
	name: "Elder",
	createNew: function () {
		if (Elder.elder == null)
			Elder.elder = Villager.createNew ();
		Elder.elder.role = Elder;
		return Elder.elder;
	}
};
var NormalVillager = {
	count: 0,
	name: "NormalVillager",
	createNew: function () {
		 var villager = Villager.createNew ();
		 villager.role = NormalVillager;
		 return villager;
	}
};

var Detective = {
	detective: null,
	transferTo: function (player) {
		detective = player;
	}
};

var roles = [Judge, Werewolf, Wizard, Oracle, Guardian, Elder, NormalVillager, Hunter, Miller];
var people = [];
function initRoles (n) {
	people = new Array();
	for (var i = 0; i < roles.length; i++) {
		for (var j = 0; j < roles[i].count; j++) {
			people.push (roles[i].createNew ());
		}
	}
	for (var i = people.length - 1; i >= 0; i--) {
		var r =  Math.floor((Math.random () * (i + 1)));
		var t = people[i];
		people[i] = people[r];
		people[r] = t;
	}
}
/**
function wakeUp () {
	if ((Guardian.guardian == null || Guardian.guarded != Werewolf.killed) &&
	    (Wizard.wizard == null || Wizard.antidote != Werewolf.killed)) {

		Werewolf.killed.die();
		if (Miller.miller != null 
		    && var i = Miller.lovers.indexof(Werewolf.killed) != -1) { 
			Miller.lovers[1 - i].die();
		}
		if (Wizard.exist() && Wizard.poinson != null) {
			Wizard.poison.die();
		}
	}
}
*/
var nextCharacter = 0;
function settingdone () {
	//alert($("#addWizard")[0].checked);
	Werewolf.count = $("#werewolfNumber")[0].value;
	NormalVillager.count = $("#normalNumber")[0].value;
	Oracle.count = $("#addOracle")[0].checked;
	Wizard.count = $("#addWizard")[0].checked;
	Hunter.count = $("#addHunter")[0].checked;
	Miller.count = $("#addMiller")[0].checked;
	Guardian.count = $("#addGuardian")[0].checked;
	Elder.count = $("#addElder")[0].checked;
	initRoles();
	nextCharacter = 0;
	toSee();
}
function toSee () {
	//alert (nextCharacter);
	$("#yourCharacter")[0].innerHTML = people[nextCharacter].role.name;
	//$("#yourDescription")[0].innerHTML = people[nextCharacter].role.description;
	nextCharacter++;

	if (nextCharacter == people.length) {
		var li = "<li class=\"ui-field-contain\"> <label for=\"li{li}\">{name}</label> <select name=\"li{li}\" id=\"li{li}\" data-role=\"slider\" data-mini=\"true\"> <option value=\"on\">alive</option> <option value=\"off\">dead</option> </select> </li> ";
		$("#playerStatus")[0].innerHTML = "";
		for (var i = 0; i < people.length; i++) {
			$("#playerStatus")[0].innerHTML += li.replace("{li}", i).replace("{li}", i).replace("{li}", i).replace("{name}", people[i].role.name);
		}

		$("#toSeeBtn")[0].href="#host";
		nextCharacter = 0;
	} else {
		$("#toSeeBtn")[0].href="#seeCharacter";
	}
}
