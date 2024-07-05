const lab = {
  grid:7,
  wall:1,
  enter:2,
  exit:3,
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
  x:0,
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

var WallList = [
  [0, 1, 1],
  [2, 1, 1],
  [4, 2, 1],
  [0, 3, 1],
  [2, 3, 1],
  [3, 5, 1],
  [0, 5, 1],
  [1, 6, 1],
  [4, 4, 1],
  [5, 5, 1],
  [6, 6, 1],
  [3, 1, 1],
  [1, 5, 1],
  [5, 2, 1],
  [6, 2, 1],
  [6, 1, 1],
  [6, 4, 1],
  [3, 2, 1],
  
  [4, 0, 2],
  [5, 0, 2],
  [3, 1, 2],
  [6, 3, 2],
  [5, 2, 2],
  [5, 6, 2],
  [5, 4, 2],
  [2, 6, 2],
  [3, 5, 2],
  [4, 5, 2],
  [4, 6, 2],
  [1, 1, 2],
  [2, 1, 2],
  [4, 2, 2],
  [3, 2, 2],
  [3, 3, 2],
  [1, 4, 2],
  [2, 3, 2],
  [4, 4, 2],
]//x, y, orientation

var Teleport = [
  [1, 6, 6, 0],
  [4, 6, 3, 1],
]//x, y <-> x, y

var Switch = [
  [0, 0],
  [2, 3],
  [6, 3],
  [6, 6],
  [6, 1],
]//x, y

var WallSwitch = [
  [1, 2, false, 1],
  [4, 3, true, 2],
  [2, 5, true, 1],
  [3, 6, false, 2],
  [6, 5, false, 1],
  [1, 5, false, 2],
]//x, y, etat, orientation

var KeyDoor = [
  [5, 1, 2, true, 'yellowkey'],
  [1, 3, 2, true, 'greenkey'],
]//x, y, orientation, apparition

var KeyObject = [
  [0, 4, true, 'yellowkey'],
  [4, 2, true, 'greenkey'],
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
  
  if(lab.isbeauty == true){
    image(background, 0, 0);
  }else{
    fill(220);
    rect(0, 0, width, height);
  }
   
  let gridsize = width / lab.grid
  

  //////////  //////////

    //Switch & Teleport
  if(lab.isbeauty == false){
    fill(255, 150, 0);
    Switch.forEach((item, index, Switch) => {
      rect(gridsize * Switch[index][0], gridsize * Switch[index][1], gridsize, gridsize);
    });

    fill(200, 0, 200);
    Teleport.forEach((item, index, Teleport) => {
      rect(gridsize * Teleport[index][0], gridsize * Teleport[index][1], gridsize, gridsize);
      rect(gridsize * Teleport[index][2], gridsize * Teleport[index][3], gridsize, gridsize);
    });
  }


  //////////  //////////


    //mur coté
  fill(0, 0, 255);

  if(lab.isbeauty == true){
    image(bigWallV, 0, 0)
    image(bigWallV, - wall.Width + width, 0)
    
      //mur haut & bas
    image(bigWallH, 0, 0)
    image(bigWallH, 0, - wall.Height + height)
    
    
    //entrer & sortie
    fill(80, 40, 10);
      noStroke();
      
    rect(lab.enter * gridsize, 0,gridsize, height / 200);
    rect(lab.exit * gridsize, - height / 200 + height, gridsize, height / 200);
  }else{
    fill(0, 0, 255);

    rect(0, 0, wall.Width, height);
    rect(width, 0, -wall.Width, height);
    rect(0, 0, width, wall.Height);
    rect(0, height, width, -wall.Height);

    fill(220);
    noStroke();
    
    rect(lab.enter * gridsize, 0,gridsize, height / 200);
    rect(lab.exit * gridsize, - height / 200 + height, gridsize, height / 200);
  }
  
  
  //////////  //////////
  

  //mur intérieur
  fill(0, 0, 255);
  noStroke();
  
  //mur verticaux
  if(lab.isbeauty == true){
    WallList.forEach((item, index, WallList) => {
      if(WallList[index][2] == 2){
        image(wallV, gridsize * WallList[index][0],  gridsize * WallList[index][1]);
      }else{
        image(wallH, gridsize * WallList[index][0],  gridsize * WallList[index][1]);
      }
    });
  }else{
    WallList.forEach((item, index, WallList) => {
      if(WallList[index][2] == 2){
        rect(gridsize * WallList[index][0], gridsize * WallList[index][1], wall.Width, gridsize);
      }else{
        rect(gridsize * WallList[index][0], gridsize * WallList[index][1], gridsize, wall.Height);
      }
    });
  }
  

  //////////  //////////

  
  fill(0);
  
    //KeyDoor
  if(lab.isbeauty == true){
    KeyDoor.forEach((item, index, KeyDoor) => {
    if(KeyDoor[index][3] == true){
      if(KeyDoor[index][4] == "yellowkey"){
        image(Ykeyy, gridsize * KeyDoor[index][0] + 1, gridsize * KeyDoor[index][1] + 3);
      }else if(KeyDoor[index][4] == "greenkey"){
        image(Gkeyy, gridsize * KeyDoor[index][0] + 1, gridsize * KeyDoor[index][1] + 3);
      }
      
      if(KeyDoor[index][2] == 2){
        image(keydoorcloseV, gridsize * KeyDoor[index][0], gridsize * KeyDoor[index][1])
      }else{
        image(keydoorcloseV, gridsize * KeyDoor[index][0], gridsize * KeyDoor[index][1]);
      }
    }
    });
  }else{
    KeyDoor.forEach((item, index, KeyDoor) => {
      if(KeyDoor[index][3] == true){
        if(KeyDoor[index][4] == "yellowkey"){
          image(Ykeyy, gridsize * KeyDoor[index][0] + 1, gridsize * KeyDoor[index][1] + 3);
        }else if(KeyDoor[index][4] == "greenkey"){
          image(Gkeyy, gridsize * KeyDoor[index][0] + 1, gridsize * KeyDoor[index][1] + 3);
        }
        
        if(KeyDoor[index][2] == 2){
          rect(gridsize * KeyDoor[index][0], gridsize * KeyDoor[index][1], wall.Width, gridsize);
        }else{
          rect(gridsize * KeyDoor[index][0], gridsize * KeyDoor[index][1], gridsize, wall.Height);
        }
      }
      });
  }

  //KeyObject
  KeyObject.forEach((item, index, KeyObject) => {
    if(KeyObject[index][2] == true){
      if(KeyObject[index][3] == "yellowkey"){
        image(Ybigkeyy, gridsize * KeyObject[index][0] + 3, gridsize * KeyObject[index][1] + 2);
      }
      else if(KeyObject[index][3] == "greenkey"){
        image(Gbigkeyy, gridsize * KeyObject[index][0] + 3, gridsize * KeyObject[index][1] + 2);
     }
    }
  });
  
  
  //////////  //////////
  
  
  //WallSwitch
  if(lab.isbeauty == true){
    WallSwitch.forEach((item, index, WallSwitch) => {
    if(WallSwitch[index][2] == false){
      fill(255, 0, 0);
      noStroke();
      if(WallSwitch[index][3] == 1){
        image(closedoorH, gridsize * WallSwitch[index][0], gridsize * WallSwitch[index][1])
      }else{
        image(closedoorV, gridsize * WallSwitch[index][0], gridsize * WallSwitch[index][1])
      }
    }else{
      fill(0, 255, 0);
      noStroke();
      if(WallSwitch[index][3] == 1){
        image(opendoorH, gridsize * WallSwitch[index][0], gridsize * WallSwitch[index][1])          
      }else{
        image(opendoorV, gridsize * WallSwitch[index][0], gridsize * WallSwitch[index][1])
      }
    }
    });
  }else{
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
  
  
  //////////  //////////
  
  
  //joueur
  let sprite = {
    x:gridsize / 2 + j.x * gridsize + lab.enter * gridsize,
    y:gridsize / 2 + j.y * gridsize,
  }
    
  fill(0, 0, 0);
  noStroke();
  image(player, sprite.x - 15, sprite.y - 15, j.size)
  
}


function keyTyped(){

  j.option.right = true;
  j.option.left = true;
  j.option.up = true;
  j.option.down = true;
  
  let gridsize = width / lab.grid
  
  let sprite = {
    x:j.x * gridsize + gridsize / 2 + lab.enter * gridsize,
    y:j.y * gridsize + gridsize / 2,
  }

  //joueur
  if (key === 'o'){   
    WallList.forEach((item, index, WallList) => {
    if(WallList[index][0] * gridsize + gridsize / 2 <= sprite.x + 1 && sprite.x + 1 <= WallList[index][0] * gridsize + gridsize / 2 + wall.Width && WallList[index][1] * gridsize <= sprite.y - gridsize / 2 + 1 && sprite.y - gridsize / 2 + 1 <= WallList[index][1] * gridsize + wall.Width && WallList[index][2] == 1){
        j.option.up = false;
    }
    });
    
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

    
    if(j.y > 0){
      if(j.option.up == true){
        j.y -= 1;
      }   
    } 
  }
  else if (key === 'l'){
    WallList.forEach((item, index, WallList) => {
    if(WallList[index][0] * gridsize + gridsize / 2 <= sprite.x + 1 && sprite.x + 1 <= WallList[index][0] * gridsize + gridsize / 2 + wall.Width && WallList[index][1] * gridsize <= sprite.y + gridsize / 2 + 1 && sprite.y + gridsize / 2 + 1 <= WallList[index][1] * gridsize + wall.Width && WallList[index][2] == 1){
        j.option.down = false;
      }
    });
    
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


    if(j.y < lab.grid - 1){
      if(j.option.down == true){
        j.y += 1;
      }
    }else{
      if(j.x == 1){
        j.y = 0;
        j.x = 0;
      }
    }

    
  }
  else if (key === 'k'){
    WallList.forEach((item, index, WallList) => {
    if(WallList[index][0] * gridsize <= sprite.x - gridsize / 2 + 1 && sprite.x - gridsize / 2 + 1 <= WallList[index][0] * gridsize + wall.Width && WallList[index][1] * gridsize + gridsize / 2 <= sprite.y + 1 && sprite.y + 1 <= WallList[index][1] * gridsize + gridsize / 2 + wall.Width && WallList[index][2] == 2){
        j.option.left = false;
    }
    });
    
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
    
    
    if(j.x > -2){
      if(j.option.left == true){
        j.x -= 1;
      }
    }
    
    
  }
  else if (key === 'm'){
    WallList.forEach((item, index, WallList) => {
    if(WallList[index][0] * gridsize <= sprite.x + gridsize / 2 + 1 && sprite.x + gridsize / 2 + 1 <= WallList[index][0] * gridsize + wall.Width && WallList[index][1] * gridsize + gridsize / 2 <= sprite.y + 1 && sprite.y + 1 <= WallList[index][1] * gridsize + gridsize / 2 + wall.Width && WallList[index][2] == 2){
        j.option.right = false;
    }
    } );
    
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
    
    if(j.x < lab.grid - 3){
      if(j.option.right == true){
        j.x += 1;
      }
    }

  }  
  
  //teleport
  Teleport.forEach((item, index, Teleport) => {
    if(j.x == Teleport[index][0] - 2 && j.y == Teleport[index][1]){
      j.x = Teleport[index][2] - 2
      j.y = Teleport[index][3]
    }
    else if(j.x == Teleport[index][2] - 2 && j.y == Teleport[index][3]){
      j.x = Teleport[index][0] - 2
      j.y = Teleport[index][1]
    }
  });
  
  //switch
  Switch.forEach((item, index, Switch) => {
    if(j.x == Switch[index][0] - 2 && j.y == Switch[index][1]){
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
      if(j.x == KeyObject[index][0] - 2 && j.y == KeyObject[index][1]){
        append(Jiventory, KeyObject[index][3])
        KeyObject[index][2] = false;
        console.log(Jiventory);
      }
    }
  });

}

//656
//541