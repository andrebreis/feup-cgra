/**
 * MyInterface
 * @constructor
 */

 var degToRad = Math.PI/180.0;

function MyInterface() {
	//call CGFinterface constructor
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);

	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui

	this.gui = new dat.GUI();

	// add a group of controls (and open/expand by defult)

	var group=this.gui.addFolder("Light Options");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;

	group.add(this.scene, 'light0');
	group.add(this.scene, 'light1');
	group.add(this.scene, 'light2');
	group.add(this.scene, 'light3');
	group.add(this.scene, 'light4');

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); };

	this.gui.add(this.scene.clock, 'clockSwitch');

	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters

	this.gui.add(this.scene, 'speed', 0, 10);

	//helix rotation factor
	this.gui.add(this.scene.drone, 'helixFactor', 0.1, 2);

	//drone Appearances
	this.gui.add(this.scene, 'currDroneAppearance', this.scene.droneAppearanceList);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyDown = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyDown.call(this,event);

	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars

	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):
		case (97):
			this.scene.drone.helixSpeed[LEFT_HELIX] = FAST_SPEED;
			this.scene.drone.helixSpeed[RIGHT_HELIX] = FAST_SPEED;
			this.scene.drone.helixSpeed[FRONT_HELIX] = SLOW_SPEED;
			this.scene.drone.helixSpeed[BACK_HELIX] = SLOW_SPEED;
			this.scene.drone.leftRotation = 1;
			break;
		case (68):
		case(100):
			this.scene.drone.helixSpeed[LEFT_HELIX] = FAST_SPEED;
			this.scene.drone.helixSpeed[RIGHT_HELIX] = FAST_SPEED;
			this.scene.drone.helixSpeed[FRONT_HELIX] = SLOW_SPEED;
			this.scene.drone.helixSpeed[BACK_HELIX] = SLOW_SPEED;
			this.scene.drone.rightRotation = 1;
			break;
		case (87):
		case(119):
			this.scene.drone.helixSpeed[FRONT_HELIX] = SLOW_SPEED;
			this.scene.drone.helixSpeed[BACK_HELIX] = FAST_SPEED;
			this.scene.drone.forwardMovement = 1;
			break;
		case (83):
		case(115):
			this.scene.drone.helixSpeed[FRONT_HELIX] = FAST_SPEED;
			this.scene.drone.helixSpeed[BACK_HELIX] = SLOW_SPEED;
			this.scene.drone.backwardMovement = 1;
			break;
		case (73):
		case(105):
			this.scene.drone.upwardMovement = 1;
			break;
		case (74):
		case(106):
			this.scene.drone.downwardMovement = 1;
			break;
    case (80):
    case(112):
      this.scene.drone.cable.cableUp = 1;
      break;
    case (76):
    case(108):
      this.scene.drone.cable.cableDown = 1;
      break;
	};
};

MyInterface.prototype.processKeyUp = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyUp.call(this,event);

	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars

	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65): //A
		case (97):
			this.scene.drone.helixSpeed = [MEDIUM_SPEED, MEDIUM_SPEED, MEDIUM_SPEED, MEDIUM_SPEED];
			this.scene.drone.leftRotation = 0;
			break;
		case (68): //D
		case(100):
			this.scene.drone.helixSpeed = [MEDIUM_SPEED, MEDIUM_SPEED, MEDIUM_SPEED, MEDIUM_SPEED];
			this.scene.drone.rightRotation = 0;
			break;
		case (87): //W
		case(119):
			this.scene.drone.helixSpeed = [MEDIUM_SPEED, MEDIUM_SPEED, MEDIUM_SPEED, MEDIUM_SPEED];
			this.scene.drone.forwardMovement = 0;
			break;
		case (83): //S
		case(115):
			this.scene.drone.helixSpeed = [MEDIUM_SPEED, MEDIUM_SPEED, MEDIUM_SPEED, MEDIUM_SPEED];
			this.scene.drone.backwardMovement = 0;
			break;
		case (73): //I
		case(105):
			this.scene.drone.upwardMovement = 0;
			break;
		case (74): //J
		case(106):
			this.scene.drone.downwardMovement = 0;
			break;
    case (80): //P
  	case(112):
			this.scene.drone.cable.cableUp = 0;
    	break;
    case (76): //L
	  case(108):
  		this.scene.drone.cable.cableDown = 0;
      break;
	};
};
