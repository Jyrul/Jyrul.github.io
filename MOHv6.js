let lab = {
  grid: {
    x: 0,
    y: 0,
  },
  enter: {
    x: 0,
    y: 0,
  },
  exit: {
    x: 0,
    y: 0,
    side: 0,
  },
  level: 6,
  is: {
    Switch: false,
    Teleport: false,
    Key: false,
    River: false,
    Forest: false,
    Electric: false,
    Convertizer: false,
    UniWall:false,
    Shop:false,
  },
  state: {
    game: true,
  },
  graph: {
    old: false,
    new: true,
  },
  preloadlevel: true,
};

let wall = {
  Width: 0,
  Height: 0,
};

let j = {
  x: 0,
  y: 0,
  option: {
    up: true,
    left: true,
    down: true,
    right: true,
  },
  size: 30,
  go: {
    river: false,
    forest: false,
  },
  moneynbr: 0,
  removeObject: {
    river: true,
    forest: true,
  },
};

let shop = {
  slot: {
    width: 150,
    height: 200,
  },
  nbritem: 3,
  object: {
    sizeX: 40,
    sizeY: 40,
  },
};

var Jiventory = [""];
var JiventoryKey = [""];
var JiventoryTools = [""];

let gridsize_x = 0;
let gridsize_y = 0;

//Grille de murs
let WallTab = [];

//Emplacement des Switch et WallSwitch
let Switch = [];
let WallSwitch = [];

//Emplacement et connextion des Téléporteur
let Teleport = [];

//Emplacement des Clef et portes à Clef
let KeyDoor = [];
let KeyObject = [];

//Grille de Rivière et emplacement des objets
let RiverTab = [];
let RiverObject = [];

//Grille de Forêt et emplacement des objets
let ForestTab = [];
let ForestObject = [];

//Emplacement des Convertisseurs
let Convertizer = [];

//Emplacement des portes Electrique et des ces interrupteurs
let ElectricDoor = [];
let ElectricInterupt = [];

//Emplacement du Shop, des objects et de l'argents
let Shop = [];
let ObjectShop = [];
let MoneyShop = [];

  //gestion
  function preload() {
    if(lab.graph.old == true){
      //Asset sous Photoshop
      background = loadImage("/Images/Fond.png");
      player = loadImage("/Images/Player.png");
    
      wallV = loadImage("/Images/WallV.png");
      wallH = loadImage("/Images/WallH.png");
    
      bigWallV = loadImage("/Images/BigWallV.png");
      bigWallH = loadImage("/Images/BigWallH.png");
    
      Ykeyy = loadImage("/Images/Key_yellow_pic.png");
      Ybigkeyy = loadImage("/Images/Key_yellow_pic_big.png");
      Rkeyy = loadImage("/Images/Key_red_pic.png");
      Rbigkeyy = loadImage("/Images/Key_red_pic_big.png");
      Gkeyy = loadImage("/Images/Key_green_pic.png");
      Gbigkeyy = loadImage("/Images/Key_green_pic_big.png");
      keydoorcloseV = loadImage("Images/Keydoorclose.png");
      keydooropenV = loadImage("Images/Keydooropen.png");
    
      closedoorH = loadImage("/Images/ClosedoorH.png");
      closedoorV = loadImage("/Images/ClosedoorV.png");
      opendoorH = loadImage("/Images/OpendoorH.png");
      opendoorV = loadImage("/Images/OpendoorV.png");
    }

    if(lab.graph.new == true){
      //Asset sous Illustrator (UI)
      UIasset = {
        key: {
          Ykeyy: loadImage("/Images/Yellowkey.png"),
          Rkeyy: loadImage("/Images/Redkey.png"),
          Gkeyy: loadImage("/Images/Greenkey.png"),
        },
        forest: {
          couteau: loadImage("/Images/Couteau.png"),
          baton: loadImage("/Images/Fbaton.png"),
          fer: loadImage("/Images/Ffer.png"),
        },
        river: {
          palmes: loadImage("/Images/Palmes.png"),
          baton: loadImage("/Images/Rbaton.png"),
          cuir: loadImage("/Images/Rcuir.png"),
        },
      };

      //Asset Clef Game
      Ykeyy = loadImage("/Images/Key_yellow_pic.png");
      Ybigkeyy = loadImage("/Images/Key_yellow_pic_big.png");
      Rkeyy = loadImage("/Images/Key_red_pic.png");
      Rbigkeyy = loadImage("/Images/Key_red_pic_big.png");
      Gkeyy = loadImage("/Images/Key_green_pic.png");
      Gbigkeyy = loadImage("/Images/Key_green_pic_big.png");
    }

  }
  function setup() {
    createCanvas(400, 400);
  }
  function draw() {
    fill(220);
    noStroke();
    rect(0, 0, width, height);
  
    if (lab.preloadlevel == true) {
      PreloadLevel();
    }
    
    if(lab.state.game == true){
      switch (lab.level) {
        case 6:
          Level6();
          break;
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
          break;
        case 1:
          Level1();
          break;
        case 0:
          Level0();
          break;
      } //Level

       //joueur
      let sprite = {
        x: gridsize_x / 2 + j.x * gridsize_x,
        y: gridsize_y / 2 + j.y * gridsize_y,
      };
  
      fill(0);
      circle(sprite.x, sprite.y, j.size);
    }
    else if(Shop[3] == true){
      switch (lab.level) {
        case 6:
          ShopLevel6();
          break;
      } //Level

      //Titre
      fill(0);
      textSize(70);
      textAlign(CENTER, CENTER);
      text("Shop", width / 2, height / 5);

      textSize(20);
      text("Level " + lab.level, width / 2, height / 8);

      //Bouton pour sortir du Shop
      fill(0);
      textSize(10);
      text("'P' pour sortir du Shop", width - 60, height - 20);
    }
  }
  

  //Loading Level
  function PreloadLevel() {
    switch (lab.level) {
      case 6:
        (lab.is.Switch = false),
        (lab.is.Teleport = true),
        (lab.is.Key = true),
        (lab.is.Forest = true),
        (lab.is.River = true),
        (lab.is.Electric = true),
        (lab.is.Convertizer = false),
        (lab.is.Shop = true),
          
        resizeCanvas(600, 600);
  
        //Position du joueur
        j.x = 11;
        j.y = 0;
  
        //Réinitialiser les autorisations du joueur
        j.go.river = false;
        j.go.forest = false;
        
        //Position de la sortie
        lab.exit.x = 0;
        lab.exit.y = 9;
        lab.exit.side = 2;
  
        //Taille de la grille
        lab.grid.x = 15;
        lab.grid.y = 15;
  
        //Taille d'une case
        gridsize_x = width / lab.grid.x;
        gridsize_y = height / lab.grid.y;
  
        //Proportion des murs
        wall.Width = 1.5;
        wall.Height = 1.5;
  
        //Référencement des légendes
        WallTab = levels.level6.WallTab;
        Teleport = levels.level6.Teleport;
        KeyDoor = levels.level6.KeyDoor;
        KeyObject = levels.level6.KeyObject;
        RiverTab = levels.level6.RiverTab;
        RiverObject = levels.level6.RiverObject;
        ForestTab = levels.level6.ForestTab;
        ForestObject = levels.level6.ForestObject;
        ElectricDoor = levels.level6.ElectricDoor;
        ElectricInterupt = levels.level6.ElectricInterupt;
        Jiventory = levels.level6.Jiventory;
        Shop = levels.level6.Shop;
        ObjectShop = levels.level6.ObjectShop;
        MoneyShop = levels.level6.MoneyShop;
  
        break;
      case 5:
        (lab.is.Switch = true),
        (lab.is.Teleport = true),
        (lab.is.Key = true),
        (lab.is.Forest = true),
        (lab.is.River = true),
        (lab.is.Convertizer = true),
        (lab.is.Electric = true),
          
        resizeCanvas(400, 600);
  
        //Position du joueur
        j.x = 4;
        j.y = 14;
  
        //Réinitialiser les autorisations du joueur
        j.go.river = false;
        
        //Position de la sortie
        lab.exit.x = 5;
        lab.exit.y = 0;
        lab.exit.side = 1;
  
        //Taille de la grille
        lab.grid.x = 10;
        lab.grid.y = 15;
  
        //Taille d'une case
        gridsize_x = width / lab.grid.x;
        gridsize_y = height / lab.grid.y;
  
        //Proportion des murs
        wall.Width = 1.5;
        wall.Height = 1.5;
  
        //Référencement des légendes
        WallTab = levels.level5.WallTab;
        Teleport = levels.level5.Teleport;
        Switch = levels.level5.Switch;
        WallSwitch = levels.level5.WallSwitch;
        KeyDoor = levels.level5.KeyDoor;
        KeyObject = levels.level5.KeyObject;
        RiverTab = levels.level5.RiverTab;
        RiverObject = levels.level5.RiverObject;
        ForestTab = levels.level5.ForestTab;
        ForestObject = levels.level5.ForestObject;
        Convertizer = levels.level5.Convertizer;
        ElectricDoor = levels.level5.ElectricDoor;
        ElectricInterupt = levels.level5.ElectricInterupt;
        Jiventory = levels.level5.Jiventory;
        JiventoryKey = levels.level6.JiventoryKey;
        JiventoryTools = levels.level6.JiventoryTools;
  
        break;
      case 4:
        (lab.is.Switch = true),
        (lab.is.Teleport = true),
        (lab.is.Key = true),
        (lab.is.River = true),
        (lab.is.Convertizer = true),
        (lab.is.Electric = true),
        
        //Position du joueur
        j.x = 8;
        j.y = 0;
  
        //Position de la sortie
        lab.exit.x = 1;
        lab.exit.y = 9;
        lab.exit.side = 3;
  
        //Taille de la grille
        lab.grid.x = 10;
        lab.grid.y = 10;
  
        resizeCanvas(400, 400);
  
        //Taille d'une case
        gridsize_x = width / lab.grid.x;
        gridsize_y = height / lab.grid.y;
  
        //Proportion des murs
        wall.Width = 1.5;
        wall.Height = 1.5;
  
        //Référencement des légendes
        WallTab = levels.level4.WallTab;
        Teleport = levels.level4.Teleport;
        Switch = levels.level4.Switch;
        WallSwitch = levels.level4.WallSwitch;
        KeyDoor = levels.level4.KeyDoor;
        KeyObject = levels.level4.KeyObject;
        RiverTab = levels.level4.RiverTab;
        RiverObject = levels.level4.RiverObject;
        Convertizer = levels.level4.Convertizer;
        ElectricDoor = levels.level4.ElectricDoor;
        ElectricInterupt = levels.level4.ElectricInterupt;
        Jiventory = levels.level4.Jiventory;
        JiventoryKey = levels.level6.JiventoryKey;
        JiventoryTools = levels.level6.JiventoryTools;
  
        break;
      case 3:
        (lab.is.Switch = true),
        (lab.is.Teleport = true),
        (lab.is.Key = true),
        
        //Position du joueur
        j.x = 2;
        j.y = 0;
  
        //Position de la sortie
        lab.exit.x = 7;
        lab.exit.y = 9;
        lab.exit.side = 3;
  
        //Taille de la grille
        lab.grid.x = 10;
        lab.grid.y = 10;
  
        //Taille d'une case
        gridsize_x = width / lab.grid.x;
        gridsize_y = height / lab.grid.y;
  
        //Proportion des murs
        wall = {
          Width: 1.5,
          Height: 1.5,
        };
  
        //Référencement des légendes
        WallTab = levels.level3.WallTab;
        Teleport = levels.level3.Teleport;
        Switch = levels.level3.Switch;
        WallSwitch = levels.level3.WallSwitch;
        KeyDoor = levels.level3.KeyDoor;
        KeyObject = levels.level3.KeyObject;
        Jiventory = levels.level3.Jiventory;
        JiventoryKey = levels.level6.JiventoryKey;
  
        break;
      case 2:
        (lab.is.Switch = true),
        (lab.is.Teleport = true),
        
        //Position du joueur
        j.x = 3;
        j.y = 0;
  
        //Position de la sortie
        lab.exit.x = 5;
        lab.exit.y = 6;
        lab.exit.side = 3;
  
        //Taille de la grille
        lab.grid.x = 7;
        lab.grid.y = 7;
  
        //Taille d'une case
        gridsize_x = width / lab.grid.x;
        gridsize_y = height / lab.grid.y;
  
        //Proportion des murs
        wall.Width = 2;
        wall.Height = 2;
  
        //Référencement des légendes
        WallTab = levels.level2.WallTab;
        Teleport = levels.level2.Teleport;
        Switch = levels.level2.Switch;
        WallSwitch = levels.level2.WallSwitch;
  
        break;
      case 1:
        (lab.is.Switch = true), 
        (lab.exit.x = 2),
        
        //Position du joueur
        j.x = 2;
        j.y = 4;
  
        //Position de la sortie
        lab.exit.y = 0;
        lab.exit.side = 1;
  
        //Taille de la grille
        lab.grid.x = 5;
        lab.grid.y = 5;
  
        //Taille d'une case
        gridsize_x = width / lab.grid.x;
        gridsize_y = height / lab.grid.y;
  
        //Proportion des murs
        wall.Width = 3;
        wall.Height = 3;
  
        //Référencement des légendes
        WallTab = levels.level1.WallTab;
        Switch = levels.level1.Switch;
        WallSwitch = levels.level1.WallSwitch;
  
        break;
      case 0:
        //Position du joueur
        j.x = 2;
        j.y = 0;
  
        //Position de la sortie
        lab.exit.x = 2;
        lab.exit.y = 0;
        lab.exit.side = 3;
  
        //Taille de la grille
        lab.grid.x = 5;
        lab.grid.y = 5;
  
        //Taille d'une case
        gridsize_x = width / lab.grid.x;
        gridsize_y = height / lab.grid.y;
  
        //Proportion des murs
        wall.Width = 3;
        wall.Height = 3;
  
        //Référencement des légendes
        WallTab = levels.level0.WallTab;
  
        break;
    }
    lab.preloadlevel = false;
  }
  

  //Affichage des Legendes
  function Leg_Zone() {
    if (lab.is.River == true) {
      fill(100, 180, 255);
      //case river
      for (let rowId = 0; rowId < WallTab[0].length; rowId++) {
        for (let colId = 0; colId < WallTab.length; colId++) {
          let map = RiverTab[colId][rowId];
          switch (map) {
            case "R":
              rect(
                rowId * gridsize_x,
                colId * gridsize_y,
                gridsize_x,
                gridsize_y
              ); //mur haut
              break;
          }
        }
      }
    }
  
    if (lab.is.Forest == true) {
      fill(50, 220, 110);
      //case forest
      for (let rowId = 0; rowId < WallTab[0].length; rowId++) {
        for (let colId = 0; colId < WallTab.length; colId++) {
          let map = ForestTab[colId][rowId];
          switch (map) {
            case "F":
              rect(
                rowId * gridsize_x,
                colId * gridsize_y,
                gridsize_x,
                gridsize_y
              ); //mur haut
              break;
          }
        }
      }
    }
  }
  function Leg_ObjectZone() {
    fill(60, 130, 255);
    //river object
    if(lab.is.River == true){
      RiverObject.forEach((item, index, RiverObject) => {
        if (RiverObject[index][3] == true) {
          if (
            RiverObject[index][2] == "R - baton" ||
            RiverObject[index][2] == "R - baaton"
          ) {
            stroke(50);
            line(
              RiverObject[index][0] * gridsize_x + gridsize_x / 4,
              RiverObject[index][1] * gridsize_y + (3 * gridsize_y) / 4,
              RiverObject[index][0] * gridsize_x + (3 * gridsize_x) / 4,
              RiverObject[index][1] * gridsize_y + gridsize_y / 4
            );
            noStroke();
          } else {
            rect(
              RiverObject[index][0] * gridsize_x + gridsize_x / 4,
              RiverObject[index][1] * gridsize_y + gridsize_y / 4,
              gridsize_y / 2
            );
          }
        }
      });
    }
  
    fill(50, 220, 110);
    //forest object
    if(lab.is.Forest == true){
      ForestObject.forEach((item, index, ForestObject) => {
        if (ForestObject[index][3] == true) {
          if (ForestObject[index][2] == "F - baton") {
            stroke(50);
            line(
              ForestObject[index][0] * gridsize_x + gridsize_x / 4,
              ForestObject[index][1] * gridsize_y + (3 * gridsize_y) / 4,
              ForestObject[index][0] * gridsize_x + (3 * gridsize_x) / 4,
              ForestObject[index][1] * gridsize_y + gridsize_y / 4
            );
            noStroke();
          } else {
            rect(
              ForestObject[index][0] * gridsize_x + gridsize_x / 4,
              ForestObject[index][1] * gridsize_y + gridsize_y / 4,
              gridsize_y / 2
            );
          }
        }
      });
    }
  }
  function Leg_Convertizer() {
    if(lab.is.Convertizer == true){
      fill(50);
      //convertizer
      Convertizer.forEach((item, index, Convertizer) => {
        rect(
          Convertizer[index][0] * gridsize_x,
          Convertizer[index][1] * gridsize_y,
          gridsize_x,
          gridsize_y
        );
      });
    }
  }
  function Leg_Switch() {
    fill(255, 150, 0);
    Switch.forEach((item, index, Switch) => {
      rect(
        gridsize_x * Switch[index][0],
        gridsize_y * Switch[index][1],
        gridsize_x,
        gridsize_y
      );
    });
  }
  function Leg_Teleport() {
    fill(200, 0, 200);
    Teleport.forEach((item, index, Teleport) => {
      rect(
        gridsize_x * Teleport[index][0],
        gridsize_y * Teleport[index][1],
        gridsize_x,
        gridsize_y
      );
      rect(
        gridsize_x * Teleport[index][2],
        gridsize_y * Teleport[index][3],
        gridsize_x,
        gridsize_y
      );
    });
  }
  function Leg_ElectricInterupt() {
    ElectricInterupt.forEach((item, index, ElectricInterupt) => {
      if(ElectricInterupt[index][2] == false){
        fill(100);
      }else{
        fill(255);
      }
      rect(
        ElectricInterupt[index][0] * gridsize_x,
        ElectricInterupt[index][1] * gridsize_y,
        gridsize_x,
        gridsize_y
      );
    });
  }
  function Leg_Wall() {
    fill(0, 0, 255);
    //mur intérieur
    for (let rowId = 0; rowId < WallTab[0].length; rowId++) {
      for (let colId = 0; colId < WallTab.length; colId++) {
        let map = WallTab[colId][rowId];
        switch (map) {
          case "01":
            rect(rowId * gridsize_x, colId * gridsize_y, gridsize_x, wall.Height); //mur haut
            break;
          case "02":
            rect(rowId * gridsize_x, colId * gridsize_y, wall.Width, gridsize_y); //mur gauche
            break;
          case "03":
            rect(
              rowId * gridsize_x,
              colId * gridsize_y + gridsize_y,
              gridsize_x,
              -wall.Height
            ); //mur bas
            break;
          case "04":
            rect(
              rowId * gridsize_x + gridsize_x,
              colId * gridsize_y,
              -wall.Width,
              gridsize_y
            ); //mur droigt
            break;
  
          case "05":
            rect(rowId * gridsize_x, colId * gridsize_y, gridsize_x, wall.Height); //mur haut
            rect(
              rowId * gridsize_x,
              colId * gridsize_y + gridsize_y,
              gridsize_x,
              -wall.Height
            ); //mur bas
            break;
          case "06":
            rect(
              rowId * gridsize_x + gridsize_x,
              colId * gridsize_y,
              -wall.Width,
              gridsize_y
            ); //mur droigt
            rect(rowId * gridsize_x, colId * gridsize_y, wall.Width, gridsize_y); //mur gauche
            break;
          case "07":
            rect(rowId * gridsize_x, colId * gridsize_y, gridsize_x, wall.Height); //mur haut
            rect(rowId * gridsize_x, colId * gridsize_y, wall.Width, gridsize_y); //mur gauche
            break;
          case "08":
            rect(
              rowId * gridsize_x,
              colId * gridsize_y + gridsize_y,
              gridsize_x,
              -wall.Height
            ); //mur bas
            rect(
              rowId * gridsize_x + gridsize_x,
              colId * gridsize_y,
              -wall.Width,
              gridsize_y
            ); //mur droigt
            break;
          case "09":
            rect(
              rowId * gridsize_x,
              colId * gridsize_y + gridsize_y,
              gridsize_x,
              -wall.Height
            ); //mur bas
            rect(rowId * gridsize_x, colId * gridsize_y, wall.Width, gridsize_y); //mur gauche
            break;
          case "10":
            rect(rowId * gridsize_x, colId * gridsize_y, gridsize_x, wall.Height); //mur haut
            rect(
              rowId * gridsize_x + gridsize_x,
              colId * gridsize_y,
              -wall.Width,
              gridsize_y
            ); //mur droigt
            break;
  
          case "11":
            rect(
              rowId * gridsize_x,
              colId * gridsize_y + gridsize_y,
              gridsize_x,
              -wall.Height
            ); //mur bas
            rect(rowId * gridsize_x, colId * gridsize_y, wall.Width, gridsize_y); //mur gauche
            rect(
              rowId * gridsize_x + gridsize_x,
              colId * gridsize_y,
              -wall.Width,
              gridsize_y
            ); //mur droigt
            break;
          case "12":
            rect(rowId * gridsize_x, colId * gridsize_y, gridsize_x, wall.Height); //mur haut
            rect(
              rowId * gridsize_x,
              colId * gridsize_y + gridsize_y,
              gridsize_x,
              -wall.Height
            ); //mur bas
            rect(
              rowId * gridsize_x + gridsize_x,
              colId * gridsize_y,
              -wall.Width,
              gridsize_y
            ); //mur droigt
            break;
          case "13":
            rect(rowId * gridsize_x, colId * gridsize_y, gridsize_x, wall.Height); //mur haut
            rect(rowId * gridsize_x, colId * gridsize_y, wall.Width, gridsize_y); //mur gauche
            rect(
              rowId * gridsize_x + gridsize_x,
              colId * gridsize_y,
              -wall.Width,
              gridsize_y
            ); //mur droigt
            break;
          case "14":
            rect(
              rowId * gridsize_x,
              colId * gridsize_y + gridsize_y,
              gridsize_x,
              -wall.Height
            ); //mur bas
            rect(rowId * gridsize_x, colId * gridsize_y, gridsize_x, wall.Height); //mur haut
            rect(rowId * gridsize_x, colId * gridsize_y, wall.Width, gridsize_y); //mur gauche
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
    if (lab.exit.side == 1) {
      rect(lab.exit.x * gridsize_x, 0, gridsize_x, wall.Height * 2);
    } else if (lab.exit.side == 2) {
      rect(0, lab.exit.y * gridsize_y, wall.Height * 2, gridsize_y);
    } else if (lab.exit.side == 3) {
      rect(lab.exit.x * gridsize_x, height, gridsize_x, -wall.Height * 2);
    } else if (lab.exit.side == 4) {
      rect(width, lab.exit.y * gridsize_y, -wall.Height * 2, gridsize_y);
    }
  }
  function Leg_ElectricDoor() {
    fill(0);
    ElectricDoor.forEach((item, index, ElectricDoor) => {
      if (ElectricDoor[index][3] == 1 && ElectricDoor[index][2] == true) {
        rect(
          gridsize_x * ElectricDoor[index][0],
          gridsize_y * ElectricDoor[index][1],
          gridsize_x,
          -wall.Height
        );
      } else if (ElectricDoor[index][2] == true) {
        rect(
          gridsize_x * ElectricDoor[index][0],
          gridsize_y * ElectricDoor[index][1],
          -wall.Height,
          gridsize_y
        );
      }
    });
  }
  function Leg_WallSwitch() {
    //WallSwitch
    WallSwitch.forEach((item, index, WallSwitch) => {
      if (WallSwitch[index][2] == false) {
        fill(255, 0, 0);
        noStroke();
        if (WallSwitch[index][3] == 1) {
          rect(
            gridsize_x * WallSwitch[index][0],
            gridsize_y * WallSwitch[index][1],
            gridsize_x,
            wall.Height
          );
        } else {
          rect(
            gridsize_x * WallSwitch[index][0],
            gridsize_y * WallSwitch[index][1],
            wall.Height,
            gridsize_y
          );
        }
      } else {
        fill(0, 255, 0);
        noStroke();
        if (WallSwitch[index][3] == 1) {
          rect(
            gridsize_x * WallSwitch[index][0],
            gridsize_y * WallSwitch[index][1],
            gridsize_x,
            wall.Height
          );
        } else {
          rect(
            gridsize_x * WallSwitch[index][0],
            gridsize_y * WallSwitch[index][1],
            wall.Height,
            gridsize_y
          );
        }
      }
    });
  }
  function Leg_Key() {
    fill(0);
  
    //KeyDoor
    KeyDoor.forEach((item, index, KeyDoor) => {
      if (KeyDoor[index][3] == true) {
        if (KeyDoor[index][4] == ".YellowKey") {
          image(
            Ykeyy,
            gridsize_x * KeyDoor[index][0] + 1,
            gridsize_y * KeyDoor[index][1] + 3
          );
        } else if (KeyDoor[index][4] == ".GreenKey") {
          image(
            Gkeyy,
            gridsize_x * KeyDoor[index][0] + 1,
            gridsize_y * KeyDoor[index][1] + 3
          );
        } else if (KeyDoor[index][4] == ".RedKey") {
          image(
            Rkeyy,
            gridsize_x * KeyDoor[index][0] + 1,
            gridsize_y * KeyDoor[index][1] + 3
          );
        }
  
        if (KeyDoor[index][2] == 2) {
          rect(
            gridsize_x * KeyDoor[index][0],
            gridsize_y * KeyDoor[index][1],
            wall.Width,
            gridsize_y
          );
        } else {
          rect(
            gridsize_x * KeyDoor[index][0],
            gridsize_y * KeyDoor[index][1],
            gridsize_x,
            wall.Height
          );
        }
      }
    });
  
    //KeyObject
    KeyObject.forEach((item, index, KeyObject) => {
      if (KeyObject[index][2] == true) {
        if (KeyObject[index][3] == ".YellowKey") {
          image(
            Ybigkeyy,
            gridsize_x * KeyObject[index][0] + 3,
            gridsize_y * KeyObject[index][1] + 2
          );
        } else if (KeyObject[index][3] == ".GreenKey") {
          image(
            Gbigkeyy,
            gridsize_x * KeyObject[index][0] + 3,
            gridsize_y * KeyObject[index][1] + 2
          );
        } else if (KeyObject[index][3] == ".RedKey") {
          image(
            Rbigkeyy,
            gridsize_x * KeyObject[index][0] + 3,
            gridsize_y * KeyObject[index][1] + 2
          );
        }
      }
    });
  }
  function Leg_Shop(){
    fill(150, 90, 50);
    
    //Si 1 -> Horizontale ; Sinon -> Verticale
    if(Shop[2] == 1){
      rect(
        Shop[0] * gridsize_x,
        Shop[1] * gridsize_y,
        gridsize_x * 3,
        gridsize_y * 2
      );
    }else{
      rect(
        Shop[0] * gridsize_x,
        Shop[1] * gridsize_y,
        gridsize_x * 2,
        gridsize_y * 3
      );
    }
    
  } 
  function Leg_MoneyShop(){
    //Affichage des pièces
    fill(200, 200, 0);
    MoneyShop.forEach((item, index, MoneyShop) => {
      if(MoneyShop[index][3]){
        circle(
          MoneyShop[index][0] * gridsize_x + gridsize_x / 2,
          MoneyShop[index][1] * gridsize_y + gridsize_y / 2,
          2 * gridsize_x / 3
        );
      }
    });
  }

  //Affichage du Shop
  function ShopLevel6(){
    //Initialisation de l'emplacement des slot
    let distance = {
      slot:{
        x: 50,
        y: height / 3
      },
    };

    //Initialisation de l'emplacement des informations
    distance = {
      slot:{
        x: 50,
        y: height / 3
      },
      object: distance.slot.x + shop.slot.width / 2, //donnée en x
      price: shop.slot.height + distance.slot.y, //donnée en y
      description: 20 + distance.slot.y + shop.slot.height / 2,
    };


    //Affichage object 1
    if(ObjectShop[3] == true){
        //slot
      fill(190);
      rect(
        distance.slot.x,
        distance.slot.y,
        shop.slot.width,
        shop.slot.height
      );

        //object
      fill(0);
      image(
        UIasset.river.palmes,
        distance.object - shop.object.sizeX / 2,
        distance.slot.y + shop.object.sizeY / 2
      );
      /*
      rect(
        distance.object - shop.object.sizeX / 2,
        distance.slot.y + shop.object.sizeY / 2,
        shop.object.sizeX,
        shop.object.sizeY
      );
      */

        //titre
      textAlign(CENTER, CENTER);
      textSize(30);
      text('Palmes', distance.object, height / 2); 

        //description
      textAlign(CENTER, TOP);
      textSize(10);
      text('Si vous croisez des requin,\nappel moi', distance.object, distance.description);

        //prix
      textAlign(CENTER, BOTTOM);
      textSize(40);
      text(ObjectShop[0], distance.object, distance.price);
    }
    
    //Affichage object 2
    if(ObjectShop[4] == true){
        //slot
      fill(190);
      rect(
        width / 2 - shop.slot.width / 2,
        height / 3,
        shop.slot.width,
        shop.slot.height
      );

        //object
      fill(0);
      image(
        UIasset.forest.couteau,
        width / 2 - shop.object.sizeX / 2,
        distance.slot.y + shop.object.sizeY / 2
      );
      /*
      rect(
        width / 2 - shop.object.sizeX / 2,
        distance.slot.y + shop.object.sizeY / 2,
        shop.object.sizeX,
        shop.object.sizeY
      );
      */

        //titre
      textAlign(CENTER, CENTER);
      textSize(30);
      text('Couteau', width - width / 2, height / 2);

        //description
      textAlign(CENTER, TOP);
      textSize(10);
      text('Pratique pour du saussisson,\nou pas', width - width / 2, distance.description);

        //prix
      textAlign(CENTER, BOTTOM);
      textSize(40);
      text(ObjectShop[1], width - width / 2, distance.price);
  
    }

    //Affichage object 3
    if(ObjectShop[5] == true){
        //slot
      fill(190);
      rect(
        width - distance.slot.x - shop.slot.width,
        distance.slot.y,
        shop.slot.width,
        shop.slot.height
      );

        //object
      fill(0);
      image(
        UIasset.key.Rkeyy,
        width - distance.object - shop.object.sizeX / 2, 
        distance.slot.y + shop.object.sizeY / 2
      );
      /*
      rect(
        width - distance.object - shop.object.sizeX / 2, 
        distance.slot.y + shop.object.sizeY / 2,
        shop.object.sizeX,
        shop.object.sizeY
      );
      */

        //titre
      textAlign(CENTER, CENTER);
      textSize(30);
      text('Redkey', width - distance.object, height / 2);

        //description
      textAlign(CENTER, TOP);
      textSize(10);
      text('Ça dois surement sevir a\nquelque chose', width - distance.object, distance.description);
    
        //prix
      textAlign(CENTER, BOTTOM);
      textSize(40);
      text(ObjectShop[2], width - distance.object, distance.price);
    }

    Interface();
  }

  //Affichage de l'interface
  function Interface(){
    //Initialisation de distance
    let UIdist = {
      space: {
        onLeft: 35,
        onTop: 25,
        betweenUI: 10,
      },
      money: {
        height: 25,
        ON: false,
      },
      object: {
        x: 0,
        y: 0,
        marge: 7,
        size: 40,
      },
    };
    
    //Replacer l'UI selon la position du joueur
    if(j.x <= lab.grid.x / 4){
      UIdist.space.onLeft = width - UIdist.space.onLeft - UIdist.object.size;
    }

    //Argent
    if(j.moneynbr > 0){
      textStyle(BOLD);
      textAlign(LEFT, TOP);
      textSize(20);

      //Resize le rectancle en fonction du nombre de caractère
      if(j.moneynbr >= 100){
        fill(0, 70);
        rect(UIdist.space.onLeft, UIdist.space.onTop, 56, UIdist.money.height);
        fill(255);
        text(j.moneynbr + "o", UIdist.space.onLeft + UIdist.object.marge, UIdist.space.onTop + UIdist.object.marge);
      }else if(j.moneynbr >= 10){
        fill(0, 70);
        rect(UIdist.space.onLeft, UIdist.space.onTop, 45 + UIdist.object.marge, UIdist.money.height + UIdist.object.marge);
        fill(255);
        text(j.moneynbr + "o", UIdist.space.onLeft + UIdist.object.marge, UIdist.space.onTop + UIdist.object.marge);
      }else if(j.moneynbr > 0){
        fill(0, 70);
        rect(UIdist.space.onLeft, UIdist.space.onTop, 34, UIdist.money.height);
        fill(255);
        text(j.moneynbr + "o", UIdist.space.onLeft + UIdist.object.marge, UIdist.space.onTop + UIdist.object.marge);
      }

      //L'argent est bien afficher
      if(UIdist.money.ON == false){
        UIdist.money.ON = true;
      }
    }

    //Objet
    if(Jiventory.length - 1 >= 1){
      //Initialiser les position pour le cas des objets
      UIdist.object.x = UIdist.space.onLeft;
      UIdist.object.y = UIdist.space.onTop;
      
      //Replacer la barre d'inventaire si l'argent est afficher
      if(UIdist.money.ON == true){
        UIdist.object.y += UIdist.money.height + UIdist.space.betweenUI;
      }

      //Calcule de distance
        //x
      const objectSlotSizeX = 2 * UIdist.object.marge + UIdist.object.size;
        //y
      let objectSlotSizeY = UIdist.object.marge + UIdist.object.size;
      const trueJiventoryLength = Jiventory.length - 1;
      objectSlotSizeY = objectSlotSizeY * trueJiventoryLength + UIdist.object.marge;

      //Affichage des slot
      fill(0, 70);
      rect(
        UIdist.object.x,
        UIdist.object.y,
        objectSlotSizeX,
        objectSlotSizeY
      );
      
      //Afficher les objets dans les slot
      Jiventory.forEach((item, index, Jiventory) => {
        if(item == ".Palmes"){
          fill(0, 0, 200);
          image(
            UIasset.river.palmes,
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge
          );
          /*
          rect(
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge,
            UIdist.object.size,
            UIdist.object.size
          );
          */
        }else if(item == "R - baaton"){
          fill(0, 0, 150);
          image(
            UIasset.river.baton,
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge
          );
          /*
          rect(
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge,
            UIdist.object.size,
            UIdist.object.size
          );
          */
        }else if(item == "R - baton"){
          fill(0, 0, 150);
          image(
            UIasset.river.baton,
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge
          );
          /*
          rect(
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge,
            UIdist.object.size,
            UIdist.object.size);
          */
        }else if(item == "R - cuir"){
          fill(0, 0, 150);
          image(
            UIasset.river.cuir,
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge
          );
          /*
          rect(
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge,
            UIdist.object.size,
            UIdist.object.size);
          */
        }else if(item == ".Couteau"){
          fill(0, 200, 0);
          image(
            UIasset.forest.couteau,
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge
          );
          /*
          rect(
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge,
            UIdist.object.size,
            UIdist.object.size);
          */
        }else if(item == "F - fer"){
          fill(0, 150, 0);
          image(
            UIasset.forest.fer,
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge
          );
          /*
          rect(
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge,
            UIdist.object.size,
            UIdist.object.size);
          */
        }else if(item == "F - baton"){
          fill(0, 150, 0);
          image(
            UIasset.forest.baton,
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge
          );
          /*
          rect(
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge,
            UIdist.object.size,
            UIdist.object.size);
          */
        }else if(item == ".RedKey"){
          fill(120, 0, 0);
          image(
            UIasset.key.Rkeyy,
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge
          );
          /*
          rect(
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge,
            UIdist.object.size,
            UIdist.object.size);
          */
        }else if(item == ".GreenKey"){
          fill(0, 120, 0);
          image(
            UIasset.key.Gkeyy,
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge
          );
          /*
          rect(
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge,
            UIdist.object.size,
            UIdist.object.size);
          */
        }else if(item == ".YellowKey"){
          fill(120, 120, 0);
          image(
            UIasset.key.Ykeyy,
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge
          );
          /*
          rect(
            UIdist.object.x + UIdist.object.marge,
            UIdist.object.y + UIdist.object.marge,
            UIdist.object.size,
            UIdist.object.size);
          */
        }

        if(index >= 1){
          UIdist.object.y += UIdist.object.size + UIdist.object.marge;
        }
      });
    }
  }

  //Level
  function Level6(){
    //Zone
    Leg_Zone();

    //Cases
    Leg_Teleport();
    Leg_ElectricInterupt();
    Leg_Convertizer();
    Leg_Shop();

    //M du magasin
    fill(0);
    textSize(40);
    textAlign(CENTER, CENTER);
    text('M', Shop[0] * gridsize_x + gridsize_x, Shop[1] * gridsize_y  + gridsize_y * 1.5);

    //Ligne electrique
    stroke(20);
    line(
      3 * gridsize_x,
      10 * gridsize_y + gridsize_y / 2 - wall.Height / 2,
      12 * gridsize_x + gridsize_x / 2,
      10 * gridsize_y + gridsize_y / 2 - wall.Height / 2
    );
    line(
      5 * gridsize_x + gridsize_x / 2,
      7 * gridsize_y + gridsize_y / 2,
      5 * gridsize_x + gridsize_x / 2,
      14 * gridsize_y
    );
    line(
      6 * gridsize_x + gridsize_x / 2 - wall.Width / 2,
      10 * gridsize_y + gridsize_y / 2,
      6 * gridsize_x + gridsize_x / 2 - wall.Width / 2,
      8 * gridsize_y - wall.Width / 2
    );
    line(
      1 * gridsize_x,
      0 * gridsize_y + gridsize_y / 2 - wall.Height / 2,
      8 * gridsize_x + gridsize_x / 2,
      0 * gridsize_y + gridsize_y / 2 - wall.Height / 2
    );
    line(
      8 * gridsize_x + gridsize_x / 2,
      0 * gridsize_y + gridsize_y / 2,
      8 * gridsize_x + gridsize_x / 2,
      10 * gridsize_y + gridsize_y / 2
    );
    line(
      12 * gridsize_x + gridsize_x / 2,
      6 * gridsize_y,
      12 * gridsize_x + gridsize_x / 2,
      10 *gridsize_y + gridsize_y / 2
    );
    line(
      2 * gridsize_x,
      7 * gridsize_y + gridsize_y / 2,
      5 * gridsize_x + gridsize_x / 2,
      7 *gridsize_y + gridsize_y / 2
    );

    //Mur à sens unique
    noFill();
    triangle(
      11 * gridsize_x + gridsize_x / 4,
      2 * gridsize_y + gridsize_y / 2,
      
      11 * gridsize_x + gridsize_x / 2,
      3 * gridsize_y - gridsize_y / 4,
      
      12 * gridsize_x - gridsize_x / 4,
      2 * gridsize_y + gridsize_y / 2
    );
    triangle(
      14 * gridsize_x + gridsize_x / 4,
      8 * gridsize_y + gridsize_y / 2,
      
      14 * gridsize_x + gridsize_x / 2,
      9 * gridsize_y - gridsize_y / 4,
      
      15 * gridsize_x - gridsize_x / 4,
      8 * gridsize_y + gridsize_y / 2
    );
    triangle(
      12 * gridsize_x + gridsize_x / 4 - 5,
      6 * gridsize_y + gridsize_y / 2,
      
      12 * gridsize_x + gridsize_x / 2 - 5,
      7 * gridsize_y - gridsize_y / 4,
      
      12 * gridsize_x + gridsize_x / 2 - 5,
      6 * gridsize_y + gridsize_y / 4
    );
    triangle(
      9 * gridsize_x + gridsize_x / 4,
      2 * gridsize_y + gridsize_y / 2,
      
      9 * gridsize_x + gridsize_x / 2,
      3 * gridsize_y - gridsize_y / 4,
      
      9 * gridsize_x + gridsize_x / 2,
      2 * gridsize_y + gridsize_y / 4
    );
    triangle(
      4 * gridsize_x + gridsize_x / 4,
      6 * gridsize_y + gridsize_y / 2,
      
      4 * gridsize_x + gridsize_x / 2,
      7 * gridsize_y - gridsize_y / 4,
      
      4 * gridsize_x + gridsize_x / 2,
      6 * gridsize_y + gridsize_y / 4
    );
    triangle(
      4 * gridsize_x + gridsize_x / 4,
      12 * gridsize_y + gridsize_y / 2,
      
      4 * gridsize_x + gridsize_x / 2,
      12 * gridsize_y + gridsize_y / 4,
      
      5 * gridsize_x - gridsize_x / 4,
      12 * gridsize_y + gridsize_y / 2
    );
    triangle(
      9 * gridsize_x + gridsize_x / 4,
      7 * gridsize_y + gridsize_y / 2,
      
      9 * gridsize_x + gridsize_x / 2,
      7 * gridsize_y + gridsize_y / 4,
      
      10 * gridsize_x - gridsize_x / 4,
      7 * gridsize_y + gridsize_y / 2
    );
    noStroke();

    //Traits
    Leg_Wall();
    Leg_ElectricDoor();
    
    //Objets
    Leg_ObjectZone();
    Leg_MoneyShop();
    Leg_Key();

    //UI
    Interface();
  }
  function Level5() {
    //Zone
    Leg_Zone();

    //Cases
    Leg_Switch();
    Leg_Teleport();
    Leg_ElectricInterupt();
    Leg_Convertizer();
  
    //Ligne electrique
    stroke(20);
    line(
      4 * gridsize_x,
      11 * gridsize_y + gridsize_y / 2 - wall.Height / 2,
      7 * gridsize_x + gridsize_x / 2,
      11 * gridsize_y + gridsize_y / 2 - wall.Height / 2
    );
    line(
      6 * gridsize_x + gridsize_x / 2 - wall.Width / 2,
      10 * gridsize_y,
      6 * gridsize_x + gridsize_x / 2 - wall.Width / 2,
      11 * gridsize_y + gridsize_y / 2 - wall.Width / 2
    );
    line(
      7 * gridsize_x + gridsize_x / 2 - wall.Width / 2,
      11 * gridsize_y + gridsize_y / 2,
      7 * gridsize_x + gridsize_x / 2 - wall.Width / 2,
      13 * gridsize_y - wall.Width / 2
    );
  
    line(
      6 * gridsize_x,
      0 * gridsize_y + gridsize_y / 2 - wall.Height / 2,
      8 * gridsize_x + gridsize_x / 2,
      0 * gridsize_y + gridsize_y / 2 - wall.Height / 2
    );
    line(
      1 * gridsize_x,
      4 * gridsize_y + gridsize_y / 2 - wall.Height / 2,
      8 * gridsize_x + gridsize_x / 2,
      4 * gridsize_y + gridsize_y / 2 - wall.Height / 2
    );
    line(
      9 * gridsize_x,
      8 * gridsize_y + gridsize_y / 2 - wall.Height / 2,
      8 * gridsize_x + gridsize_x / 2,
      8 * gridsize_y + gridsize_y / 2 - wall.Height / 2
    );
    line(
      9 * gridsize_x,
      14 * gridsize_y + gridsize_y / 2 - wall.Height / 2,
      8 * gridsize_x + gridsize_x / 2,
      14 * gridsize_y + gridsize_y / 2 - wall.Height / 2
    );
    line(
      8 * gridsize_x + gridsize_x / 2,
      0 * gridsize_y + gridsize_y / 2,
      8 * gridsize_x + gridsize_x / 2,
      14 * gridsize_y + gridsize_y / 2
    );
    noStroke();
  
    //Trait
    Leg_Wall();
    Leg_ElectricDoor();
    Leg_WallSwitch();

    //Objet
    Leg_ObjectZone();
    Leg_Key();

    //UI
    Interface();
  }
  function Level4() {
    //Zone
    Leg_Zone();

    //Cases
    Leg_Switch();
    Leg_Teleport();
    Leg_ElectricInterupt();
    Leg_Convertizer();
  
    //Ligne electrique
    stroke(20);
    line(
      gridsize_x / 2 - wall.Width / 2,
      4 * gridsize_y,
      gridsize_y / 2 - wall.Width / 2,
      9 * gridsize_x + gridsize_x / 2 - wall.Width / 2
    );
    line(
      gridsize_x / 2,
      9 * gridsize_x + gridsize_x / 2 - wall.Width / 2,
      6 * gridsize_y,
      9 * gridsize_y + gridsize_y / 2 - wall.Height / 2,
      0 * gridsize_y
    );
    line(
      gridsize_x + gridsize_x / 2 - wall.Width / 2,
      9 * gridsize_y + gridsize_y / 2,
      gridsize_x + gridsize_x / 2 - wall.Width / 2,
      10 * gridsize_y - wall.Width / 2
    );
    noStroke();
  
    //Trait
    Leg_Wall();
    Leg_ElectricDoor();
    Leg_WallSwitch();

    //Objet
    Leg_ObjectZone();
    Leg_Key();

    //UI
    Interface();
  }
  function Level3() {
    //Cases
    Leg_Switch();
    Leg_Teleport();

    //Trait
    Leg_Wall();
    Leg_WallSwitch();
    
    //Objet
    Leg_Key();

    //UI
    Interface();
  }
  function Level2() {
    //Cases
    Leg_Switch();
    Leg_Teleport();
    
    //Trait
    Leg_Wall();
    Leg_WallSwitch();
  }
  function Level1() {
    //Cases
    Leg_Switch();
    
    //Trait
    Leg_Wall();
    Leg_WallSwitch();
  }
  function Level0() {
    //Trait
    Leg_Wall();
  }
  
  
  //Control & Intéraction
  function keyTyped() {

    //Game Mode
    if(lab.state.game == true){
      //Quelle est la direction prise ?
      let optionright = false;
      let optionleft = false;
      let optionup = false;
      let optiondown = false;
      
      //Dans quel direction le joueur peut se déplacer ?
      j.option.right = true;
      j.option.left = true;
      j.option.up = true;
      j.option.down = true;
    
      //Taille d'une case
      let gridsize_x = width / lab.grid.x;
      let gridsize_y = height / lab.grid.y;
    
      //Position du centre du joueur en px
      let sprite = {
        x: j.x * gridsize_x + gridsize_x / 2,
        y: j.y * gridsize_y + gridsize_y / 2,
      };
    
      //////// ////////
    
      //Verif Tuile
      let map = WallTab[j.y][j.x];
      switch (map) {
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
    
      //Contrôle Joueur
      if (key === "o") {
        optionup = true;

        //Collision WallSwitch
        if(lab.is.Switch == true){
          WallSwitch.forEach((item, index, WallSwitch) => {
            if (
                WallSwitch[index][0] * gridsize_x + gridsize_x / 2 <= sprite.x + 1 &&
              sprite.x + 1 <=
                WallSwitch[index][0] * gridsize_x + gridsize_x / 2 + wall.Width &&
              WallSwitch[index][1] * gridsize_y <= sprite.y - gridsize_y / 2 + 1 &&
              sprite.y - gridsize_y / 2 + 1 <=
                WallSwitch[index][1] * gridsize_y + wall.Width &&
              WallSwitch[index][2] == false &&
              WallSwitch[index][3] == 1
            ) {
              j.option.up = false;
            }
          });
        }
        
        //Collision KeyDoor
        if(lab.is.Key == true){
          KeyDoor.forEach((item, index, KeyDoor) => {
            let i = index;
            if (
                KeyDoor[index][0] * gridsize_x + gridsize_x / 2 <= sprite.x + 1 &&
              sprite.x + 1 <=
                KeyDoor[index][0] * gridsize_x + gridsize_x / 2 + wall.Width &&
              KeyDoor[index][1] * gridsize_y <= sprite.y - gridsize_y / 2 + 1 &&
              sprite.y - gridsize_y / 2 + 1 <=
                KeyDoor[index][1] * gridsize_y + wall.Width &&
              KeyDoor[index][3] == true &&
              KeyDoor[index][2] == 1
            ) {
              Jiventory.forEach((item, index, Jiventory) => {
                if (Jiventory[index] != KeyDoor[i][4]) {
                  j.option.up = false;
                } else {
                  KeyDoor[i][3] = false;
                }
              });
            }
          });
        }

        //Collision ElectricDoor
        if(lab.is.Electric == true){
          ElectricDoor.forEach((item, index, ElectricDoor) => {
            if (
                ElectricDoor[index][0] * gridsize_x + gridsize_x / 2 - 1 <= sprite.x &&
              sprite.x <=
                ElectricDoor[index][0] * gridsize_x + gridsize_x / 2 + 1 &&
      
              ElectricDoor[index][1] * gridsize_y - 1 <= sprite.y - gridsize_y / 2 &&
              sprite.y - gridsize_y / 2 <=
                ElectricDoor[index][1] * gridsize_y + 1 &&
      
              ElectricDoor[index][2] == true &&
              ElectricDoor[index][3] == 1
            ) {
              j.option.up = false;
            }
          });
        }
        
        if (j.option.up == true) {
          j.y -= 1;
        }
      } else if (key === "l") {
        optiondown = true;
        
        //Collision WallSwitch
        if(lab.is.Switch){
          WallSwitch.forEach((item, index, WallSwitch) => {
            if (
              WallSwitch[index][0] * gridsize_x + gridsize_x / 2 <= sprite.x + 1 &&
              sprite.x + 1 <=
                WallSwitch[index][0] * gridsize_x + gridsize_x / 2 + wall.Width &&
              WallSwitch[index][1] * gridsize_y <= sprite.y + gridsize_y / 2 + 1 &&
              sprite.y + gridsize_y / 2 + 1 <=
                WallSwitch[index][1] * gridsize_y + wall.Width &&
              WallSwitch[index][2] == false &&
              WallSwitch[index][3] == 1
            ) {
              j.option.down = false;
            }
          });
        }

        //Collision KeyDoor
        if(lab.is.Key){
          KeyDoor.forEach((item, index, KeyDoor) => {
            let i = index;
            if (
              KeyDoor[index][0] * gridsize_x + gridsize_x / 2 <= sprite.x + 1 &&
              sprite.x + 1 <=
                KeyDoor[index][0] * gridsize_x + gridsize_x / 2 + wall.Width &&
              KeyDoor[index][1] * gridsize_y <= sprite.y + gridsize_y / 2 + 1 &&
              sprite.y + gridsize_y / 2 + 1 <=
                KeyDoor[index][1] * gridsize_y + wall.Width &&
              KeyDoor[index][3] == true &&
              KeyDoor[index][2] == 1
            ) {
              Jiventory.forEach((item, index, Jiventory) => {
                if (Jiventory[index] != KeyDoor[i][4]) {
                  j.option.down = false;
                } else {
                  KeyDoor[i][3] = false;
                }
              });
            }
          });
        }

        //Collision ElectricDoor
        if(lab.is.Electric){
          ElectricDoor.forEach((item, index, ElectricDoor) => {
            if (
              ElectricDoor[index][0] * gridsize_x + gridsize_x / 2 - 1 <= sprite.x &&
              sprite.x <=
                ElectricDoor[index][0] * gridsize_x + gridsize_x / 2 + 1 &&
      
              ElectricDoor[index][1] * gridsize_y + gridsize_y - 1 <= sprite.y + gridsize_y + gridsize_y / 2 &&
              sprite.y + gridsize_y + gridsize_y / 2 <=
                ElectricDoor[index][1] * gridsize_y + gridsize_y + 1 &&
      
              ElectricDoor[index][2] == true &&
              ElectricDoor[index][3] == 1
            ) {
              j.option.down = false;
            }
          });
        }
        
        if (j.option.down == true) {
          j.y += 1;
        }
      } else if (key === "k") {
        optionleft = true;
        
        //Collision WallSwitch
        if(lab.is.Switch == true){
          WallSwitch.forEach((item, index, WallSwitch) => {
            if (
              WallSwitch[index][0] * gridsize_x <= sprite.x - gridsize_x / 2 + 1 &&
              sprite.x - gridsize_x / 2 + 1 <=
                WallSwitch[index][0] * gridsize_x + wall.Width &&
              WallSwitch[index][1] * gridsize_y + gridsize_y / 2 <= sprite.y + 1 &&
              sprite.y + 1 <=
                WallSwitch[index][1] * gridsize_y + gridsize_y / 2 + wall.Width &&
              WallSwitch[index][2] == false &&
              WallSwitch[index][3] == 2
            ) {
              j.option.left = false;
            }
          });
        }

        //Collision KeyDoor
        if(lab.is.Key == true){
          KeyDoor.forEach((item, index, KeyDoor) => {
            let i = index;
            if (
              KeyDoor[index][0] * gridsize_x + gridsize_x / 2 <= sprite.x + 1 &&
              sprite.x + 1 <=
                KeyDoor[index][0] * gridsize_x + gridsize_x / 2 + wall.Width &&
              KeyDoor[index][1] * gridsize_y <= sprite.y - gridsize_y / 2 + 1 &&
              sprite.y - gridsize_y / 2 + 1 <=
                KeyDoor[index][1] * gridsize_y + wall.Width &&
              KeyDoor[index][3] == true &&
              KeyDoor[index][2] == 2
            ) {
              Jiventory.forEach((item, index, Jiventory) => {
                if (Jiventory[index] != KeyDoor[i][4]) {
                  j.option.left = false;
                } else {
                  KeyDoor[i][3] = false;
                }
              });
            }
          });
        }
        
        //Collision ElectricDoor
        if(lab.is.Electric == true){
          ElectricDoor.forEach((item, index, ElectricDoor) => {
            if (
              ElectricDoor[index][0] * gridsize_x + gridsize_x / 2 <= sprite.x + 1 &&
              sprite.x + 1 <=
                ElectricDoor[index][0] * gridsize_x + gridsize_x / 2 + wall.Width &&
      
              ElectricDoor[index][1] * gridsize_y <= sprite.y - gridsize_y / 2 + 1 &&
              sprite.y - gridsize_y / 2 + 1 <=
                ElectricDoor[index][1] * gridsize_y + wall.Width &&
      
              ElectricDoor[index][2] == true &&
              ElectricDoor[index][3] == 2
            ) {
              j.option.left = false;
            }
          });  
        }

        if (j.option.left == true) {
          j.x -= 1;
        }
      } else if (key === "m") {
        optionright = true;
    
        //Collision WallSwitch
        if(lab.is.Switch == true){
          WallSwitch.forEach((item, index, WallSwitch) => {
            if (
              WallSwitch[index][0] * gridsize_x <= sprite.x + gridsize_x / 2 + 1 &&
              sprite.x + gridsize_x / 2 + 1 <=
                WallSwitch[index][0] * gridsize_x + wall.Width &&
      
              WallSwitch[index][1] * gridsize_y + gridsize_y / 2 <= sprite.y + 1 &&
              sprite.y + 1 <=
                WallSwitch[index][1] * gridsize_y + gridsize_y / 2 + wall.Width &&
      
              WallSwitch[index][2] == false &&
              WallSwitch[index][3] == 2
            ) {
              j.option.right = false;
            }
          });
        }

        //Collision KeyDoor
        if(lab.is.Key == true){
          KeyDoor.forEach((item, index, KeyDoor) => {
            let i = index;
            if (
              KeyDoor[index][0] * gridsize_x <= sprite.x + gridsize_x / 2 + 1 &&
              sprite.x + 1 <=
                KeyDoor[index][0] * gridsize_x + wall.Width &&
      
              KeyDoor[index][1] * gridsize_x <= sprite.y - gridsize_y / 2 + 1 &&
              sprite.y - gridsize_y / 2 + 1 <=
                KeyDoor[index][1] * gridsize_y + wall.Width &&
      
              KeyDoor[index][3] == true &&
              KeyDoor[index][2] == 2
            ) {
              Jiventory.forEach((item, index, Jiventory) => {
                if (Jiventory[index] != KeyDoor[i][4]) {
                  j.option.right = false;
                } else {
                  KeyDoor[i][3] = false;
                }
              });
            }
          });
        }

        //Collision ElectricDoor
        if(lab.is.Electric == true){
          ElectricDoor.forEach((item, index, ElectricDoor) => {
            if (
              ElectricDoor[index][0] * gridsize_x - 1 <= sprite.x + gridsize_x / 2 &&
              sprite.x + gridsize_x / 2 <=
                ElectricDoor[index][0] * gridsize_x + 1 &&
      
                ElectricDoor[index][1] * gridsize_y + gridsize_y / 2 - 1 <= sprite.y &&
              sprite.y <=
              ElectricDoor[index][1] * gridsize_y + gridsize_y / 2 + 1 &&
      
              ElectricDoor[index][2] == true &&
              ElectricDoor[index][3] == 2
            ) {
              j.option.right = false;
            }
          });
        }

        if (j.option.right == true) {
          j.x += 1;
        }
      }
    
      //////// ////////
    
      //Changement de Level
      if (key === "1") {
        lab.level += 1;
        lab.preloadlevel = true;
      } else if (key === "0") {
        lab.preloadlevel = true;
        lab.level -= 1;
      }
    
      //Condition de Victoire
      if (
        j.x == -1 ||
        j.y == -1 ||
        j.x == lab.grid.x ||
        j.y == lab.grid.y
      ) {
        lab.level += 1;
        lab.preloadlevel = true;
        console.clear();
      }
    
      //////// ////////
    
      //Teleport
      if (lab.is.Teleport == true) {
        Teleport.forEach((item, index, Teleport) => {
          if (j.x == Teleport[index][0] && j.y == Teleport[index][1]) {
            j.x = Teleport[index][2];
            j.y = Teleport[index][3];
          } else if (j.x == Teleport[index][2] && j.y == Teleport[index][3]) {
            j.x = Teleport[index][0];
            j.y = Teleport[index][1];
          }
        });
      }
    
      //River
      if(lab.is.River == true){
        if (j.go.river == false) {
          let rivermap = RiverTab[j.y][j.x];
          if (rivermap == "R") {
            if (optionup == true) {
              j.y += 1;
            } else if (optiondown == true) {
              j.y -= 1;
            } else if (optionleft == true) {
              j.x += 1;
            } else if (optionright == true) {
              j.x -= 1;
            }
          }
        }
      }

      //Forest
      if(lab.is.Forest == true){
        if (j.go.forest == false) {
          let forestmap = ForestTab[j.y][j.x];
          if (forestmap == "F") {
            if (optionup == true) {
              j.y += 1;
            } else if (optiondown == true) {
              j.y -= 1;
            } else if (optionleft == true) {
              j.x += 1;
            } else if (optionright == true) {
              j.x -= 1;
            }
          }
        }
      }

      //Switch
      if (lab.is.Switch == true) {
        Switch.forEach((item, index, Switch) => {
          if (j.x == Switch[index][0] && j.y == Switch[index][1]) {
            WallSwitch.forEach((item, index, WallSwitch) => {
              if (WallSwitch[index][2] == true) {
                WallSwitch[index][2] = false;
              } else {
                WallSwitch[index][2] = true;
              }
            });
          }
        });
      }
    
      //Electric interupt
      if (lab.is.Electric == true) {
        //Activation d'interrupt
        ElectricInterupt.forEach((item, index, ElectricInterupt) => {
          if (
            j.x == ElectricInterupt[index][0] &&
            j.y == ElectricInterupt[index][1] &&
            ElectricInterupt[index][2] != true
          ) {
            ElectricInterupt[index][2] = true;
            console.log(ElectricInterupt[index][2]);
          }
        });
    
        //Verification Portes
        ElectricDoor.forEach((item, i, ElectricDoor) => {
          
          if(ElectricDoor[i][2] == true){
            ElectricInterupt.forEach((item, index, ElectricInterupt) => {
              if (
                ElectricInterupt[index][2] == true &&
                ElectricInterupt[index][3] == ElectricDoor[i][4]
              ) {
                ElectricDoor[i][5] += 1;
              }
            });
          }
    
          if (ElectricDoor[i][5] == ElectricDoor[i][6]){
            ElectricDoor[i][2] = false;
          }else{
            ElectricDoor[i][5] = 0;
          }
    
        });
      }
    
      //////// ////////
      
      //Shop
      if (lab.is.Shop == true){
        //Entrer dans le Shop
        if(j.x == Shop[0] && j.y == Shop[1] + 1){
          Shop[3] = true;
          lab.state.game = false;
          j.x -= 1;
        }

        //Gagner de l'argent
        MoneyShop.forEach((item, index, MoneyShop) => {
          if(MoneyShop[index][3] == true && j.x == MoneyShop[index][0] && j.y == MoneyShop[index][1]){
            MoneyShop[index][3] = false;
            j.moneynbr += MoneyShop[index][2];
            console.log(j.moneynbr);
          }
        });
      }

      JiventoryManager();
    }

    //Shop Mode
    if(lab.is.Shop == true && Shop[3] == true){
      //Quitter le Shop
      if (key === "p"){
        Shop[3] = false;
        lab.state.game = true;
      }
    }

    //Forcer le Switch entre Shop <-> Game
    if (key === "3" && Shop[3] == false){
      Shop[3] = true;
      lab.state.game = false;
    }else if (key === "3" && Shop[3] == true){
      Shop[3] = false;
      lab.state.game = true;
    }
  }
  function mouseClicked(){
    if(Shop[3] == true){
      let distance = width - shop.slot.width * shop.nbritem;
    distance = distance / shop.nbritem + 1;
    
    //Acheter des trucs
      //object 1
    if(
      mouseX >= distance &&
      mouseX <= distance + shop.slot.width &&
      mouseY >= height / 3 &&
      mouseY <= height / 3 + shop.slot.height &&
      j.moneynbr >= ObjectShop[0] &&
      ObjectShop[3] == true
    ){
      //Gestion du magasin et de l'argent
      ObjectShop[3] = false;
      j.moneynbr -= ObjectShop[0];

      //Gain de l'objet
      append(Jiventory, ".Palmes");
      j.go.river = true;

      //Message dans la console
      console.log(Jiventory);
      console.log("+ .Palmes");
      console.log(j.moneynbr);
    }


      //object 2
    if(
      mouseX >= width / 2 - shop.slot.width / 2 &&
      mouseX <= width / 2 + shop.slot.width / 2 &&
      mouseY >= height / 3 &&
      mouseY <= height / 3 + shop.slot.height &&
      j.moneynbr >= ObjectShop[1] &&
      ObjectShop[4] == true
    ){
      //Gestion du magasin et de l'argent
      ObjectShop[4] = false;
      j.moneynbr -= ObjectShop[1];
    
      //Gain de l'objet
      append(Jiventory, ".Couteau");
      j.go.forest = true;
    
      //Message dans la console
      console.log(Jiventory);
      console.log("+ .Couteau");
      console.log(j.moneynbr);
    }


      //object 3
    if(
      mouseX >= width - distance - shop.slot.width &&
      mouseX <= width - distance &&
      mouseY >= height / 3 &&
      mouseY <= height / 3 + shop.slot.height &&
      j.moneynbr >= ObjectShop[2] &&
      ObjectShop[5] == true
    ){
      //Gestion du magasin et de l'argent
      ObjectShop[5] = false;
      j.moneynbr -= ObjectShop[2];
  
      //Gain de l'objet
      append(Jiventory, ".RedKey");
  
      //Message dans la console
      console.log(Jiventory);
      console.log("+ .Redkey");
      console.log(j.moneynbr);
    }
    }
  }  

  //Gestion d'Inventaire a uni sac
  function JiventoryManager(){
    //Keyobject
    if (lab.is.Key == true) {
      KeyObject.forEach((item, index, KeyObject) => {
        if (KeyObject[index][2] == true) {
          if (j.x == KeyObject[index][0] && j.y == KeyObject[index][1]) {
            append(Jiventory, KeyObject[index][3]);
            KeyObject[index][2] = false;
            Jiventory= sort(Jiventory, Jiventory.length);
            console.log(Jiventory);
          }
        }
      });
    }

    //River
    if (lab.is.River == true) {
      RiverObject.forEach((item, index, RiverObject) => {
        if (
          j.x == RiverObject[index][0] &&
          j.y == RiverObject[index][1] &&
          RiverObject[index][3] == true
        ) {
          RiverObject[index][3] = false;
          append(Jiventory, RiverObject[index][2]);
          Jiventory = sort(Jiventory, Jiventory.length);
          console.log(Jiventory);
        }
      });
    }
  
    //Forest
    if (lab.is.Forest == true) {
      ForestObject.forEach((item, index, ForestObject) => {
        if (
          j.x == ForestObject[index][0] &&
          j.y == ForestObject[index][1] &&
          ForestObject[index][3] == true
        ) {
          ForestObject[index][3] = false;
          ForestObject[index][4] = true;
          append(Jiventory, ForestObject[index][2]);
          Jiventory = sort(Jiventory, Jiventory.length);
          console.log(Jiventory);
        }
      });
    }
    
    //Convertizer palme
    if (
      lab.is.Convertizer == true &&
      lab.is.River == true &&
      j.go.river == false
    ) {
      Convertizer.forEach((item, index, Convertizer) => {
        //Coordonée du joueur sur la case
        if (j.x == Convertizer[index][0] && j.y == Convertizer[index][1]) {
          //Check s'il a tout les objets
          Jiventory.forEach((item, index, Jiventory) => {
            if (Jiventory[index] == "R - cuir") {
              Jiventory.forEach((item, index, Jiventory) => {
                if (Jiventory[index] == "R - baton") {
                  Jiventory.forEach((item, index, Jiventory) => {
                    if (Jiventory[index] == "R - baaton") {
                      
                      const findIndexObject = (element) => element > "R";
                      let idObject = Jiventory.findIndex(findIndexObject);

                      Jiventory.splice(idObject, 3, ".Palmes");
                      Jiventory = sort(Jiventory, Jiventory.length);
                      console.log(Jiventory);

                      j.go.river = true;
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  
    //Convertizer couteau
    if (
      lab.is.Convertizer == true &&
      lab.is.Forest == true &&
      j.go.forest == false
    ) {
      Convertizer.forEach((item, index, Convertizer) => {
        if (j.x == Convertizer[index][0] && j.y == Convertizer[index][1]) {
          Jiventory.forEach((item, index, Jiventory) => {
            if (Jiventory[index] == "F - baton") {
              Jiventory.forEach((item, index, Jiventory) => {
                if (Jiventory[index] == "F - fer") {
                  
                  const findIndexObject = (element) => element > "F";
                  let idObject = Jiventory.findIndex(findIndexObject);

                  Jiventory.splice(idObject, 2, ".Couteau");
                  Jiventory = sort(Jiventory, Jiventory.length);
                  console.log(Jiventory);

                  j.go.forest = true;
                }
              });
            }
          });
        }
      });
    }
  }

  //656
  //541
  //576
  //1102
  //1257
  //1539
  //1683
  //2361