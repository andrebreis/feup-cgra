/**
 * MyHook
 * @constructor
 */
 function MyHook(scene) {
 	CGFobject.call(this,scene);

	this.finger = new MyCurveSurface(scene);
  this.size = 0.75;
 };

 MyHook.prototype = Object.create(CGFobject.prototype);
 MyHook.prototype.constructor = MyHook;

 MyHook.prototype.display = function() {
   //finger0
   this.scene.pushMatrix();
       this.scene.translate(0, -this.size, 0);
       this.scene.rotate(-Math.PI/2, 0, 1, 0);
       this.scene.scale(0.4, 0.5, 0.05);
       this.scene.rotate(-Math.PI/2, 1, 0, 0);
       this.finger.display();
   this.scene.popMatrix();

   //finger1
   this.scene.pushMatrix();
       this.scene.translate(0, -this.size, 0);
       this.scene.scale(0.4, 0.5, 0.05);
       this.scene.rotate(-Math.PI/2, 1, 0, 0);
       this.finger.display();
   this.scene.popMatrix();
 }
