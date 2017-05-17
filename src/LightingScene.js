var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var DRONE_SCALE_CORRECTION = 0.75;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.light0=true;
	this.light1=true;
	this.light2=true;
	this.light3=true;
	this.light4=true;
	this.speed=3;
	this.currDroneAppearance=0;

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	this.enableTextures(true);

	// Scene elements
	this.table = new MyTable(this, lidx=5.0, lidy=0.3, lidz=3.0, legx=0.3, legy=3.5, legz=0.3, floorx=8.0, floory=0.1, floorz=6.0);
	this.wall = new Plane(this);
	this.leftWall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	this.prism = new MyPrism(this, 8, 20);
	this.cylinder = new MyCylinder(this, 8, 20);
	this.clock = new MyClock(this, 12, 1);
	this.drone = new MyDrone(this);
	this.cargo = new MyCargo(this);
	this.target = new MyTarget(this);

	this.boardA = new Plane(this, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);

	// Materials
	this.materialDefault = new CGFappearance(this);

	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);
	this.materialB.setShininess(120);

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.3,0.3,0.3,1);
	this.floorAppearance.setDiffuse(0.40,0.25,0.15,1);
	this.floorAppearance.setSpecular(0.2,0.2,0.2,1);
	this.floorAppearance.setShininess(100);

	this.wallLeftMaterial = new CGFappearance(this);
	this.wallLeftMaterial.setAmbient(0.3,0.3,0.3,1);
	this.wallLeftMaterial.setDiffuse(0.45,0.8,0.8,1);
	this.wallLeftMaterial.setSpecular(1,1,1,1);
	this.wallLeftMaterial.setShininess(100);

	this.wallPlaneMaterial = new CGFappearance(this);
	this.wallPlaneMaterial.setAmbient(0.3,0.3,0.3,1);
	this.wallPlaneMaterial.setDiffuse(0.8,0.5,1.0,1);
	this.wallPlaneMaterial.setSpecular(0.8,0.8,0.9,1);
	this.wallPlaneMaterial.setShininess(0);

	this.floorAppearance.loadTexture("../resources/images/floor.png");
	this.floorAppearance.setTextureWrap("REPEAT", "REPEAT");

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.3,0.3,0.3,1);
	this.windowAppearance.setDiffuse(0.5,0.5,0.5,1);
	this.windowAppearance.setSpecular(0.8,0.8,0.8,1);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.slidesAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.slidesAppearance.setSpecular(0.2,0.2,0.2,1);
	this.slidesAppearance.setShininess(0);

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.loadTexture("../resources/images/board.png");
	this.boardAppearance.setDiffuse(0.4,0.4,0.4,1);
	this.boardAppearance.setSpecular(0.5,0.5,0.5,1);
	this.boardAppearance.setShininess(75);

	this.wheatleyMaterial0 = new CGFappearance(this);
  this.wheatleyMaterial0.setAmbient(0.7,0.7,0.7,1);
  this.wheatleyMaterial0.setDiffuse(1,1,1,1);
  this.wheatleyMaterial0.setSpecular(0.2,0.2,0.2,1);
  this.wheatleyMaterial0.setShininess(60);
  this.wheatleyMaterial0.loadTexture("../resources/images/wheatley.png");

	this.inemMaterial0 = new CGFappearance(this);
  this.inemMaterial0.setAmbient(0.7,0.7,0.7,1);
  this.inemMaterial0.setDiffuse(1,1,1,1);
  this.inemMaterial0.setSpecular(0.2,0.2,0.2,1);
  this.inemMaterial0.setShininess(60);
  this.inemMaterial0.loadTexture("../resources/images/inem.png");

  this.spiderMaterial0 = new CGFappearance(this);
  this.spiderMaterial0.setAmbient(0.7,0.7,0.7,1);
  this.spiderMaterial0.setDiffuse(1,1,1,1);
  this.spiderMaterial0.setSpecular(0.2,0.2,0.2,1);
  this.spiderMaterial0.setShininess(60);
  this.spiderMaterial0.loadTexture("../resources/images/spiderman.png");

  this.helixBaseMaterial = new CGFappearance(this);
  this.helixBaseMaterial.setAmbient(0.3,0.3,0.3,1);
  this.helixBaseMaterial.setDiffuse(1,1,1,1);
  this.helixBaseMaterial.setSpecular(0.2,0.2,0.2,1);
  this.helixBaseMaterial.setShininess(60);
  this.helixBaseMaterial.loadTexture("../resources/images/blue.png");

  this.greyArmMaterial = new CGFappearance(this);
  this.greyArmMaterial.setAmbient(0.3,0.3,0.3,1);
  this.greyArmMaterial.setDiffuse(0.7,0.7,0.7,1);
  this.greyArmMaterial.setSpecular(0.7,0.7,0.7,1);

  this.yellowArmMaterial = new CGFappearance(this);
  this.yellowArmMaterial.setAmbient(0.3,0.3,0.3,1);
  this.yellowArmMaterial.setDiffuse(1,1,0,1);
  this.yellowArmMaterial.setSpecular(1,1,0,1);

  this.helixDarkMaterial = new CGFappearance(this);
  this.helixDarkMaterial.setAmbient(0,0,0,1);
  this.helixDarkMaterial.setDiffuse(0.1,0.1,0.1,1);
  this.helixDarkMaterial.setSpecular(0.1,0.1,0.1,1);

  this.helixRedMaterial = new CGFappearance(this);
  this.helixRedMaterial.setAmbient(0.7,0.3,0.3,1);
  this.helixRedMaterial.setDiffuse(1,0.1,0,1);
  this.helixRedMaterial.setSpecular(1,0.1,0,1);

	this.cargoMaterial0 = new CGFappearance(this);
	this.cargoMaterial0.setAmbient(0.7,0.7,0.7,1);
	this.cargoMaterial0.setDiffuse(1,1,1,1);
	this.cargoMaterial0.setSpecular(0.4,0.4,0.4,1);
	this.cargoMaterial0.setShininess(60);
	this.cargoMaterial0.loadTexture("../resources/images/question.png");

	this.cargoMaterial1 = new CGFappearance(this);
	this.cargoMaterial1.setAmbient(0.7,0.7,0.7,1);
	this.cargoMaterial1.setDiffuse(1,1,1,1);
	this.cargoMaterial1.setSpecular(0.4,0.4,0.4,1);
	this.cargoMaterial1.setShininess(60);
	this.cargoMaterial1.loadTexture("../resources/images/hurtpika.png");

	this.cargoMaterial2 = new CGFappearance(this);
	this.cargoMaterial2.setAmbient(0.7,0.7,0.7,1);
	this.cargoMaterial2.setDiffuse(1,1,1,1);
	this.cargoMaterial2.setSpecular(0.4,0.4,0.4,1);
	this.cargoMaterial2.setShininess(60);
	this.cargoMaterial2.loadTexture("../resources/images/healingpika.png");

	this.targetMaterial0 = new CGFappearance(this);
	this.targetMaterial0.setAmbient(0.7,0.7,0.7,1);
	this.targetMaterial0.setDiffuse(1,1,1,1);
	this.targetMaterial0.setSpecular(0.4,0.4,0.4,1);
	this.targetMaterial0.setShininess(60);
	this.targetMaterial0.loadTexture("../resources/images/bed.png");

	//drone appearances
	this.droneAppearances = [];
	this.droneAppearanceList = {};
	this.droneAppearanceList["Wheatley"] = 0;
	this.droneAppearanceList["INEM"] = 1;
	this.droneAppearanceList["Spider-man"] = 2;
	this.droneAppearances.push([this.wheatleyMaterial0, this.greyArmMaterial, this.helixBaseMaterial, this.helixDarkMaterial]);
	this.droneAppearances.push([this.inemMaterial0, this.yellowArmMaterial, this.helixBaseMaterial, this.helixRedMaterial]);
	this.droneAppearances.push([this.spiderMaterial0, this.helixBaseMaterial, this.helixBaseMaterial, this.helixRedMaterial]);

	this.cargoAppearances = [this.cargoMaterial0, this.cargoMaterial1, this.cargoMaterial2];

	this.setUpdatePeriod(16);


};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0, 0, 0, 1.0);

	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)

	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true); // show marker on light position (different from enabled)

	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)

	this.lights[4].setPosition(0.5, 5.0, 7.0, 1.0);
	this.lights[4].setVisible(true);
	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setSpecular(1.0, 1.0, 0, 1.0);
	this.lights[4].setQuadraticAttenuation(0.5);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 0, 1.0);

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1.0);
	this.lights[2].setQuadraticAttenuation(0);

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 0, 1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(1.0);
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}

LightingScene.prototype.update = function(currTime) {
	this.clock.update(currTime);
	this.drone.update(currTime);
	if(this.drone.isAttached == 0)
		this.checkAttachment();
	else if(this.drone.isAttached == 1)
		this.checkDisattachment();
}

LightingScene.prototype.checkAttachment = function(){
	cargoPosition = this.cargo.getPosition();
	if(this.drone.xPosition < cargoPosition[0] + this.cargo.size/2 && this.drone.xPosition > cargoPosition[0] - this.cargo.size/2){
		if(this.drone.zPosition < cargoPosition[2] + this.cargo.size/2 && this.drone.zPosition > cargoPosition[2] - this.cargo.size/2){
			if(this.drone.yPosition - this.drone.cable.length*DRONE_SCALE_CORRECTION - this.drone.cable.hook.size*DRONE_SCALE_CORRECTION <= cargoPosition[1]+this.cargo.size/2){
				this.drone.isAttached = 1;
			}
		}
	}
	else
		this.drone.isAttached = 0;
}

LightingScene.prototype.checkDisattachment = function(){
	targetPosition = this.target.getPosition();
	cargoPosition = this.cargo.getPosition();
	if(cargoPosition[0] < targetPosition[0] + this.target.size/2 && cargoPosition[0] > targetPosition[0] - this.target.size/2){
		if(cargoPosition[2] < targetPosition[2] + this.target.size/2 && cargoPosition[2] > targetPosition[2] - this.target.size/2){
			if(cargoPosition[1] <= targetPosition[1] + 0.5){ //0.5 tolerance
				this.drone.isAttached = 2;
				this.cargo.position[0] = this.target.position[0];
				this.cargo.position[1] = this.target.position[1] + this.cargo.size/2;
				this.cargo.position[2] = this.target.position[2];
			}
		}
	}
	else
		this.drone.isAttached = 1;
}

LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	if (this.light0)
		this.lights[0].enable();
	else
		this.lights[0].disable();

	if (this.light1)
		this.lights[1].enable();
	else
		this.lights[1].disable();

	if (this.light2)
		this.lights[2].enable();
	else
		this.lights[2].disable();

	if (this.light3)
		this.lights[3].enable();
	else
		this.lights[3].disable();

	if (this.light4)
		this.lights[4].enable();
	else
		this.lights[4].disable();
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup


	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.windowAppearance.apply();
		this.leftWall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wallPlaneMaterial.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);

		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);

		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	// Prism
	this.pushMatrix();
		this.rotate(-Math.PI/2, 1, 0, 0);
		this.translate(14, -14, 0);
		this.scale(0.7, 0.7, 8);
		this.prism.display();
	this.popMatrix();

	// Cylinder
	this.pushMatrix();
		this.rotate(-Math.PI/2, 1, 0, 0);
		this.translate(3, -14, 0);
		this.scale(0.7, 0.7, 8);
		this.materialDefault.apply();
		this.cylinder.display();
	this.popMatrix();

	// Clock
	this.pushMatrix();
		this.translate(7.25, 7.25, 0);
		this.scale(0.5, 0.5, 0.1);
		this.clock.display();
	this.popMatrix();

	// Drone
	this.pushMatrix();
		this.translate(this.drone.xPosition, this.drone.yPosition, this.drone.zPosition);
		this.rotate(this.drone.rot_ang * degToRad, this.drone.x_rot, this.drone.y_rot, this.drone.z_rot);
		this.rotate(this.drone.inclination, 1, 0, 0);
		this.scale(0.75, 0.75, 0.75);
	this.drone.display();

		// Cargo
		this.pushMatrix();
			if(this.drone.isAttached == 1){
				this.cargo.position[0] = this.drone.xPosition;
				this.cargo.position[1] = this.drone.yPosition - this.drone.cable.length*DRONE_SCALE_CORRECTION - this.drone.cable.hook.size * DRONE_SCALE_CORRECTION - this.cargo.size/2;
				this.cargo.position[2] = this.drone.zPosition;
			}
			this.translate(this.cargo.position[0], this.cargo.position[1], this.cargo.position[2]);
			this.cargo.display();
		this.popMatrix();

		// Target
	this.pushMatrix();
		this.translate(this.target.position[0], this.target.position[1], this.target.position[2]);
		this.target.display();
	this.popMatrix();

	// ---- END Primitive drawing section
};
