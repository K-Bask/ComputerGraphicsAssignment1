// Wait for the page to load
window.onload = function() {
    // Get the canvas element
    const canvas = document.getElementById('glCanvas');
    // Initialize the GL context
    const gl = canvas.getContext('webgl');
    
    canvas.addEventListener('click', handleCanvasClick);

    function handleCanvasClick(event) {
        console.log("Canvas clicked");
        const clickPos = getCanvasCoordinates(event);
        console.log("Click position: ", clickPos);
    }

    function getCanvasCoordinates(event) {
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width * 2 - 1;
        const y = (event.clientY - rect.top) / rect.height * -2 + 1;
        return { x, y };
    }

    function isPointInButton(point, buttonCoords, buttonName) {
        const xMin = Math.min(buttonCoords[2], buttonCoords[6]); // Leftmost x
        const xMax = Math.max(buttonCoords[0], buttonCoords[4]); // Rightmost x
        const yMin = Math.min(buttonCoords[3], buttonCoords[7]); // Bottommost y
        const yMax = Math.max(buttonCoords[1], buttonCoords[5]); // Topmost y
    
        const isInButton = (
            point.x >= xMin && point.x <= xMax && // Check x coordinate
            point.y >= yMin && point.y <= yMax    // Check y coordinate
        );
        return isInButton;
    }

    function handleCanvasClick(event) {
        const clickPos = getCanvasCoordinates(event);
    
        if (isPointInButton(clickPos, button1)) { 
            updateRectangleColor(gl, shaderProgram1); // Color for button1
        } else if (isPointInButton  (clickPos, button2)) { 
            updateRectangleColor(gl, shaderProgram2); // Color for button2
        } else if (isPointInButton(clickPos, button3)) { 
            updateRectangleColor(gl, shaderProgram3); // Color for button3
        } else if (isPointInButton(clickPos, resetbutton)) { 
            updateRectangleColor(gl, shaderProgram); // Reset to original color
        }
    }


    
    // Only continue if WebGL is available and working
    if (!gl) {
        alert('Unable to initialize WebGL. Your browser may not support it.');
        return;
    }

    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Vertex shader program
    const vsSource = `
        attribute vec4 aVertexPosition;
        void main() {
            gl_Position = aVertexPosition;
        }
    `;

    // Fragment shader program
    const fsSource = `
        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `;

    const fsSource1 = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    }
    `;

    const fsSource2 = `
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
    }
    `;

    const fsSource3 = `
    void main() {
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
    `;

    // Initialize a shader program
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    const shaderProgramdef = initShaderProgram(gl, vsSource, fsSource);
    const shaderProgram1 = initShaderProgram(gl, vsSource, fsSource1);
    const shaderProgram2 = initShaderProgram(gl, vsSource, fsSource2);
    const shaderProgram3 = initShaderProgram(gl, vsSource, fsSource3);

    // Get the attribute location
    const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');

    // Create a buffer for the rectangle's positions.
    const positionBuffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer operations to from here out
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Create an array of positions for the rectangle.
    const object = [
        -0.6,  0.6,
         0.5,  0.6,
        -0.6, -0.3,
         0.5, -0.3,  
    ];

    const button1 = [
        -0.4, -0.7,
        -0.6, -0.7,
        -0.4, -0.4,
        -0.6, -0.4,
    ];

    const button2 = [
        -0.1, -0.7,
        -0.3, -0.7,
        -0.1, -0.4,
        -0.3, -0.4,
    ];

    const button3 = [
        0.2, -0.7,
        0, -0.7,
        0.2, -0.4,
        0, -0.4,
    ];

    const resetbutton = [
        0.5, -0.7,
        0.3, -0.7,
        0.5, -0.4,
        0.3, -0.4,
    ];

    // Pass the list of positions into WebGL to build the shape
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object), gl.STATIC_DRAW);
    // Tell WebGL how to pull out the positions from the position buffer into the vertexPosition attribute
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexPosition);
    // Use our shader program
    gl.useProgram(shaderProgram);
    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); 

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(button1), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexPosition);
    gl.useProgram(shaderProgram1);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); 
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(button2), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexPosition);
    gl.useProgram(shaderProgram2);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); 

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(button3), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexPosition);
    gl.useProgram(shaderProgram3);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); 

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(resetbutton), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexPosition);
    gl.useProgram(shaderProgram);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); 

    function updateRectangleColor(gl, shaderProgram) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(shaderProgram);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object), gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        gl.useProgram(shaderProgram1);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(button1), gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        gl.useProgram(shaderProgram2);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(button2), gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        gl.useProgram(shaderProgram3);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(button3), gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        gl.useProgram(shaderProgramdef);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(resetbutton), gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}

// Initialize a shader program, so WebGL knows how to draw our data
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

// Creates a shader of the given type, uploads the source and compiles it.
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object
    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}