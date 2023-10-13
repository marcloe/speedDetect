const containerElement = document.getElementById('container');
const wrapperElement = document.getElementById('wrapper');


function setupElements() {

    containerElement.style.height = window.innerHeight + 'px';
    containerElement.style.width = window.innerWidth + 'px';
  
/*     setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0); */
  
    wrapperElement.style.height = (containerElement.clientHeight * 0.9) + 'px';
    wrapperElement.style.width = (containerElement.clientWidth * 0.9) + 'px';
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
                            document.getElementById("wrapper").style.backgroundColor = "green";
                        } else {
                            console.error('Permission to access accelerometer data denied.');
                            document.getElementById("wrapper").style.backgroundColor = "red";
                        }
                    })
                    .catch(console.error);
            } else {
                console.error('Device does not support the permissions API.');
                document.getElementById("wrapper").style.backgroundColor = "orange";
            }
        }

        function startAccelerometer() {
          const gn = new GyroNorm();

          gn.init().then(function() {
            gn.start(function(data) {
              const x = data.dm.x;
              const y = data.dm.y;
              const z = data.dm.z;
          
              // Update your web page with the accelerometer data
              document.getElementById("x-axis").textContent = x.toFixed(3);
              document.getElementById("bar1").style.width = x*100+"px";
              document.getElementById("y-axis").textContent = y.toFixed(3);
              document.getElementById("bar2").style.width = y*100+"px";
              document.getElementById("z-axis").textContent = z.toFixed(3);
              document.getElementById("bar3").style.width = z*100+"px";
          
              // You can perform actions or recognition based on the accelerometer data here.
            });
          }).catch(function(e) {
            console.error("GyroNorm failed to initialize: " + e);
          });
        }



// - - - 


