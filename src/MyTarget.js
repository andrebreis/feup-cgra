/**
 * MyTarget
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 function MyTarget(scene) {
 	CGFobject.call(this,scene);

  this.position = [10, 0.1, 3];
  this.size = 1.5;

 	this.target = new MyQuad(this.scene);
 };

 MyTarget.prototype = Object.create(CGFobject.prototype);
 MyTarget.prototype.constructor=MyTarget;

 MyTarget.prototype.display = function() {
   this.scene.pushMatrix();
    this.scene.scale(this.size, 1, this.size);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.scene.targetMaterial0.apply();
    this.target.display();
   this.scene.popMatrix();
 }

 MyTarget.prototype.getPosition = function() {
   return this.position;
 }
