import * as PIXI from "pixi.js";
import { components, filters, effects } from "../../core/core";

export default class TestScene extends components.Scene {
	// async init() {
	// 	this.test = await PIXI.Assets.loader.load("./assets/scenes/test/gow.png");
	// }

	constructor(parent: PIXI.Container<PIXI.DisplayObject>, name: string, assetPaths?: string[] | undefined) {
		super(parent, name, assetPaths);
	}

	async onLoad() {
		const gow = PIXI.Sprite.from("gow copy 2");
		const gowTexture = PIXI.Texture.from("gow");
		gowTexture.frame = new PIXI.Rectangle(368, 368, 80, 80);

		const container = new PIXI.Container();

		const gowPortion = PIXI.Sprite.from(gowTexture);
		container.x = 368;
		container.y = 368;

		const gradient = new effects.GradientGenerator();
		const [testGradient] = gradient.generateGradient({
			// colorStops: ["rgba(2,0,36,1)", "purple", "rgba(9,9,121,1)", "rgba(0,212,255,1)", "red"],
			colorStops: ["white", "black"],
			width: gowPortion.width,
			height: gowPortion.height,
			type: "linear",
			radiuses: [12, 194],
			cropped: false,
			// radiusOffsets: [
			// 	{ x: gowPortion.width / 2, y: 0 },
			// 	{ x: gowPortion.width / 2, y: 0 },
			// ],
		});

		const whiteSprite = this.renderSprite();
		whiteSprite.width = gowPortion.width / 2;
		whiteSprite.height = gowPortion.height;
		whiteSprite.x = container.x + gowPortion.width / 4;
		whiteSprite.y = container.y;

		this.addChild(gow);
		this.addChild(whiteSprite);
		this.addChild(container);

		container.addChild(gowPortion);
		container.addChild(testGradient);

		testGradient.x = gowPortion.width;
		testGradient.rotation = (90 * Math.PI) / 180;
		gowPortion.mask = testGradient;
	}

	renderSprite(texture?: PIXI.Texture) {
		return PIXI.Sprite.from(PIXI.Texture.WHITE);
	}
}

// let gl = null;
// const CAMERA_DIST = 3.5;
// const ANIM_DURATION = 500; // ms
// const IMAGE_PATH = "files/images/";

// ///////////////////////////////////////////////////////////////////////////////
// // main entry point
// ///////////////////////////////////////////////////////////////////////////////
// document.addEventListener("DOMContentLoaded", function () {
// 	let success = initWebGL("webglView");
// 	if (!success) return;

// 	// init html elements
// 	initHtmlElements();
// });

// ///////////////////////////////////////////////////////////////////////////////
// // init WebGL
// ///////////////////////////////////////////////////////////////////////////////
// function initWebGL(canvasId) {
// 	try {
// 		//Logger.show();

// 		let canvas = document.getElementById(canvasId);
// 		// if (!isWebGLSupported()) {
// 		// 	let node = canvas.parentNode;
// 		// 	let message =
// 		// 		"This page requires WebGL enabled browser.<br/>" +
// 		// 		"<a href='http://get.webgl.org'>Click here to upgrade your browser.</a>";
// 		// 	node.innerHTML =
// 		// 		"<div style='width:100%; height:100%; text-align:center; line-height:1em; background:#fff;'>\n" +
// 		// 		message +
// 		// 		"</div>\n";

// 		// 	log("[ERROR] The browser does not support WebGL.");
// 		// 	return false;
// 		// }

// 		// get context
// 		gl = getContextGL(canvas);
// 		if (!gl) {
// 			//log("[ERROR] Failed to get WebGL context.");
// 			return false;
// 		}
// 		logWebGL(gl);

// 		// remember canvas
// 		gl.canvas = canvas;

// 		// init camera with position and target
// 		gl.camera = new OrbitCamera(0, 0, CAMERA_DIST, 0, 0, 0);
// 		log("Created an orbit camera.");
// 		log(gl.camera);

// 		// init gl and glsl
// 		initGL(gl);
// 		initGLSL();
// 		log("WebGL is initialized.");

// 		gl.nearPlane = 0.1;
// 		gl.farPlane = 100;

// 		// default rendering modes
// 		gl.wireframeEnabled = false;
// 		gl.textureEnabled = false;

// 		// create a sphere, param: (gl, radius=1, sectors=36, stacks=18, smooth=false)
// 		gl.sphere = new Sphere(gl, 1.0, 36, 18, false);
// 		printSphere();
// 		log(gl.sphere);

// 		// load default texture
// 		gl.tex0 = loadTexture(gl, IMAGE_PATH + "grid512.png", true);

// 		// add mouse state holder
// 		gl.mouse = new MouseState();

// 		// init touch states
// 		gl.touches = [];

// 		// register event handlers
// 		window.addEventListener("resize", handleResize, false);
// 		log("Added window resize event listener, handleResize().");
// 		canvas.addEventListener("mousemove", handleMouseMove, false);
// 		log("Added canvas mousemove event listener, handleMouseMove().");
// 		canvas.addEventListener("mousedown", handleMouseDown, false);
// 		log("Added canvas mousedown event listener, handleMouseDown().");
// 		canvas.addEventListener("mouseup", handleMouseUp, false);
// 		log("Added canvas mouseup event listener, handleMouseUp().");
// 		canvas.addEventListener("click", handleClick, false);
// 		log("Added canvas click event listener, handleClick().");
// 		canvas.addEventListener("mouseout", handleMouseOut, false);
// 		log("Added canvas mouseout event listener, handleMouseOut().");
// 		canvas.addEventListener("contextmenu", handleContextMenu, false);
// 		log("Added canvas contextmenu event listener, handleContextMenu().");
// 		canvas.addEventListener("wheel", handleWheel, false);
// 		log("Added canvas wheel event listeners, handleWheel()");
// 		// register canvas touch events
// 		canvas.addEventListener("touchstart", handleTouchStart, false);
// 		log("Added canvas touchstart event listeners, handleTouchStart()");
// 		canvas.addEventListener("touchend", handleTouchEnd, false);
// 		log("Added canvas touchend event listeners, handleTouchEnd()");
// 		canvas.addEventListener("touchmove", handleTouchMove, false);
// 		log("Added canvas touchmove event listeners, handleTouchMove()");
// 		canvas.addEventListener("touchcancel", handleTouchCancel, false);
// 		log("Added canvas touchcancel event listeners, handleTouchCancel()");

// 		// ready to start rendering loop
// 		startRendering(gl);
// 	} catch (e) {
// 		log("[ERROR] " + e.message);
// 		alert("[ERROR] " + e.message);
// 	}

// 	return true;
// }

// ///////////////////////////////////////////////////////////////////////////////
// // draw a single frame
// ///////////////////////////////////////////////////////////////////////////////
// function frame() {
// 	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

// 	// view transform
// 	gl.uniformMatrix4fv(gl.program.uniform.matrixView, false, gl.matrixView.m);

// 	// model transform
// 	gl.matrixModel.identity();
// 	gl.matrixModel.rotateX(-Math.PI / 2);

// 	// compute modelview transform
// 	gl.matrixModelView = gl.matrixView.clone().multiply(gl.matrixModel);
// 	gl.uniformMatrix4fv(gl.program.uniform.matrixModelView, false, gl.matrixModelView.m);

// 	// compute normal transform
// 	gl.matrixNormal = gl.matrixModelView.clone().invert().transpose();
// 	gl.uniformMatrix4fv(gl.program.uniform.matrixNormal, false, gl.matrixNormal.m);

// 	// compute modelviewprojection transform
// 	gl.matrixModelViewProjection = gl.matrixProjection.clone().multiply(gl.matrixModelView);
// 	gl.uniformMatrix4fv(gl.program.uniform.matrixModelViewProjection, false, gl.matrixModelViewProjection.m);

// 	if (gl.textureEnabled) {
// 		gl.bindTexture(gl.TEXTURE_2D, gl.tex0);
// 		gl.uniform1i(gl.program.uniform.textureEnabled, 1);
// 	} else {
// 		gl.bindTexture(gl.TEXTURE_2D, null);
// 		gl.uniform1i(gl.program.uniform.textureEnabled, 0);
// 	}

// 	// draw sphere with interleaved mode
// 	gl.bindBuffer(gl.ARRAY_BUFFER, gl.sphere.vboVertex);
// 	gl.vertexAttribPointer(gl.program.attribute.position, 3, gl.FLOAT, false, gl.sphere.stride, 0);
// 	gl.vertexAttribPointer(gl.program.attribute.normal, 3, gl.FLOAT, false, gl.sphere.stride, 12);
// 	gl.vertexAttribPointer(gl.program.attribute.texCoord0, 2, gl.FLOAT, false, gl.sphere.stride, 24);
// 	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.sphere.vboIndex);
// 	gl.uniform4fv(gl.program.uniform.lightColor, gl.light.getColor());
// 	gl.drawElements(gl.TRIANGLES, gl.sphere.getIndexCount(), gl.UNSIGNED_SHORT, 0);
// 	if (gl.wireframeEnabled) {
// 		gl.uniform4fv(gl.program.uniform.lightColor, new Float32Array([0, 0, 0, 1]));
// 		gl.drawElements(gl.LINE_STRIP, gl.sphere.getIndexCount(), gl.UNSIGNED_SHORT, 0);
// 	}
// }

// ///////////////////////////////////////////////////////////////////////////////
// // post frame
// ///////////////////////////////////////////////////////////////////////////////
// function postFrame() {}

// ///////////////////////////////////////////////////////////////////////////////
// // reshape OpenGL window when the canvas is resized
// ///////////////////////////////////////////////////////////////////////////////
// function handleResize() {
// 	// resize window to fit to parent
// 	gl.canvas.width = gl.canvas.parentNode.clientWidth;
// 	gl.canvas.height = gl.canvas.parentNode.clientHeight;
// 	//log(gl.canvas.parentNode.clientWidth + "x" + gl.canvas.parentNode.clientHeight);

// 	gl.screenWidth = gl.canvas.width;
// 	gl.screenHeight = gl.canvas.height;
// 	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
// 	gl.matrixProjection = Matrix4.makePerspective(45, gl.screenWidth / gl.screenHeight, 0.1, 1000);

// 	log("Window is resized: " + gl.screenWidth + " x " + gl.screenHeight);
// }

// ///////////////////////////////////////////////////////////////////////////////
// // handlers for mouse event
// ///////////////////////////////////////////////////////////////////////////////
// function handleMouseMove(e) {
// 	const SCALE_ANGLE = 0.3;
// 	const DEG2RAD = Math.PI / 180;

// 	// get current mouse position
// 	let offset = getElementOffset(this);
// 	let mouseX = e.clientX - offset.x;
// 	let mouseY = e.clientY - offset.y;
// 	let deltaX = mouseX - gl.mouse.x;
// 	let deltaY = mouseY - gl.mouse.y;
// 	gl.mouse.x = mouseX;
// 	gl.mouse.y = mouseY;

// 	// rotate camera
// 	if (gl.mouse.leftDown) {
// 		let delta = new Vector2();
// 		delta.x = (gl.mouse.y - gl.mouse.downY) * SCALE_ANGLE;
// 		delta.y = -(gl.mouse.x - gl.mouse.downX) * SCALE_ANGLE;

// 		let angle = new Vector3(
// 			gl.camera.downAngle.x + delta.x,
// 			gl.camera.downAngle.y + delta.y,
// 			gl.camera.downAngle.z,
// 		);
// 		gl.camera.rotateTo(angle);
// 	}

// 	// pan camera
// 	if (gl.mouse.rightDown) {
// 		let scale = 0.01;
// 		let delta = new Vector2(deltaX * scale, deltaY * scale);
// 		gl.camera.shift(delta);
// 	}
// 	//log(gl.mouse.toString());
// }

// function handleMouseDown(e) {
// 	// remember mouse position when mouse down
// 	//let offset = getElementOffset(this);
// 	gl.mouse.downX = gl.mouse.x;
// 	gl.mouse.downY = gl.mouse.y;
// 	//gl.mouse.x = gl.mouse.downX;
// 	//gl.mouse.y = gl.mouse.downY;
// 	//log("down: " + gl.mouse.downX + ", " + gl.mouse.downY);

// 	// remember previous angle and quaternion when mouse down
// 	gl.camera.downAngle = gl.camera.angle.clone();
// 	gl.camera.downQuaternion = gl.camera.quaternion.clone();

// 	//e = e || window.event; // hack for IE
// 	if ("which" in e) {
// 		switch (e.which) {
// 			case 1:
// 				gl.mouse.leftDown = true;
// 				break;
// 			case 2:
// 				gl.mouse.middleDown = true;
// 				break;
// 			case 3:
// 				gl.mouse.rightDown = true;
// 				break;
// 		}
// 	} else if ("button" in e) {
// 		// for IE
// 		if (e.button & 1) gl.mouse.leftDown = true;
// 		if (e.button & 2) gl.mouse.rightDown = true;
// 		if (e.button & 4) gl.mouse.middleDown = true;
// 	}

// 	e.preventDefault(); // disable context menu
// }

// function handleMouseUp(e) {
// 	//e = e || window.event; // hack for IE
// 	if ("which" in e) {
// 		switch (e.which) {
// 			case 1:
// 				gl.mouse.leftDown = false;
// 				break;
// 			case 2:
// 				gl.mouse.middleDown = false;
// 				break;
// 			case 3:
// 				gl.mouse.rightDown = false;
// 				break;
// 		}
// 	} else if ("button" in e) {
// 		// for IE
// 		if (e.button & 1) gl.mouse.leftDown = false;
// 		if (e.button & 2) gl.mouse.rightDown = false;
// 		if (e.button & 4) gl.mouse.middleDown = false;
// 	}
// }

// function handleClick(e) {}

// function handleMouseOut(e) {
// 	gl.mouse.leftDown = false;
// 	gl.mouse.rightDown = false;
// }

// function handleContextMenu(e) {
// 	e.preventDefault(); // disable context menu
// }

// function handleWheel(e) {
// 	const ZOOM_SCALE = 0.1;
// 	let deltaDistance = 0;
// 	if (e.deltaY != 0) {
// 		if (e.deltaY > 0)
// 			// wheel down
// 			deltaDistance = ZOOM_SCALE;
// 		// wheel up
// 		else deltaDistance = -ZOOM_SCALE;

// 		if (gl.camera.distance - deltaDistance < gl.nearPlane) deltaDistance = gl.camera.distance - gl.nearPlane;
// 		else if (gl.camera.distance - deltaDistance > gl.farPlane) deltaDistance = gl.camera.distance - gl.farPlane;

// 		gl.camera.moveForward(deltaDistance);
// 	}

// 	e.preventDefault();
// }

// ///////////////////////////////////////////////////////////////////////////////
// // handle touch events
// ///////////////////////////////////////////////////////////////////////////////
// function handleTouchStart(e) {
// 	e.preventDefault(); // prevent touch event being delivered

// 	// remember angles when touch started
// 	gl.camera.touchAngle = gl.camera.angle.clone();

// 	// remember all touch data when touch started
// 	let touches = e.changedTouches;
// 	for (let i = 0; i < touches.length; ++i) {
// 		gl.touches.push(copyTouch(touches[i]));
// 		gl.touches.distance = 0;
// 	}

// 	if (gl.touches.length == 1) gl.touches.downTouch = copyTouch(gl.touches[0]);
// }

// function handleTouchEnd(e) {
// 	e.preventDefault();

// 	// remove ended touch object from array
// 	let touches = e.changedTouches;
// 	for (let i = 0; i < touches.length; ++i) {
// 		let index = findTouchIndex(touches[i]);
// 		if (index >= 0)
// 			// found
// 			gl.touches.splice(index, 1); // remove it
// 	}

// 	// if there is still touch object, update the first touch object for rotation
// 	if (gl.touches.length > 0) gl.touches.downTouch = copyTouch(gl.touches[0]);
// }

// function handleTouchMove(e) {
// 	e.preventDefault();

// 	// get 2 touch objects for camera panning and zoom effects
// 	let touch1, touch2; // current touches
// 	let touches = e.changedTouches;
// 	for (let i = 0; i < touches.length; ++i) {
// 		let index = findTouchIndex(touches[i]);
// 		if (index == 0) touch1 = touches[i];
// 		else if (index == 1) touch2 = touches[i];
// 	}

// 	// if 2 touches, perform pan/zoom
// 	if (gl.touches.length == 2) {
// 		// delta touch movements
// 		let delta1 = new Vector2(touch1.pageX - gl.touches[0].pageX, touch1.pageY - gl.touches[0].pageY);
// 		let delta2 = new Vector2(touch2.pageX - gl.touches[1].pageX, touch2.pageY - gl.touches[1].pageY);
// 		let deltaAvg = delta1.clone().add(delta2).scale(0.5);

// 		// shift (pan) camera
// 		// use the delta average for shifting
// 		const SHIFT_SCALE = 0.003;
// 		gl.camera.shift(deltaAvg.scale(SHIFT_SCALE));

// 		// zoom camera
// 		const ZOOM_SCALE = 0.003;
// 		// difference between 2 touches
// 		let diff = new Vector2(touch2.pageX - touch1.pageX, touch2.pageY - touch1.pageY);
// 		let distance = diff.length();
// 		let deltaDistance = 0;
// 		if (gl.touches.distance > 0) deltaDistance = distance - gl.touches.distance;

// 		deltaDistance *= ZOOM_SCALE;
// 		if (gl.camera.distance - deltaDistance < gl.nearPlane) deltaDistance = gl.camera.distance - gl.nearPlane;
// 		else if (gl.camera.distance - deltaDistance > gl.farPlane) deltaDistance = gl.camera.distance - gl.farPlane;

// 		gl.camera.moveForward(deltaDistance);

// 		// update touch positions
// 		gl.touches[0].pageX = touch1.pageX;
// 		gl.touches[0].pageY = touch1.pageY;
// 		gl.touches[1].pageX = touch2.pageX;
// 		gl.touches[1].pageY = touch2.pageY;
// 		// update distance
// 		gl.touches.distance = distance;
// 	}
// 	// if 1 touch, perform rotate
// 	else if (gl.touches.length == 1) {
// 		const ROTATE_SCALE = 0.2;
// 		let angle = new Vector3();
// 		angle.x = gl.camera.touchAngle.x + (touch1.pageY - gl.touches.downTouch.pageY) * ROTATE_SCALE;
// 		angle.y = gl.camera.touchAngle.y - (touch1.pageX - gl.touches.downTouch.pageX) * ROTATE_SCALE;
// 		gl.camera.rotateTo(angle);

// 		// update touch position
// 		gl.touches[0].pageX = touch1.pageX;
// 		gl.touches[0].pageY = touch1.pageY;
// 	}
// }

// function handleTouchCancel(e) {
// 	gl.touches.length = 0; // clear
// 	//log("Touch canceled.");
// }

// function copyTouch(touch) {
// 	// return touch data
// 	return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
// }

// function findTouchIndex(touch) {
// 	// find touch object with same id
// 	for (var i = 0; i < gl.touches.length; ++i) {
// 		if (touch.identifier == gl.touches[i].identifier) return i;
// 	}
// 	return -1;
// }

// ///////////////////////////////////////////////////////////////////////////////
// // init OpenGL
// ///////////////////////////////////////////////////////////////////////////////
// function initGL(gl) {
// 	gl.clearColor(0.0, 0.0, 0.0, 0.0);
// 	gl.clearDepth(1.0);
// 	gl.enable(gl.DEPTH_TEST); // enable depth test
// 	gl.depthFunc(gl.LEQUAL);
// 	gl.enable(gl.CULL_FACE); // enable culling backface
// 	gl.cullFace(gl.BACK);

// 	// default light
// 	gl.light = new Light(0, 0, 1, 0);
// 	//gl.light.position.normalize(); //@@ fix normalize()
// 	gl.light.color.set(1.0, 1.0, 1.0, 1.0); // light color
// 	gl.light.attenuations.set(1, 0.5, 0); // attenuations (constant, linear, quad)
// 	log("    Light Position: " + gl.light.position);
// 	log("       Light Color: " + gl.light.color);
// 	log("Light Attenuations: " + gl.light.attenuations);
// 	log();

// 	// default material
// 	gl.material = new Material(0.7, 0.7, 0.7, 1.0); // with default diffuse
// 	gl.material.ambient.set(0.2, 0.2, 0.2, 1.0);
// 	gl.material.specular.set(0.2, 0.2, 0.2, 1);
// 	gl.material.shininess = 128;
// 	log("  Material Ambient: " + gl.material.ambient);
// 	log("  Material Diffuse: " + gl.material.diffuse);
// 	log(" Material Specular: " + gl.material.specular);
// 	log("Material Shininess: " + gl.material.shininess);
// 	log();

// 	// init matrices
// 	handleResize();
// 	gl.matrixModel = new Matrix4();
// 	gl.matrixView = gl.camera.matrix;
// 	gl.matrixModelView = gl.matrixView.clone().multiply(gl.matrixModel);
// 	gl.matrixModelViewProjection = gl.matrixProjection.clone().multiply(gl.matrixModelView);
// }

// ///////////////////////////////////////////////////////////////////////////////
// // init GLSL (shaders and programs)
// ///////////////////////////////////////////////////////////////////////////////
// function initGLSL() {
// 	// create shader objects
// 	let vertexShader = loadShaderById(gl, "vert-simple");
// 	let fragmentShader = loadShaderById(gl, "frag-simple");
// 	if (!vertexShader || !fragmentShader) return;

// 	// create program object and attach shader objects to it
// 	gl.program = gl.createProgram();
// 	gl.attachShader(gl.program, vertexShader);
// 	gl.attachShader(gl.program, fragmentShader);
// 	gl.deleteShader(vertexShader);
// 	gl.deleteShader(fragmentShader);

// 	// link
// 	gl.linkProgram(gl.program);
// 	if (!gl.getProgramParameter(gl.program, gl.LINK_STATUS)) {
// 		alert("[ERROR] Failed to initialize GLSL: " + gl.getProgramInfoLog(gl.program));
// 		log("[ERROR] Failed to initialize GLSL: " + gl.getProgramInfoLog(gl.program));
// 	}

// 	gl.useProgram(gl.program);

// 	// setup attributes
// 	gl.program.attribute = {};
// 	gl.program.attribute.position = gl.getAttribLocation(gl.program, "vertexPosition");
// 	gl.program.attribute.normal = gl.getAttribLocation(gl.program, "vertexNormal");
// 	gl.program.attribute.texCoord0 = gl.getAttribLocation(gl.program, "vertexTexCoord0");
// 	gl.enableVertexAttribArray(gl.program.attribute.position);
// 	gl.enableVertexAttribArray(gl.program.attribute.normal);
// 	gl.enableVertexAttribArray(gl.program.attribute.texCoord0);

// 	// setup uniforms
// 	gl.program.uniform = {};
// 	gl.program.uniform.matrixModelView = gl.getUniformLocation(gl.program, "matrixModelView");
// 	gl.program.uniform.matrixView = gl.getUniformLocation(gl.program, "matrixView");
// 	gl.program.uniform.matrixNormal = gl.getUniformLocation(gl.program, "matrixNormal");
// 	gl.program.uniform.matrixModelViewProjection = gl.getUniformLocation(gl.program, "matrixModelViewProjection");
// 	gl.program.uniform.lightEnabled = gl.getUniformLocation(gl.program, "lightEnabled");
// 	gl.program.uniform.lightPosition = gl.getUniformLocation(gl.program, "lightPosition");
// 	gl.program.uniform.lightColor = gl.getUniformLocation(gl.program, "lightColor");
// 	gl.program.uniform.lightAttenuations = gl.getUniformLocation(gl.program, "lightAttenuations");
// 	gl.program.uniform.materialAmbient = gl.getUniformLocation(gl.program, "materialAmbient");
// 	gl.program.uniform.materialDiffuse = gl.getUniformLocation(gl.program, "materialDiffuse");
// 	gl.program.uniform.materialSpecular = gl.getUniformLocation(gl.program, "materialSpecular");
// 	gl.program.uniform.materialShininess = gl.getUniformLocation(gl.program, "materialShininess");
// 	gl.program.uniform.textureEnabled = gl.getUniformLocation(gl.program, "textureEnabled");
// 	gl.program.uniform.map0 = gl.getUniformLocation(gl.program, "map0");

// 	// set light and material uniforms
// 	gl.uniform1i(gl.program.uniform.lightEnabled, 1); // toggle on/off lighting
// 	gl.uniform4fv(gl.program.uniform.lightPosition, gl.light.getPosition());
// 	gl.uniform4fv(gl.program.uniform.lightColor, gl.light.getColor());
// 	gl.uniform3fv(gl.program.uniform.lightAttenuations, gl.light.getAttenuations());
// 	gl.uniform4fv(gl.program.uniform.materialAmbient, gl.material.getAmbient());
// 	gl.uniform4fv(gl.program.uniform.materialDiffuse, gl.material.getDiffuse());
// 	gl.uniform4fv(gl.program.uniform.materialSpecular, gl.material.getSpecular());
// 	gl.uniform1f(gl.program.uniform.materialShininess, gl.material.shininess);
// 	gl.uniform1i(gl.program.uniform.textureEnabled, 0);
// 	gl.uniform1i(gl.program.uniform.map0, 0);
// }

// ///////////////////////////////////////////////////////////////////////////////
// // print WebGL RC info
// ///////////////////////////////////////////////////////////////////////////////
// function logWebGL(gl) {
// 	log("===== WebGL Info =====");
// 	log("   Version: " + gl.getParameter(gl.VERSION));
// 	log("  GLSL Ver: " + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
// 	log("    Vendor: " + gl.getParameter(gl.VENDOR));
// 	log("  Renderer: " + gl.getParameter(gl.RENDERER));
// 	log(
// 		"     Color: (" +
// 			gl.getParameter(gl.RED_BITS) +
// 			", " +
// 			gl.getParameter(gl.GREEN_BITS) +
// 			", " +
// 			gl.getParameter(gl.BLUE_BITS) +
// 			", " +
// 			gl.getParameter(gl.ALPHA_BITS) +
// 			") bits",
// 	);
// 	log("     Depth: " + gl.getParameter(gl.DEPTH_BITS) + " bits");
// 	log("   Stencil: " + gl.getParameter(gl.STENCIL_BITS) + " bits");
// 	log("Extensions: " + gl.getSupportedExtensions());
// 	log();
// }

// ///////////////////////////////////////////////////////////////////////////////
// // start rendering loop
// ///////////////////////////////////////////////////////////////////////////////
// function startRendering(gl) {
// 	log("\nStarting rendering loop...\n");

// 	// try to find "requestAnimationFrame" function
// 	// if it is not available use setTimeout() instead
// 	let requestAnimationFrame = getRequestAnimationFrameFunction(window);
// 	let timer = new Timer();
// 	gl.fps = new FrameRate("fps");
// 	let frameCallback = function () {
// 		gl.fps.tick();
// 		gl.frameTime = timer.getFrameTime();
// 		gl.runTime += gl.frameTime;
// 		frame();
// 		postFrame();
// 		requestAnimationFrame(frameCallback);
// 	};

// 	timer.start();
// 	gl.runTime = 0;
// 	requestAnimationFrame(frameCallback);
// }

// ///////////////////////////////////////////////////////////////////////////////
// // init HTML DOM
// ///////////////////////////////////////////////////////////////////////////////
// function initHtmlElements() {
// 	let checkNormal = document.getElementById("checkNormal");
// 	checkNormal.checked = false;
// 	checkNormal.addEventListener("click", (event) => {
// 		gl.sphere.reverseNormals();
// 	});

// 	let rangeRadius = document.getElementById("rangeRadius");
// 	let labelRadius = document.getElementById("labelRadius");
// 	rangeRadius.value = 1;
// 	rangeRadius.addEventListener("input", (event) => {
// 		labelRadius.innerHTML = rangeRadius.value;
// 		gl.sphere.setRadius(parseFloat(rangeRadius.value));
// 		if (checkNormal.checked) gl.sphere.reverseNormals();
// 		printSphere();
// 	});

// 	let rangeSector = document.getElementById("rangeSector");
// 	let labelSector = document.getElementById("labelSector");
// 	rangeSector.value = 36;
// 	rangeSector.addEventListener("input", (event) => {
// 		labelSector.innerHTML = rangeSector.value;
// 		gl.sphere.setSectorCount(parseFloat(rangeSector.value));
// 		if (checkNormal.checked) gl.sphere.reverseNormals();
// 		printSphere();
// 	});

// 	let rangeStack = document.getElementById("rangeStack");
// 	let labelStack = document.getElementById("labelStack");
// 	rangeStack.value = 18;
// 	rangeStack.addEventListener("input", (event) => {
// 		labelStack.innerHTML = rangeStack.value;
// 		gl.sphere.setStackCount(parseFloat(rangeStack.value));
// 		if (checkNormal.checked) gl.sphere.reverseNormals();
// 		printSphere();
// 	});

// 	let checkTexture = document.getElementById("checkTexture");
// 	checkTexture.checked = false;
// 	checkTexture.addEventListener("click", (event) => {
// 		gl.textureEnabled = checkTexture.checked;
// 	});

// 	let checkWireframe = document.getElementById("checkWireframe");
// 	checkWireframe.checked = false;
// 	checkWireframe.addEventListener("click", (event) => {
// 		gl.wireframeEnabled = checkWireframe.checked;
// 	});

// 	let checkSmooth = document.getElementById("checkSmooth");
// 	checkSmooth.checked = false;
// 	checkSmooth.addEventListener("click", (event) => {
// 		gl.sphere.setSmooth(checkSmooth.checked);
// 		if (checkNormal.checked) gl.sphere.reverseNormals();
// 		printSphere();
// 	});

// 	let buttonReset = document.getElementById("buttonReset");
// 	buttonReset.addEventListener("click", (event) => {
// 		gl.sphere.set(1, 36, 18, false);
// 		rangeRadius.value = 1;
// 		labelRadius.innerHTML = 1;
// 		rangeSector.value = 36;
// 		labelSector.innerHTML = 36;
// 		rangeStack.value = 18;
// 		labelStack.innerHTML = 18;
// 		checkTexture.checked = false;
// 		checkWireframe.checked = false;
// 		checkSmooth.checked = false;
// 		checkNormal.checked = false;
// 		gl.textureEnabled = false;
// 		gl.wireframeEnabled = false;
// 		resetCamera();
// 		printSphere();
// 	});
// }

// ///////////////////////////////////////////////////////////////////////////////
// function resetCamera() {
// 	let deltaDistance = gl.camera.distance - CAMERA_DIST;
// 	gl.camera.moveForward(deltaDistance, ANIM_DURATION);
// 	gl.camera.shiftTo(new Vector3(0, 0, 0), ANIM_DURATION);
// 	gl.camera.rotateTo(new Vector3(0, 0, 0), ANIM_DURATION);
// }

// ///////////////////////////////////////////////////////////////////////////////
// function printSphere() {
// 	let info = document.getElementById("info");
// 	if (info) {
// 		info.innerHTML = gl.sphere.toString();
// 	}
// }
