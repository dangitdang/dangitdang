var Planet = function(centerX, centerY, radius, s, o) {
    var that = Object.create(Planet.prototype);
    var mainSpeed = s;
    var speed = 0;
    var offset = o;
    var size = 50;
    var currentX = 0;
    var currentY = 0;
    //var sprite = ellipse(centerX + radius, centerY + radius, size, size);
    var sprite = image(circle, centerX + radius, centerY + radius);
    var fillColor = color(0, 0, 0);
    var curTrack;
    var lastX = 0;
    var bAnim = Animation(0, 0, 1);
    var orbiting = true;
    var dt = 0;
    var colorStr = "#0"
    radius = radius;

    that.update = function() {
        var milli = millis();
        lastX = currentX;

        // Update sprite color & position
        //fillColor = color(0, 0, bAnim.eval());
        fill(fillColor);
        tint(red(fillColor), green(fillColor), blue(fillColor));
        if (orbiting) {
            currentX = radius*cos(speed * (milli - dt) + offset) + centerX;
            currentY = radius*sin(speed * (milli - dt) + offset) + centerY;
        }

        //sprite = ellipse(currentX, currentY, size, size);
        sprite = image(circle, currentX - 100, currentY - 100, 200, 200);

        // Check if passed over top
        if ( lastX < centerX && currentX >= centerX && currentY < centerY
         && curTrack) {
            curTrack.play();
        }
    }

    that.contains = function(x, y) {
        return x < currentX + size && x > currentX - size
            && y < currentY + size && y > currentY - size;
    }

    that.setRadius = function(r) {
        radius = r;
    }

    that.setOrbiting = function(o) {
        orbiting = o;
        dt = millis();
    }

    that.setOffset = function(o) {
        offset = o + Math.PI;
    }

    that.setColor = function(c) {
        fillColor = color(c);
    }

    that.setSpeed = function(sp) {
        speed = sp;
    }

    that.setLockedOffset = function(o) {
        offset = o * Math.PI/4 + Math.PI;
    }

    that.start = function() {
        speed = mainSpeed;
    }

    that.clicked = function() {
        orbiting = false;
    }

    that.dragged = function() {
        if (!orbiting) {
            currentX = mouseX;
            currentY = mouseY;
        }
    }

    that.released = function() {
        fillColor = color(0, 0, 0);
    }

    that.setTrack = function(track){
        curTrack = track;
    }
    Object.freeze(that);
    return that;
}

var Orbit = function(centerX, centerY, width) {
    var that = Object.create(Orbit.prototype);
    var threshold = 20;
    var fillColor = color(255, 255, 255);
    var width = width;
    var hoveringNear = false;
    var spd = (width - 100) / 150
    var orbitSpeed = .006/pow(2, spd);


    that.draw = function() {
        noFill();
        stroke(fillColor);
        ellipse(centerX, centerY, width, width);

        if (hoveringNear)
            that.drawLines();
    }

    that.isNear = function(x, y) {
        var dist = sqrt(pow(x - centerX, 2) + pow(y - centerY,2));
        return abs(dist - width/2.0) < threshold;
    }

    that.setHover = function(h) {
        hoveringNear = h;
    }

    that.getRadius = function() {
        return width/2.0;
    }

    that.getSpeed = function() {
        return orbitSpeed;
    }

    that.getAngle = function(x, y) {
        a = Math.atan2( centerY - y, centerX - x);
        if (a > 0)
            return a;
        else
            return 2*Math.PI + a;
    }

    that.drawLines = function() {

        push();
        translate(centerX, centerY);
        for(var i = 0; i < 8; i++) {
            rotate(Math.PI/4);
            line(width/4, 0, width/2, 0);
        }
        pop();
    }

    Object.freeze(that);
    return that;
}

var Animation = function(startValue, endValue, duration) {
    var that = Object.create(Animation.prototype);
    var startTime = millis();

    that.eval = function() {
        t = millis();
        alpha = (t - startTime) / duration;

        if (t > startTime + duration)
            return endValue;
        else
            return startValue + alpha * (endValue - startValue);
    }

    Object.freeze(that);
    return that;
}

