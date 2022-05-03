/***********************************************************************************
  Make Your Cute
  by Sherry Lam

  Uses the p5.2DAdventure.js class 
  
------------------------------------------------------------------------------------
	To use:
	Add this line to the index.html

  <script src="p5.2DAdventure.js"></script>
***********************************************************************************/

// adventure manager global  
var adventureManager;

// Clickables: the manager class
var clickablesManager;    // the manager class
var clickables;           // an array of clickable objects


// indexes into the clickable array (constants) 
const cl_startScenario = 0;

// room indices - look at adventureManager
const startScreen = 3;

//chicken
var chickenimg = [];
var chickenAssets = ['chicken_body', 'chicken_tail1', 'chicken_tail2', 'chicken_tail3', 'chicken_wing1', 'chicken_wing2', 'chicken_wing3',
                    'chicken_feet1', 'chicken_feet2','chicken_feet3', 'chicken_comb1', 'chicken_comb2', 'chicken_comb3'];

//blob
var blobimg = [];
var blobAssets = ['blob_body1', 'blob_body2', 'blob_body3', 'blob_eye1', 'blob_eye2', 'blob_eye3'];

//cat
var catimg = [];
var catAssets = [];

//bunny
var bunnyimg = [];
var bunnyAssets = [];

//index
var topindex = 0;
var midindex = 0;
var botindex = 0;

var combindex = 10;
var tailindex = 1;
var feetindex = 7;
var wingindex = 4;

var blob_bodyindex = 0;
var blob_eyeindex = 3;

var cat_eyeindex = 4;
var cat_noseindex = 7;
var cat_mouthindex = 10;
var cat_stripe = 0;

var bunny_eyeindex = 4;
var bunny_noseindex = 7;
var bunny_mouthindex = 10;

var button;
var button_hover;

var animateX = 0;
var animateY = 0;


// Allocate Adventure Manager with states table and interaction tables
function preload() {
    
    //button
    button = loadImage('assets/button.svg');
    button_hover = loadImage('assets/button_hover.svg');
    
    //chicken assets
    for (var i = 0; i < chickenAssets.length; i++) {
        chickenimg[i] = loadImage('assets/' + chickenAssets[i] + '.png');
    }
    
    //blob assets
    for (var i = 0; i < blobAssets.length; i++) {
        blobimg[i] = loadImage('assets/' + blobAssets[i] + '.png');
    }
    
    //cat assets
    for (var i = 1; i < 10; i++) {
        catimg[i-1] = loadImage('assets/cat-0' + i + '.png');
    }
    for (var i = 10; i < 14; i++) {
        catimg[i-1] = loadImage('assets/cat-' + i + '.png');
    }
    for (var i = 1; i < 4; i++) {
        catimg[i+13] = loadImage('assets/cat_stripe-0' + i + '.png');
    }
    
    //bunny assets
    for (var i = 1; i < 10; i++) {
        bunnyimg[i-1] = loadImage('assets/bunny-0' + i + '.png');
    }
    for (var i = 10; i < 14; i++) {
        bunnyimg[i-1] = loadImage('assets/bunny-' + i + '.png');
    }

  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv', 'data/clickableLayout.csv');
}

// Setup the adventure manager
function setup() {
  createCanvas(displayWidth, displayHeight);
    canvas = createGraphics(200, 200);
    //canvas.background(32);

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // this is optional but will manage turning visibility of buttons on/off
  // based on the state name in the clickableLayout
  adventureManager.setClickableManager(clickablesManager);

  // This will load the images, go through state and interation tables, etc
  adventureManager.setup();

  // load all text screens
  loadAllText();

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 
    
//    const firebaseConfig = {
//    apiKey: "AIzaSyAnGGPoy1tTJAVTIyL5AKpigEjohvWVzxg",
//    authDomain: "projecttest-25ecc.firebaseapp.com",
//    projectId: "projecttest-25ecc",
//    storageBucket: "projecttest-25ecc.appspot.com",
//    messagingSenderId: "173764972374",
//    appId: "1:173764972374:web:d13b554d9b252b98ef10f7",
//    measurementId: "G-7ZD33Z82ST"
//  };
//
//  // Initialize Firebase
//  firebase.initializeApp(firebaseConfig);
//    
//    database = firebase.database();

  rectMode(CENTER);
 

  fs = fullscreen();
}

// Adventure manager handles it all!
function draw() {
    //background('#151515');
  // draws background rooms and handles movement from one to another
  adventureManager.draw();
  
  // draw the p5.clickables, in front of the mazes but behind the sprites 
  clickablesManager.draw();
    
    circle(animateX + 100, animateY + 100,100);
    
    if(animateY !== 500 && animateX == 0) {
      animateY++;
      animateX = 0;
    }else if(animateY == 500 && animateX !== 500){
      animateY = 500;
      animateX++;
    }else if(animateY !== 0 && animateX == 500) {
      animateX = 500;
      animateY--;
    }else{
      animateX--;
      animateY = 0;
    }

    line(width/2,0,width/2,height);
    
}

//function windowResized() {
//  resizeCanvas(windowWidth, windowHeight);
//}

// pass to adventure manager, this do the draw / undraw events
function keyPressed() {
  // toggle fullscreen mode
  if( key === 'f') {
    fs = fullscreen();
    fullscreen(!fs);
    return;
  }
    
//    if( key === 's') {
//        //save('myCanvas.pdf');
//        makeScreenshot;
//  }
    
    if(key === 'r') {
        window.location.reload();
    }

  // dispatch all keys to adventure manager
  adventureManager.keyPressed(key); 
}

function mouseReleased() {
  // dispatch all mouse events to adventure manager
  adventureManager.mouseReleased();
}

function mousePressed() {
    //save('myCanvas.pdf');
}

//-------------- CLICKABLE CODE  ---------------//

function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].resize(150, 65);
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
      //clickables[i].fitImage = true;
      //clickables[i].imageScale = 2;
  }

  // we do specific callbacks for each clickable
  clickables[0].onPress = clickableButtonPressed;
    clickables[1].onPress = clickableButtonPressed;
    clickables[2].onPress = clickableButtonPressed;
    clickables[3].onPress = clickableButtonPressed;
    clickables[4].onPress = clickableButtonPressed;
    
    clickables[14].onPress = save_Canvas;
    clickables[15].onPress = subtractCombIndex;
    clickables[16].onPress = addCombIndex;
    clickables[17].onPress = subtractTailIndex;
    clickables[18].onPress = addTailIndex;
    clickables[19].onPress = subtractFeetIndex;
    clickables[20].onPress = addFeetIndex;
    clickables[21].onPress = printCanvas;
    
    clickables[25].onPress = save_Canvas;
    clickables[26].onPress = subtractBlobIndex;
    clickables[27].onPress = addBlobIndex;
    clickables[28].onPress = subtractBlobEyeIndex;
    clickables[29].onPress = addBlobEyeIndex;
    clickables[30].onPress = clickableButtonPressed;
    clickables[31].onPress = printCanvas;
    
    clickables[32].onPress = save_Canvas;
    clickables[33].onPress = subtractCatEyeIndex;
    clickables[34].onPress = addCatEyeIndex;
    clickables[35].onPress = subtractCatNoseIndex;
    clickables[36].onPress = addCatNoseIndex;
    clickables[37].onPress = subtractCatMouthIndex;
    clickables[38].onPress = addCatMouthIndex;
    //clickables[39].onPress = catstripe;
    //clickables[40].onPress = nocatstripe;
    clickables[41].onPress = clickableButtonPressed;
    clickables[42].onPress = printCanvas;
    
    clickables[43].onPress = save_Canvas;
    clickables[44].onPress = subtractBunnyEyeIndex;
    clickables[45].onPress = addBunnyEyeIndex;
    clickables[46].onPress = subtractBunnyNoseIndex;
    clickables[47].onPress = addBunnyNoseIndex;
    clickables[48].onPress = subtractBunnyMouthIndex;
    clickables[49].onPress = addBunnyMouthIndex;
    clickables[50].onPress = clickableButtonPressed;
    clickables[51].onPress = printCanvas;

}

// tint when mouse is over
clickableButtonHover = function () {
    this.image = button_hover;
  //this.color = "#00000090";
  this.noTint = false;
    this.tint = "#00000090";
  this.strokeWeight = 0;
  //sthis.textColor = "#FFFFFF";
}

// color a light gray if off
clickableButtonOnOutside = function () {
    this.image = button;
  // backto our gray color
  //this.color = "#00000040";
    this.noTint = false;
  this.strokeWeight = 0;
  this.textFont = "Roboto Slab";
  this.textSize = 30;
  this.textColor = "#ffffff";
}

clickableButtonPressed = function() {
  adventureManager.clickablePressed(this.name);
}

function save_Canvas() {
    //save('img.png');
    let c = get(width/2,height/2, 200, 200);
    canvas.image(c, 0, 0);
    save(canvas, "img.png");
}
printCanvas = function() {
    //this.visible = false;
    let c = get(width/4,height/2, 200, 200);
    canvas.image(c, 0, 0);
    canvas.print();
    //setTimeout(window.print(), 100000);
    //saveCanvas('img.pdf');
}

function reset_Canvas(){
    window.location.reload();
}


//-------------- ROOMS --------------//

// hard-coded text for all the rooms
// the elegant way would be to load from an array
function loadAllText() {
  // go through all states and setup text
  // ONLY call if these are ScenarioRoom
  
// copy the array reference from adventure manager so that code is cleajer
  //scenarioRooms = adventureManager.states;

//  scenarioRooms[startScreen].setText("Who gets ownership?", "Scientists need the help of companies so that Dreamcord can successfully be advertised and distributed to the consumers. Should they... \n\nA. Sell to the Private Dream corps. They will develop the technology often. \nB. Sell to the Government. They want to take advantage of this new technology.");

}

//-------------- SUBCLASSES / YOUR DRAW CODE CAN GO HERE ---------------//

// Instructions screen has a backgrounnd image, loaded from the adventureStates table
// It is sublcassed from PNGRoom, which means all the loading, unloading and drawing of that
// class can be used. We call super() to call the super class's function as needed
class Splash extends PNGRoom {
  // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class constructor to initialize variables in PNGRoom

    this.titleText = "";
    this.bodyText = "";
  }

  // should be called for each room, after adventureManager allocates
  setText( titleText, bodyText ) {
    this.titleText = titleText;
    this.bodyText = bodyText;
    this.drawY = 225;
    this.drawX = 225;
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
    draw() {
      // this calls PNGRoom.draw()
      super.draw();
      
      push();

      background('pink');

      // title box
//      fill(0,0,0,64);
//      noStroke();
//      rect(200, 50, 750, 100, 10);

      // title text
      //fill(255);
      textAlign(CENTER);
      textFont('Roboto Slab');
      textSize(60);

      text('Make Your Cute', width/2 , height/2);
      
      pop();
    }
}

class Buddy extends PNGRoom {
  // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class constructor to initialize variables in PNGRoom
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
    draw() {
      // this calls PNGRoom.draw()
      super.draw();
      
      push();

      // title box
      fill('#EFBDBD');
      noStroke();
      rect(width/2, 100, width - 200, 100, 10);

      // title text
      fill(255);
      textAlign(CENTER);
      textFont('Roboto Slab');
      textSize(60);

      text("Select Your Buddy", width/2 , 125);
      
      pop();
    }
}

class CharactersRoom extends PNGRoom {
  // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class constructor to initialize variables in PNGRoom
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
    draw() {
      // this calls PNGRoom.draw()
      super.draw();
      
      push();

      // title box
      fill('#EFBDBD');
      noStroke();
      rect(50, 50, 900, 100, 10);

      // title text
      fill(255);
      textAlign(CENTER);
      textFont('Roboto Slab');
      textSize(60);

      text("Characters", 500 , 125);

      // body text
      fill(255);
      textAlign(LEFT);
      textFont('Roboto Slab');
      textSize(20);
      textLeading(26);


      //character 1
      imageMode(CENTER);
      characterImages[chracterIndex].resize(75,0);
      image(characterImages[chracterIndex], 337, 250);
        
        //chicken
        image(chickenimg[feetindex], width/2 - 200, 685, 200, 200);
        image(chickenimg[0], width/2 - 200, 500, 200, 200);
        image(chickenimg[tailindex], width/2, 500, 200, 200);
        image(chickenimg[combindex], width/2 - 180, 405, 200, 200);
        image(chickenimg[wingindex], width/2 - 125, 520, 200, 200);

      pop();
    }
}

class Chicken extends PNGRoom {
  // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class constructor to initialize variables in PNGRoom
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
    draw() {
      // this calls PNGRoom.draw()
      super.draw();
      
      push();

      // title box
      fill('#EFBDBD');
      noStroke();
      rect(width/2, 100, 900, 100, 10);

      // title text
      fill(255);
      textAlign(CENTER);
      textFont('Roboto Slab');
      textSize(60);

      text("Customize your chicken buddy!", width/2 , 125);

      // body text
      fill(255);
      textAlign(LEFT);
      textFont('Roboto Slab');
      textSize(20);
      textLeading(26);

        //chicken
        image(chickenimg[feetindex], width/2 - 300, 685, 200, 200);
        image(chickenimg[0], width/2 - 300, 500, 200, 200);
        image(chickenimg[tailindex], width/2 - 100, 500, 200, 200);
        image(chickenimg[combindex], width/2 - 280, 405, 200, 200);
        image(chickenimg[wingindex], width/2 - 225, 520, 200, 200);

      pop();
    }
}
class Chicken2 extends PNGRoom {
  // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class constructor to initialize variables in PNGRoom
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
    draw() {
      // this calls PNGRoom.draw()
      super.draw();
      
      push();

      // title box
      fill('#EFBDBD');
      noStroke();
      rect(50, 50, 900, 100, 10);

      // title text
      fill(255);
      textAlign(CENTER);
      textFont('Roboto Slab');
      textSize(60);

      text("Customize your chicken buddy2!", 500 , 125);

      // body text
      fill(255);
      textAlign(LEFT);
      textFont('Roboto Slab');
      textSize(20);
      textLeading(26);

        //chicken
        image(chickenimg[feetindex], width/2 - 300, 685, 200, 200);
        image(chickenimg[0], width/2 - 300, 500, 200, 200);
        image(chickenimg[tailindex], width/2 - 100, 500, 200, 200);
        image(chickenimg[combindex], width/2 - 280, 405, 200, 200);
        image(chickenimg[wingindex], width/2 - 225, 520, 200, 200);
        
        slider = createSlider(0, 360, 60, 40);
        slider.position(10, 10);
        slider.style('width', '80px');

      pop();
    }
}

class Blobby extends PNGRoom {
  // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class constructor to initialize variables in PNGRoom
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
    draw() {
      // this calls PNGRoom.draw()
      super.draw();
      
      push();

      // title box
      fill('#EFBDBD');
      noStroke();
      rect(width/2, 100, 900, 100, 10);

      // title text
      fill(255);
      textAlign(CENTER);
      textFont('Roboto Slab');
      textSize(60);

      text("Customize your blob buddy!", width/2, 125);

      // body text
      fill(255);
      textAlign(LEFT);
      textFont('Roboto Slab');
      textSize(20);
      textLeading(26);

        //blob
        image(blobimg[blob_bodyindex], width/2 - 300, height/2, 200, 200);
        image(blobimg[blob_eyeindex], width/2 - 250, height/2+50, 100, 100);

      pop();
    }
}

class PrintBlobby extends PNGRoom {
  // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class constructor to initialize variables in PNGRoom
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
    draw() {
      // this calls PNGRoom.draw()
      super.draw();
      
      push();

//      // title box
//      fill(0,0,0,64);
//      noStroke();
//      rect(50, 50, 900, 100, 10);
//
//      // title text
//      fill(255);
//      textAlign(CENTER);
//      textFont('Roboto Slab');
//      textSize(60);
//
//      text("Customize your blob buddy!", 500 , 125);
//
//      // body text
//      fill(255);
//      textAlign(LEFT);
//      textFont('Roboto Slab');
//      textSize(20);
//      textLeading(26);

        //blob
        image(blobimg[blob_bodyindex], 50, 50, 200, 200);
        image(blobimg[blob_eyeindex], 100, 100, 100, 100);

      pop();
    }
}

class Cat extends PNGRoom {
  // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class constructor to initialize variables in PNGRoom
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
    draw() {
      // this calls PNGRoom.draw()
      super.draw();
      
      push();

      // title box
      fill('#EFBDBD');
      noStroke();
      rect(width/2, 100, 900, 100, 10);

      // title text
      fill(255);
      textAlign(CENTER);
      textFont('Roboto Slab');
      textSize(60);

      text("Customize your cat buddy!", width/2, 125);

      // body text
      fill(255);
      textAlign(LEFT);
      textFont('Roboto Slab');
      textSize(20);
      textLeading(26);

        //cat
        image(catimg[1], width/2 - 300, height/2, 200, 200);
        image(catimg[0], width/2 - 350, height/2-65, 200, 200);
        image(catimg[2], width/2 - 220, height/2-50, 200, 200);
        image(catimg[3], width/2 - 298, height/2+45, 200, 200);
        
        image(catimg[cat_eyeindex], width/2 - 350, height/2-50, 200, 200);
        image(catimg[cat_noseindex], width/2 - 350, height/2-40, 200, 200);
        image(catimg[cat_mouthindex], width/2 - 350, height/2-30, 200, 200);

      pop();
    }
}

class PrintCat extends PNGRoom {
  // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class constructor to initialize variables in PNGRoom
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
    draw() {
      // this calls PNGRoom.draw()
      super.draw();
      
      push();

//      // title box
//      fill(0,0,0,64);
//      noStroke();
//      rect(50, 50, 900, 100, 10);
//
//      // title text
//      fill(255);
//      textAlign(CENTER);
//      textFont('Roboto Slab');
//      textSize(60);
//
//      text("Customize your blob buddy!", 500 , 125);
//
//      // body text
//      fill(255);
//      textAlign(LEFT);
//      textFont('Roboto Slab');
//      textSize(20);
//      textLeading(26);

        //cat
        image(catimg[1], 100, 115, 200, 200);
        image(catimg[0], 50, 50, 200, 200);
        image(catimg[2], 180, 65, 200, 200);
        image(catimg[3], 102, 160, 200, 200);
        
        image(catimg[cat_eyeindex], 50, 65, 200, 200);
        image(catimg[cat_noseindex], 50, 75, 200, 200);
        image(catimg[cat_mouthindex], 50, 85, 200, 200);

      pop();
    }
}

class Bunny extends PNGRoom {
  // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class constructor to initialize variables in PNGRoom
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
    draw() {
      // this calls PNGRoom.draw()
      super.draw();
      
      push();

      // title box
      fill('#EFBDBD');
      noStroke();
      rect(width/2, 100, 900, 100, 10);

      // title text
      fill(255);
      textAlign(CENTER);
      textFont('Roboto Slab');
      textSize(60);

      text("Customize your bunny buddy!", width/2, 125);

      // body text
      fill(255);
      textAlign(LEFT);
      textFont('Roboto Slab');
      textSize(20);
      textLeading(26);

        //cat
        image(bunnyimg[3], width/2 - 293, height/2-8, 200, 200);
        image(bunnyimg[0], width/2 - 350, height/2-65, 200, 200);
        image(bunnyimg[1], width/2 - 331, height/2-152, 200, 200);
        image(bunnyimg[2], width/2 - 345, height/2-5, 200, 200);
        
        image(bunnyimg[bunny_eyeindex], width/2 - 350, height/2-65, 200, 200);
        image(bunnyimg[bunny_noseindex], width/2 - 350, height/2-65, 200, 200);
        image(bunnyimg[bunny_mouthindex], width/2 - 350, height/2-65, 200, 200);

      pop();
    }
}

class PrintBunny extends PNGRoom {
  // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class constructor to initialize variables in PNGRoom
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
    draw() {
      // this calls PNGRoom.draw()
      super.draw();
      
      push();

//      // title box
//      fill(0,0,0,64);
//      noStroke();
//      rect(50, 50, 900, 100, 10);
//
//      // title text
//      fill(255);
//      textAlign(CENTER);
//      textFont('Roboto Slab');
//      textSize(60);
//
//      text("Customize your blob buddy!", 500 , 125);
//
//      // body text
//      fill(255);
//      textAlign(LEFT);
//      textFont('Roboto Slab');
//      textSize(20);
//      textLeading(26);

        //bunny
        image(bunnyimg[1], 100, 115, 200, 200);
        image(bunnyimg[0], 50, 50, 200, 200);
        image(bunnyimg[2], 180, 65, 200, 200);
        image(bunnyimg[3], 102, 160, 200, 200);
        
        image(bunnyimg[bunny_eyeindex], 50, 65, 200, 200);
        image(bunnyimg[bunny_noseindex], 50, 75, 200, 200);
        image(bunnyimg[bunny_mouthindex], 50, 85, 200, 200);

      pop();
    }
}