const containerElement = document.getElementById('container');
const wrapperElement = document.getElementById('wrapper');


function setupElements() {

    containerElement.style.height = window.innerHeight + 'px';
    containerElement.style.width = window.innerWidth + 'px';
  
/*     setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0); */
  
    wrapperElement.style.height = (containerElement.clientHeight * 0.5) + 'px';
    wrapperElement.style.width = (containerElement.clientWidth * 0.5) + 'px';
}

// - - - 

setupElements();

const gn = new GyroNorm();

if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          startAccelerometer();
        } else {
          console.error('Permission to access accelerometer data denied.');
        }
      })
      .catch(console.error);
  } else {
    // Handle browsers that do not support the permissions API
    console.error('Device does not support the permissions API.');
  }
  
  function startAccelerometer() {
    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", handleMotion, true);
    } else {
      console.log("Device does not support accelerometer.");
    }
  }
  
  function handleMotion(event) {
    // Your accelerometer data handling code here
  }

// - - - 