let lab = {
    grid : 0,
    enter :{
        x : 0,
        y : 0, 
    },
    exit :{
        x : 0,
        y : 0,
        side : 0,
    },
    level : 0,
    is:{
      Switch:false,
      Teleport:false,
      Key:false,
      River:false,
      Electric:false,
      Convertizer:false,
    },
    preloadlevel : true,
};

let wall = {
    Width : 0,
    Height : 0,
};

let gridsize = 0;

let WallTab = [];
let Switch = [];
let WallSwitch = [];
let Teleport = [];
let KeyDoor = [];
let KeyObject = [];
let RiverTab = [];
let RiverObject = [];
let Convertizer = [];
let ElectricDoor = [];
let ElectricInterupt = [];

let j = {
    x:0,
    y:0,
    option:{
      up:true,
      left:true,
      down:true,
      right:true,
    },
    size:30,
    go:{
      river:false,
    }
};
var Jiventory =  [""];

//SetUp
function preload() {
    background = loadImage('/Images/Fond.png');
    player = loadImage('/Images/Player.png')
  
    wallV = loadImage('/Images/WallV.png');
    wallH = loadImage('/Images/WallH.png');
  
    bigWallV = loadImage('/Images/BigWallV.png');
    bigWallH = loadImage('/Images/BigWallH.png');
  
    Ykeyy = loadImage('/Images/Key_yellow_pic.png');
    Ybigkeyy = loadImage('/Images/Key_yellow_pic_big.png');
    Rkeyy = loadImage('/Images/Key_red_pic.png');
    Rbigkeyy = loadImage('/Images/Key_red_pic_big.png');
    Gkeyy = loadImage('/Images/Key_green_pic.png');
    Gbigkeyy = loadImage('/Images/Key_green_pic_big.png');
    keydoorcloseV = loadImage('Images/Keydoorclose.png');
    keydooropenV = loadImage('Images/Keydooropen.png');

    closedoorH = loadImage('/Images/ClosedoorH.png');
    closedoorV = loadImage('/Images/ClosedoorV.png');
    opendoorH = loadImage('/Images/OpendoorH.png');
    opendoorV = loadImage('/Images/OpendoorV.png');
}

function setup() {
    createCanvas(400, 400);
}
    
function draw() {
    fill(220);
    noStroke();
    rect(0, 0, width, height);
    
    if(lab.preloadlevel == true){
      PreloadLevel();
    } 

    switch(lab.level){
      case 5:
        Level5();
        break;
      case 4:
        Level4();
        break;
      case 3:
            Level3();
            break;
      case 2:
            Level2();
            break
      case 1:
            Level1();
            break;
      case 0:
            Level0();
            break;
    }//Level
  
    //joueur
  let sprite = {
    x:gridsize / 2 + j.x * gridsize,
    y:gridsize / 2 + j.y * gridsize,
  }
      
  fill(0);
    circle(sprite.x, sprite.y, j.size);
}
  
//Loading Level
function PreloadLevel (){
    switch(lab.level){
      case 5:

        break;
      case 4:
        lab.is.Switch = true,
        lab.is.Teleport = true,
        lab.is.Key = true,
        lab.is.River = true,
        lab.is.Convertizer = true,
        lab.is.Electric = true,

        j.x = 8;
        j.y = 0;

        lab.grid = 10;
        lab.exit.x = 1;
        lab.exit.y = 9;
        lab.exit.side = 3;
          
        gridsize = width / lab.grid;

        wall.Width = 1.5;
        wall.Height = 1.5;

        WallTab = [
          ["13", "13", "14", "01", "01", "12", "07", "01", "05", "10"],
          ["09", "03", "10", "06", "06", "07", "08", "09", "10", "11"],
          ["07", "10", "09", "04", "09", "00", "12", "14", "00", "12"],
          ["11", "09", "01", "03", "10", "06", "14", "10", "06", "13"],
          ["07", "05", "03", "10", "09", "08", "13", "02", "03", "08"],
          ["06", "13", "14", "03", "01", "12", "02", "04", "14", "10"],
          ["09", "03", "10", "13", "06", "14", "04", "09", "05", "04"],
          ["07", "12", "09", "00", "03", "01", "08", "14", "01", "08"],
          ["06", "14", "10", "02", "10", "11", "14", "10", "06", "13"],
          ["09", "01", "03", "08", "09", "12", "14", "03", "03", "08"],
        ]//nmr de tuiles
        
        Teleport = [
          [1, 7, 0, 0],
          [3, 6, 6, 3],
        ]//x, y <-> x, y
        
        Switch = [
          [7, 2],
          [9, 8],
          [5, 6],
          [5, 9],
          [1, 5],
          [2, 0],
        ]//x, y

        WallSwitch = [
          [6, 1, false, 2],
          
          [8, 4, false, 1],
          [3, 8, false, 1],
          
          [9, 7, true, 2],
          [5, 7, true, 2],
          [3, 3, true, 2],
        ]//x, y, etat, orientation
                
        KeyDoor = [
          [2, 3, 2, true, "greenkey"],
          [8, 9, 2, true, "redkey"],
        ]//x, y, orientation, apparition, nom
                
        KeyObject = [
          [2, 5, true, "redkey"],
          [9, 3, true, "greenkey"],
        ]//x, y, apparition, nom
        
        RiverTab = [
          ["R", "R", "o", "o", "o", "o", "o", "o", "o", "o"],
          ["R", "R", "R", "R", "o", "o", "o", "o", "o", "o"],
          ["R", "R", "R", "o", "o", "o", "o", "o", "o", "o"],
          ["o", "R", "R", "o", "o", "o", "o", "o", "o", "o"],
          ["o", "R", "R", "R", "R", "o", "o", "o", "o", "R"],
          ["o", "o", "R", "R", "R", "R", "o", "o", "o", "o"],
          ["o", "o", "R", "o", "R", "R", "R", "o", "o", "o"],
          ["o", "o", "o", "R", "R", "R", "R", "R", "R", "R"],
          ["o", "o", "o", "o", "R", "o", "R", "R", "R", "R"],
          ["o", "o", "o", "o", "o", "o", "o", "R", "R", "R"],
        ]//tab

        RiverObject = [
          [5, 0, "baton1", true],
          [8, 5, "baton2", true],
          [6, 4, "cuire", true],
        ]//x, y, object, apparition

        Convertizer = [9, 1]//x, y

        ElectricDoor = [
          [1, 10, true, 1, "first"]
        ]//x, y, apparition, orientation, nom

        ElectricInterupt = [
          [0, 3, false, "first"],
          [6, 9, false, "first"],
        ]//x, y, activate, nom

        Jiventory = [""]//object

        break;
      case 3:
        lab.is.Switch = true,
        lab.is.Teleport = true,
        lab.is.Key = true,

        j.x = 2;
        j.y = 0;
            
        lab.grid = 10;
        lab.enter.x = 2;
        lab.enter.y = 0;
        lab.exit.x = 7;
        lab.exit.y = 9;
        lab.exit.side = 3;
            
        gridsize = width / lab.grid

        wall = {
            Width : 1.5,
            Height : 1.5,
        }

        WallTab = [
                ["14", "01", "05", "12", "13", "07", "05", "10", "07", "10"],
                ["13", "06", "13", "14", "03", "03", "12", "06", "11", "06"],
                ["09", "00", "08", "13", "13", "07", "10", "09", "01", "08"],
                ["07", "04", "13", "02", "03", "04", "11", "13", "06", "13"],
                ["11", "09", "03", "08", "13", "09", "01", "03", "08", "11"],
                ["07", "05", "10", "13", "02", "01", "08", "14", "01", "10"],
                ["02", "12", "09", "04", "11", "02", "12", "13", "06", "11"],
                ["11", "14", "01", "08", "13", "09", "10", "06", "09", "10"],
                ["07", "05", "04", "13", "02", "01", "08", "02", "12", "06"],
                ["09", "12", "09", "08", "11", "09", "12", "06", "14", "08"],
        ]//nmr de tuiles
      
        Teleport = [
            [0, 4, 7, 6],
            [4, 9, 3, 1],
            [0, 7, 4, 4],
            [3, 5, 6, 6],
            [3, 8, 6, 7],
            [1, 9, 6, 9],
            [6, 1, 8, 9],
            [9, 3, 9, 6],
        ]//x, y <-> x, y
      
        Switch = [
            [0, 0],
            [5, 6],
            [2, 3],
            [1, 7],
            [6, 3],
            [1, 6],
            [7, 5],
            [4, 0],
        ]//x, y

        WallSwitch = [
                [1, 2, false, 1],
                [6, 5, false, 1],
                [5, 7, false, 1],
                [3, 7, false, 1],
                [8, 7, false, 1],
                [6, 8, false, 1],
            
                [5, 5, false, 2],
                [7, 0, false, 2],
            
                [5, 6, true, 1],
                
                [4, 3, true, 2],
                [2, 5, true, 2],
                [6, 8, true, 2],
                [5, 8, true, 2],
        ]//x, y, etat, orientation
                
        KeyDoor = [
                [5, 1, 2, true, 'yellowkey'],
                [8, 4, 2, true, 'yellowkey'],
                [1, 3, 2, true, 'greenkey'],
                [7, 9, 1, true, 'redkey'],
        ]//x, y, orientation, apparition, nom
                
        KeyObject = [
                [4, 7, true, 'yellowkey'],
                [9, 4, true, 'greenkey'],
                [8, 1,true, 'redkey'],
        ]//x, y, apparition, nom
        break;
      case 2:
            lab.is.Switch = true,
            lab.is.Teleport = true,
      
            j.x = 2;
            j.y = 0;

            lab.grid = 7;
            lab.enter.x = 2;
            lab.enter.y = 0;
            lab.exit.x = 5;
            lab.exit.y = 6;
            lab.exit.side = 3;
            
            gridsize = width / lab.grid;

            wall.Width = 2;
            wall.Height = 2;

            WallTab = [
                ["07", "01", "01", "12", "13", "07", "12"],
                ["06", "11", "06", "14", "03", "03", "12"],
                ["09", "01", "08", "13", "13", "07", "10"],
                ["07", "04", "13", "02", "03", "04", "11"],
                ["11", "09", "03", "08", "13", "09", "10"],
                ["07", "05", "10", "13", "02", "01", "08"],
                ["09", "12", "09", "08", "11", "02", "12"],
            ]//nmr de tuiles
        
            Teleport = [
                [1, 1, 3, 5],
                [4, 4, 3, 1],
                [6, 6, 6, 0],
            ]//x, y <-> x, y
        
            Switch = [
                [1, 6],
                [0, 4],
                [3, 2],
            ]//x, y

            WallSwitch = [
                [1, 3, false, 1],
                [3, 4, true, 2],
                [5, 6, true, 1],
                [5, 6, false, 1],
                [5, 1, false, 2],
            ]//x, y, etat, orientation
            break;
      case 1:
            lab.is.Switch = true,
      
            lab.grid = 5;
            lab.enter.x = 2;
            lab.enter.y = 4;
            lab.exit.x = 2;
            lab.exit.y = 0;
            lab.exit.side = 1;
            
            j.x = lab.enter.x;
            j.y = lab.enter.y;

            gridsize = width / lab.grid;

            wall.Width = 3;
            wall.Height = 3;

            WallTab = [
            ["14", "01", "03", "10", "13"],
            ["13", "06", "13", "09", "04"],
            ["09", "00", "08", "13", "06"],
            ["07", "04", "13", "02", "08"],
            ["11", "09", "03", "03", "12"],
            ]//nmr de tuiles
        
            Switch = [
                [2, 1],
                [3, 2],
                [2, 3],
            ]//x, y

            WallSwitch = [
                [1, 3, false, 1],
                [4, 2, false, 1],
                [1, 1, true, 1],
                [2, 0, true, 1],
                [3, 4, true, 1],
            ]//x, y, etat, orientation
            break;
      case 0:
            lab.grid = 5;
            lab.enter.x = 2;
            lab.enter.y = 0;
            lab.exit.x = 2;
            lab.exit.y = 0;
            lab.exit.side = 3;
            
            j.x = lab.enter.x;
            j.y = lab.enter.y;

            gridsize = width / lab.grid;

            wall.Width = 3;
            wall.Height = 3;

            WallTab = [
                ["07", "12", "14", "10", "13"],
                ["06", "07", "05", "08", "06"],
                ["06", "06", "14", "05", "04"],
                ["06", "09", "05", "10", "06"],
                ["09", "12", "07", "08", "11"],
            ]//nmr de tuiles
            break;
    }
    lab.preloadlevel = false;
}


//Legendes
function Leg_River() {
  fill(100, 180, 255);

  //case river
  for(let colId = 0; colId < WallTab[0].length; colId++){
    for(let rowId = 0; rowId < WallTab.length; rowId++){
      let map = RiverTab[colId][rowId];
      switch(map){
        case "R":
          rect(rowId * gridsize, colId * gridsize, gridsize, gridsize);               //mur haut
          break;
                  
      }
    }
  }

  fill(60, 130, 255);
  //river object
  RiverObject.forEach((item, index, RiverObject) => {
    if(RiverObject[index][3] == true){
      if(RiverObject[index][2] == "baton1" || RiverObject[index][2] == "baton2"){
        stroke(50);
        line(RiverObject[index][0] * gridsize + gridsize / 4, RiverObject[index][1] * gridsize  + 3 * gridsize / 4, RiverObject[index][0] * gridsize + 3 * gridsize / 4, RiverObject[index][1] * gridsize + gridsize / 4);
        noStroke();
      }else{
        rect(RiverObject[index][0] * gridsize + gridsize / 4, RiverObject[index][1] * gridsize  + gridsize / 4, gridsize / 2);
      }
    }
  });

  fill(50);
  //convertizer
  rect(Convertizer[0] * gridsize, Convertizer[1] * gridsize, gridsize, gridsize);
}

function Leg_Switch(){
  fill(255, 150, 0);
    Switch.forEach((item, index, Switch) => {
      rect(gridsize * Switch[index][0], gridsize * Switch[index][1], gridsize, gridsize);
    });
}

function Leg_Teleport(){
  fill(200, 0, 200);
  Teleport.forEach((item, index, Teleport) => {
    rect(gridsize * Teleport[index][0], gridsize * Teleport[index][1], gridsize, gridsize);
    rect(gridsize * Teleport[index][2], gridsize * Teleport[index][3], gridsize, gridsize);
  });
}

function Leg_ElectricInterupt() {
  fill(100);
  ElectricInterupt.forEach((item, index, ElectricInterupt) => {
    rect(ElectricInterupt[index][0] * gridsize, ElectricInterupt[index][1] * gridsize, gridsize, gridsize);
  });

  stroke(20);
  line(gridsize / 2 - wall.Width / 2, 4 * gridsize, gridsize / 2 - wall.Width / 2, 9 * gridsize + gridsize / 2 - wall.Width / 2);
  line(gridsize / 2, 9 * gridsize + gridsize / 2 - wall.Width / 2, 6 * gridsize, 9 * gridsize + gridsize / 2 - wall.Height / 2, 0 * gridsize);
  line(gridsize + gridsize / 2 - wall.Width / 2, 9 * gridsize + gridsize / 2, gridsize + gridsize / 2 - wall.Width / 2, 10 * gridsize - wall.Width / 2);
  noStroke();
}

function Leg_Wall() {
  fill(0, 0, 255);
  
  //mur intérieur
  for(let colId = 0; colId < WallTab[0].length; colId++){
    for(let rowId = 0; rowId < WallTab.length; rowId++){
      let map = WallTab[colId][rowId];
      switch(map){
                  case "01":
                      rect(rowId * gridsize, colId * gridsize, gridsize, wall.Height);               //mur haut
                      break;
                  case "02":
                      rect(rowId * gridsize, colId * gridsize, wall.Width, gridsize);                //mur gauche
                      break;
                  case "03":
                      rect(rowId * gridsize, colId * gridsize + gridsize, gridsize, -wall.Height);   //mur bas
                      break;
                  case "04":
                      rect(rowId * gridsize + gridsize, colId * gridsize, -wall.Width, gridsize);    //mur droigt
                      break;
  
                  case "05":
                      rect(rowId * gridsize, colId * gridsize, gridsize, wall.Height);               //mur haut
                      rect(rowId * gridsize, colId * gridsize + gridsize, gridsize, -wall.Height);   //mur bas
                      break;
                  case "06":
                      rect(rowId * gridsize + gridsize, colId * gridsize, -wall.Width, gridsize);    //mur droigt
                      rect(rowId * gridsize, colId * gridsize, wall.Width, gridsize);                //mur gauche
                      break;
                  case "07":
                      rect(rowId * gridsize, colId * gridsize, gridsize, wall.Height);               //mur haut
                      rect(rowId * gridsize, colId * gridsize, wall.Width, gridsize);                //mur gauche
                      break;
                  case "08":
                      rect(rowId * gridsize, colId * gridsize + gridsize, gridsize, -wall.Height);   //mur bas
                      rect(rowId * gridsize + gridsize, colId * gridsize, -wall.Width, gridsize);    //mur droigt
                      break;
                  case "09":
                      rect(rowId * gridsize, colId * gridsize + gridsize, gridsize, -wall.Height);   //mur bas
                      rect(rowId * gridsize, colId * gridsize, wall.Width, gridsize);                //mur gauche
                      break;
                  case "10":
                      rect(rowId * gridsize, colId * gridsize, gridsize, wall.Height);               //mur haut
                      rect(rowId * gridsize + gridsize, colId * gridsize, -wall.Width, gridsize);    //mur droigt
                      break;
                  
                  case "11":
                      rect(rowId * gridsize, colId * gridsize + gridsize, gridsize, -wall.Height);   //mur bas
                      rect(rowId * gridsize, colId * gridsize, wall.Width, gridsize);                //mur gauche
                      rect(rowId * gridsize + gridsize, colId * gridsize, -wall.Width, gridsize);    //mur droigt
                      break;
                  case "12":
                      rect(rowId * gridsize, colId * gridsize, gridsize, wall.Height);               //mur haut
                      rect(rowId * gridsize, colId * gridsize + gridsize, gridsize, -wall.Height);   //mur bas
                      rect(rowId * gridsize + gridsize, colId * gridsize, -wall.Width, gridsize);    //mur droigt
                      break;
                  case "13":
                      rect(rowId * gridsize, colId * gridsize, gridsize, wall.Height);               //mur haut
                      rect(rowId * gridsize, colId * gridsize, wall.Width, gridsize);                //mur gauche
                      rect(rowId * gridsize + gridsize, colId * gridsize, -wall.Width, gridsize);    //mur droigt
                      break;
                  case "14":
                      rect(rowId * gridsize, colId * gridsize + gridsize, gridsize, -wall.Height);   //mur bas
                      rect(rowId * gridsize, colId * gridsize, gridsize, wall.Height);               //mur haut
                      rect(rowId * gridsize, colId * gridsize, wall.Width, gridsize);                //mur gauche
                      break;
                  
      }
    }
  }

  //mur extérieur
  rect(0, 0, wall.Width * 2, height);
  rect(width, 0, -wall.Width * 2, height);
  rect(0, 0, width, wall.Height * 2);
  rect(0, height, width, -wall.Height * 2);

  //sortie
  fill(220);
  if(lab.exit.side == 1){
    rect(lab.exit.x * gridsize, 0, gridsize, wall.Height * 2);
  }else if(lab.exit.side == 2){
    rect(0, lab.exit.y * gridsize, wall.Height * 2, gridsize);
  }else if(lab.exit.side == 3){
      rect(lab.exit.x * gridsize, height, gridsize, -wall.Height * 2);
  }else if(lab.exit.side == 4){
    rect(height, lab.exit.y * gridsize, -wall.Height * 2, gridsize);
  }
}

function Leg_ElectricDoor() {
  fill(0);
  ElectricDoor.forEach((item, index, ElectricDoor) => {
    if(ElectricDoor[index][3] == 1 && ElectricDoor[index][2] == true){
      rect(gridsize * ElectricDoor[index][0], gridsize * ElectricDoor[index][1], gridsize, - wall.Height);
    }else if(ElectricDoor[index][2] == true){
      rect(gridsize * ElectricDoor[index][0], gridsize * ElectricDoor[index][1], - wall.Height, gridsize);
    }
  });
}

function Leg_WallSwitch() {
  //WallSwitch
  WallSwitch.forEach((item, index, WallSwitch) => {
    if(WallSwitch[index][2] == false){
      fill(255, 0, 0);
      noStroke();
      if(WallSwitch[index][3] == 1){
        rect(gridsize * WallSwitch[index][0], gridsize * WallSwitch[index][1], gridsize, wall.Height);
      }else{
        rect(gridsize * WallSwitch[index][0], gridsize * WallSwitch[index][1], wall.Height, gridsize);
      }
    }else{
      fill(0, 255, 0);
      noStroke();
      if(WallSwitch[index][3] == 1){
        rect(gridsize * WallSwitch[index][0], gridsize * WallSwitch[index][1], gridsize, wall.Height);  
      }else{
        rect(gridsize * WallSwitch[index][0], gridsize * WallSwitch[index][1],wall.Height, gridsize);
      }
    }
  });
}

function Leg_Key() {
  fill(0);
    
    //KeyDoor
    KeyDoor.forEach((item, index, KeyDoor) => {
        if(KeyDoor[index][3] == true){
          if(KeyDoor[index][4] == "yellowkey"){
            image(Ykeyy, gridsize * KeyDoor[index][0] + 1, gridsize * KeyDoor[index][1] + 3);
          }else if(KeyDoor[index][4] == "greenkey"){
            image(Gkeyy, gridsize * KeyDoor[index][0] + 1, gridsize * KeyDoor[index][1] + 3);
          }else if(KeyDoor[index][4] == "redkey"){
            image(Rkeyy, gridsize * KeyDoor[index][0] + 1, gridsize * KeyDoor[index][1] + 3);
          }
          
          if(KeyDoor[index][2] == 2){
            rect(gridsize * KeyDoor[index][0], gridsize * KeyDoor[index][1], wall.Width, gridsize);
          }else{
            rect(gridsize * KeyDoor[index][0], gridsize * KeyDoor[index][1], gridsize, wall.Height);
          }
        }
    });

    //KeyObject
    KeyObject.forEach((item, index, KeyObject) => {
      if(KeyObject[index][2] == true){
        if(KeyObject[index][3] == "yellowkey"){
          image(Ybigkeyy, gridsize * KeyObject[index][0] + 3, gridsize * KeyObject[index][1] + 2);
        }
        else if(KeyObject[index][3] == "greenkey"){
          image(Gbigkeyy, gridsize * KeyObject[index][0] + 3, gridsize * KeyObject[index][1] + 2);
        }
        else if(KeyObject[index][3] == "redkey"){
          image(Rbigkeyy, gridsize * KeyObject[index][0] + 3, gridsize * KeyObject[index][1] + 2);
        }
      }
    });
}


//Level
function Level5(){

}

function Level4() {
  Leg_River();
  Leg_Switch();
  Leg_Teleport();
  Leg_ElectricInterupt();
  Leg_Wall();
  Leg_ElectricDoor();
  Leg_WallSwitch();
  Leg_Key();
}

function Level3 () {
  Leg_Switch();
  Leg_Teleport();    
  Leg_Wall();
  Leg_WallSwitch();
  Leg_Key();
}

function Level2 () {
  Leg_Switch();
  Leg_Teleport();    
  Leg_Wall();
  Leg_WallSwitch();
}

function Level1() {
  Leg_Switch();
  Leg_Wall();
  Leg_WallSwitch();
}

function Level0() {
  Leg_Wall();
}


//Control
function keyTyped(){
    j.option.right = true;
    j.option.left = true;
    j.option.up = true;
    j.option.down = true;
    
    let gridsize = width / lab.grid
    
    let optionright = false;
    let optionleft = false;
    let optionup = false;
    let optiondown = false;

    let sprite = {
      x:j.x * gridsize + gridsize / 2,
      y:j.y * gridsize + gridsize / 2,
    }
  
    let map = WallTab[j.y][j.x];
    switch(map){
        case "01":
            j.option.right = true;
            j.option.left = true;
            j.option.up = false;
            j.option.down = true;
            break;
        case "02":
            j.option.right = true;
            j.option.left = false;
            j.option.up = true;
            j.option.down = true;
            break;
        case "03":
            j.option.right = true;
            j.option.left = true;
            j.option.up = true;
            j.option.down = false;
            break;
        case "04":
            j.option.right = false;
            j.option.left = true;
            j.option.up = true;
            j.option.down = true;
            break;
    
        case "05":
            j.option.right = true;
            j.option.left = true;
            j.option.up = false;
            j.option.down = false;
            break;
        case "06":
            j.option.right = false;
            j.option.left = false;
            j.option.up = true;
            j.option.down = true;
            break;
        case "07":
            j.option.right = true;
            j.option.left = false;
            j.option.up = false;
            j.option.down = true;
            break;
        case "08":
            j.option.right = false;
            j.option.left = true;
            j.option.up = true;
            j.option.down = false;
            break;
        case "09":
            j.option.right = true;
            j.option.left = false;
            j.option.up = true;
            j.option.down = false;
            break;
        case "10":

            j.option.right = false;
            j.option.left = true;
            j.option.up = false;
            j.option.down = true;
            break;
        
        case "11":
            j.option.right = false;
            j.option.left = false;
            j.option.up = true;
            j.option.down = false;
            break;
        case "12":
            j.option.right = false;
            j.option.left = true;
            j.option.up = false;
            j.option.down = false;
            break;
        case "13":
            j.option.right = false;
            j.option.left = false;
            j.option.up = false;
            j.option.down = true;
            break;
        case "14":
            j.option.right = true;
            j.option.left = false;
            j.option.up = false;
            j.option.down = false;
            break;
        default:
            break;
    }

    //joueur
    if (key === 'o'){
      optionup = true;
      
      WallSwitch.forEach((item, index, WallSwitch) => {
      if(WallSwitch[index][0] * gridsize + gridsize / 2 <= sprite.x + 1 && sprite.x + 1 <= WallSwitch[index][0] * gridsize + gridsize / 2 + wall.Width && WallSwitch[index][1] * gridsize <= sprite.y - gridsize / 2 + 1 && sprite.y - gridsize / 2 + 1 <= WallSwitch[index][1] * gridsize + wall.Width && WallSwitch[index][2] == false && WallSwitch[index][3] == 1){
          j.option.up = false;
      }
      });

      KeyDoor.forEach((item, index, KeyDoor) => {
        let i = index
        if(KeyDoor[index][0] * gridsize + gridsize / 2 <= sprite.x + 1 && sprite.x + 1 <= KeyDoor[index][0] * gridsize + gridsize / 2 + wall.Width && KeyDoor[index][1] * gridsize <= sprite.y - gridsize / 2 + 1 && sprite.y - gridsize / 2 + 1 <= KeyDoor[index][1] * gridsize + wall.Width && KeyDoor[index][3] == true && KeyDoor[index][2] == 1){
        Jiventory.forEach((item, index, Jiventory) => {
          if(Jiventory[index] != KeyDoor[i][4]){
            j.option.up = false;
          }
          else{
            KeyDoor[i][3] = false;
         }
        });
      }
      });
  
      ElectricDoor.forEach((item, index, ElectricDoor) => {
        let i = index;
        if(ElectricDoor[index][0] * gridsize + gridsize / 2 <= sprite.x + 1 && sprite.x + 1 <= ElectricDoor[index][0] * gridsize + gridsize / 2 + wall.Width && ElectricDoor[index][1] * gridsize <= sprite.y - gridsize / 2 + 1 && sprite.y - gridsize / 2 + 1 <= ElectricDoor[index][1] * gridsize + wall.Width && ElectricDoor[index][2] == true && ElectricDoor[index][3] == 1){
          ElectricInterupt.forEach((item, index, ElectricInterupt) => {
            if(ElectricInterupt[index][2] == false && ElectricInterupt[index][3] == ElectricDoor[i][4]){
              j.option.up = false;
            }
          });
        }
      });

      if(j.option.up == true){
        j.y -= 1;
      }   
      
    }
    else if (key === 'l'){
      optiondown = true;

      WallSwitch.forEach((item, index, WallSwitch) => {
      if(WallSwitch[index][0] * gridsize + gridsize / 2 <= sprite.x + 1 && sprite.x + 1 <= WallSwitch[index][0] * gridsize + gridsize / 2 + wall.Width && WallSwitch[index][1] * gridsize <= sprite.y + gridsize / 2 + 1 && sprite.y + gridsize / 2 + 1 <= WallSwitch[index][1] * gridsize + wall.Width && WallSwitch[index][2] == false && WallSwitch[index][3] == 1){
          j.option.down = false;
        }
      });
      
      KeyDoor.forEach((item, index, KeyDoor) => {
        let i = index
        if(KeyDoor[index][0] * gridsize + gridsize / 2 <= sprite.x + 1 && sprite.x + 1 <= KeyDoor[index][0] * gridsize + gridsize / 2 + wall.Width && KeyDoor[index][1] * gridsize <= sprite.y + gridsize / 2 + 1 && sprite.y + gridsize / 2 + 1 <= KeyDoor[index][1] * gridsize + wall.Width && KeyDoor[index][3] == true && KeyDoor[index][2] == 1){
        Jiventory.forEach((item, index, Jiventory) => {
        if(Jiventory[index] != KeyDoor[i][4]){
          j.option.down = false;
        }
        else{
          KeyDoor[i][3] = false;
        }
        });
      }
      });

      ElectricDoor.forEach((item, index, ElectricDoor) => {
        let i = index;
        if(ElectricDoor[index][0] * gridsize + gridsize / 2 <= sprite.x + 1 && sprite.x + 1 <= ElectricDoor[index][0] * gridsize + gridsize / 2 + wall.Width && ElectricDoor[index][1] * gridsize <= sprite.y + gridsize / 2 + 1 && sprite.y - gridsize / 2 + 1 <= ElectricDoor[index][1] * gridsize + wall.Width && ElectricDoor[index][2] == true && ElectricDoor[index][3] == 1){
          ElectricInterupt.forEach((item, index, ElectricInterupt) => {
            if(ElectricInterupt[index][2] == false && ElectricInterupt[index][3] == ElectricDoor[i][4]){
              j.option.down = false;
            }
          });
        }
      });

      
      
      if(j.option.down == true){
        j.y += 1;
      }
    
    }
    else if (key === 'k'){
      optionleft = true;

      WallSwitch.forEach((item, index, WallSwitch) => {
      if(WallSwitch[index][0] * gridsize <= sprite.x - gridsize / 2 + 1 && sprite.x - gridsize / 2 + 1 <= WallSwitch[index][0] * gridsize + wall.Width && WallSwitch[index][1] * gridsize + gridsize / 2 <= sprite.y + 1 && sprite.y + 1 <= WallSwitch[index][1] * gridsize + gridsize / 2 + wall.Width && WallSwitch[index][2] == false && WallSwitch[index][3] == 2){
          j.option.left = false;
      }
      });
      
      KeyDoor.forEach((item, index, KeyDoor) => {
      let i = index
        if(KeyDoor[index][0] * gridsize + gridsize / 2 <= sprite.x + 1 && sprite.x + 1 <= KeyDoor[index][0] * gridsize + gridsize / 2 + wall.Width && KeyDoor[index][1] * gridsize <= sprite.y - gridsize / 2 + 1 && sprite.y - gridsize / 2 + 1 <= KeyDoor[index][1] * gridsize + wall.Width && KeyDoor[index][3] == true && KeyDoor[index][2] == 2){
        Jiventory.forEach((item, index, Jiventory) => {  
        if(Jiventory[index] != KeyDoor[i][4]){
          j.option.left = false;
        }
        else{
          KeyDoor[i][3] = false;
        }
        });
      }
      });
      
      ElectricDoor.forEach((item, index, ElectricDoor) => {
        let i = index;
        if(ElectricDoor[index][0] * gridsize + gridsize / 2 <= sprite.x + 1 && sprite.x + 1 <= ElectricDoor[index][0] * gridsize + gridsize / 2 + wall.Width && ElectricDoor[index][1] * gridsize <= sprite.y - gridsize / 2 + 1 && sprite.y - gridsize / 2 + 1 <= ElectricDoor[index][1] * gridsize + wall.Width && ElectricDoor[index][2] == true && ElectricDoor[index][3] == 2){
          ElectricInterupt.forEach((item, index, ElectricInterupt) => {
            if(ElectricInterupt[index][2] == false && ElectricInterupt[index][3] == ElectricDoor[i][4]){
              j.option.up = false;
            }
          });
        }
      });

      if(j.option.left == true){
        j.x -= 1;
      }
      
    }
    else if (key === 'm'){
      optionright = true;

      WallSwitch.forEach((item, index, WallSwitch) => {
      if(WallSwitch[index][0] * gridsize <= sprite.x + gridsize / 2 + 1 && sprite.x + gridsize / 2 + 1 <= WallSwitch[index][0] * gridsize + wall.Width && WallSwitch[index][1] * gridsize + gridsize / 2 <= sprite.y + 1 && sprite.y + 1 <= WallSwitch[index][1] * gridsize + gridsize / 2 + wall.Width && WallSwitch[index][2] == false && WallSwitch[index][3] == 2){
          j.option.right = false;
        }
      });

      KeyDoor.forEach((item, index, KeyDoor) => {
      let i = index
      if(KeyDoor[index][0] * gridsize <= sprite.x + gridsize / 2 + 1 && sprite.x + 1 <= KeyDoor[index][0] * gridsize + wall.Width && KeyDoor[index][1] * gridsize <= sprite.y - gridsize / 2 + 1 && sprite.y - gridsize / 2 + 1 <= KeyDoor[index][1] * gridsize + wall.Width && KeyDoor[index][3] == true && KeyDoor[index][2] == 2){
          Jiventory.forEach((item, index, Jiventory) => {
          if(Jiventory[index] != KeyDoor[i][4]){
            j.option.right = false;
          }
          else{
            KeyDoor[i][3] = false;
          }
          });
      }
      });

      ElectricDoor.forEach((item, index, ElectricDoor) => {
        let i = index;
        if(ElectricDoor[index][0] * gridsize<= sprite.x + 1 && sprite.x + gridsize / 2 + 1 <= ElectricDoor[index][0] * gridsize + wall.Width && ElectricDoor[index][1] * gridsize <= sprite.y - gridsize / 2 + 1 && sprite.y - gridsize / 2 + 1 <= ElectricDoor[index][1] * gridsize + wall.Width && ElectricDoor[index][2] == true && ElectricDoor[index][3] == 2){
          ElectricInterupt.forEach((item, index, ElectricInterupt) => {
            if(ElectricInterupt[index][2] == false && ElectricInterupt[index][3] == ElectricDoor[i][4]){
              j.option.up = false;
            }
          });
        }
      });
      
      if(j.option.right == true){
        j.x += 1;
      }
    }

    if(key === '1'){
        lab.level += 1;
        lab.preloadlevel = true;
    }else if(key === '0'){
        lab.preloadlevel = true;
        lab.level -= 1;
    }
    
    
    if(j.x == -1 || j.y == -1 || j.x == lab.grid || j.y == lab.grid){
      lab.level += 1;
      lab.preloadlevel = true;
    }

    //teleport
    if(lab.is.Teleport == true){
      Teleport.forEach((item, index, Teleport) => {
      if(j.x == Teleport[index][0] && j.y == Teleport[index][1]){
        j.x = Teleport[index][2]
        j.y = Teleport[index][3]
      }
      else if(j.x == Teleport[index][2] && j.y == Teleport[index][3]){
        j.x = Teleport[index][0]
        j.y = Teleport[index][1]
      }
      });
    }

    //switch
    if(lab.is.Switch == true){
      Switch.forEach((item, index, Switch) => {
      if(j.x == Switch[index][0] && j.y == Switch[index][1]){
        WallSwitch.forEach((item, index, WallSwitch) => {
          if(WallSwitch[index][2] == true){
            WallSwitch[index][2] = false
          }else{
            WallSwitch[index][2] = true
          }
        });
      }
      });
    }
    
    //keyobject
    if(lab.is.Key == true){
      KeyObject.forEach((item, index, KeyObject) => {
        if(KeyObject[index][2] == true){
          if(j.x == KeyObject[index][0] && j.y == KeyObject[index][1]){
            append(Jiventory, KeyObject[index][3])
            KeyObject[index][2] = false;
            console.log(Jiventory);
          }
        }
      });
    }
    
    //convertizer
    if(lab.is.Convertizer == true && j.x == Convertizer[0] && j.y == Convertizer[1]){
      Jiventory.forEach((item, index, Jiventory) => {
        if(Jiventory[index] == "cuire"){
          
          Jiventory.forEach((item, index, Jiventory) => {
            if(Jiventory[index] == "baton1"){
              
              Jiventory.forEach((item, index, Jiventory) => {
                if(Jiventory[index] == "baton2"){
                  Jiventory.pop("cuire");
                  Jiventory.pop("baton1");
                  Jiventory.pop("baton2");
                  append(Jiventory, "palme");
                  console.log(Jiventory);
                  j.go.river = true;
                }
              });
            }
          });
        }
      });
    }
    
    //river
    if(lab.is.River == true){
      if(j.go.river == false){
        let rivermap = RiverTab[j.y][j.x];
        if(rivermap == "R"){
          if(optionup == true){
            j.y += 1;
          }else if(optiondown == true){
            j.y -= 1;
          }else if(optionleft == true){
            j.x += 1;
          }else if(optionright == true){
            j.x -= 1;
          }
        }
      }
      RiverObject.forEach((item, index, RiverObject) => {
        if(j.x == RiverObject[index][0] && j.y == RiverObject[index][1] && RiverObject[index][3] == true){
          RiverObject[index][3] = false;
          append(Jiventory, RiverObject[index][2]);
          console.log(Jiventory);
        }
      });
    }
    

    //electric interupt
    if(lab.is.Electric == true){
      ElectricInterupt.forEach((item, index, ElectricInterupt) => {
        if(j.x == ElectricInterupt[index][0] && j.y == ElectricInterupt[index][1]){
          ElectricInterupt[index][2] = true;
          console.log(ElectricInterupt[index][2]);
        }
        if(ElectricInterupt[0][2] == true && ElectricInterupt[1][2] == true){
          ElectricDoor[0][2] = false;
        }
      });
    }
}
  
//656
//541
//576
//1102