var Role = {
	description: "",
	createNew: function () {
		var r = {};
		return r;
	}
};

var Judge = {
	count: 1,
	judge: null,
	createNew: function () {
		if (judge == null) 
			judge = Role.createNew();
		return judge;
	}
};

var Player = {
	aliveNumber: 0,
	killed: false,
	poisoned: false,
	guarded: false,
	antidoted: false,
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
	createNew: function () {
		var werewolf = Player.createNew();
		werewolf.die = function () {
			werewolf.isAlive = false;
			aliveNumber--;
		};
	}
};

var Villager = {
	aliveNumber: 0,
	createNew: function () {
		var villager = Player.createNew ();
		villager.die = function () {
			villager.isAlive = false;
			aliveNumber--;
		};
	}
};

var Miller = {
	lovers: [0, 0],
	miller: null,
	createNew: function () {
		if (miller == null)
			miller = Villager.createNew();
		return miller;
	}
};

var Oracle = {
	oracle: null,
	createNew: function () {
		if (oracle == null)
			oracle = Villager.createNew ();
		return oracle;
	}
};

var Wizard = {
	hasPoison: true,
	hasAntidote: true,
	wizard: null,
	createNew: function () {
		if (wizard == null)
			wizard = Villager.createNew ();
		return wizard;
	}
};

var Hunter = {
	hunter: null,
	createNew: function () {
		if (hunter == null)
			hunter = Villager.createNew ();
		return hunter;
	}
};

var Guardian = {
	guardian: null,
	createNew: function () {
		if (guadian == null)
			guadian = Villager.createNew ();
		return guadian;
	}
};

var Elder = {
	elder: null,
	createNew: function () {
		if (elder == null)
			elder = villager.createNew ();
		return elder;
	}
};
var NormalVillage = {
	createNew: function () {
		return villager.createNew ();
	}
};

var Detective = {
	detective: null,
	transferTo: function (player) {
		detective = player;
	}
};

var roles = [Werewolf, Wizard, Oracle, Guardian, Elder, NomalVillage, Hunter, Miller];
var people = [];
function initRoles (n) {
	people = [];
	for (var i = 0; i < roles.length; i++) {
		for (var j = 0; j < roles[i].count; j++) {
			people.push (roles[i].createNew ());
		}
	}
	for (var i = people.length - 1; i >= 0; i--) {
		var r = (int) (Math.random () * (i + 1));
		var t = people[i];
		people[i] = people[r];
		people[r] = t;
	}
}

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
