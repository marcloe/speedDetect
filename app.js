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


const requestPermissionBtn = document.getElementById("requestPermissionBtn");
        requestPermissionBtn.addEventListener("click", requestSensorPermission);

        function requestSensorPermission() {
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
                console.error('Device does not support the permissions API.');
            }
        }

        function startAccelerometer() {
            if (window.DeviceMotionEvent) {
                window.addEventListener("devicemotion", handleMotion, true);
            } else {
                console.log("Device does not support accelerometer.");
            }
        }

        function handleMotion(event) {
            const acceleration = event.accelerationIncludingGravity;
            const x = acceleration.x.toFixed(2);
            const y = acceleration.y.toFixed(2);
            const z = acceleration.z.toFixed(2);

            // Update the values on the web page
            document.getElementById("x-axis").textContent = x;
            document.getElementById("bar1").style.width = x*100+"px";
            document.getElementById("y-axis").textContent = y;
            document.getElementById("bar2").style.width = x*100+"px";
            document.getElementById("z-axis").textContent = z;
            document.getElementById("bar3").style.width = x*100+"px";

            // You can perform actions or recognition based on the accelerometer data here.
        }

// - - - 