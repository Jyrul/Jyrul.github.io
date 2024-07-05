const lab = {
    grid:10,
    wall:1,
    enter:2,
    exit:7,
    isbeauty:false,
}
const wall = {
    Width : 2,
    Height : 2,
    x : 0,
    y : 0,
    Length : 1,
}
let j = {
    x:2,
    y:0,
    option:{
      up:true,
      left:true,
      down:true,
      right:true,
    },
    size:30,
}
var Jiventory =  [""]
  
var WallTab = [
  ["14", "01", "05", "12", "13", "07", "05", "04", "07", "10"],
  ["13", "06", "13", "14", "03", "03", "12", "06", "11", "06"],
  ["09", "00", "08", "13", "13", "07", "10", "09", "01", "03"],
  ["07", "04", "13", "02", "03", "04", "11", "13", "06", "07"],
  ["11", "09", "03", "08", "13", "09", "01", "03", "08", "09"],
  ["07", "05", "10", "13", "02", "01", "08", "14", "01", "10"],
  ["02", "12", "09", "04", "11", "02", "12", "13", "06", "09"],
  ["11", "14", "01", "08", "13", "09", "10", "06", "09", "01"],
  ["07", "05", "04", "13", "02", "01", "08", "02", "12", "06"],
  ["09", "12", "09", "04", "11", "09", "12", "06", "14", "04"],
]//nmr de tuiles

var Teleport = [
  [0, 4, 7, 6],
  [4, 9, 3, 1],
  [0, 7, 4, 4],
  [3, 5, 6, 6],
  [3, 8, 6, 7],
  [1, 9, 6, 9],
  [6, 1, 8, 9],
  [9, 3, 9, 6],
]//x, y <-> x, y
//[1, 6, 6, 0],
//[4, 6, 3, 1],  

var Switch = [
  [0, 0],
  [5, 6],
  [2, 3],
  [1, 7],
  [6, 3],
  [1, 6],
  [7, 5],
  [4, 0],
]//x, y
//[0, 0],
//[2, 3],
//[6, 3],
//[6, 6],
//[6, 1],

var WallSwitch = [
  [1, 2, false, 1],
  [6, 5, false, 1],
  [5, 7, false, 1],
  [3, 7, false, 1],
  [8, 7, false, 1],
  [6, 8, false, 1],

  [7, 0, false, 2],

  [5, 6, true, 1],
  
  [4, 3, true, 2],
  [2, 5, true, 2],
  [6, 8, true, 2],
  [5, 8, true, 2],
]//x, y, etat, orientation
  
var KeyDoor = [
  [5, 1, 2, true, 'yellowkey'],
  [8, 4, 2, true, 'yellowkey'],
  [1, 3, 2, true, 'greenkey'],
  [7, 9, 1, true, 'redkey'],
]//x, y, orientation, apparition
  
var KeyObject = [
  [4, 7, true, 'yellowkey'],
  [9, 4, true, 'greenkey'],
  [8, 1,true, 'redkey'],
]//x, y, orientation, apparition
  
  
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
    
    noStroke();
    fill(220);
    rect(0, 0, width, height);
     
    let gridsize = width / lab.grid
    
    //////////  //////////
  
      //Switch & Teleport
  
    fill(255, 150, 0);
    Switch.forEach((item, index, Switch) => {
      rect(gridsize * Switch[index][0], gridsize * Switch[index][1], gridsize, gridsize);
    });

    fill(200, 0, 200);
    Teleport.forEach((item, index, Teleport) => {
      rect(gridsize * Teleport[index][0], gridsize * Teleport[index][1], gridsize, gridsize);
      rect(gridsize * Teleport[index][2], gridsize * Teleport[index][3], gridsize, gridsize);
    });

    //////////  //////////

    //mur coté
    fill(0, 0, 255);

    
    //mur exterieur
    fill(0, 0, 255),
    rect(0, 0, wall.Width * 2, height);
    rect(width, 0, -wall.Width * 2, height);
    rect(0, 0, width, wall.Height * 2);
    rect(0, height, width, -wall.Height * 2);

    fill(220);
    
    rect(lab.enter * gridsize, 0, gridsize, wall.Height * 2);
    rect(lab.exit * gridsize, height, gridsize, -wall.Height * 2);
    
    //////////  //////////
    
    //mur intérieur
    fill(0, 0, 255);
    
    //mur verticaux
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
    
    //////////  //////////

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
    
    //////////  //////////
    
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
    
    //////////  //////////
    
    //joueur
    let sprite = {
      x:gridsize / 2 + j.x * gridsize,
      y:gridsize / 2 + j.y * gridsize,
    }
      
    fill(0);
      circle(sprite.x, sprite.y, j.size);
  
  }
  
  
  function keyTyped(){
  
    j.option.right = true;
    j.option.left = true;
    j.option.up = true;
    j.option.down = true;
    
    let gridsize = width / lab.grid
    
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
  
      if(j.option.up == true){
        j.y -= 1;
      }   
      
    }
    else if (key === 'l'){
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
  
      if(j.option.down == true){
        j.y += 1;
      }
    
    }
    else if (key === 'k'){
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
      
      if(j.option.left == true){
        j.x -= 1;
      }
      
    }
    else if (key === 'm'){
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
      
      if(j.option.right == true){
        j.x += 1;
      }
    }  
    
    if(j.x == lab.exit && j.y == lab.grid){
      j.x = lab.enter;
      j.y = 0;
    }

    //teleport
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

    //switch
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
    
    //keyobject
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
  
//656
//541
//576