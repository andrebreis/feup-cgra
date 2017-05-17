/**
 * MyCargo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

 function MyCargo(scene) {
 	CGFobject.call(this,scene);

  this.position = [3, 0.5, 3];
  this.size = 1;

 	this.cargo=new MyUnitCubeQuad(this.scene);
 };

 MyCargo.prototype = Object.create(CGFobject.prototype);
 MyCargo.prototype.constructor=MyCargo;

 MyCargo.prototype.display = function() {
   this.scene.cargoAppearances[this.scene.drone.isAttached].apply();
   this.cargo.display();
 }

 MyCargo.prototype.getPosition = function() {
   return this.position;
 }
