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
var clickablesManager; // the manager class
var clickables; // an array of clickable objects


// indexes into the clickable array (constants) 
const cl_startScenario = 0;

// room indices - look at adventureManager
const startScreen = 3;

var titleAnimation = 0;
var speed = 0.5;

//chicken
var chickenimg = [];
var chickenAssets = [];

//blob
var blobimg = [];
var blobAssets = ['blob_body1', 'blob_body2', 'blob_body3', 'blob_eye1', 'blob_eye2', 'blob_eye3'];

//cat
var catimg = [];
var catAssets = [];

//bunny
var bunnyimg = [];
var bunnyAssets = [];

//dog
var dogimg = [];
var dogAssets = [];

//index
var topindex = 0;
var midindex = 0;
var botindex = 0;

var combindex = 10;
var tailindex = 1;
var feetindex = 7;
var wingindex = 4;

var blob_bodyindex = 0;
var blob_eyeindex = 12;

var cat_earindex = 1;
var cat_tailindex = 7;
var cat_eyeindex = 13;
var cat_noseindex = 19;
var cat_mouthindex = 25;
var cat_stripe = 30;

var bunny_earindex = 1
var bunny_eyeindex = 7;
var bunny_noseindex = 13;
var bunny_mouthindex = 19;

var dog_earindex = 1;
var dog_tailindex = 7;
var dog_eyeindex = 13;
var dog_noseindex = 19;
var dog_mouthindex = 25;

var button;
var button_hover;

var flower;
var a = 0;

var animateX = 0;
var animateY = 0;


// Allocate Adventure Manager with states table and interaction tables
function preload() {

    //button
    button = loadImage('assets/button.svg');
    button_hover = loadImage('assets/button_hover.svg');

    //border
    flower = loadImage('assets/flower.png');

    //chicken assets
    for (var i = 1; i < 14; i++) {
        chickenimg[i - 1] = loadImage('assets/chicken-' + i + '.png');
    }

    //blob assets
    for (var i = 1; i < 19; i++) {
        blobimg[i - 1] = loadImage('assets/blob-' + i + '.png');
    }

    //cat assets
    for (var i = 1; i < 32; i++) {
        catimg[i - 1] = loadImage('assets/cat-' + i + '.png');
    }
    for (var i = 1; i < 3; i++) {
        catimg[i + 30] = loadImage('assets/cat_stripe-0' + i + '.png');
    }

    //bunny assets
    for (var i = 1; i < 26; i++) {
        bunnyimg[i - 1] = loadImage('assets/bunny-' + i + '.png');
    }

    //dog assets
    for (var i = 1; i < 32; i++) {
        dogimg[i - 1] = loadImage('assets/dog-' + i + '.png');
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

    resetButton = new Clickable();

    resetButton.onHover = clickableButtonHover;
    resetButton.onOutside = clickableButtonOnOutside;
    resetButton.onPress = reset_Canvas;
    resetButton.resize(150, 65);
    resetButton.locate(width / 2 - 275, height / 2 - 300);
    resetButton.text = "Reset";

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

    if (adventureManager.getStateName() === "Splash" ||
        adventureManager.getStateName() === "Buddy") {
        ;
    } else {
        resetButton.draw();
        
        fill('#EFBDBD');
        textSize(20);
        text("(Your buddy will be printed by our printer boi \n to the right. It will take a couple seconds, so \n please be patient. Thank You!)", width / 2 - 400, height / 2 + 300);
    }

    push();
    translate(50, 50);
    rotate(a);
    image(flower, -25, -25, 50, 50);
    pop();

    push();
    translate(displayWidth - 50, 50);
    rotate(a);
    image(flower, -25, -25, 50, 50);
    pop();

    push();
    translate(displayWidth - 50, displayHeight - 50);
    rotate(a);
    image(flower, -25, -25, 50, 50);
    pop();

    push();
    translate(50, displayHeight - 50);
    rotate(a);
    image(flower, -25, -25, 50, 50);
    pop();

    a = a + 0.01;

    //    circle(animateX + 100, animateY + 100,100);
    //    
    //    if(animateY !== 500 && animateX == 0) {
    //      animateY++;
    //      animateX = 0;
    //    }else if(animateY == 500 && animateX !== 500){
    //      animateY = 500;
    //      animateX++;
    //    }else if(animateY !== 0 && animateX == 500) {
    //      animateX = 500;
    //      animateY--;
    //    }else{
    //      animateX--;
    //      animateY = 0;
    //    }
    //    borderAnimation(25,25);
    //    borderAnimation(25,75);

    //line(width/2,0,width/2,height);
    //    noFill();
    //    rect(width/2 - 200, height/2, 200,200);
    //    ellipse(width/2 - 200, height/2, 200,200);

}

function borderAnimation(x, y) {
    //    strokeWeight(0);
    //    circle(animateX + x, animateY + y,50);

    image(flower, animateX + x, animateY + y, 50, 50);

    if (animateY !== displayHeight - 2 * y && animateX == 0) {
        animateY++;
        animateX = 0;
    } else if (animateY == displayHeight - 2 * y && animateX !== displayWidth - 2 * x) {
        animateY = displayHeight - 2 * y;
        animateX++;
    } else if (animateY !== 0 && animateX == displayWidth - 2 * x) {
        animateX = displayWidth - 2 * x;
        animateY--;
    } else {
        animateX--;
        animateY = 0;
    }
}

//function windowResized() {
//  resizeCanvas(windowWidth, windowHeight);
//}

// pass to adventure manager, this do the draw / undraw events
function keyPressed() {
    // toggle fullscreen mode
    if (key === 'f') {
        fs = fullscreen();
        fullscreen(!fs);
        return;
    }

    //    if( key === 's') {
    //        //save('myCanvas.pdf');
    //        makeScreenshot;
    //  }

    if (key === 'r') {
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
    for (let i = 0; i < clickables.length; i++) {
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
    clickables[5].onPress = clickableButtonPressed;

    clickables[14].onPress = save_Canvas;
    clickables[15].onPress = subtractCombIndex;
    clickables[16].onPress = addCombIndex;
    clickables[17].onPress = subtractTailIndex;
    clickables[18].onPress = addTailIndex;
    clickables[19].onPress = subtractFeetIndex;
    clickables[20].onPress = addFeetIndex;
    clickables[21].onPress = addWingIndex;
    clickables[22].onPress = subtractWingIndex;
    clickables[23].onPress = clickableButtonPressed;

    clickables[25].onPress = save_Canvas;
    clickables[26].onPress = subtractBlobIndex;
    clickables[27].onPress = addBlobIndex;
    clickables[28].onPress = subtractBlobEyeIndex;
    clickables[29].onPress = addBlobEyeIndex;
    clickables[30].onPress = clickableButtonPressed;

    clickables[32].onPress = save_Canvas;
    clickables[33].onPress = subtractCatEarIndex;
    clickables[34].onPress = addCatEarIndex;
    clickables[35].onPress = subtractCatTailIndex;
    clickables[36].onPress = addCatTailIndex;
    clickables[37].onPress = subtractCatEyeIndex;
    clickables[38].onPress = addCatEyeIndex;
    clickables[39].onPress = subtractCatNoseIndex;
    clickables[40].onPress = addCatNoseIndex;
    clickables[41].onPress = subtractCatMouthIndex;
    clickables[42].onPress = addCatMouthIndex;
    //    clickables[43].onPress = catstripe;
    //    clickables[44].onPress = nocatstripe;
    clickables[45].onPress = clickableButtonPressed;

    clickables[47].onPress = save_Canvas;
    clickables[48].onPress = subtractBunnyEarIndex;
    clickables[49].onPress = addBunnyEarIndex;
    clickables[50].onPress = subtractBunnyEyeIndex;
    clickables[51].onPress = addBunnyEyeIndex;
    clickables[52].onPress = subtractBunnyNoseIndex;
    clickables[53].onPress = addBunnyNoseIndex;
    clickables[54].onPress = subtractBunnyMouthIndex;
    clickables[55].onPress = addBunnyMouthIndex;
    clickables[56].onPress = clickableButtonPressed;;

    clickables[58].onPress = save_Canvas;
    clickables[59].onPress = subtractDogEarIndex;
    clickables[60].onPress = addDogEarIndex;
    clickables[61].onPress = subtractDogTailIndex;
    clickables[62].onPress = addDogTailIndex;
    clickables[63].onPress = subtractDogEyeIndex;
    clickables[64].onPress = addDogEyeIndex;
    clickables[65].onPress = subtractDogNoseIndex;
    clickables[66].onPress = addDogNoseIndex;
    clickables[67].onPress = subtractDogMouthIndex;
    clickables[68].onPress = addDogMouthIndex;
    clickables[69].onPress = clickableButtonPressed;;

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
    this.textFont = "Nunito";
    this.textSize = 25;
    this.textColor = "#ffffff";
}

clickableButtonPressed = function () {
    adventureManager.clickablePressed(this.name);
}

function save_Canvas() {
    let c = get(width / 2 - 300, height / 2 - 100, 300, 300);
    canvas.image(c, 0, 0);
    save(canvas, "img.png");
}
printCanvas = function () {
    //this.visible = false;
    let c = get(width / 4, height / 2, 200, 200);
    canvas.image(c, 0, 0);
    canvas.print();
    //setTimeout(window.print(), 100000);
    //saveCanvas('img.pdf');
}

function reset_Canvas() {
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
        super(); // call super-class constructor to initialize variables in PNGRoom

        this.titleText = "";
        this.bodyText = "";
    }

    // should be called for each room, after adventureManager allocates
    setText(titleText, bodyText) {
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

        background('#EFBDBD');

        // title box
        //      fill(0,0,0,64);
        //      noStroke();
        //      rect(200, 50, 750, 100, 10);

        // title text
        fill(255);
        textAlign(CENTER);
        textFont('Nunito');
        textSize(120);

        text('Make Your Cute', width / 2, height / 2 + titleAnimation);
        titleAnimation += speed;

        if (titleAnimation >= 50 || titleAnimation <= -50) {
            speed = -speed;
        }

        textSize(40);
        text('Customize your buddy and print it out!', width / 2, height / 2 + 200);


        pop();

    }
}

class Buddy extends PNGRoom {
    // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
    constructor() {
        super(); // call super-class constructor to initialize variables in PNGRoom
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
        rect(width / 2, 100, width - 200, 100, 10);

        // title text
        fill(255);
        textAlign(CENTER);
        textFont('Nunito');
        textSize(60);

        text("Select Your Buddy", width / 2, 125);

        pop();
    }
}

class CharactersRoom extends PNGRoom {
    // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
    constructor() {
        super(); // call super-class constructor to initialize variables in PNGRoom
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
        textFont('Nunito');
        textSize(60);

        text("Characters", 500, 125);

        // body text
        fill(255);
        textAlign(LEFT);
        textFont('Nunito');
        textSize(20);
        textLeading(26);


        //character 1
        imageMode(CENTER);
        characterImages[chracterIndex].resize(75, 0);
        image(characterImages[chracterIndex], 337, 250);

        //chicken
        image(chickenimg[feetindex], width / 2 - 200, 685, 200, 200);
        image(chickenimg[0], width / 2 - 200, 500, 200, 200);
        image(chickenimg[tailindex], width / 2, 500, 200, 200);
        image(chickenimg[combindex], width / 2 - 180, 405, 200, 200);
        image(chickenimg[wingindex], width / 2 - 125, 520, 200, 200);

        pop();
    }
}

class Chicken extends PNGRoom {
    // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
    constructor() {
        super(); // call super-class constructor to initialize variables in PNGRoom
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
        rect(width / 2, 100, 900, 100, 10);

        // title text
        fill(255);
        textAlign(CENTER);
        textFont('Nunito');
        textSize(60);

        text("Customize your chicken buddy!", width / 2, 125);

        // body text
        fill(255);
        textAlign(LEFT);
        textFont('Nunito');
        textSize(20);
        textLeading(26);

        //chicken
        image(chickenimg[feetindex], width / 2 - 300, height / 2 - 100, 200, 200);
        image(chickenimg[0], width / 2 - 300, height / 2 - 100, 200, 200);
        image(chickenimg[tailindex], width / 2 - 300, height / 2 - 100, 200, 200);
        image(chickenimg[combindex], width / 2 - 300, height / 2 - 100, 200, 200);
        image(chickenimg[wingindex], width / 2 - 300, height / 2 - 100, 200, 200);


        pop();
    }
}
class Chicken2 extends PNGRoom {
    // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
    constructor() {
        super(); // call super-class constructor to initialize variables in PNGRoom
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
        textFont('Nunito');
        textSize(60);

        text("Customize your chicken buddy2!", 500, 125);

        // body text
        fill(255);
        textAlign(LEFT);
        textFont('Nunito');
        textSize(20);
        textLeading(26);

        //chicken
        image(chickenimg[feetindex], width / 2 - 300, 685, 200, 200);
        image(chickenimg[0], width / 2 - 300, 500, 200, 200);
        image(chickenimg[tailindex], width / 2 - 100, 500, 200, 200);
        image(chickenimg[combindex], width / 2 - 280, 405, 200, 200);
        image(chickenimg[wingindex], width / 2 - 225, 520, 200, 200);

        slider = createSlider(0, 360, 60, 40);
        slider.position(10, 10);
        slider.style('width', '80px');

        pop();
    }
}

class Blobby extends PNGRoom {
    // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
    constructor() {
        super(); // call super-class constructor to initialize variables in PNGRoom
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
        rect(width / 2, 100, 900, 100, 10);

        // title text
        fill(255);
        textAlign(CENTER);
        textFont('Nunito');
        textSize(60);

        text("Customize your blob buddy!", width / 2, 125);

        // body text
        fill(255);
        textAlign(LEFT);
        textFont('Nunito');
        textSize(20);
        textLeading(26);

        //blob
        image(blobimg[blob_bodyindex], width / 2 - 300, height / 2 - 100, 200, 200);
        image(blobimg[blob_eyeindex], width / 2 - 300, height / 2 - 100, 200, 200);

        pop();
    }
}

class PrintBlobby extends PNGRoom {
    // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
    constructor() {
        super(); // call super-class constructor to initialize variables in PNGRoom
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
        //      textFont('Nunito');
        //      textSize(60);
        //
        //      text("Customize your blob buddy!", 500 , 125);
        //
        //      // body text
        //      fill(255);
        //      textAlign(LEFT);
        //      textFont('Nunito');
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
        super(); // call super-class constructor to initialize variables in PNGRoom
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
        rect(width / 2, 100, 900, 100, 10);

        // title text
        fill(255);
        textAlign(CENTER);
        textFont('Nunito');
        textSize(60);

        text("Customize your cat buddy!", width / 2, 125);

        // body text
        fill(255);
        textAlign(LEFT);
        textFont('Nunito');
        textSize(20);
        textLeading(26);

        //cat
        image(catimg[0], width / 2 - 300, height / 2 - 100, 200, 200);
        image(catimg[cat_earindex], width / 2 - 300, height / 2 - 100, 200, 200);
        image(catimg[cat_tailindex], width / 2 - 300, height / 2 - 100, 200, 200);
        image(catimg[cat_eyeindex], width / 2 - 300, height / 2 - 100, 200, 200);
        image(catimg[cat_noseindex], width / 2 - 300, height / 2 - 100, 200, 200);
        image(catimg[cat_mouthindex], width / 2 - 300, height / 2 - 100, 200, 200);

        //placeCat(width/2-330, height/2-140);

        pop();
    }
}

function placeCat(x, y) {
    image(catimg[1], 50 + x, 65 + y, 200, 200);
    image(catimg[0], 0 + x, 0 + y, 200, 200);
    image(catimg[2], 130 + x, 15 + y, 200, 200);
    image(catimg[3], 51 + x, 110 + y, 200, 200);

    image(catimg[cat_eyeindex], 0 + x, 15 + y, 200, 200);
    image(catimg[cat_noseindex], 0 + x, 25 + y, 200, 200);
    image(catimg[cat_mouthindex], 0 + x, 35 + y, 200, 200);
}

class PrintCat extends PNGRoom {
    // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
    constructor() {
        super(); // call super-class constructor to initialize variables in PNGRoom
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
        //      textFont('Nunito');
        //      textSize(60);
        //
        //      text("Customize your blob buddy!", 500 , 125);
        //
        //      // body text
        //      fill(255);
        //      textAlign(LEFT);
        //      textFont('Nunito');
        //      textSize(20);
        //      textLeading(26);

        //cat
        image(catimg[1], 50, 65, 200, 200);
        image(catimg[0], 0, 0, 200, 200);
        image(catimg[2], 130, 15, 200, 200);
        image(catimg[3], 51, 110, 200, 200);

        image(catimg[cat_eyeindex], 0, 15, 200, 200);
        image(catimg[cat_noseindex], 0, 25, 200, 200);
        image(catimg[cat_mouthindex], 0, 35, 200, 200);

        pop();
    }
}

class Bunny extends PNGRoom {
    // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
    constructor() {
        super(); // call super-class constructor to initialize variables in PNGRoom
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
        rect(width / 2, 100, 900, 100, 10);

        // title text
        fill(255);
        textAlign(CENTER);
        textFont('Nunito');
        textSize(60);

        text("Customize your bunny buddy!", width / 2, 125);

        // body text
        fill(255);
        textAlign(LEFT);
        textFont('Nunito');
        textSize(20);
        textLeading(26);

        //bunny
        image(bunnyimg[0], width / 2 - 300, height / 2 - 100, 200, 200);
        image(bunnyimg[bunny_earindex], width / 2 - 300, height / 2 - 100, 200, 200);
        image(bunnyimg[bunny_eyeindex], width / 2 - 300, height / 2 - 100, 200, 200);
        image(bunnyimg[bunny_noseindex], width / 2 - 300, height / 2 - 100, 200, 200);
        image(bunnyimg[bunny_mouthindex], width / 2 - 300, height / 2 - 100, 200, 200);

        pop();
    }
}

class PrintBunny extends PNGRoom {
    // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
    constructor() {
        super(); // call super-class constructor to initialize variables in PNGRoom
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
        //      textFont('Nunito');
        //      textSize(60);
        //
        //      text("Customize your blob buddy!", 500 , 125);
        //
        //      // body text
        //      fill(255);
        //      textAlign(LEFT);
        //      textFont('Nunito');
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

class Dog extends PNGRoom {
    // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
    constructor() {
        super(); // call super-class constructor to initialize variables in PNGRoom
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
        rect(width / 2, 100, 900, 100, 10);

        // title text
        fill(255);
        textAlign(CENTER);
        textFont('Nunito');
        textSize(60);

        text("Customize your dog buddy!", width / 2, 125);

        // body text
        fill(255);
        textAlign(LEFT);
        textFont('Nunito');
        textSize(20);
        textLeading(26);

        //dog
        image(dogimg[0], width / 2 - 300, height / 2 - 100, 200, 200);
        image(dogimg[dog_earindex], width / 2 - 300, height / 2 - 100, 200, 200);
        image(dogimg[dog_tailindex], width / 2 - 300, height / 2 - 100, 200, 200);

        image(dogimg[dog_eyeindex], width / 2 - 300, height / 2 - 100, 200, 200);
        image(dogimg[dog_noseindex], width / 2 - 300, height / 2 - 100, 200, 200);
        image(dogimg[dog_mouthindex], width / 2 - 300, height / 2 - 100, 200, 200);

        pop();
    }
}

class Human extends PNGRoom {
    // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
    constructor() {
        super(); // call super-class constructor to initialize variables in PNGRoom
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
        rect(width / 2, 100, 900, 100, 10);

        // title text
        fill(255);
        textAlign(CENTER);
        textFont('Nunito');
        textSize(60);

        text("Customize your human buddy!", width / 2, 125);

        // body text
        fill(255);
        textAlign(LEFT);
        textFont('Nunito');
        textSize(20);
        textLeading(26);

        //dog
        //        image(dogimg[0], width/2 - 300, height/2-100, 200, 200);
        //        image(dogimg[dog_earindex], width/2 - 300, height/2-100, 200, 200);
        //        image(dogimg[dog_tailindex], width/2 - 300, height/2-100, 200, 200);
        //        
        //        image(dogimg[dog_eyeindex], width/2 - 300, height/2-100, 200, 200);
        //        image(dogimg[dog_noseindex], width/2 - 300, height/2-100, 200, 200);
        //        image(dogimg[dog_mouthindex], width/2 - 300, height/2-100, 200, 200);

        pop();
    }
}
