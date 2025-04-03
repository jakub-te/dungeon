
let current_position = 0;
let zlato = 0;
let stribro = 0;
let zelezo = 0;
let inventory = [];
let already_mined = false;
let already_mined_2 = false;
let already_mined_3 = false;
let game_places;

game_places = [{
  directions: [1, 2, 4, 3], // position 0 (left, right, up, down)
  textField: "Jste doma. Vaším úkolem je porazit Orky a ostatní bossy. Jděte doleva do jeskyně a získejte nějaké suroviny. Až budeš mít dostatek surovin, můžeš jít nahoru a koupit meč, a taky jít dolů a koupit si další level krumpáče.",
  action_button: "Koupit"
}, {
  directions: [5, 0, -1, -1], // position 1
  textField: "Počkej! Jsi u dveří, opravdu cheš jít ven?",
}, {
  directions: [0, 14, -1, -1], // position 2
  textField: "Počkej! Jsi u dveří, opravdu cheš jít ven?",
}, {
  directions: [-1, -1, 0, -1], // position 3
  textField: "Jsi v obchodu s krumpáčema.",
  action_button: "Koupit"
}, {
  directions: [-1, -1, -1, 0], // position 4
  textField: "Jsi v obchodu se zbraněmi.",
  action_button: "Koupit"
}, {
  directions: [6, 1, 8, 13], // position 5
  textField: "Jsi v jeskyni. Zde vytěž nějaké stříbro. Můžeš jít dál, aby jsi vytěžil lepší suroviny.",
  action_button: "Těžit"
}, {
  directions: [10, 5, 7, 12], // position 6
  textField: "Jsi v jeskyni. Zde vytěž nějaké železo. Můžeš jít dál, aby jsi vytěžil lepší suroviny.",
  action_button: "Těžit"
}, {
  directions: [9, 8, -1, 6], // position 7
  textField: "Jsi v jeskyni. Zde vytěž nějaké zlato. Tady je konec jeskyně. Měl by ses vrátit zpátky.",
  action_button: "Těžit"
}, {
  directions: [7, -1, -1, 5], // position 8
  textField: "Jsi v jeskyni. Běž dál, aby jsi mohl natěžit další suroviny.",
}, {
  directions: [-1, 7, -1, 10], // position 9
  textField: "Jsi v jeskyni. Běž dál, aby jsi mohl natěžit další suroviny.",
}, {
  directions: [-1, 6, 9, 11], // position 10
  textField: "Jsi v jeskyni. Běž dál, aby jsi mohl natěžit další suroviny.",
}, {
  directions: [-1, 12, 10, -1], // position 11
  textField: "Jsi v jeskyni. Běž dál, aby jsi mohl natěžit další suroviny.",
}, {
  directions: [11, 13, 6, -1], // position 12 (left, right, up, down)
  textField: "Jsi v jeskyni. Běž dál, aby jsi mohl natěžit další suroviny.",
}, {
  directions: [12, -1, 5, -1], // position 13
  textField: "Jsi v jeskyni. Běž dál, aby jsi mohl natěžit další suroviny.",
}, {
  directions: [2, -1, 15, 16], // position 14
  textField: "Jsi na rozcestníku. Nahoře je první zápas, který je nejjednoduší, ale stejně pootřebuješ meč. Dole jsou další zápasy.",
}, {
  directions: [-1, -1, -1, 14], // position 15
  textField: "Jsi u prvního zápasu, jsi připraven bojovat? ",
  action_button: "Bojovat"
}, {
  directions: [-1, -1, 14, -1], // position 16
  textField: "Jsi v dungeonu. Tady se ti budou objevovat další bossové. Na tyto bosse si musíš koupit další zbraně",
  action_button: "Bojovat"
}
]

function updateScreen() {
  var text_area = document.getElementById("text_area");
  text_area.innerHTML = game_places[current_position].textField;

  var action_button = document.getElementById("action_button");
  action_button.innerHTML = game_places[current_position].action_button;
  action_button.style.display = "none";

  var inventory_area = document.getElementById("inventory_area");
  inventory_area.innerHTML = "Inventář: " + (inventory.length > 0 ? inventory.join(", ") : "Prázdný");

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

  if (current_position === 1) {
    already_mined = false;
    already_mined_2 = false;
    already_mined_3 = false;
  } else if (current_position === 3) {
    action_button.style.display = "block";
    if (stribro > 2) {
      action_button.style.display = "block";
    }
  } else if (current_position === 4) {
    action_button.style.display = "block";
    if (stribro > 2) {
      action_button.style.display = "block";
    }
  } else if (current_position === 5) {
    if (!already_mined) {
      action_button.style.display = "block";
    }
  } else if (current_position === 6) {
    if (!already_mined_2) {
      action_button.style.display = "block";
    }
  } else if (current_position === 7) {
    if (!already_mined_3) {
      action_button.style.display = "block";
    }
  }else if (current_position === 15) {
    action_button.style.display = "block"
  }
}

function move(direction) {
  current_position = game_places[current_position].directions[direction];
  updateScreen();
}

function buyItem(itemName, cost) {
  if (inventory.includes(itemName)) { 
    alert("Už máš " + itemName + "!");
    return;
  }

  // Kontrola, jestli hráč má dostatek všech požadovaných surovin
  if (stribro >= (cost.stribro || 0) &&
      zlato >= (cost.zlato || 0) &&
      zelezo >= (cost.zelezo || 0)) {
      
    // Odečtení surovin
    stribro -= cost.stribro || 0;
    zlato -= cost.zlato || 0;
    zelezo -= cost.zelezo || 0;

    // Přidání předmětu do inventáře
    inventory.push(itemName);
    updateScreen();
  } else {
    alert("Nemáš dostatek surovin na " + itemName + "!");
  }

  updateScreen();
}

function mineST() {
  if (already_mined) {
    return;
  }
  stribro++;
  already_mined = true;
  updateScreen();
}

function startBattle() {
  if (inventory.indexOf("mec1") === -1) {
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
    buyItem("stříbrný meč",{ stribro: 2 });
  } else if (current_position === 5) {
    mineST();
  } else if (current_position === 15) {
    startBattle();
  }
})

updateScreen();
