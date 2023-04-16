const canvas = document.getElementById('canvas1');

// getContext will only work on a variable that refers to a canvas element
// It returns a reference to built in canvas 2d API object
const ctx = canvas.getContext('2d');

/* 
Can see the properties of the canvas object 
Properties - global canvas settings such as fillStyle, font, strokeStyle, etc. (can tweak these for different effects)
    Example: ctx.fillStyle = "white";
_proto_: CanvasRenderingContext2D --> all different canvas drawing methods
    Example: ctx.arc(...) - can be used to draw a circle 
*/
console.log(ctx);

// To help scaling when resizing window - here only called once on intial page load
// This still stretches the rectangle though, so this is fixed by the next piece
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Used for Particle class to store new particles (circles) in an array
const particlesArray = [];

// Takes in what type of event we want to listen for and callback function with code that will run that event occurs
window.addEventListener('resize', function(){
    
    // Here the scaling will happen everytime the window is resized
    // Below all other things that need to happen with resize (like drawing the rectangle) are included in this function
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // // Fill color of the following rectangle
    // ctx.fillStyle = 'white';

    // // Takes in x an y coordinates (starts from top left corner of canvas) and width and height
    // ctx.fillRect(10, 10, 150, 50);
})

// If we wanted to create this object everytime the screen is clicked
// mouse will store x and y coordinates that are available throughout program
// Initially setting them to undefined to create blank canvas to start
const mouse = {
    x: undefined,
    y: undefined,
}

// Everytime a click event occurs, take x and y coordinates of the event and assign them to the custom mouse object
canvas.addEventListener('click', function(event){
    
    console.log(event);

    mouse.x = event.x;
    mouse.y = event.y;

    for (i = 0; i < 10; i++){
        particlesArray.push(new Particle());
    }
    
})

// Event to be triggered everytime the mouse moves over the canvas
// Creates a paint brush effect
canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;

    for (i = 0; i < 2; i++){
        particlesArray.push(new Particle());
    }
})

// JS class is a blueprint where we define behavior and properties of the objects
// Each time we call this class, it will create one new particle object 
// Each particle will be one circle
class Particle {

    // Every class needs to have a constructor method - defines properties
    // Behavior of the objects are defined with class methods
    // Method - a function on an object
    constructor(){

        // Causes each particle's initial position to be under the mouse
        this.x = mouse.x;
        this.y = mouse.y;

        // Set initially to between 0 and canvas width or height
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;

        // Generates a random number between 1 and 16 for the size
        this.size = Math.random() * 15 + 1;

        // Allow dynamic movement - random number between + 1.5 and - 1.5
        // X --> + moves right, - moves left
        // Y --> + mmoves down, - moves up
        this.speedX = Math.random() * 3  - 1.5;
        this.speedY = Math.random() * 3  - 1.5;
    }

    // Change x and y coordinates based on speed values
    update(){
        this.x += this.speedX;
        this.y += this.speedY;

        // Decrease size of circle for every animation frame
        // Note: We don't go below 0.2 because we don't want a negative radius --> would break code
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    }

    draw(){
        ctx.fillStyle = 'white';

        // To draw new things, lets JS know we are drawing a new shape not connected to previous lines (if there are any)
        ctx.beginPath();
    
        // Draw a circle (also can draw some other things)
        // Takes in coordinates (x, y) for the center point, Radius, Start angle (where along circular path to start drawing), End angle 
        // End angle Math.PI * 2 --> converts to 360 degrees (entire circle)
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    
        // Fill the path with color (uses color specified with fillStyle earlier)
        ctx.fill();

    }

}

function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++){

        particlesArray[i].update();
        particlesArray[i].draw();

        if (particlesArray[i].size <= 0.3) {

            // Takes in index of the element we want to delete and deleteCount (1) --> delete one element from the array
            particlesArray.splice(i, 1);

            // Can check if particles are being removed correctly from the array
            //console.log(particlesArray.length);
            
            i--;

        }
    }
}

// Creates an animation loop 
function animate(){

    // Make a semi-transparent circle on top of the canvas repeatedly
    // rgba last value --> opacity
    ctx.fillStyle = 'rgba(0,0,0,0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    handleParticles();

    // Calls the function we pass it as an arg
    // Passing it the parent function will create a loop
    requestAnimationFrame(animate);

}

animate();





