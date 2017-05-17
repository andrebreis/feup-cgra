/**
* MyDroneCable
* @constructor
*/
function MyDroneCable(scene, slices) {
  CGFobject.call(this,scene);

  this.cable = new MyCylinder(scene, slices, 3);
  this.hook = new MyHook(scene);
  this.length = 0.5;

  //cable movement variables
  this.cableUp = 0;
  this.cableDown = 0;
};

MyDroneCable.prototype = Object.create(CGFobject.prototype);
MyDroneCable.prototype.constructor = MyDroneCable;

MyDroneCable.prototype.display = function() {

  this.scene.pushMatrix();
    this.scene.translate(0, this.length/2, 0);
    this.scene.scale(0.05, this.length, 0.05);
    this.scene.translate(0, -0.5, 0);
    this.scene.rotate(Math.PI/2, 1, 0, 0);
    this.cable.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
    this.scene.translate(0, -this.length, 0);
    this.hook.display();
  this.scene.popMatrix();
}
