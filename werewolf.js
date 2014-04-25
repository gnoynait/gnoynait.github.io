var Role = {
	description : "",
	createNew : function() {
		var r = {};
		return r;
	}
};

var Judge = {
	count : 0,
	judge : null,
	name : "Judge",
	createNew : function() {
		if (Judge.judge == null)
			Judge.judge = Role.createNew();
		Judge.judge.role = Judge;
		return Judge.judge;
	}
};

var Player = {
	aliveNumber : 0,
	createNew : function() {
		var player = Role.createNew();
		player.isAlive = true;
		return player;
	},
	update : function() {
		if (poinsoned || (killed && !guarded && !antidote)) {
			this.die();
		}
	}
};

var Werewolf = {
	aliveNumber : 0,
	count : 0,
	name : "Werewolf",
	createNew : function() {
		var werewolf = Player.createNew();
		werewolf.role = Werewolf;
		werewolf.die = function() {
			werewolf.isAlive = false;
			aliveNumber--;
		};
		return werewolf;
	}
};

var Villager = {
	aliveNumber : 0,
	count : 0,
	createNew : function() {
		var villager = Player.createNew();
		villager.die = function() {
			villager.isAlive = false;
			aliveNumber--;
		};
		return villager;
	}
};

var Miller = {
	lovers : [ 0, 0 ],
	miller : null,
	count : 0,
	name : "Miller",
	createNew : function() {
		if (Miller.miller == null)
			Miller.miller = Villager.createNew();
		Miller.miller.role = Miller;
		return Miller.miller;
	}
};

var Oracle = {
	oracle : null,
	count : 0,
	name : "Oracle",
	createNew : function() {
		if (Oracle.oracle == null)
			Oracle.oracle = Villager.createNew();
		Oracle.oracle.role = Oracle;
		return Oracle.oracle;
	}
};

var Wizard = {
	hasPoison : true,
	hasAntidote : true,
	wizard : null,
	count : 0,
	name : "Wizard",
	createNew : function() {
		if (Wizard.wizard == null)
			Wizard.wizard = Villager.createNew();
		Wizard.wizard.role = Wizard;
		return Wizard.wizard;
	}
};

var Hunter = {
	hunter : null,
	count : 0,
	name : "Hunter",
	createNew : function() {
		if (Hunter.hunter == null)
			Hunter.hunter = Villager.createNew();
		Hunter.hunter.role = Hunter;
		return Hunter.hunter;
	}
};

var Guardian = {
	guardian : null,
	count : 0,
	name : "Guardian",
	createNew : function() {
		if (Guardian.guadian == null)
			Guardian.guadian = Villager.createNew();
		Guardian.guadian.role = Guardian;
		return Guardian.guadian;
	}
};

var Elder = {
	elder : null,
	count : 0,
	name : "Elder",
	createNew : function() {
		if (Elder.elder == null)
			Elder.elder = Villager.createNew();
		Elder.elder.role = Elder;
		return Elder.elder;
	}
};
var Idiot = {
	idiot : null,
	count : 0,
	name : "Idiot",
	createNew : function() {
		if (Idiot.idiot == null)
			Idiot.idiot = Villager.createNew();
		Idiot.idiot.role = Idiot;
		return Idiot.idiot;
	}
};
var Scapegoat = {
	scapegoat : null,
	count : 0,
	name : "Scapegoat",
	createNew : function() {
		if (Scapegoat.scapegoat == null)
			Scapegoat.scapegoat = Villager.createNew();
		Scapegoat.scapegoat.role = Scapegoat;
		return Scapegoat.scapegoat;
	}
};
var NormalVillager = {
	count : 0,
	name : "NormalVillager",
	createNew : function() {
		var villager = Villager.createNew();
		villager.role = NormalVillager;
		return villager;
	}
};

var Detective = {
	detective : null,
	transferTo : function(player) {
		detective = player;
	}
};

var roles = [ Judge, Werewolf, Wizard, Oracle, Guardian, Elder, NormalVillager,
		Hunter, Miller, Idiot, Scapegoat ];
var people = [];
function initRoles(n) {
	people = new Array();
	for ( var i = 0; i < roles.length; i++) {
		for ( var j = 0; j < roles[i].count; j++) {
			people.push(roles[i].createNew());
		}
	}
	for ( var i = people.length - 1; i >= 0; i--) {
		var r = Math.floor((Math.random() * (i + 1)));
		var t = people[i];
		people[i] = people[r];
		people[r] = t;
	}
}
