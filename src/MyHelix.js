/**
 * MyHelix
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyHelix(scene) {
    CGFobject.call(this,scene);

    this.helixPart = new MyCylinder(scene, 8, 4);
    this.cover = new MyPolygon(scene, 8);
};

MyHelix.prototype = Object.create(CGFobject.prototype);
MyHelix.prototype.constructor=MyTable;

MyHelix.prototype.display = function ()
{
    this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.9);
        this.scene.scale(0.15, 0.05, 1);
        this.cover.display();
    this.scene.popMatrix(); 

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.9);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(0.15, 0.05, 1);
        this.cover.display();
    this.scene.popMatrix(); 

    this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.9)
        this.scene.scale(0.15, 0.05, 1.8);
        this.helixPart.display();
    this.scene.popMatrix(); 

};

/*function MyHelix(scene) {
	CGFobject.call(this,scene);

	this.helixPart = new MyPolygon(scene, 32);
};

MyHelix.prototype = Object.create(CGFobject.prototype);
MyHelix.prototype.constructor=MyTable;

MyHelix.prototype.display = function ()
{
    this.scene.pushMatrix();
        this.scene.scale(0.15, 0.15, 0.6);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.helixPart.display();
    this.scene.popMatrix();	

    this.scene.pushMatrix();
    	this.scene.translate(0, 0, 1.2);
        this.scene.scale(0.15, 0.15, 0.6);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.helixPart.display();
    this.scene.popMatrix();	
}; */
