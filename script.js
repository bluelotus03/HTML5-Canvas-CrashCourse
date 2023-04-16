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
    
})

// Event to be triggered everytime the mouse moves over the canvas
// Creates a paint brush effect
canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

function drawCircle() {
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;

    // To draw new things, lets JS know we are drawing a new shape not connected to previous lines (if there are any)
    ctx.beginPath();

    // Draw a circle (also can draw some other things)
    // Takes in coordinates (x, y) for the center point, Radius, Start angle (where along circular path to start drawing), End angle 
    // End angle Math.PI * 2 --> converts to 360 degrees (entire circle)
    ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);

    // Fill the path with color (uses color specified with fillStyle earlier)
    ctx.fill();

    // Utilize stroke color 
    // Note: if don't use fill(), just stroke(), will be outline of shape only
    ctx.stroke();

}

// Creates an animation loop 
function animate(){

    // At start of animation, clear old things from canvas
    // Takes in coordinates (x and y), width, and height
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCircle();

    // Calls the function we pass it as an arg
    // Passing it the parent function will create a loop
    requestAnimationFrame(animate);

}

animate();





