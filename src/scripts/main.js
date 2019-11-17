const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const preview = document.getElementById('preview');
const prevctx = preview.getContext('2d');
const captureButton = document.getElementById('beam');
const result = document.getElementById('result');

const BEAN_BORDER_MULT = 0.1;

const labelsbad = {
  'MINTSORBET': 0,
  'BANNANASPLIT': 1,
  'GRANNYSMITHAPPLE': 2,
  'CRANBERRYANDAPPLE': 3,
  'STRAWBERRY': 4,
  'MANGO': 6,
  'CHILLI': 7,
  'MARSHMALLOW': 8,
  'PINKGRAPEFRUIT': 10,
  'LIQUORICE': 12,
  'PINACOLADA': 14,
  'PEAR': 15,
  'BANANASPLIT': 17,
  'FRENCHVANILLA': 18,
  'PEACHYPIE': 20,
  'TROPICALPUNCH': 21,
  'WILDCHERRY': 23,
  'LEMONANDLIME': 25,
  'GRAPE': 26,
  'SOURLEMON': 27,
  'COFFEE': 29,
  'BLUEBERRYPIE': 32,
  'BUTTERSCOTCH': 33,
  'SOUTHSEASKIWI': 37,
  'CARAMEL': 40,
  'TANGERINE': 44,
  'STRAWBERRYSMOOTHIE': 47,
  'COLA': 53,
  'CANDYFLOSS': 58,
  'WATERMELON': 62,
  'SOUTHSEAKIWI': 72
}

const labels = {};

Object.keys(labelsbad).forEach(key => {
  labels[labelsbad[key]] = key;
});

canvas.width = 100;
canvas.height = 100;


var model;

tf.loadLayersModel("https://storage.googleapis.com/beanify-tech/model/model.json").then((a) => { model = a });

const portrait = window.matchMedia("(orientation: portrait)").matches

const constraints = {
  video: {
    width: 400,
    height: 400,
    facingMode: 'environment'
  },
};

captureButton.addEventListener('click', prepareConsent);

var consent;

// get webcam consent
function prepareConsent() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      player.srcObject = stream;
      captureButton.innerHTML = "Beam your bean";
      captureButton.removeEventListener('click', prepareConsent);
      captureButton.addEventListener('click', capture);
      setInterval(beanPreview, 1000);
    });
}

function beanPreview() {
  prevctx.drawImage(player, 0, 0, preview.width, preview.height);
  analyse();
}

function analyse() {
  var hsv = new cv.Mat();
  var out = new cv.MatVector()
  const image = cv.imread('preview');
  cv.cvtColor(image, hsv, cv.COLOR_BGR2HSV, 0);
  cv.split(hsv, out);

  var thresholded = new cv.Mat();
  cv.threshold(out.get(1), thresholded, 0, 255, cv.THRESH_OTSU);

  var preprocess = new cv.MatVector();
  var hi = new cv.Mat();
  cv.medianBlur(thresholded, thresholded, 5);
  cv.findContours(thresholded, preprocess, hi, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

  c = preprocess.get(0)
  var a = cv.contourArea(c);
  if (a > 10) {
    var det = new cv.Mat();
    var rect = cv.boundingRect(c);
    var side = (rect.width <= rect.height ? rect.width : rect.height);
    var bordersize = Math.round(side * BEAN_BORDER_MULT)
    let r = new cv.Rect(
      rect.x - bordersize,
      rect.y - bordersize,
      side + 2*bordersize,
      side + 2*bordersize
    );
    det = image.roi(r);
    let resized = new cv.Mat();
    cv.resize(det, resized, new cv.Size(100, 100))
    cv.imshow('canvas', resized);
  }
}

function load(src) {
  image = new Image();
  image.src = src;
  image.onload = function() {
    context.drawImage(image, 0, 0);
    capture();
  }
}

window.load = load;

function capture() {
  // captureButton.removeEventListener('click', capture);
  const data = tf.browser.fromPixels(context.getImageData(0, 0, canvas.width, canvas.height));
  const pred = model.predict(data.as4D(1, 100, 100, 3)).argMax()
  console.log(pred);
  prediction = pred.as1D().dataSync()[0];
  const lbl = labels[prediction];
  console.log({lbl, prediction})
  result.innerHTML = lbl
}

// on button click, capture, rebind the button then hide the player

// export the image to tensorflowjs

// recieve the classification and display it.

// change the button to 'beam another bean', which reloads the page.
