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

var Detective = {
	detective: null,
	transferTo: function (player) {
		detective = player;
	}
};
