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
var Jiventory =  [""];

/*
00: uldr

01: ldr
02: udr
03: ulr
04: uld

05: lr
06: ud
07: dr
08: ul
09: ur
10: ld

11: u
12: l
13: d
14: r

15: 
*/

var WallTab = [
    ["14", "01", "05", "12", "13", "07", "12"],
    ["13", "06", "13", "14", "03", "03", "12"],
    ["09", "00", "08", "13", "13", "07", "10"],
    ["07", "04", "13", "02", "03", "04", "11"],
    ["11", "09", "00", "08", "13", "09", "10"],
    ["07", "05", "04", "13", "02", "01", "08"],
    ["09", "12", "09", "04", "11", "09", "12"],
]

var TeleportTab = [
    ["o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "a", "o", "o", "o"],
    ["o", "o", "o", "c", "o", "o", "o"],
    ["o", "o", "b", "o", "o", "o", "o"],
    ["a", "o", "o", "o", "b", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "c"],
]

var SwitchTab = [
    ["o", "o", "o", "o", "o", "o", "o"],
    ["s", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "s", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "s"],
    ["o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o"],
    ["o", "s", "o", "o", "s", "o", "o"],
]
let switchpose = false;

var WallSwitchTab = [
    ["oo", "oo", "oo", "oo", "oo", "oo", "oo"],
    ["oo", "oo", "oo", "oo", "oo", "2F", "oo"],
    ["oo", "1F", "oo", "oo", "oo", "oo", "oo"],
    ["oo", "oo", "oo", "oo", "oo", "2T", "oo"],
    ["oo", "oo", "oo", "oo", "oo", "oo", "oo"],
    ["oo", "2F", "1T", "oo", "oo", "oo", "2F"],
    ["oo", "oo", "oo", "2F", "oo", "oo", "oo"],
]

  function setup() {
    createCanvas(399, 399);
  }
  
  
  function draw() {
    let gridsize = width / lab.grid


    //mur coté    
    fill(220),
    noStroke();
    rect(0, 0, width, height);


    //////////  //////////


    //Teleport
    for(let colId = 0; colId < TeleportTab[0].length; colId++){
        for(let rowId = 0; rowId < TeleportTab.length; rowId++){
            let map = TeleportTab[colId][rowId];
            switch(map){
                case "a":
                    fill(100, 0, 100);
                    rect(rowId * gridsize, colId * gridsize, gridsize, gridsize);
                    break;
                case "b":
                    fill(150, 0, 150);
                    rect(rowId * gridsize, colId * gridsize, gridsize, gridsize);
                    break;
                case "c":
                    fill(200, 0, 200);
                    rect(rowId * gridsize, colId * gridsize, gridsize, gridsize);
                    break;
            }
        }
    }

    //Switch
    for(let colId = 0; colId < SwitchTab[0].length; colId++){
        for(let rowId = 0; rowId < SwitchTab.length; rowId++){
            let map = SwitchTab[colId][rowId];
            switch(map){
                case "s":
                    fill(255, 150, 0);
                    rect(rowId * gridsize, colId * gridsize, gridsize, gridsize);
                    break;
                
            }
        }
    }

    
    //////////  //////////
    

    //mur exterieur
    fill(0, 0, 255),
    rect(0, 0, wall.Width * 2, height);
    rect(width, 0, -wall.Width * 2, height);
    rect(0, 0, width, wall.Height * 2);
    rect(0, height, width, -wall.Height * 2);

    fill(220);
    
    rect(lab.enter * gridsize, 0, gridsize, wall.Height * 2);
    rect(lab.exit * gridsize, height, gridsize, -wall.Height * 2);

/*
00: uldr

01: ldr
02: udr
03: ulr
04: uld

05: lr
06: ud
07: dr
08: ul
09: ur
10: ld

11: u
12: l
13: d
14: r

15: 
*/

    //mur intérieur
    fill(0, 0, 255);
    noStroke();

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


    //WallSwitch
    for(let colId = 0; colId < WallSwitchTab[0].length; colId++){
        for(let rowId = 0; rowId < WallSwitchTab.length; rowId++){
            let map = WallSwitchTab[colId][rowId];
            switch(map){
                case "1F":
                    if(switchpose == true){
                        fill(255, 0, 0);
                    }else{
                        fill(0, 255, 0);
                    }
                    rect(rowId * gridsize, colId * gridsize, gridsize, wall.Height);               //mur haut
                    break;
                case "2F":
                    if(switchpose == true){
                        fill(255, 0, 0);
                    }else{
                        fill(0, 255, 0);
                    }
                    rect(rowId * gridsize, colId * gridsize, wall.Width, gridsize);               //mur haut
                    break;
                case "1T":
                    if(switchpose == true){
                        fill(0, 255, 0);
                    }else{
                        fill(255, 0, 0);
                    }
                    rect(rowId * gridsize, colId * gridsize, gridsize, wall.Width);               //mur haut
                    break;
                case "2T":
                    if(switchpose == true){
                        fill(0, 255, 0);
                    }else{
                        fill(255, 0, 0);
                    }
                    rect(rowId * gridsize, colId * gridsize, wall.Width, gridsize);               //mur haut
                    break;
            }
        }
    }


    //////////  //////////

    
    
    let sprite = {
        x:j.x * gridsize + gridsize / 2,
        y:j.y * gridsize + gridsize / 2,
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
      x:j.x * gridsize + gridsize / 2 + lab.enter * gridsize,
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

    if(key === "o"){
        if(j.option.up == true){
            j.y -= 1
        }
        
    }else if(key === "k"){
        if(j.option.left == true){
            j.x -= 1
        }

    }else if(key === "l"){
        if(j.option.down == true){
            j.y += 1
        }

    }else if(key === "m"){
        if(j.option.right == true){
            j.x += 1
        }

    }

    if(j.x == lab.exit && j.y == lab.grid){
        j.x = lab.enter;
        j.y = 0;
    }

    let Switch = SwitchTab[j.y][j.x];
    switch(Switch){
        case "s":
            if(switchpose == true){
                switchpose = false;
            }else{
                switchpose = true;
            }
            break;
    }
}
