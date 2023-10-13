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

navigator.permissions.query({ name: "accelerometer" }).then((result) => {
    if (result.state === "denied") {
      console.log("Permission to use accelerometer sensor is denied.");
      return;
    }
    // Use the sensor.


    if ('Accelerometer' in window) {
        let accelerometer = null;
        try {
        accelerometer = new LinearAccelerationSensor({ frequency: 60 });
        accelerometer.onerror = (event) => {
            // Handle runtime errors.
            if (event.error.name === 'NotAllowedError') {
            console.log('Permission to access sensor was denied.');
            document.getElementById("wrapper").style.backgroundColor = "red";
            } else if (event.error.name === 'NotReadableError') {
            console.log('Cannot connect to the sensor.');
            document.getElementById("wrapper").style.backgroundColor = "orange";
            }
        };
    
        accelerometer.onreading = (e) => {
            
            x = laSensor.x.toFixed(3);
            x = laSensor.y.toFixed(3);
            x = laSensor.z.toFixed(3);
    
            document.getElementById("wrapper").style.backgroundColor = "green";
            document.getElementById("x-axis").textContent = x;
            document.getElementById("bar1").style.width = x*100+"px";
            document.getElementById("y-axis").textContent = y;
            document.getElementById("bar2").style.width = y*100+"px";
            document.getElementById("z-axis").textContent = z;
            document.getElementById("bar3").style.width = z*100+"px";
    
    
        };
    
        accelerometer.start();
        } catch (error) {
        // Handle construction errors.
            if (error.name === 'SecurityError') {
                console.log('Sensor construction was blocked by the Permissions Policy.');
                document.getElementById("wrapper").style.backgroundColor = "pink";
            } else if (error.name === 'ReferenceError') {
                console.log('Sensor is not supported by the User Agent.');
                document.getElementById("wrapper").style.backgroundColor = "purple";
            } else {
                throw error;
            }
        }
    }



  });







// - - - 




