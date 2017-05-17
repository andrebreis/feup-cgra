/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 var SLOW_SPEED = 0.2;
 var MEDIUM_SPEED = 1;
 var FAST_SPEED = 10;
 var LEFT_HELIX = 0;
 var RIGHT_HELIX = 1;
 var BACK_HELIX = 2;
 var FRONT_HELIX = 3;
 var MAX_INCLINATION = Math.PI/12;


 var degToRad = Math.PI/180.0;

function MyDrone(scene) {
    CGFobject.call(this,scene);

    this.initBuffers();

    this.xPosition = 7.25;
    this.yPosition = 4;
    this.zPosition = 4;

    this.semiSphere = new MySemiSphere(scene, 32, 16);
    this.arm = new MyCylinder(scene, 32, 16);
    this.helixBase = new MyCylinder(scene, 32, 16);
    this.cover = new MyPolygon(scene, 32);
    this.helix = new MyHelix(scene);
    this.droneLeg = new MyCurveSurface(scene);
    this.droneBase = new MyUnitCubeQuad(scene);
    this.cable = new MyDroneCable(scene, 6);

    //movement variables

    this.x_rot = 0;
    this.y_rot = 1;
    this.z_rot = 0;
    this.rot_ang = 210;

    this.forwardMovement = 0;
    this.backwardMovement = 0;
    this.upwardMovement = 0;
    this.downwardMovement = 0;
    this.leftRotation = 0;
    this.rightRotation = 0;

    this.inclination = 0;

    this.helixSpeed = [MEDIUM_SPEED, MEDIUM_SPEED, MEDIUM_SPEED, MEDIUM_SPEED];
    this.helixAngle = [0, 0, 0, 0];
    this.helixFactor = 1;

    this.isAttached = 0;

    this.lastUpdate = -1;
};

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor=MyDrone;

MyDrone.prototype.update = function (currTime){
    if(this.lastUpdate == -1){
         this.lastUpdate = currTime;
         return;
     }
     else{
         actualizationPeriod = currTime - this.lastUpdate;
         this.lastUpdate = currTime;
     }

    if(this.forwardMovement){
        this.move(this.scene.speed * Math.sin(this.rot_ang * degToRad) * actualizationPeriod / 1000, 0, this.scene.speed * Math.cos(this.rot_ang * degToRad) * actualizationPeriod / 1000);
        this.inclination = this.inclination + actualizationPeriod / 1000 * this.scene.speed / 6 ;
        if(this.inclination > MAX_INCLINATION)
            this.inclination = MAX_INCLINATION;
    }
    else if(this.inclination > 0 && !this.backwardMovement){
        this.inclination = this.inclination - actualizationPeriod / 1000 * this.scene.speed / 6;
        if(this.inclination < 0)
            this.inclination = 0;
    }
    if(this.backwardMovement){
        this.move(-this.scene.speed * Math.sin(this.rot_ang * degToRad) * actualizationPeriod / 1000, 0, -this.scene.speed * Math.cos(this.rot_ang * degToRad) * actualizationPeriod / 1000);
        this.inclination = this.inclination - actualizationPeriod / 1000 * this.scene.speed / 6;
        if(this.inclination < -MAX_INCLINATION)
            this.inclination = -MAX_INCLINATION;
    }
    else if(this.inclination < 0 && !this.forwardMovement){
        this.inclination = this.inclination + actualizationPeriod / 1000 * this.scene.speed / 6;
        if(this.inclination > 0)
            this.inclination = 0;
    }
    if(this.upwardMovement)
        this.move(0, 0.5 * actualizationPeriod / 1000 * this.scene.speed, 0);
    if(this.downwardMovement)
        this.move(0, -0.5 * actualizationPeriod / 1000 * this.scene.speed, 0);
    if(this.leftRotation)
        this.rotate(this.scene.speed * 600 * actualizationPeriod / 1000);
    if(this.rightRotation)
        this.rotate(-this.scene.speed * 600 * actualizationPeriod / 1000);

    for(i = 0; i < 4; i++){
        this.helixAngle[i] = (this.helixAngle[i] + this.helixSpeed[i] * this.helixFactor * Math.PI*2 * actualizationPeriod / 1000)%(Math.PI*2);
    }

    if(this.cable.cableUp){
        this.cable.length = this.cable.length - 0.5 * actualizationPeriod / 1000 * this.scene.speed;
        if(this.cable.length < 0)
          this.cable.length = 0;
      }
    if(this.cable.cableDown){
        this.cable.length = this.cable.length + 0.5 * actualizationPeriod / 1000 * this.scene.speed;
        if(this.cable.length > this.yPosition/DRONE_SCALE_CORRECTION - this.cable.hook.size)
          this.cable.length = this.yPosition/DRONE_SCALE_CORRECTION - this.cable.hook.size;
      }
};

MyDrone.prototype.display = function (){

    //semiSphere
    this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.droneAppearances[this.scene.currDroneAppearance][0].apply();
        this.semiSphere.display();
    this.scene.popMatrix();

    //arm1
    this.scene.pushMatrix();
        this.scene.translate(0, 0, -2.5);
        this.scene.scale(0.25, 0.25, 5);
        this.scene.droneAppearances[this.scene.currDroneAppearance][1].apply();
        this.arm.display();
    this.scene.popMatrix();

    //arm2
    this.scene.pushMatrix();
        this.scene.translate(-2.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.25, 0.25, 5);
        this.arm.display();
    this.scene.popMatrix();

    //helixBase1
     this.scene.pushMatrix();
        this.scene.translate(-3, 0.25, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.droneAppearances[this.scene.currDroneAppearance][2].apply();
        this.helixBase.display();
    this.scene.popMatrix();

    //helixBase2
     this.scene.pushMatrix();
        this.scene.translate(3, 0.25, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.helixBase.display();
    this.scene.popMatrix();

    //helixBase3
     this.scene.pushMatrix();
        this.scene.translate(0, 0.25, -3);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.helixBase.display();
    this.scene.popMatrix();

    //helixBase4
     this.scene.pushMatrix();
        this.scene.translate(0, 0.25, 3);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.helixBase.display();
    this.scene.popMatrix();

    //cover1
    this.scene.pushMatrix();
        this.scene.translate(-3, 0.25, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.cover.display();
    this.scene.popMatrix();

    //cover2
    this.scene.pushMatrix();
        this.scene.translate(3, 0.25, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.cover.display();
    this.scene.popMatrix();

    //cover3
    this.scene.pushMatrix();
        this.scene.translate(0, 0.25, -3);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.cover.display();
    this.scene.popMatrix();

    //cover4
    this.scene.pushMatrix();
        this.scene.translate(0, 0.25, 3);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.cover.display();
    this.scene.popMatrix();

    //helixTop1
    this.scene.pushMatrix();
        this.scene.translate(-3, 0.25, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.40, 0.40, 0.35);
        this.semiSphere.display();
    this.scene.popMatrix();

    //helixTop2
    this.scene.pushMatrix();
        this.scene.translate(3, 0.25, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.40, 0.40, 0.35);
        this.semiSphere.display();
    this.scene.popMatrix();

    //helixTop3
    this.scene.pushMatrix();
        this.scene.translate(0, 0.25, -3);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.40, 0.40, 0.35);
        this.semiSphere.display();
    this.scene.popMatrix();

    //helixTop4
    this.scene.pushMatrix();
        this.scene.translate(0, 0.25, 3);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.40, 0.40, 0.35);
        this.semiSphere.display();
    this.scene.popMatrix();

    //helix1
    this.scene.pushMatrix();
        this.scene.translate(-3, 0.6, 0);
        this.scene.rotate(-this.helixAngle[0], 0, 1, 0);
        this.scene.droneAppearances[this.scene.currDroneAppearance][3].apply();
        this.helix.display();
    this.scene.popMatrix();

    //helix2
    this.scene.pushMatrix();
        this.scene.translate(3, 0.6, 0);
        this.scene.rotate(-this.helixAngle[1], 0, 1, 0);
        this.helix.display();
    this.scene.popMatrix();

    //helix3
    this.scene.pushMatrix();
        this.scene.translate(0, 0.6, -3);
        this.scene.rotate(this.helixAngle[2], 0, 1, 0);
        this.helix.display();
    this.scene.popMatrix();

    //helix4
    this.scene.pushMatrix();
        this.scene.translate(0, 0.6, 3);
        this.scene.rotate(this.helixAngle[3], 0, 1, 0);
        this.helix.display();
    this.scene.popMatrix();

    //droneLeg1
    this.scene.pushMatrix();
        this.scene.translate(0, -1.25, -0.4);
        this.scene.scale(0.75, 0.75, 0.05);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.materialDefault.apply();
        this.droneLeg.display();
    this.scene.popMatrix();

    //droneLeg2
    this.scene.pushMatrix();
        this.scene.translate(0, -1.25, 0.4);
        this.scene.scale(0.75, 0.75, 0.05);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.droneLeg.display();
    this.scene.popMatrix();

    //droneBase1
    this.scene.pushMatrix();
        this.scene.translate(-1.1, -1.25, 0);
        this.scene.scale(0.1, 0.1, 2);
        this.droneBase.display();
    this.scene.popMatrix();

    //droneBase2
    this.scene.pushMatrix();
        this.scene.translate(1.1, -1.25, 0);
        this.scene.scale(0.1, 0.1, 2);
        this.droneBase.display();
    this.scene.popMatrix();

    //this pops the matrix created on the LightingScene -- so the cable wont rotate
    this.scene.popMatrix();
    //so now we need to scale it again and translate it from the origin
    this.scene.pushMatrix();
        this.scene.translate(this.xPosition, this.yPosition, this.zPosition);
        this.scene.scale(0.75, 0.75, 0.75);
        this.cable.display();
    this.scene.popMatrix();
}

MyDrone.prototype.move = function (dx, dy, dz) {
    this.scene.translate(dx, dy, dz);

    this.xPosition += dx;
    this.yPosition += dy;
    this.zPosition += dz;
}

MyDrone.prototype.rotate = function(speed){
    this.scene.rotate(speed * degToRad , this.x_rot, this.y_rot, this.z_rot);
    this.rot_ang += speed * 2 * degToRad;
}
