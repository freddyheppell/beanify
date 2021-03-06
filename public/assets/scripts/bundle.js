/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var player = document.getElementById('player');\nvar canvas = document.getElementById('canvas');\nvar context = canvas.getContext('2d');\nvar preview = document.getElementById('preview');\nvar prevctx = preview.getContext('2d');\nvar captureButton = document.getElementById('beam');\nvar result = document.getElementById('result');\nvar labels = [\"Probably not a bean, merhaps.\", \"MINTSORBET\", \"CRANBERRYANDAPPLE\", \"STRAWBERRY\", \"MANGO\", \"MARSHMALLOW\", \"PINKGRAPEFRUIT\", \"LIQUORICE\", \"PINACOLADA\", \"PEACHYPIE\", \"TROPICALPUNCH\", \"WILDCHERRY\", \"BLUEBERRYPIE\", \"BUTTERSCOTCH\", \"GRANNYSMITHAPPLE\", \"SOUTHSEASKIWI\", \"CARAMEL\", \"GRAPE\", \"SOURLEMON\", \"COLA\", \"TANGERINE\", \"BANANASPLIT\", \"COFFEE\", \"STRAWBERRYSMOOTHIE\", \"FRENCHVANILLA\", \"CANDYFLOSS\", \"WATERMELON\", \"PEAR\", \"LEMONANDLIME\"];\ncanvas.width = 100;\ncanvas.height = 100;\nvar model;\ntf.loadLayersModel(\"https://storage.googleapis.com/beanify-tech/model/model.json\").then(function (a) {\n  model = a;\n});\nvar portrait = window.matchMedia(\"(orientation: portrait)\").matches;\nvar constraints = {\n  video: {\n    width: 400,\n    height: 400,\n    facingMode: 'environment'\n  }\n};\ncaptureButton.addEventListener('click', prepareConsent);\nvar consent; // get webcam consent\n\nfunction prepareConsent() {\n  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {\n    player.srcObject = stream;\n    captureButton.innerHTML = \"Beam your bean\";\n    captureButton.removeEventListener('click', prepareConsent);\n    captureButton.addEventListener('click', capture);\n    setInterval(beanPreview, 1000);\n  });\n}\n\nfunction beanPreview() {\n  prevctx.drawImage(player, 0, 0, preview.width, preview.height);\n  analyse();\n}\n\nfunction analyse() {\n  var hsv = new cv.Mat();\n  var out = new cv.MatVector();\n  var image = cv.imread('preview');\n  cv.cvtColor(image, hsv, cv.COLOR_BGR2HSV, 0);\n  cv.split(hsv, out);\n  var thresholded = new cv.Mat();\n  cv.threshold(out.get(1), thresholded, 0, 255, cv.THRESH_OTSU);\n  var preprocess = new cv.MatVector();\n  var hi = new cv.Mat();\n  cv.medianBlur(thresholded, thresholded, 5);\n  cv.findContours(thresholded, preprocess, hi, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);\n  c = preprocess.get(0);\n  var a = cv.contourArea(c);\n\n  if (a > 10) {\n    var det = new cv.Mat();\n    var rect = cv.boundingRect(c);\n    var side = rect.width < rect.height ? rect.width : rect.height;\n    var r = new cv.Rect(rect.x - 1, rect.y - 1, side + 2, side + 2);\n    det = image.roi(r);\n    var resized = new cv.Mat();\n    cv.resize(det, resized, new cv.Size(100, 100));\n    cv.imshow('canvas', resized);\n  }\n}\n\nfunction capture() {\n  // captureButton.removeEventListener('click', capture);\n  var data = tf.browser.fromPixels(context.getImageData(0, 0, canvas.width, canvas.height));\n  var prediction = model.predict(data.as4D(1, 100, 100, 3)).as1D().argMax().dataSync()[0];\n  var lbl = labels[prediction];\n  console.log({\n    lbl: lbl,\n    prediction: prediction\n  });\n  result.innerHTML = labels[prediction];\n} // on button click, capture, rebind the button then hide the player\n// export the image to tensorflowjs\n// recieve the classification and display it.\n// change the button to 'beam another bean', which reloads the page.\n\n//# sourceURL=webpack:///./src/scripts/main.js?");

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/styles/main.scss?");

/***/ }),

/***/ 0:
/*!**********************************************************!*\
  !*** multi ./src/scripts/main.js ./src/styles/main.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/scripts/main.js */\"./src/scripts/main.js\");\nmodule.exports = __webpack_require__(/*! ./src/styles/main.scss */\"./src/styles/main.scss\");\n\n\n//# sourceURL=webpack:///multi_./src/scripts/main.js_./src/styles/main.scss?");

/***/ })

/******/ });