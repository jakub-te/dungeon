
let current_position = 0;
let gold = 0;
let inventory = [];
let already_mined = false;
let game_places;

game_places = [{
  directions: [1, 2, -1, 3], // position 0 (left, right, up, down)
  textField: "You are at home. Your mission is to defeat the Orks. Go west to the cave to get some resources. Once you have enough resources, you may buy a sword.",
  action_button: "Buy"
}, {
  directions: [-1, 0, -1, -1], // position 1
  textField: "You're in a cave. Mine some gold by clicking the \"Mine\" button. (You can only go once) Then, once you've mined enough gold, go back home and then you can mine again.",
  action_button: "Mine"
}, {
  directions: [0, -1, -1, -1], // position 2
  textField: "This is the final battle. Click the \"Battle\" button to fight the Orks",
  action_button: "Battle"
}, {
  directions: [-1, -1, 0, -1], // position 2
  textField: "Dorazil jsi do Hospůdky na mýtince",
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
  if (current_position === 0) {
    buySword();
  } else if (current_position === 1) {
    mineGold();
  } else if (current_position === 2) {
    startBattle();
  }
});

updateScreen();
