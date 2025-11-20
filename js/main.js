// main p5.js entry point, loads stuff and runs the game

/**
 * preload all assets like csv tables and icons
 */
function preload() {
  // load tables for people, activities, jobs, etc
  GameData.tables.people = loadTable("assets/people.csv", "csv", "header");
  GameData.tables.activities = loadTable("assets/activities.csv", "csv", "header");
  GameData.tables.education = loadTable("assets/education.csv", "csv", "header");
  GameData.tables.jobs = loadTable("assets/jobs.csv", "csv", "header");
  GameData.tables.homes = loadTable("assets/homes.csv", "csv", "header");
  GameData.tables.healthcare = loadTable("assets/healthcare.csv", "csv", "header");
  GameData.tables.events = loadTable("assets/events.csv", "csv", "header");
  
  // load icon images for menu buttons
  GameData.iconImgs = [
    loadImage("assets/icons/Education.png"),
    loadImage("assets/icons/Jobs.png"),
    loadImage("assets/icons/Activities.png"),
    loadImage("assets/icons/Relationships.png"),
    loadImage("assets/icons/Homes.png"),
    loadImage("assets/icons/Healthcare.png")
  ];
}

/**
 * setup the canvas and initialize game data
 */
function setup() {
  createCanvas(600, 840); // canvas size
  textFont("Helvetica"); // default font
  
  // setup data
  DataLoader.loadPeopleData(); // read names into lists
  DataLoader.initializePlayer(); // make the player
  DataLoader.setDecisions(); // load jobs, homes, education, etc
}

/**
 * main draw loop
 */
function draw() {
  Renderer.drawBackground(); // bg + floor + character
  Renderer.drawTopBar(); // shows name, age, money
  Renderer.drawButtons(); // menu buttons
  Renderer.drawStatsPanel(); // stats like health, mental, chaos
  
  // menu rendering
  if (GameState.menuOn > -1 && GameState.currentPrompt === -1) {
    MenuRenderer.drawMenu(UIConfig.buttons[GameState.menuOn]);
  }
  
  // event rendering
  if (GameState.currentPrompt !== -1) {
    EventRenderer.drawEvent(GameData.lists.eventList[GameState.currentPrompt]);
  }
  
  // store last frame mouse state
  GameState.mouseWasPressedLastFrame = mouseIsPressed;
}

/**
 * called when any key is pressed
 */
function keyPressed() {
  InputHandler.handleKeyPress(); // age up or other key stuff
}

/**
 * called when mouse clicked
 */
function mouseClicked() {
  InputHandler.handleMouseClick(); // open menu buttons
}

/**
 * called when mouse wheel scrolled
 * @param {object} event - p5 mouse wheel event
 */
function mouseWheel(event) {
  InputHandler.handleMouseWheel(event); // scroll menu
}

/**
 * called when mouse pressed down
 */
function mousePressed() {
  InputHandler.handleMousePressed(); // check scrollbar drag
}

/**
 * called when mouse released
 */
function mouseReleased() {
  InputHandler.handleMouseReleased(); // stop scrollbar drag
}
