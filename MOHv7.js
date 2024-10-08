let lab = {
    grid: {
      x: 0,
      y: 0,
    },
    enter: {
      x: 0,
      y: 0,
      side: 1,
    },
    exit: {
      x: 0,
      y: 0,
      side: 0,
    },
    level: 0,
    cancaSize: {
      y: 400,
      x: 400,
    },
    is: {
      Switch: false,
      Teleport: false,
      Key: false,
      PermaKey: false,
      River: false,
      Forest: false,
      Volcano: false,
      Electric: false,
      Convertizer: false,
      Shop:false,
      goBack: false,
      Notice: false,
    },
    state: {
      game: false,
      edition: false,
      levelDown: false,
    },
    allowToEdit: false,
    paintvalue: "00",
    preloadlevel: true,
  };
  
  let wall = {
    Width: 0,
    Height: 0,
  };
  
  let j = {
    x: 0,
    y: 0,
    nobOfAction: 0,
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
      volcano: false,
    },
    moneynbr: 0,
    permaObject: {
      SRkeyy: false,
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
    distance: {},
  };

  let UIdist = {
    space: {
      onLeft: 35,
      onTop: 25,
      betweenUI: 10,
    },
    money: {
      height: 15,
      ON: false,
    },
    object: {
      x: 0,
      y: 0,
      marge: 7,
      size: 40,
    },
  };
  
  var Jiventory = [""];
  var JiventoryKey = [""];
  var JiventoryTools = [""];
  
  let gridsize_x = 0;
  let gridsize_y = 0;
  
  //Quelle est la direction prise ?
  let optionright = false;
  let optionleft = false;
  let optionup = false;
  let optiondown = false;

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
  let KeyMat = [];
  
  //Grille de chaque zone
  let ZoneTab = [];

  //Object de chaque zone
  let RiverObject = [];
  let ForestObject = [];
  let VolcanoObject = [];

  //Emplacement des Convertisseurs
  let Convertizer = [];
  
  //Emplacement des portes Electrique et des ces interrupteurs
  let ElectricDoor = [];
  let ElectricInterupt = [];
  
  //Emplacement du Shop, des objects et de l'argents
  let Shop = [];
  let ObjectShop = [];
  let MoneyShop = [];

  let Notice = [];
  
    //Chargement des assets
    function preload() {
      //Asset sous Illustrator (UI)
      UIasset = {
        titleScreen: loadImage("/Images/Title_Screen.jpg"),
        inInvent: {
            key: {
              Ykeyy: loadImage("/Images/Yellowkey.png"),
              Rkeyy: loadImage("/Images/Redkey.png"),
              SRkeyy: loadImage("/Images/RedkeyS.png"),
              Gkeyy: loadImage("/Images/Greenkey.png"),
              mat:{
                Yring: loadImage("/Images/yellow_ring.png"),
                Ystick: loadImage("/Images/yellow_stick.png"),
                Gring: loadImage("/Images/green_ring.png"),
                Gstick: loadImage("/Images/green_stick.png"),
                Rring: loadImage("/Images/red_ring.png"),
                Rstick: loadImage("/Images/red_stick.png"),
              },
            },
            volcano: {
              armure: loadImage("/Images/Armure.png"),
              verre: loadImage("/Images/VVerre.png"),
              fer: loadImage("/Images/VFer.png"),
            },
            forest: {
              couteau: loadImage("/Images/Couteau.png"),
              baton: loadImage("/Images/FBaton.png"),
              fer: loadImage("/Images/FFer.png"),
            },
            river: {
              palmes: loadImage("/Images/Palmes.png"),
              baton: loadImage("/Images/RBaton.png"),
              cuir: loadImage("/Images/RCuir.png"),
            },
        },
        inGame: {
            key: {
              Ykeyy: loadImage("/Images/Yellowkey_Ficone.png"),
              Rkeyy: loadImage("/Images/Redkey_Ficone.png"),
              Gkeyy: loadImage("/Images/Greenkey_Ficone.png"),
            },
            keydoor: {
              Ykeyy: loadImage("/Images/Yellowkey_Dicone.png"),
              Rkeyy: loadImage("/Images/Redkey_Dicone.png"),
              Gkeyy: loadImage("/Images/Greenkey_Dicone.png"),
            },
            keymat: {
              RRing: loadImage("/Images/RSRing_Ficone.png"),
              RBaton: loadImage("/Images/RSBaton_Ficone.png"),
            },
            river: {
              cuir: loadImage("/Images/RCuir_Ficone.png"),
              baton: loadImage("/Images/RBaton_Ficone.png"),
            },
            forest: {
              fer: loadImage("/Images/FFer_Ficone.png"),
              baton: loadImage("/Images/FBaton_Ficone.png"),
            },
            volcano: {
              fer: loadImage("/Images/VFer_Ficone.png"),
              verre: loadImage("/Images/VVerre_Ficone.png"),
            },
        },
      };
    }

    function setup() {
      createCanvas(400, 400);
    }
    function draw() {
      fill(220);
      noStroke();
      rect(0, 0, width, height);
    
      //Chargement de toute les données sur chaque labyritnhe (cf. levels.js)
      if (lab.preloadlevel == true) {
        PreloadLevel();
      }

      //Check de l'état du jeu (afficher l'écran du jeu ? l'écran du shop ? écran titre ?)
      if(lab.state.game == true){
        switch (lab.level) {
          case -1:
            Level_1();
            break;
          case 9:
            Level9();
            break;
          case 8:
            Level8();
            break;
          case 7:
            Level7();
            break;
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
          case 7:
            ShopLevel7();
            break;
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
        text("'P' pour sortir du Shop", 60, height - 20);
      }
      else{
        image(UIasset.titleScreen, 0, 0);
      }
    }
    
  
    //Loading Level
    function PreloadLevel() {
      switch (lab.level) {
        case -1:
          (lab.is.Switch = false),
          (lab.is.Teleport = false),
          (lab.is.Key = false),
          (lab.is.PermaKey = false),
          (lab.is.Volcano = true),
          (lab.is.Forest = true),
          (lab.is.River = true),
          (lab.is.Electric = false),
          (lab.is.Convertizer = false),
          (lab.is.Shop = false),
          (lab.is.goBack = true),
          (lab.is.Notice = true),

          //Définir la taille du canva
          lab.cancaSize.x = 400;
          lab.cancaSize.y = 400;

          //Au cas ou le joueur recommence
          resizeCanvas(lab.cancaSize.x, lab.cancaSize.y);

          //Position du joueur
          j.x = 0;
          j.y = 0;

          //Position de la sortie
          lab.exit.x = 0;
          lab.exit.y = 9;
          lab.exit.side = 4;

          //Position de l'entré
          lab.enter.x = 0;
          lab.enter.y = 0;
          lab.enter.side = 2;

          //Taille de la grille
          lab.grid.x = 5;
          lab.grid.y = 5;

          //Accès à toutes zones
          j.go.river = true;
          j.go.forest = true;
          j.go.volcano = true;
    
          //Taille d'une case
          gridsize_x = width / lab.grid.x;
          gridsize_y = height / lab.grid.y;
    
          //Proportion des murs
          wall.Width = 3;
          wall.Height = 3;

          //Referencement des légendes
          WallTab = levels.level_1.WallTab;
          ZoneTab = levels.level_1.ZoneTab;
          Notice = levels.level_1.Notice;
          Jiventory = levels.level_1.Jiventory;
          break;
        case 9:
          (lab.is.Switch = false),
          (lab.is.Teleport = false),
          (lab.is.Key = false),
          (lab.is.PermaKey = false),
          (lab.is.Volcano = false),
          (lab.is.Forest = false),
          (lab.is.River = false),
          (lab.is.Electric = false),
          (lab.is.Convertizer = false),
          (lab.is.Shop = false),
          (lab.is.goBack = false),
          (lab.is.Notice = false),

          //Position du joueur
          j.x = 7;
          j.y = 8;

          //Referencement des légendes
          WallTab = levels.level9.WallTab;
          Jiventory = levels.level9.Jiventory;
          break;
        case 8:
          (lab.is.Switch = false),
          (lab.is.Teleport = true),
          (lab.is.Key = true),
          (lab.is.PermaKey = false),
          (lab.is.Volcano = true),
          (lab.is.Forest = true),
          (lab.is.River = false),
          (lab.is.Electric = false),
          (lab.is.Convertizer = false),
          (lab.is.Shop = false),
          (lab.is.goBack = false),
          (lab.is.Notice = true),

          //Définir la taille du canva
          lab.cancaSize.x = 800;
          lab.cancaSize.y = 400;

          //Au cas ou le joueur recommence
          resizeCanvas(lab.cancaSize.x, lab.cancaSize.y);
    
          //Position du joueur
          j.x = 0;
          j.y = 2;
    
          //Réinitialiser les autorisations du joueur
          j.go.river = false;
          j.go.forest = false;
          j.go.volcano = false;
          
          //Position de la sortie
          lab.exit.x = 0;
          lab.exit.y = 2;
          lab.exit.side = 4;

          //Position de l'entré
          lab.enter.x = 0;
          lab.enter.y = 2;
          lab.enter.side = 2;

          //Taille de la grille
          lab.grid.x = 20;
          lab.grid.y = 10;
    
          //Taille d'une case
          gridsize_x = width / lab.grid.x;
          gridsize_y = height / lab.grid.y;

          //Proportion des murs
          wall.Width = 1.5;
          wall.Height = 1.5;
    
          //Référencement des légendes
          WallTab = levels.level8.WallTab;
          Teleport = levels.level8.Teleport;
          KeyDoor = levels.level8.KeyDoor;
          ZoneTab = levels.level8.ZoneTab;
          VolcanoTab = levels.level8.VolcanoTab;
          Notice = levels.level8.Notice;
          Jiventory = levels.level8.Jiventory;
          
          break;
        case 7:
          (lab.is.Switch = true),
          (lab.is.Teleport = true),
          (lab.is.Key = true),
          (lab.is.PermaKey = true),
          (lab.is.Volcano = true),
          (lab.is.Forest = true),
          (lab.is.River = true),
          (lab.is.Electric = true),
          (lab.is.Convertizer = true),
          (lab.is.Shop = true),
          (lab.is.goBack = false),
          (lab.is.Notice = false),

          //Définir la taille du canva
          lab.cancaSize.x = 1200;
          lab.cancaSize.y = 600;

          //Au cas ou le joueur recommence
          resizeCanvas(lab.cancaSize.x, lab.cancaSize.y);
    
          //Position du joueur
          if(lab.state.levelDown == false){
            j.x = 0;
            j.y = 9;
          }else{
            j.x = 29;
            j.y = 7;
            lab.state.levelDown = false;
          }
    
          //Réinitialiser les autorisations du joueur
          j.go.river = false;
          j.go.forest = false;
          
          //Position de la sortie
          lab.exit.x = 0;
          lab.exit.y = 7;
          lab.exit.side = 4;

          //Position de l'entré
          lab.enter.x = 0;
          lab.enter.y = 9;
          lab.enter.side = 2;

          //Taille de la grille
          lab.grid.x = 30;
          lab.grid.y = 15;
    
          //Taille d'une case
          gridsize_x = width / lab.grid.x;
          gridsize_y = height / lab.grid.y;

          //Proportion des murs
          wall.Width = 1.5;
          wall.Height = 1.5;

          //Initialisation des distance du shop
          shop.distance = {
            slot:{
              x: 200,
              y: height / 3
            },
          };

          shop.distance = {
            slot:{
              x: 200,
              y: height / 3
            },
            object: shop.distance.slot.x + shop.slot.width / 2, //donnée en x
            price: shop.slot.height + shop.distance.slot.y, //donnée en y
            description: 20 + shop.distance.slot.y + shop.slot.height / 2,
          };
    
          //Référencement des légendes
          WallTab = levels.level7.WallTab;
          Switch = levels.level7.Switch;
          WallSwitch = levels.level7.WallSwitch;
          Teleport = levels.level7.Teleport;
          KeyDoor = levels.level7.KeyDoor;
          KeyObject = levels.level7.KeyObject;
          KeyMat = levels.level7.KeyMat;
          ZoneTab = levels.level7.ZoneTab;
          RiverObject = levels.level7.RiverObject;
          ForestObject = levels.level7.ForestObject;
          VolcanoObject = levels.level7.VolcanoObject;
          ElectricDoor = levels.level7.ElectricDoor;
          ElectricInterupt = levels.level7.ElectricInterupt;
          Convertizer = levels.level7.Convertizer;
          Jiventory = levels.level7.Jiventory;
          Shop = levels.level7.Shop;
          ObjectShop = levels.level7.ObjectShop;
          MoneyShop = levels.level7.MoneyShop;
          
          break;
        case 6:
          (lab.is.Switch = false),
          (lab.is.Teleport = true),
          (lab.is.Key = true),
          (lab.is.PermaKey = false),
          (lab.is.Volcano = false),
          (lab.is.Forest = true),
          (lab.is.River = true),
          (lab.is.Electric = true),
          (lab.is.Convertizer = false),
          (lab.is.Shop = true),
          (lab.is.goBack = false),
            
          //Définir la taille du canva
          lab.cancaSize.x = 600;
          lab.cancaSize.y = 600;

          //Au cas ou le joueur recommence
          resizeCanvas(lab.cancaSize.x, lab.cancaSize.y);
    
          //Position du joueur
          if(lab.state.levelDown == false){
            j.x = 11;
            j.y = 0;
          }else{
            j.x = 0;
            j.y = 9;
            lab.state.levelDown = false;
          }
    
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

          //Initialisation des distance du shop
          shop.distance = {
            slot:{
              x: 50,
              y: height / 3
            },
          };

          shop.distance = {
            slot:{
              x: 50,
              y: height / 3
            },
            object: shop.distance.slot.x + shop.slot.width / 2, //donnée en x
            price: shop.slot.height + shop.distance.slot.y, //donnée en y
            description: 20 + shop.distance.slot.y + shop.slot.height / 2,
          };
    
          //Référencement des légendes
          WallTab = levels.level6.WallTab;
          Teleport = levels.level6.Teleport;
          KeyDoor = levels.level6.KeyDoor;
          KeyObject = levels.level6.KeyObject;
          ZoneTab = levels.level6.ZoneTab;
          RiverObject = levels.level6.RiverObject;
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
          (lab.is.PermaKey = false),
          (lab.is.Volcano = false),
          (lab.is.Forest = true),
          (lab.is.River = true),
          (lab.is.Electric = true),
          (lab.is.Convertizer = true),
          (lab.is.Shop = false),
          (lab.is.goBack = false),
          
          //Définir la taille du canva
          lab.cancaSize.x = 400;
          lab.cancaSize.y = 600;

          //Au cas ou le joueur recommence
          resizeCanvas(lab.cancaSize.x, lab.cancaSize.y);
    
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
          ZoneTab = levels.level5.ZoneTab;
          RiverObject = levels.level5.RiverObject;
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
          (lab.is.PermaKey = false),
          (lab.is.Volcano = false),
          (lab.is.Forest = false),
          (lab.is.River = true),
          (lab.is.Electric = true),
          (lab.is.Convertizer = true),
          (lab.is.Shop = false),
          (lab.is.goBack = false),
          
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

          //Taille du canva
          lab.cancaSize.x = 400;
          lab.cancaSize.y = 400;
          resizeCanvas(lab.cancaSize.x, lab.cancaSize.y);
    
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
          ZoneTab = levels.level4.ZoneTab;
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
          (lab.is.PermaKey = false),
          (lab.is.Volcano = false),
          (lab.is.Forest = false),
          (lab.is.River = false),
          (lab.is.Electric = false),
          (lab.is.Convertizer = false),
          (lab.is.Shop = false),
          (lab.is.goBack = false),
          
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

          //Taille du canva
          lab.cancaSize.x = 400;
          lab.cancaSize.y = 400;
          resizeCanvas(lab.cancaSize.x, lab.cancaSize.y);
    
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
          (lab.is.Key = false),
          (lab.is.PermaKey = false),
          (lab.is.Volcano = false),
          (lab.is.Forest = false),
          (lab.is.River = false),
          (lab.is.Electric = false),
          (lab.is.Convertizer = false),
          (lab.is.Shop = false),
          (lab.is.goBack = false),
          
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

          //Taille du canva
          lab.cancaSize.x = 400;
          lab.cancaSize.y = 400;
          resizeCanvas(lab.cancaSize.x, lab.cancaSize.y);
    
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
          (lab.is.Teleport = false),
          (lab.is.Key = false),
          (lab.is.PermaKey = false),
          (lab.is.Volcano = false),
          (lab.is.Forest = false),
          (lab.is.River = false),
          (lab.is.Electric = false),
          (lab.is.Convertizer = false),
          (lab.is.Shop = false),
          (lab.is.goBack = false),
          
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

          //Taille du canva
          lab.cancaSize.x = 400;
          lab.cancaSize.y = 400;
          resizeCanvas(lab.cancaSize.x, lab.cancaSize.y);
    
          //Taille d'une case
          gridsize_x = width / lab.grid.x;
          gridsize_y = height / lab.grid.y;
    
          //Proportion des murs
          wall.Width = 3;
          wall.Height = 3;

          //Guide des touche désactivé
          j.guide = false;
    
          //Référencement des légendes
          WallTab = levels.level1.WallTab;
          Switch = levels.level1.Switch;
          WallSwitch = levels.level1.WallSwitch;
    
          break;
        case 0:
          (lab.is.Switch = false),
          (lab.is.Teleport = false),
          (lab.is.Key = false),
          (lab.is.PermaKey = false),
          (lab.is.Volcano = false),
          (lab.is.Forest = false),
          (lab.is.River = false),
          (lab.is.Electric = false),
          (lab.is.Convertizer = false),
          (lab.is.Shop = false),
          (lab.is.goBack = false),

          //Définir la taille du canva
          lab.cancaSize.x = 400;
          lab.cancaSize.y = 400;

          //Au cas ou le joueur recommence
          resizeCanvas(lab.cancaSize.x, lab.cancaSize.y);

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

          //Guide des touche activé
          j.guide = true;
    
          //Référencement des légendes
          WallTab = levels.level0.WallTab;
    
          break;
      }
      JiventoryManager();
      lab.preloadlevel = false;
    }

    
    //Affichage des Legendes
    function Leg_Zone() {
      for (let rowId = 0; rowId < WallTab[0].length; rowId++) {
        for (let colId = 0; colId < WallTab.length; colId++) {
          let map = ZoneTab[colId][rowId];
          switch (map) {
            case "R":
              fill(90, 170, 245);
              rect(
                rowId * gridsize_x,
                colId * gridsize_y,
                gridsize_x,
                gridsize_y
              ); //mur haut
              break;
            case "F":
              fill(50, 220, 110);
              rect(
                rowId * gridsize_x,
                colId * gridsize_y,
                gridsize_x,
                gridsize_y
              ); //mur haut
              break;
            case "V":
              fill(220, 50, 90);
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
              image(
                UIasset.inGame.river.baton,
                gridsize_x * RiverObject[index][0] + 3,
                gridsize_y * RiverObject[index][1] + 3
              );
              noStroke();
            } else {
              image(
                UIasset.inGame.river.cuir,
                gridsize_x * RiverObject[index][0] + 3,
                gridsize_y * RiverObject[index][1] + 3
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
              image(
                UIasset.inGame.forest.baton,
                gridsize_x * ForestObject[index][0] + 3,
                gridsize_y * ForestObject[index][1] + 3
              );
            } else {
              image(
                UIasset.inGame.forest.fer,
                gridsize_x * ForestObject[index][0] + 3,
                gridsize_y * ForestObject[index][1] + 3
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
      fill(220, 0, 240);
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
      rect(lab.grid.x * gridsize_x, 0, -wall.Width * 2, height);
      rect(0, 0, lab.grid.x * gridsize_x, wall.Height * 2);
      rect(0, height, lab.grid.x * gridsize_x, -wall.Height * 2);

      //sortie
      fill(220);
      if (lab.exit.side == 1) {
        rect(lab.exit.x * gridsize_x, 0, gridsize_x, wall.Height * 2);
      } else if (lab.exit.side == 2) {
        rect(0, lab.exit.y * gridsize_y, wall.Height * 2, gridsize_y);
      } else if (lab.exit.side == 3) {
        rect(lab.exit.x * gridsize_x, height, gridsize_x, -wall.Height * 2);
      } else if (lab.exit.side == 4) {
        rect(lab.grid.x * gridsize_x, lab.exit.y * gridsize_y, -wall.Height * 2, gridsize_y);
      }

      //entré
      if(lab.is.goBack == true){
        fill(220);
        if (lab.enter.side == 1) {
          rect(lab.enter.x * gridsize_x, 0, gridsize_x, wall.Height * 2);
        } else if (lab.enter.side == 2) {
          rect(0, lab.enter.y * gridsize_y, wall.Height * 2, gridsize_y);
        } else if (lab.enter.side == 3) {
          rect(lab.enter.x * gridsize_x, height, gridsize_x, -wall.Height * 2);
        } else if (lab.enter.side == 4) {
          rect(width, lab.enter.y * gridsize_y, -wall.Height * 2, gridsize_y);
        }
      }
      
      //2ème sortie level8
      if(lab.level == 8){
        rect(13 * gridsize_x, height, gridsize_x, -wall.Height * 2);
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
          fill(255, 80, 80);
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
          fill(80, 255, 80);
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
        //Image de la clef pour la porte
        if (KeyDoor[index][3] == true) {
          if (KeyDoor[index][4] == ".YellowKey") {
            image(
              UIasset.inGame.keydoor.Ykeyy,
              gridsize_x * KeyDoor[index][0] + 1,
              gridsize_y * KeyDoor[index][1] + 3
            );
          } else if (KeyDoor[index][4] == ".GreenKey") {
            image(
              UIasset.inGame.keydoor.Gkeyy,
              gridsize_x * KeyDoor[index][0] + 1,
              gridsize_y * KeyDoor[index][1] + 3
            );
          } else if (KeyDoor[index][4] == ".RedKey") {
            image(
              UIasset.inGame.keydoor.Rkeyy,
              gridsize_x * KeyDoor[index][0] + 1,
              gridsize_y * KeyDoor[index][1] + 3
            );
          }
    
          //Dessin de la porte
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
              UIasset.inGame.key.Ykeyy,
              gridsize_x * KeyObject[index][0] + 3,
              gridsize_y * KeyObject[index][1] + 2
            );
          } else if (KeyObject[index][3] == ".GreenKey") {
            image(
              UIasset.inGame.key.Gkeyy,
              gridsize_x * KeyObject[index][0] + 3,
              gridsize_y * KeyObject[index][1] + 2
            );
          } else if (KeyObject[index][3] == ".RedKey") {
            image(
              UIasset.inGame.key.Rkeyy,
              gridsize_x * KeyObject[index][0] + 3,
              gridsize_y * KeyObject[index][1] + 2
            );
          }
        }
      });

      //KeyMat
      if(lab.is.PermaKey == true){
        KeyMat.forEach((item, index, KeyMat) => {
          if (KeyMat[index][2] == true) {
            if (KeyMat[index][3] == "r - baton" || KeyMat[index][3] == "r - baaton" || KeyMat[index][3] == "r - baaaton") {
              image(
                UIasset.inGame.keymat.RBaton,
                gridsize_x * KeyMat[index][0] + 3,
                gridsize_y * KeyMat[index][1] + 3
              );
            } else if (KeyMat[index][3] == "r - anneau") {
              image(
                UIasset.inGame.keymat.RRing,
                gridsize_x * KeyMat[index][0] + 3,
                gridsize_y * KeyMat[index][1] + 3
              );
            }
          }
        });
      }
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
    function Leg_Notice(){
      Notice.forEach((item, index, Notice) => {
        //Affichage de l'icone
        stroke(20);
        noFill();

        rect(gridsize_x * Notice[index][0] + gridsize_x / 4, gridsize_y * Notice[index][1] + gridsize_y / 4, gridsize_x / 2, gridsize_y / 2);
        line(gridsize_x * Notice[index][0] + gridsize_x / 3, gridsize_y * Notice[index][1] + gridsize_y / 3 + 2, gridsize_x * Notice[index][0] + 2 * gridsize_x / 3, gridsize_y * Notice[index][1] + gridsize_y / 3 + 2);
        line(gridsize_x * Notice[index][0] + gridsize_x / 3, gridsize_y * Notice[index][1] + gridsize_y / 2, gridsize_x * Notice[index][0] + 2 * gridsize_x / 3, gridsize_y * Notice[index][1] + gridsize_y / 2);
        line(gridsize_x * Notice[index][0] + gridsize_x / 3, gridsize_y * Notice[index][1] + 2 * gridsize_y / 3 - 2, gridsize_x * Notice[index][0] + 2 * gridsize_x / 3, gridsize_y * Notice[index][1] + 2 * gridsize_y / 3 - 2);
          
        //Affichage du texte
        noStroke();
        fill(0);
        textStyle(NORMAL);
        textAlign(LEFT, TOP);
        textSize(10);

        if(Notice[index][2] == "curro"){
          switch (Notice[index][3]) {
            case 0:
              text("    P ↑", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 3);
              break;
            case 1:
              text("Jour 6 : \nPerdu, et dans mes pensées.", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
            case 2:
              text("À force d'explorer, je me suis\ndéfinivement perdu.", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
            case 3:
              text("Il me reste encore des provisions,\nmais les espèces sont toutes nouvelles\ndonc ça risque de devenir compliqué.", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
            case 4:
              text("Il y a pas mal de ruines aux alentours,\ndes gens ont pu y vivre, mais à\nquel prix ?", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
            case 5:
              text("Je vous laisse cet abri de fortune.\nVous y trouverez des documents\nsur la faune et la flore.", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
            case 6:
              text("Si vous me cherchez,\nje pars pour le nord.", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
            case 7:
              text("J'ai oublié mon nom,\nc'est embêtant.", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
            case 8:
              text("On aura qu'à dire que j'en porterai\nun nouveau.\nJe vais le noter pour être sûr.", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
            case 9:
              text("Curropiton.", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
          }
        }

        if(Notice[index][2] == "research of life"){
          switch (Notice[index][3]) {
            case 0:
              text("    P ↑", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 3);
              break;
            case 1:
              text("Blind Bolt\nDanger : Faible", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
            case 2:
              text("Un mix entre un papillon et une luciole.\nles écailles de ses ailes produisent de la\nlumière en permanence.", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
            case 3:
              text("Vivants en grand groupe dans les forêts,\nil arrive que l'on confonde leur présence\nà celle d'un ciel en journée.", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
            case 4:
              text("Leurs écailles sont également un\nexcellent combustible.", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
            case 5:
              text("Nosha\nDanger : Modéré", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
            case 6:
              text("Les Nosha sont des créatures habitant des\nobjets animés.", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
            case 7:
              text("Une fois habité, l'ombre de l'hôte deviendra\nentièrement opaque.", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
            case 8:
              text("Elles ne sont pas connues pour être agressives.\nSi vous ne bougez pas, il ne se passera rien\net elles partiront.", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
            case 9:
              text("Mais si vous vous agitez, un œil apparaîtra\ndans votre ombre pour vous saisir et vous aspirer.", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 2);
              break;
          }
        }

        noStroke();
        fill(0);
        textStyle(NORMAL);
        textAlign(LEFT, TOP);
        textSize(15);

        if(Notice[index][2] == "live and work"){
          switch (Notice[index][3]) {
            case 0:
              text("      P ↑", Notice[index][0] * gridsize_x, Notice[index][1] * gridsize_y + gridsize_y + 3);
              break;
            case 1:
              text("Temps de travail pour le réaliser :\n50h", Notice[index][0] * gridsize_x + gridsize_x + 15, Notice[index][1] * gridsize_y + 10);
              break;
            case 2:
              text("Nombre total de légendes\ncréées à ce jour :\n102", Notice[index][0] * gridsize_x + gridsize_x + 15, Notice[index][1] * gridsize_y + 10);
              break;
            case 3:
              text("Origine du jeu :\nUn labyrinthe sur un paquet de gâteau", Notice[index][0] * gridsize_x + gridsize_x + 15, Notice[index][1] * gridsize_y + 10);
              break;
            case 4:
              text("Date du premier labyrinthe créé :\n27 novembre 2017\nFormat A4 petits carreaux", Notice[index][0] * gridsize_x + gridsize_x + 15, Notice[index][1] * gridsize_y + 10);
              break;
            case 5:
              text("Et puis, bah merci à vous.\nDe vous êtes autant investi\nà avoir cette clef rouge.", Notice[index][0] * gridsize_x + gridsize_x + 15, Notice[index][1] * gridsize_y + 10);
              break;
            case 6:
              text("J'espère que les stats vous auront satisfaits ehe.", Notice[index][0] * gridsize_x + gridsize_x + 15, Notice[index][1] * gridsize_y + 10);
              break;
            case 7:
              text("Je ne vous retiens pas plus que ça.\nÀ bientôt pour la suite !", Notice[index][0] * gridsize_x + gridsize_x + 15, Notice[index][1] * gridsize_y + 10);
              break;
          }
        }
      });
      
      
    }


    //Affichage du Shop
    function ShopLevel7(){
      
      //Resize le canva si il y a quelque chose dans l'inventaire
      if(j.moneynbr > 0 || Jiventory.length - 1 > 0){
        //Calcule de distance
          //x
        const objectSlotSizeX = 2 * UIdist.object.marge + UIdist.object.size;
          //y
        let objectSlotSizeY = UIdist.object.marge + UIdist.object.size;
        const trueJiventoryLength = Jiventory.length - 1;
        objectSlotSizeY = objectSlotSizeY * trueJiventoryLength + UIdist.object.marge;

        if(lab.level >= 3 && lab.cancaSize.x < lab.grid.x * gridsize_x + gridsize_x){
          lab.cancaSize.x += objectSlotSizeX;
          resizeCanvas(lab.cancaSize.x, lab.cancaSize.y);
        }
      }
      
      textStyle(BOLD);
      //Affichage object 1
      if(ObjectShop[0][1] == true){
          //slot
        fill(190);
        rect(
          shop.distance.slot.x,
          shop.distance.slot.y,
          shop.slot.width,
          shop.slot.height
        );
  
          //object
        fill(0);
        image(
          UIasset.inInvent.river.palmes,
          shop.distance.object - shop.object.sizeX / 2,
          shop.distance.slot.y + shop.object.sizeY / 2
        );
        /*
        rect(
          shop.distance.object - shop.object.sizeX / 2,
          shop.distance.slot.y + shop.object.sizeY / 2,
          shop.object.sizeX,
          shop.object.sizeY
        );
        */
  
          //titre
        textAlign(CENTER, CENTER);
        textSize(30);
        text(ObjectShop[0][2], shop.distance.object, height / 2); 
  
          //description
        textAlign(CENTER, TOP);
        textSize(10);
        text('Si vous croisez des requin,\nappel moi', shop.distance.object, shop.distance.description);
  
          //prix
        textAlign(CENTER, BOTTOM);
        textSize(40);
        text(ObjectShop[0][0], shop.distance.object, shop.distance.price);
      }
      
      //Affichage object 2
      if(ObjectShop[1][1] == true){
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
          UIasset.inInvent.forest.couteau,
          width / 2 - shop.object.sizeX / 2,
          shop.distance.slot.y + shop.object.sizeY / 2
        );
        /*
        rect(
          width / 2 - shop.object.sizeX / 2,
          shop.distance.slot.y + shop.object.sizeY / 2,
          shop.object.sizeX,
          shop.object.sizeY
        );
        */
  
          //titre
        textAlign(CENTER, CENTER);
        textSize(30);
        text(ObjectShop[1][2], width - width / 2, height / 2);
  
          //description
        textAlign(CENTER, TOP);
        textSize(10);
        text('Pratique pour du saussisson,\nou pas', width - width / 2, shop.distance.description);
  
          //prix
        textAlign(CENTER, BOTTOM);
        textSize(40);
        text(ObjectShop[1][0], width - width / 2, shop.distance.price);
    
      }
  
      //Affichage object 3
      if(ObjectShop[2][1] == true){
          //slot
        fill(190);
        rect(
          width - shop.distance.slot.x - shop.slot.width,
          shop.distance.slot.y,
          shop.slot.width,
          shop.slot.height
        );
  
          //object
        fill(0);
        image(
          UIasset.inInvent.volcano.armure,
          width - shop.distance.object - shop.object.sizeX / 2, 
          shop.distance.slot.y + shop.object.sizeY / 2
        );
        
          //titre
        textAlign(CENTER, CENTER);
        textSize(30);
        text(ObjectShop[2][2], width - shop.distance.object, height / 2);
  
          //description
        textAlign(CENTER, TOP);
        textSize(10);
        text('Avec une isolation parfaite\ncontre les coup de chaud', width - shop.distance.object, shop.distance.description);
      
          //prix
        textAlign(CENTER, BOTTOM);
        textSize(40);
        text(ObjectShop[2][0], width - shop.distance.object, shop.distance.price);
      }
  
      Interface();
    }
    function ShopLevel6(){
      
      //Resize le canva si il y a quelque chose dans l'inventaire
      if(j.moneynbr > 0 || Jiventory.length - 1 > 0){
        //Calcule de distance
          //x
        const objectSlotSizeX = 2 * UIdist.object.marge + UIdist.object.size;
          //y
        let objectSlotSizeY = UIdist.object.marge + UIdist.object.size;
        const trueJiventoryLength = Jiventory.length - 1;
        objectSlotSizeY = objectSlotSizeY * trueJiventoryLength + UIdist.object.marge;

        if(lab.level >= 3 && lab.cancaSize.x < lab.grid.x * gridsize_x + gridsize_x){
          lab.cancaSize.x += objectSlotSizeX;
          resizeCanvas(lab.cancaSize.x, lab.cancaSize.y);
        }
      }
      
      textStyle(BOLD);
      //Affichage object 1
      if(ObjectShop[0][1] == true){
          //slot
        fill(190);
        rect(
          shop.distance.slot.x,
          shop.distance.slot.y,
          shop.slot.width,
          shop.slot.height
        );
  
          //object
        fill(0);
        image(
          UIasset.inInvent.river.palmes,
          shop.distance.object - shop.object.sizeX / 2,
          shop.distance.slot.y + shop.object.sizeY / 2
        );
  
          //titre
        textAlign(CENTER, CENTER);
        textSize(30);
        text('Palmes', shop.distance.object, height / 2); 
  
          //description
        textAlign(CENTER, TOP);
        textSize(10);
        text('Si vous croisez des requin,\nappel moi', shop.distance.object, shop.distance.description);
  
          //prix
        textAlign(CENTER, BOTTOM);
        textSize(40);
        text(ObjectShop[0][0], shop.distance.object, shop.distance.price);
      }
      
      //Affichage object 2
      if(ObjectShop[1][1] == true){
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
          UIasset.inInvent.forest.couteau,
          width / 2 - shop.object.sizeX / 2,
          shop.distance.slot.y + shop.object.sizeY / 2
        );

          //titre
        textAlign(CENTER, CENTER);
        textSize(30);
        text('Couteau', width - width / 2, height / 2);
  
          //description
        textAlign(CENTER, TOP);
        textSize(10);
        text('Pratique pour du saussisson,\nou pas', width - width / 2, shop.distance.description);
  
          //prix
        textAlign(CENTER, BOTTOM);
        textSize(40);
        text(ObjectShop[1][0], width - width / 2, shop.distance.price);
    
      }
  
      //Affichage object 3
      if(ObjectShop[2][1] == true){
          //slot
        fill(190);
        rect(
          width - shop.distance.slot.x - shop.slot.width,
          shop.distance.slot.y,
          shop.slot.width,
          shop.slot.height
        );
  
          //object
        fill(0);
        image(
          UIasset.inInvent.key.Rkeyy,
          width - shop.distance.object - shop.object.sizeX / 2, 
          shop.distance.slot.y + shop.object.sizeY / 2
        );
  
          //titre
        textAlign(CENTER, CENTER);
        textSize(30);
        text('Redkey', width - shop.distance.object, height / 2);
  
          //description
        textAlign(CENTER, TOP);
        textSize(10);
        text('Ça dois surement sevir a\nquelque chose', width - shop.distance.object, shop.distance.description);
      
          //prix
        textAlign(CENTER, BOTTOM);
        textSize(40);
        text(ObjectShop[2][0], width - shop.distance.object, shop.distance.price);
      }
  
      Interface();
    }

  
    //Affichage de l'interface
    function Interface(){
      //Affichage de la barre d'inventaire
      if(j.moneynbr > 0 || Jiventory.length - 1 > 0){
        //Calcule de distance
          //x
        const objectSlotSizeX = 2 * UIdist.object.marge + UIdist.object.size;
          //y
        let objectSlotSizeY = UIdist.object.marge + UIdist.object.size;
        const trueJiventoryLength = Jiventory.length - 1;
        objectSlotSizeY = objectSlotSizeY * trueJiventoryLength + UIdist.object.marge;

        if(lab.level >= 3 && lab.cancaSize.x < lab.grid.x * gridsize_x + gridsize_x){
          lab.cancaSize.x += objectSlotSizeX;
          resizeCanvas(lab.cancaSize.x, lab.cancaSize.y);
        }
        
        //Affichage des slot
        fill(255);
        rect(
          lab.grid.x * gridsize_x,
          0,
          objectSlotSizeX,
          height
        );
      }

      //Argent
      if(j.moneynbr > 0){
        textStyle(BOLD);
        textAlign(LEFT, TOP);
        textSize(20);
        fill(0);
  
        text(j.moneynbr + "o", lab.grid.x * gridsize_x + UIdist.object.marge, UIdist.object.marge);

        //L'argent est bien afficher
        if(UIdist.money.ON == false){
          UIdist.money.ON = true;
        }
      }
  
      //Objet
      if(Jiventory.length - 1 >= 1){

        //Initialiser les position pour le cas des objets
        UIdist.object.x = lab.grid.x * gridsize_x;
        UIdist.object.y = 0;
        
        //Replacer la barre d'inventaire si l'argent est afficher
        if(UIdist.money.ON == true){
          UIdist.object.y += UIdist.money.height + UIdist.space.betweenUI;
        }
        
        //Afficher les objets dans les slot
        Jiventory.forEach((item, index, Jiventory) => {
          if(item == ".Palmes"){
            fill(0, 0, 200);
            image(
              UIasset.inInvent.river.palmes,
              UIdist.object.x + UIdist.object.marge,
              UIdist.object.y + UIdist.object.marge
            );
          }else if(item == "R - baaton" ||item == "R - baton"){
            fill(0, 0, 150);
            image(
              UIasset.inInvent.river.baton,
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
          }else if(item == "R - cuir"){
            fill(0, 0, 150);
            image(
              UIasset.inInvent.river.cuir,
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
              UIasset.inInvent.forest.couteau,
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
              UIasset.inInvent.forest.fer,
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
              UIasset.inInvent.forest.baton,
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
          }else if(item == ".Armure"){
            fill(0, 200, 0);
            image(
              UIasset.inInvent.volcano.armure,
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
          }else if(item == "V - fer"){
            fill(0, 150, 0);
            image(
              UIasset.inInvent.volcano.fer,
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
          }else if(item == "V - verre"){
            fill(0, 150, 0);
            image(
              UIasset.inInvent.volcano.verre,
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
            if(j.permaObject.SRkeyy == true){
              fill(120, 0, 0);
              image(
                UIasset.inInvent.key.SRkeyy,
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
            
            }else{
              fill(120, 0, 0);
              image(
                UIasset.inInvent.key.Rkeyy,
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
          }else if(item == ".GreenKey"){
            fill(0, 120, 0);
            image(
              UIasset.inInvent.key.Gkeyy,
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
              UIasset.inInvent.key.Ykeyy,
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
          }else if(item == "r - baton" || item == "r - baaton" || item == "r - baaaton"){
            fill(120, 120, 0);
            image(
              UIasset.inInvent.key.mat.Rstick,
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
          }else if(item == "r - anneau"){
            fill(120, 120, 0);
            image(
              UIasset.inInvent.key.mat.Rring,
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
    function Level_1() {
      Leg_Zone();
      
      Leg_Wall();

      fill(255);
      rect(gridsize_x * 3 + wall.Width, gridsize_y * 4  + wall.Height, gridsize_x * 2, gridsize_y);

      Leg_Notice();

      Interface();
    }
    function Level9() {
      textSize(50);
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      text("Merci d'avoir joué !!", width / 2, height / 2);
      
      textAlign(LEFT, BOTTOM);
      textSize(12);
      text("Insta : jyrul.games\nBehance : Elias Rochelle", 20, height - 20);
      text("Nombre de déplacement :\n" + j.nobOfAction, 20, 50);

      textAlign(CENTER, CENTER);
      textSize(40);
      text("↻", 16 * gridsize_x + gridsize_x / 2, 7 * gridsize_y + gridsize_y / 2);
    }
    function Level8() {
      Leg_Zone();
      Leg_Teleport();
      
      Leg_Wall();
      Leg_Key();

      Leg_Notice();

      Interface();
    }
    function Level7() {
      //Zone
      Leg_Zone();
  
      //Cases
      Leg_Switch();
      Leg_Teleport();
      Leg_ElectricInterupt();
      Leg_Convertizer();
      Leg_Shop();
  
      //M du magasin
      fill(0);
      textSize(40);
      textAlign(CENTER, CENTER);
      text('M', Shop[0] * gridsize_x + gridsize_x * 1.5, Shop[1] * gridsize_y + gridsize_y + 3);

      //lignes electriques
      stroke(20);
      line(
        28 * gridsize_x + gridsize_x / 2,
        7 * gridsize_y + gridsize_y / 2 - wall.Height / 2,
        29 * gridsize_x,
        7 * gridsize_y + gridsize_y / 2 - wall.Height / 2
      );
      line(
        28 * gridsize_x + gridsize_x / 2,
        1 * gridsize_y + gridsize_y / 2,
        28 * gridsize_x + gridsize_x / 2,
        14 * gridsize_y + gridsize_y / 2
      );
      line(
        28 * gridsize_x + gridsize_x / 2,
        1 * gridsize_y + gridsize_y / 2 - wall.Height / 2,
        15 * gridsize_x,
        1 * gridsize_y + gridsize_y / 2 - wall.Height / 2
      );
      line(
        28 * gridsize_x + gridsize_x / 2,
        10 * gridsize_y + gridsize_y / 2 - wall.Height / 2,
        24 * gridsize_x,
        10 * gridsize_y + gridsize_y / 2 - wall.Height / 2
      );
      line(
        28 * gridsize_x + gridsize_x / 2,
        14 * gridsize_y + gridsize_y / 2 - wall.Height / 2,
        15 * gridsize_x,
        14 * gridsize_y + gridsize_y / 2 - wall.Height / 2
      );
      
      line(
        5 * gridsize_x + gridsize_x / 2,
        5 * gridsize_y + gridsize_y / 2,
        5 * gridsize_x + gridsize_x / 2,
        14 * gridsize_y + gridsize_y / 2
      );
      line(
        19 * gridsize_x + gridsize_x / 2 - wall.Width / 2,
        3 * gridsize_y + gridsize_y / 2,
        19 * gridsize_x + gridsize_x / 2 - wall.Width / 2,
        5 * gridsize_y  + gridsize_y / 2
      );
      line(
        5 * gridsize_x + gridsize_x / 2,
        5 * gridsize_y + gridsize_y / 2 - wall.Height / 2,
        27 * gridsize_x,
        5 * gridsize_y + gridsize_y / 2 - wall.Height / 2
      );
      line(
        19 * gridsize_x + gridsize_x / 2,
        3 * gridsize_y + gridsize_y / 2,
        20 * gridsize_x,
        3 *gridsize_y + gridsize_y / 2
      );
      line(
        1 * gridsize_x,
        14 * gridsize_y + gridsize_y / 2,
        5 * gridsize_x + gridsize_x / 2,
        14 *gridsize_y + gridsize_y / 2
      );

      //murs a sens unique
      noFill();
      stroke(20);
      triangle(
        20 * gridsize_x - gridsize_x / 4,
        1 * gridsize_y + gridsize_y / 2,
        
        19 * gridsize_x + gridsize_x / 2,
        2 * gridsize_y - gridsize_y / 4,
        
        19 * gridsize_x + gridsize_x / 2,
        1 * gridsize_y + gridsize_y / 4
      );
      triangle(
        9 * gridsize_x - gridsize_x / 4,
        2 * gridsize_y + gridsize_y / 2,
        
        8 * gridsize_x + gridsize_x / 2,
        3 * gridsize_y - gridsize_y / 4,
        
        8 * gridsize_x + gridsize_x / 2,
        2 * gridsize_y + gridsize_y / 4
      );
      triangle(
        12 * gridsize_x + gridsize_x / 4,
        6 * gridsize_y + gridsize_y / 2,
        
        12 * gridsize_x + gridsize_x / 2,
        6 * gridsize_y + gridsize_y / 4,
        
        13 * gridsize_x - gridsize_x / 4,
        6 * gridsize_y + gridsize_y / 2
      );
      triangle(
        1 * gridsize_x + gridsize_x / 4,
        5 * gridsize_y + gridsize_y / 2,
        
        1 * gridsize_x + gridsize_x / 2,
        5 * gridsize_y + gridsize_y / 4,
        
        2 * gridsize_x - gridsize_x / 4,
        5 * gridsize_y + gridsize_y / 2
      );
      triangle(
        20 * gridsize_x + gridsize_x / 4,
        7 * gridsize_y + gridsize_y / 2,
        
        20 * gridsize_x + gridsize_x / 2 ,
        8 * gridsize_y - gridsize_y / 4,
        
        20 * gridsize_x + gridsize_x / 2,
        7 * gridsize_y + gridsize_y / 4
      );
      triangle(
        19 * gridsize_x + gridsize_x / 4,
        14 * gridsize_y + gridsize_y / 2,
        
        19 * gridsize_x + gridsize_x / 2 ,
        15 * gridsize_y - gridsize_y / 4,
        
        19 * gridsize_x + gridsize_x / 2,
        14 * gridsize_y + gridsize_y / 4
      );
      triangle(
        4 * gridsize_x + gridsize_x / 4,
        11 * gridsize_y + gridsize_y / 2,
        
        4 * gridsize_x + gridsize_x / 2,
        12 * gridsize_y - gridsize_y / 4,
        
        5 * gridsize_x - gridsize_x / 4,
        11 * gridsize_y + gridsize_y / 2
      );
      triangle(
        6 * gridsize_x + gridsize_x / 4,
        10 * gridsize_y + gridsize_y / 2,
        
        6 * gridsize_x + gridsize_x / 2,
        11 * gridsize_y - gridsize_y / 4,
        
        7 * gridsize_x - gridsize_x / 4,
        10 * gridsize_y + gridsize_y / 2
      );
      noStroke();

      //Traits
      Leg_Wall();
      Leg_WallSwitch();
      Leg_ElectricDoor();
      
      //Objets
      Leg_ObjectZone();
      Leg_MoneyShop();
      Leg_Key();
  
      //UI
      Interface();
    }
    function Level6() {
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
      
      noFill();
      stroke(20);
      triangle(
        3 * gridsize_x + gridsize_x / 2,
        6 * gridsize_y + gridsize_y / 4,
        
        4 * gridsize_x - gridsize_x / 4,
        6 * gridsize_y + gridsize_y / 2,
        
        3 * gridsize_x + gridsize_x / 2,
        7 * gridsize_y - gridsize_y / 4
      );
      noStroke();

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

      Interface();
    }
    
    
    //Control & Intéraction
    function keyTyped() {
  
      //Game Mode
      if(lab.state.game == true){
       
        //Quelle est la direction prise ?
        optionright = false;
        optionleft = false;
        optionup = false;
        optiondown = false;

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
                  if (Jiventory[index] != KeyDoor[i][4] || Jiventory[index]) {
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
            if (lab.level < 9) {
              j.nobOfAction += 1;
            }
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
            if (lab.level < 9) {
              j.nobOfAction += 1;
            }
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
            if (lab.level < 9) {
              j.nobOfAction += 1;
            }
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
        
                KeyDoor[index][1] * gridsize_y <= sprite.y - gridsize_y / 2 + 1 &&
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
            if (lab.level < 9) {
              j.nobOfAction += 1;
            }
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
      
        //Condition de changement de niveau
        if(lab.level == 8 && j.x == 13 && j.y == 10){
          lab.preloadlevel = true;
          lab.level = -1;
        }else if(lab.is.goBack == true && j.x == lab.enter.x - 1 && j.y == lab.enter.y){
          lab.level -= 1;
          lab.preloadlevel = true;
          lab.state.levelDown = true;
          if(lab.level == -2){
            lab.level = 8;
          }
        }else if (
          j.x == -1 ||
          j.y == -1 ||
          j.x == lab.grid.x ||
          j.y == lab.grid.y
        ) {
          lab.level += 1;
          lab.preloadlevel = true;
        }

        //Recommencer
        if(lab.level == 9 && j.x == 16 && j.y == 7){
          lab.preloadlevel = true;
          lab.level = 0;
          lab.state.game = false;
        }

        //////// ////////
      
        //Zone
        if(lab.is.Forest || lab.is.River || lab.is.Volcano){
          let zonemap = ZoneTab[j.y][j.x];
          switch (zonemap) {
            case "R":
              if (j.go.river == false) {
                goBack();
              }
              break;
            case "F":
              if (j.go.forest == false) {
                goBack();
              }
              break;
            case "V":
              if (j.go.volcano == false) {
                goBack();
              }
              break;
          }
        }

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
              ElectricInterupt[index][2] = true;            }
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
      
        //Notice
        if(lab.is.Notice == true){
          Notice.forEach((item, index, Notice) => {
            if (j.x == Notice[index][0] && j.y == Notice[index][1]) {
              if(Notice[index][3] == 9){
                Notice[index][3] = 0;
              }
              if(key === "p"){
                Notice[index][3] += 1;
              }
            }else if(lab.level == 8 || Notice[index][3] > 0 || j.x != Notice[index][0] || j.y != Notice[index][1]){
              Notice[index][3] = 0;
            }
            });
        }

        //////// ////////
        
        //Shop
        if (lab.is.Shop == true){
          //Entrer dans le Shop
          if(j.x == Shop[4] && j.y == Shop[5]){
            Shop[3] = true;
            lab.state.game = false;
            //Nouvelle position pour la sortie
            if(Shop[6] == 1){
              j.y -= 1;
            }else if(Shop[6] == 2){
              j.x -= 1;
            }else if(Shop[6] == 3){
              j.y += 1;
            }else if(Shop[6] == 4){
              j.x += 1;
            }
          }
  
          //Gagner de l'argent
          MoneyShop.forEach((item, index, MoneyShop) => {
            if(MoneyShop[index][3] == true && j.x == MoneyShop[index][0] && j.y == MoneyShop[index][1]){
              MoneyShop[index][3] = false;
              j.moneynbr += MoneyShop[index][2];
            }
          });
        }
  
        JiventoryManager();
      }
  
      //Shop Mode
      else if(lab.is.Shop == true && Shop[3] == true){
        //Quitter le Shop
        if (key === "p"){
          Shop[3] = false;
          lab.state.game = true;
        }
      }
  
      //Édition de labyrinthe
      else if(lab.allowToEdit == true){
        //quitter
      if (key === "2" && lab.state.edition == true){
        lab.state.edition = false;
      }
        //entrer
      if (key === "2"&& lab.state.edition == false){
        lab.state.edition = true;
      }

        //mode de peinture
      if(lab.state.edition == true){
        switch (key) {
          //0 mur
          case "y":
            lab.paintvalue = "00";
            break;
          
          //1 mur
          case "a":
            lab.paintvalue = "01";
            break;
          case "z":
            lab.paintvalue = "02";
            break;
          case "e":
            lab.paintvalue = "03";
            break;
          case "r":
            lab.paintvalue = "04";
            break;

          //2 murs
          case "q":
            lab.paintvalue = "07";
            break;
          case "s":
            lab.paintvalue = "08";
            break;
          case "d":
            lab.paintvalue = "09";
            break;
          case "f":
            lab.paintvalue = "10";
            break;
          
          case "h":
            lab.paintvalue = "05";
            break;
          case "j":
            lab.paintvalue = "06";
            break;
        
          //3 murs
          case "w":
            lab.paintvalue = "11";
            break;
          case "x":
            lab.paintvalue = "12";
            break;
          case "c":
            lab.paintvalue = "13";
            break;
          case "v":
            lab.paintvalue = "14";
            break;
        }
        
        console.log(lab.paintvalue);

        //Envoyer à la console
        if(key === "n"){
          console.log(WallTab);
        }
      }      
      }

      //Quitter l'écran titre
      else{
        if(key === "p"){
          lab.state.game = true;
        }
      }

      //Forcer le Switch entre Shop <-> Game
      if (key === "4" && Shop[3] == false){
        Shop[3] = true;
        lab.state.game = false;
      }else if (key === "4" && Shop[3] == true){
        Shop[3] = false;
        lab.state.game = true;
      }
      
    }
    function mouseClicked(){
      //Shop
      if(Shop[3] == true){
        
        //Acheter des trucs
          //object 1
        if(
          mouseX >= shop.distance.slot.x &&
          mouseX <= shop.distance.slot.x + shop.slot.width &&
          mouseY >= height / 3 &&
          mouseY <= height / 3 + shop.slot.height &&
          j.moneynbr >= ObjectShop[0][0] &&
          ObjectShop[0][1] == true
        ){
          //Gestion du magasin et de l'argent
          ObjectShop[0][1] = false;
          j.moneynbr -= ObjectShop[0][0];
    
          //Gain de l'objet
          append(Jiventory, ObjectShop[0][2]);
          Jiventory = sort(Jiventory, Jiventory.length);
          j.go.river = true;
        }
    
          //object 2
        if(
          mouseX >= width / 2 - shop.slot.width / 2 &&
          mouseX <= width / 2 + shop.slot.width / 2 &&
          mouseY >= height / 3 &&
          mouseY <= height / 3 + shop.slot.height &&
          j.moneynbr >= ObjectShop[1][0] &&
          ObjectShop[1][1] == true
        ){
          //Gestion du magasin et de l'argent
          ObjectShop[1][1] = false;
          j.moneynbr -= ObjectShop[1][0];
    
          //Gain de l'objet
          append(Jiventory, ObjectShop[1][2]);
          Jiventory = sort(Jiventory, Jiventory.length);
          j.go.forest = true;
        }
    
    
          //object 3
        if(
          mouseX >= width - shop.distance.slot.x - shop.slot.width &&
          mouseX <= width - shop.distance.slot.x &&
          mouseY >= height / 3 &&
          mouseY <= height / 3 + shop.slot.height &&
          j.moneynbr >= ObjectShop[2][0] &&
          ObjectShop[2][1] == true
        ){
          //Gestion du magasin et de l'argent
          ObjectShop[2][1] = false;
          j.moneynbr -= ObjectShop[2][0];
      
          //Gain de l'objet
          append(Jiventory, ObjectShop[2][2]);
          Jiventory = sort(Jiventory, Jiventory.length);
          j.go.volcano = true;
        }
      }
    }  
    function mousePressed(){
      //Edition
      if(lab.allowToEdit == true && lab.state.edition == true){
        let x = 0;
        let y = 0;
        
        //Trouver le x de la souris
        for (let index = 0; index < WallTab[0].length; index++) {
          const indexx = index + 1;
          if(mouseX >= gridsize_x * index && mouseX < gridsize_x * indexx){
            x = index;
          } 
        }

        //Trouver le y de la souris
        for (let index = 0; index < WallTab.length; index++) {
          const indexx = index + 1;
          if(mouseY >= gridsize_y * index && mouseY < gridsize_y * indexx){
            y = index;
          } 
        }

        //Changer la valeur de la case dans le WallTab
        WallTab[y][x] = lab.paintvalue;
      }
    }


    //Gestion d'Inventaire
    function JiventoryManager(){
      //Keyobject
      if (lab.is.Key == true) {
        KeyObject.forEach((item, index, KeyObject) => {
          if (KeyObject[index][2] == true) {
            if (j.x == KeyObject[index][0] && j.y == KeyObject[index][1]) {
              append(Jiventory, KeyObject[index][3]);
              KeyObject[index][2] = false;
              Jiventory= sort(Jiventory, Jiventory.length);
            }
          }
        });
      }

      //Keymat
      if(lab.is.PermaKey == true && lab.is.Key == true){
        KeyMat.forEach((item, index, KeyMat) => {
          if (KeyMat[index][2] == true) {
            if (j.x == KeyMat[index][0] && j.y == KeyMat[index][1]) {
              append(Jiventory, KeyMat[index][3]);
              KeyMat[index][2] = false;
              Jiventory = sort(Jiventory, Jiventory.length);
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
          }
        });
      }
      
      //Convertizer palme
      if (
        lab.is.Convertizer == true &&
        lab.is.River == true &&
        j.go.river == false
      ) {
        let nbrOfRObject = 0;
        Convertizer.forEach((item, index, Convertizer) => {
          //Coordonée du joueur sur la case
          if (j.x == Convertizer[index][0] && j.y == Convertizer[index][1]) {
            //Check s'il a tout les objets
            Jiventory.forEach((item, index, Jiventory) => {
              if (Jiventory[index] == "R - cuir") {
                nbrOfRObject += 1;
              }else if (Jiventory[index] == "R - baton") {
                nbrOfRObject += 1;
              }else if (Jiventory[index] == "R - baaton") {
                nbrOfRObject += 1;
              }
            });

            //Si oui, alors on les transforme en palmes
            if(nbrOfRObject == 3){
              const findIndexObject = (element) => element > "R";
              let idObject = Jiventory.findIndex(findIndexObject);

              Jiventory.splice(idObject, 3, ".Palmes");
              Jiventory = sort(Jiventory, Jiventory.length);

              j.go.river = true;
            }
          }
        });
      }
    
      //Convertizer couteau
      if (
        lab.is.Convertizer == true &&
        lab.is.Forest == true &&
        j.go.forest == false
      ) {
        let nbrOfFObject = 0;
        Convertizer.forEach((item, index, Convertizer) => {
          //Coordonée du joueur sur la case
          if (j.x == Convertizer[index][0] && j.y == Convertizer[index][1]) {
            Jiventory.forEach((item, index, Jiventory) => {
              //Check s'il a tout les objets
              if (Jiventory[index] == "F - baton") {
                nbrOfFObject += 1;
              }else if (Jiventory[index] == "F - fer") {
                nbrOfFObject += 1;
              }
            });

            if(nbrOfFObject == 2){
              const findIndexObject = (element) => element > "F";
              let idObject = Jiventory.findIndex(findIndexObject);

              Jiventory.splice(idObject, 2, ".Couteau");
              Jiventory = sort(Jiventory, Jiventory.length);

              j.go.forest = true;              
            }
          }
        });
      }

      //Convertizer SRedKey
      if (
        lab.is.Convertizer == true &&
        lab.is.Key == true
      ) {
        let nbrOfSRObject = 0;
        Convertizer.forEach((item, index, Convertizer) => {
          //Coordonée du joueur sur la case
          if (j.x == Convertizer[index][0] && j.y == Convertizer[index][1]) {
            Jiventory.forEach((item, index, Jiventory) => {
              //Check s'il a tout les objets
              if (Jiventory[index] == "r - baton") {
                nbrOfSRObject += 1;
              }else if (Jiventory[index] == "r - baaton") {
                nbrOfSRObject += 1;
              }else if (Jiventory[index] == "r - baaton") {
                nbrOfSRObject += 1;
              }else if (Jiventory[index] == "r - anneau") {
                nbrOfSRObject += 1;
              }
            });

            //Si oui, alors on les transforme en palmes
            if (nbrOfSRObject == 4) {
              j.permaObject.SRkeyy = true;

              const findIndexObject = (element) => element > "r";
              let idObject = Jiventory.findIndex(findIndexObject);

              Jiventory.splice(idObject, 4, ".RedKey");
              Jiventory = sort(Jiventory, Jiventory.length);
            }
          }
        });
      }

      //PermaObject
        //SRKeyy
      if(j.permaObject.SRkeyy == true && lab.preloadlevel == true){
        let give = true;
        Jiventory.forEach((item, index, Jiventory) => {
          if(item == ".RedKey"){give = false;}
        });

        if(give == true){
          append(Jiventory, ".RedKey");
          Jiventory = sort(Jiventory, Jiventory.length);
        }
      }
    }
  
    //Optimisation
    function goBack() {
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

    //656
    //541
    //576
    //1102
    //1257
    //1539
    //1683
    //2361
    //2906
    //3672
    //Ajouté la connectivité entre les niveaux