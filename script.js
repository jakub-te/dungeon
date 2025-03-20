
let current_position = 0;
let gold = 0;
let inventory = [];
let already_mined = false;
let game_places;

game_places = [{
  directions: [1, 2, 4, 3], // position 0 (left, right, up, down)
  textField: "Jste doma. Vaším úkolem je porazit Orky a ostatní bossy. Jděte doleva do jeskyně a získejte nějaké suroviny. Až budeš mít dostatek surovin, můžeš jít nahoru a koupit meč, a taky jít dolů a koupit si další level krumpáče.",
  action_button: "Koupit"
}, {
  directions: [5, 0, -1, -1], // position 1
  textField: "Jsi v jeskyni. Zde vytěž nějaký bronz. Můžeš jít dál, aby jsi vytěžil lepší suroviny.",
  action_button: "Těžit"
}, {
  directions: [0, -1, -1, -1], // position 2
  textField: "Počkej! Jsi u dveří, opravdu cheš jít ven?",
  action_button: "Bojovat"
}, {
  directions: [-1, -1, 0, -1], // position 3
  textField: "Jsi v obchodu s krumpáčema.",
  action_button: "Koupit"
}, {
  directions: [-1, -1, -1, 0], // position 4
  textField: "Jsi v obchodu se zbraněmi.",
  action_button: "Koupit"
}, {
  directions: [6, 1, -1, -1], // position 5
  textField: "Jsi v jeskyni. Zde vytěž nějaké stříbro. Můžeš jít dál, aby jsi vytěžil lepší suroviny.",
  action_button: "Koupit"
}
]

function updateScreen() {
  var text_area = document.getElementById("text_area");
  text_area.innerHTML = game_places[current_position].textField;

  var action_button = document.getElementById("action_button");
  action_button.innerHTML = game_places[current_position].action_button;
  action_button.style.display = "none";

  var left_button = document.getElementById("left_button");
  var right_button = document.getElementById("right_button");
  var up_button = document.getElementById("up_button");
  var down_button = document.getElementById("down_button");

  if (game_places[current_position].directions[0] == -1) {
    left_button.style.display = "none";
  } else {
    left_button.style.display = "block";
  }
  if (game_places[current_position].directions[1] == -1) {
    right_button.style.display = "none";
  } else {
    right_button.style.display = "block";
  }
  if (game_places[current_position].directions[2] == -1) {
    up_button.style.display = "none";
  } else {
    up_button.style.display = "block";
  }
  if (game_places[current_position].directions[3] == -1) {
    down_button.style.display = "none";
  } else {
    down_button.style.display = "block";
  }

  if (current_position === 0) {
    already_mined = false;
    if (gold > 2) {
      action_button.style.display = "block";
    }
  } else if (current_position === 1) {
    if (!already_mined) {
      action_button.style.display = "block";
    }
  } else if (current_position === 2) {
    action_button.style.display = "block";
  } else if (current_position === 3) {
    action_button.style.display = "block";
  } else if (current_position === 4) {
    action_button.style.display = "block";
  }
}

function move(direction) {
  current_position = game_places[current_position].directions[direction];
  updateScreen();
}

function buySword() {
  if (gold > 1) {
    gold -= 2;
    inventory.push("sword");
  }
  updateScreen();
}

function mineGold() {
  if (already_mined) {
    return;
  }
  gold++;
  already_mined = true;
  updateScreen();
}

function startBattle() {
  if (inventory.indexOf("sword") === -1) {
    alert("Orks defeated you! You lost!");
  } else {
    alert("Congratulations! You have defeated the Orks!");
  }
}

document.getElementById("left_button").addEventListener("click", function() {
  move(0);
});

document.getElementById("right_button").addEventListener("click", function() {
  move(1);
});

document.getElementById("up_button").addEventListener("click", function() {
  move(2);
});

document.getElementById("down_button").addEventListener("click", function() {
  move(3);
});

document.getElementById("action_button").addEventListener("click", function() {
  if (current_position === 4) {
    buySword();
  } else if (current_position === 1) {
    mineGold();
  } else if (current_position === 2) {
    startBattle();
  }
});

updateScreen();
