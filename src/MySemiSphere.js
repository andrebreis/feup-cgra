/**
 * MySemiSphere
 * @constructor
 */
 function MySemiSphere(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MySemiSphere.prototype = Object.create(CGFobject.prototype);
 MySemiSphere.prototype.constructor = MySemiSphere;

 MySemiSphere.prototype.initBuffers = function() {
	this.horizontalAng = Math.PI*2/this.slices; //com MATH.PI nos 2 funciona +/- bem
	this.verticalAng = Math.PI/2/this.stacks;

	this.stackSize = 1/this.stacks;

	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords =[];

	for(j = 0; j <= this.stacks; j++){
		for(i = 0 ; i < this.slices; i++) {
			var x = Math.cos(this.horizontalAng*i) * Math.sin(this.verticalAng*j);
			var y = Math.sin(this.horizontalAng*i) * Math.sin(this.verticalAng*j);
			var z = Math.cos(this.verticalAng*j);
			this.vertices.push(x, y, z);
			this.normals.push(x, y, z);
			this.texCoords.push((x+1)/2, (y+1)/2);
		}
	}

	for(i = 0; i < this.stacks; i++){
		for(j = 0; j < this.slices; j++){
      this.indices.push(i*this.slices+j, (i+1)*this.slices+j, i*this.slices+j+1);
      if(i != this.stacks-1 || j != this.slices-1)
      this.indices.push(i*this.slices+j+1, (i+1)*this.slices+j, ((i+1)*this.slices+j+1)%(this.slices*(this.stacks+1)));
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
