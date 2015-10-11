var centerX;
var centerY;
var radius;
var planet;
var heldPlanet;
var circle;

function preload() {
  circle = loadImage("http://i.imgur.com/ftajGNG.png");
}

function setup() {
  // uncomment this line to make the canvas the full size of the window
   createCanvas(windowWidth, windowHeight);
   background(0, 0, 0);
   centerX = 350;
   centerY = 350;
    radius = 150;
    orbits = [Orbit(centerX, centerY, 250), Orbit(centerX, centerY, 400), Orbit(centerX, centerY, 550)];
    planets = [];

}

function addPlanet(p) {
  planet = Planet(centerX, centerY, 125, .002, 0)
  tr = Track(100, {path:p},
        function() {
            planet.setTrack(tr);
            planet.start();
        });
  planets.push(planet);
}

function draw() {
  clear();
  background(0, 0, 0);
  //image(circle, 0, 0, 300, 300);


  var speed = 0.002;

  noFill();

  // Draw planets and orbits
   for (var i = 0; i < planets.length; i++) {
        planets[i].update();
    }

    for (var i = 0; i < orbits.length; i++) {
        orbits[i].draw();
    }
}

function mousePressed() {
  if (mouseX < windowWidth - 475) {
    console.log(curSelection);
      for (var i = 0; i < planets.length; i++) {
          if (planets[i].contains(mouseX, mouseY)) {
              planets[i].clicked();
              heldPlanet = planets[i];
          }
      }
    if (!heldPlanet) {
      addPlanet(curSelection.path);
      p = planets[planets.length - 1];
      p.setOrbiting(false);
      p.setColor(curSelection.color);
      p.dragged();
    }
  }
}

function mouseReleased() {
    orbits.forEach(function(orbit){
      orbit.setHover(false);
      if (heldPlanet && orbit.isNear(mouseX, mouseY)){
          // Get planet ready to orbit new radius
          heldPlanet.setRadius(orbit.getRadius());
          heldPlanet.setOrbiting(true);
          theta = orbit.getAngle(mouseX, mouseY);
          heldPlanet.setSpeed(orbit.getSpeed());

          // What snap-theta is closest?
          var numTheta = Math.round(theta / (Math.PI / 4));

          //heldPlanet.setOffset(theta);
          heldPlanet.setLockedOffset(numTheta);
          heldPlanet = null;
        }
    })
    heldPlanet = null;

}

function mouseDragged() {
  if (heldPlanet)
    heldPlanet.dragged();
  orbits.forEach(function(orbit) {
    if (heldPlanet && orbit.isNear(mouseX, mouseY))
      orbit.setHover(true);
    else
      orbit.setHover(false);
  })
}

function mouseMoved() {
}
