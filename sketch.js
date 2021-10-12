const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Composites = Matter.Composites;

const drawMouse = Helpers.drawMouse;
const drawBody = Helpers.drawBody;
const drawBodies = Helpers.drawBodies;

let engine;
let ground;
let balls;


function setup() {
  const canvas = createCanvas(800, 800);

  // create an engine
  engine = Engine.create();

  // add balls
  balls = Composites.stack(500, 0, 50, 30, 3, 3, function(x, y) {
    return Bodies.circle(x, y, 10);
  });
  World.add(engine.world, [balls]);

  // ground
  ground = Bodies.rectangle(400, height-40, 810, 30, {isStatic: true});
  World.add(engine.world, [ground]);

  // setup mouse
  const mouse = Mouse.create(canvas.elt);
  const mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);

  // run the engine
  Engine.run(engine);
}

function draw() {
  background(50);

  stroke(128);
  strokeWeight(1);
  fill(48, 213, 200);
  drawBodies(balls.bodies);

  noStroke();
  fill(128);
  drawBody(ground);

  drawMouse(mouseConstraint);
}
