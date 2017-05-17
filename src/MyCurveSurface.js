/**
* MyDroneLeg
* @constructor
*/
function MyCurveSurface(scene) {
	CGFobject.call(this,scene);
	this.scene = scene;
	
	this.makeSurface("1", 2, // degree on U: 3 control vertexes U
				 1, // degree on V: 2 control vertexes on V
				[0, 0, 0, 1, 1, 1], // knots for U
				[0, 0, 1, 1], // knots for V
				[	// U = 0
					[ // V = 0..1;
					[ -1.5, -1.5, 0.0, 1 ],
					[ -1.5,  1.5, 0.0, 1 ]

					],
					// U = 1
					[ // V = 0..1
					[ 0, -1.5, 3.0, 1 ],
					[ 0,  1.5, 3.0, 1 ]							 
					],
					// U = 2
					[ // V = 0..1							 
					[ 1.5, -1.5, 0.0, 1 ],
					[ 1.5,  1.5, 0.0, 1 ]
					]
				], // translation of surface 
				[0,0,0]);
};

MyCurveSurface.prototype = Object.create(CGFobject.prototype);
MyCurveSurface.prototype.constructor = MyCurveSurface;

MyCurveSurface.prototype.makeSurface = function (id, degree1, degree2, knots1, knots2, controlvertexes, translation) {
	
	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes);
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	this.surface = new CGFnurbsObject(this.scene, getSurfacePoint, 20, 20);
};

MyCurveSurface.prototype.display = function() {
	this.surface.display();
}