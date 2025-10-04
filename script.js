let current_position = 0;
let zlato = 0;
let stribro = 0;
let zelezo = 0;
let suroviny = [0, 0, 0];
let already_mined = [false, false, false];
let inventory = ["chleba","dřevěný krumpáč","pochodeň"];
let game_places;
let nepratele;
const blocks_x = 9;
const blocks_y = 5;

game_places = [{
  directions: [1, 2, 4, 3], // position 0 (left, right, up, down)
  textField: "Jste doma. Vaším úkolem je porazit Orky a ostatní bossy. Jděte doleva do jeskyně a získejte nějaké suroviny. Až budeš mít dostatek surovin, můžeš jít nahoru a koupit meč, a taky jít dolů a koupit si další level krumpáče.",
  action_button: "Koupit",
  x:6,
  y:3
}, {
  directions: [5, 0, -1, -1], // position 1
  textField: "Počkej! Jsi u dveří, opravdu cheš jít ven? Doleva jdeš do jeskyně, doprava domů.",
  x:5,
  y:3
}, {
  directions: [0, 14, -1, -1], // position 2
  textField: "Počkej! Jsi u dveří, opravdu cheš jít ven? Doprava jdeš na bosse, doleva domů.",
  x:7,
  y:3
}, {
  directions: [-1, -1, 0, 17], // position 3
  textField: "Jsi v obchodu s krumpáčema. Stříbrný krumpáč stojí 5 stříbra.",
  action_button: "Koupit",
  name: "stříbrný krumpáč",
  cost: {stribro: 5},
  x:6,
  y:4
}, {
  directions: [-1, -1, 18, 0], // position 4
  textField: "Jsi v obchodu se zbraněmi. Stříbrný meč stojí 2 stříbra",
  action_button: "Koupit",
  name: "Stříbrný meč",
  cost: {stribro: 2},
  x:6,
  y:2
}, {
  directions: [6, 1, 8, 13], // position 5
  textField: "Jsi v jeskyni. Zde vytěž nějaké stříbro. Můžeš jít dál, aby jsi vytěžil lepší suroviny.",
  action_button: "Těžit",
  name: "dřevěný krumpáč",
  tezeni: 1,
  mined: 1,
  x:4,
  y:3
}, {
  directions: [10, 5, 7, 12], // position 6
  textField: "Jsi v jeskyni. Zde vytěž nějaké železo. Můžeš jít dál, aby jsi vytěžil lepší suroviny.",
  action_button: "Těžit",
  name: "stříbrný krumpáč",
  tezeni: 2,
  mined: 2,
  x:3,
  y:3
}, {
  directions: [9, 8, 21, 6], // position 7
  textField: "Jsi v jeskyni. Zde vytěž nějaké zlato. Můžeš jít dál, aby jsi vytěžil lepší suroviny.",
  action_button: "Těžit",
  name: "železný krumpáč",
  tezeni: 0,
  mined: 0,
  x:3,
  y:2
}, {
  directions: [7, -1, 19, 5], // position 8
  textField: "Jsi v jeskyni. Běž dál, aby jsi mohl natěžit další suroviny.",
  x:4,
  y:2
}, {
  directions: [-1, 7, 22, 10], // position 9
  textField: "Jsi v jeskyni. Běž dál, aby jsi mohl natěžit další suroviny.",
  x:2,
  y:2
}, {
  directions: [-1, 6, 9, 11], // position 10
  textField: "Jsi v jeskyni. Běž dál, aby jsi mohl natěžit další suroviny.",
  x:2,
  y:3
}, {
  directions: [-1, 12, 10, -1], // position 11
  textField: "Jsi v jeskyni. Běž dál, aby jsi mohl natěžit další suroviny.",
  x:2,
  y:4
}, {
  directions: [11, 13, 6, -1], // position 12 (left, right, up, down)
  textField: "Jsi v jeskyni. Běž dál, aby jsi mohl natěžit další suroviny.",
  x:3,
  y:4
}, {
  directions: [12, -1, 5, -1], // position 13
  textField: "Jsi v jeskyni. Běž dál, aby jsi mohl natěžit další suroviny.",
  x:4,
  y:4
}, {
  directions: [2, 20, 15, 16], // position 14
  textField: "Jsi na rozcestníku. Nahoře je první zápas, který je nejjednoduší, ale stejně pootřebuješ meč. Dole a vedle jsou další nepřátelé.",
  x:8,
  y:3
}, {
  directions: [-1, -1, -1, 14], // position 15
  textField: "Tady je první nepřítel tučňák, jsi připraven bojovat? ",
  action_button: "Bojovat",
  x:8,
  y:2
}, {
  directions: [-1, -1, 14, -1], // position 16
  textField: "Jsi v dungeonu. Tady budeš bojovat s pandou, zbraní kterou potřebuješ na její porážku je puška.",
  action_button: "Bojovat",
  x:8,
  y:4
}, {
  directions: [-1, -1, 3, -1], // position 17
  textField: "Jsi v obchodu s krumpáčema. Železný krumpáč stojí 10 železa.",
  action_button: "Koupit",
  name: "železný krumpáč",
  cost: {zelezo: 10},
  x:6,
  y:5
}, {
  directions: [-1, -1, -1, 4], // position 18
  textField: "Jsi v obchodu se zbraněmi. Puška stojí 10 zlata.",
  action_button: "Koupit",
  name: "puška",
  cost: {zlato: 10},
  x:6,
  y:1
}, {
  directions: [21, -1, -1, 8], // position 19
  textField: "Jsi v jeskyni. Běž dál, aby jsi mohl natěžit další suroviny.",
  x:4,
  y:1
}, {
  directions: [14, -1, -1, -1], // position 20 (left, right, up, down)
  textField: "Tady je nejtěžší nepřítel Martýnek, jako zbraň potřebuješ Pravidla českého pravopisu.", 
  action_button: "Bojovat",
  x:9,
  y:3
}, {
  directions: [22, 19, -1, 7], // position 21
  textField: "Jsi v jeskyni. Běž dál, aby jsi mohl natěžit další suroviny.",
  x:3,
  y:1
}, {
  directions: [23, 21, -1, 9], // position 22
  textField: "Jsi v jeskyni. Běž dál, aby jsi mohl natěžit další suroviny.",
  x:2,
  y:1
}, {
  directions: [-1, 22, -1, -1], // position 23
  textField: "Jsi v knihovně. Tady si vem pravidla českého pravopisu.Tady je konec jeskyně. Měl by ses vrátit zpátky.",
  action_button: "Koupit",
  name: "Pravidla českého pravopisu",
  cost: {stribro: 0},
  x:1,
  y:1
}];

nepratele=[{
 textField: "První nepřítel tučnák je jednoduchý a potřebuješ jenom stříbrný meč.",
 zbran: "Stříbrný meč"
},{
  textField: "Druhý nepřítel panda je trochu těžší a potřebuješ pušku.",
 zbran: "puška"
},{
  textField: "Poslední nepřítel Martýnek je nejtěžší a potřebuješ najít pravidla českého pravopisu.",
 zbran: "Pravidla českého pravopisu"
}];

function updateScreen() {
  stribro=suroviny[1];
  zelezo=suroviny[2];
  zlato=suroviny[0];
  
  let dot_x_block = 100/blocks_x;
  let dot_y_block = 100/blocks_y;
  let dot_left = game_places[current_position].x*dot_x_block-dot_x_block/2;
  let dot_top = game_places[current_position].y*dot_y_block-dot_y_block/2;

  var dot = document.getElementById("dot");
  dot.style.setProperty("top",`${dot_top}%`);
  dot.style.setProperty("left",`${dot_left}%`);


  var text_area = document.getElementById("text_area");
  text_area.innerHTML = game_places[current_position].textField;

  var action_button = document.getElementById("action_button");
  action_button.innerHTML = game_places[current_position].action_button;
  action_button.style.display = "none";

  var inventory_area = document.getElementById("inventory_area");
  inventory_area.innerHTML = "Inventář: " + (inventory.length > 0 ? inventory.join(", ") : "Prázdný");

  var resources_area = document.getElementById("resources_area");
  resources_area.innerHTML = `Rudy: Stříbro: ${stribro}, Železo: ${zelezo}, Zlato: ${zlato}`;

  var left_button = document.getElementById("left_button");
  var right_button = document.getElementById("right_button");
  var up_button = document.getElementById("up_button");
  var down_button = document.getElementById("down_button");

  console.log(game_places[current_position].directions);

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
    if (zlato > 2) {
      action_button.style.display = "block";
    }
  }


  if (current_position === 1) {
    for(let i = 0; i < 3; i++){
      already_mined[i] = false;
    }
  } else if (current_position === 3 || current_position === 4 || current_position === 15 || current_position === 17 || current_position === 18 || current_position === 23 || current_position === 16) {
    action_button.style.display = "block";
  } else if (current_position === 5 && !already_mined[1] || current_position === 20) {
    action_button.style.display = "block";
  } else if (current_position === 6 && !already_mined[2]) {
    action_button.style.display = "block";
  } else if (current_position === 7 && !already_mined[0]) {
    action_button.style.display = "block";
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
    suroviny[1] -= cost.stribro || 0;
    suroviny[0] -= cost.zlato || 0;
    suroviny[2] -= cost.zelezo || 0;

    // Přidání předmětu do inventáře
    inventory.push(itemName);
    updateScreen();
  } else {
    alert("Nemáš dostatek surovin na " + itemName + "!");
  }

  updateScreen();
}
function mine(itemName,ruda,mined) {
  if (inventory.indexOf(itemName) === -1) {
    alert("Ještě nemáš "+itemName+"!")
  }else {
    if (!already_mined[mined]) {
    suroviny[ruda]++;
    already_mined[mined] = true;
    }
    updateScreen();
  }
}


function startBattle(zbran) {
  if (inventory.indexOf(zbran) === -1) {
    alert("Bohužel jsi prohrál, zkus to znovu");
  } else {
    alert("Jooo vyhrál jsi, můžeš jít na další zápas");
    if(current_position==20){
      window.location.href = "win.html";
    }
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

  current_action = game_places[current_position].action_button;
  if(current_action == "Koupit"){
    buyItem(game_places[current_position].name, game_places[current_position].cost)
  }
    if (current_position === 5) {
    mine(game_places[current_position].name,game_places[current_position].tezeni,game_places[current_position].mined);
  } else if (current_position === 15) {
    startBattle(nepratele[0].zbran);
  } else if (current_position === 16) {
    startBattle(nepratele[1].zbran);
  } else if (current_position === 20) {
    startBattle(nepratele[2].zbran);
  } else if (current_position === 6) {
    mine(game_places[current_position].name,game_places[current_position].tezeni,game_places[current_position].mined);
  } else if (current_position === 7) {
    mine(game_places[current_position].name,game_places[current_position].tezeni,game_places[current_position].mined);
  }
  
});

// New event listener for the Space key
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowLeft" && game_places[current_position].directions[0] !== -1) {
    move(0);  // Move left
  } else if (event.key === "ArrowRight" && game_places[current_position].directions[1] !== -1) {
    move(1);  // Move right
  } else if (event.key === "ArrowUp" && game_places[current_position].directions[2] !== -1) {
    move(2);  // Move up
  } else if (event.key === "ArrowDown" && game_places[current_position].directions[3] !== -1) {
    move(3);  // Move down
  } else if (event.key === " " && document.getElementById("action_button").style.display !== "none") {
    document.getElementById("action_button").click();  // Simulate button click when space is pressed
  }
});

updateScreen();
