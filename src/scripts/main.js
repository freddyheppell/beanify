const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('beam');

// const model = tf.loadLayersModel(`${window.location.origin}/model.json`);

const portrait = window.matchMedia("(orientation: portrait)").matches

const constraints = {
  video: {
    width: portrait ? 360 : 640,
    height: portrait ? 640 : 360,
    facingMode: 'environment'
  },
};

prepareConsent()

// get webcam consent
function prepareConsent() {
  var consent = captureButton.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        player.srcObject = stream;
        captureButton.innerHTML = "Beam your bean";
        captureButton.removeEventListener('click', consent);
        ready();
      });
  });
}

function ready() {
  var captbutton = captureButton.addEventListener('click', () => {
    captureButton.removeEventListener('click', captbutton);
    capture();
  });
}

function capture() {
  context.drawImage(player, 0, 0, canvas.width, canvas.height);
}

// on button click, capture, rebind the button then hide the player

// export the image to tensorflowjs

// recieve the classification and display it.

// change the button to 'beam another bean', which reloads the page.
