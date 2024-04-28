`use strict`

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const dotRadius = 10;
    const lineWidth = 5;
    const dashLength = 5;
    let dots = [];
    let userLines = []; // Array to store user-drawn lines
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw dashed line between first two dots
        if (dots.length >= 2) {
            drawHalfCircle(dots[0], dots[1]);
        }

        // Draw triangle
        if (dots.length >= 3) {
            drawTriangle(dots[2]);
        }

        // Draw dots
        dots.forEach((dot, index) => {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
            ctx.fillStyle = index === 0 ? "red" : (index === 1 ? "blue" : "green");
            ctx.fill();
        });

        // Draw user-drawn lines
        userLines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(line.startX, line.startY);
            ctx.lineTo(line.endX, line.endY);
            ctx.strokeStyle = "green";
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        });
    }

    function drawHalfCircle(start, end) {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const radius = Math.sqrt(dx * dx + dy * dy) / 2;

        const centerX = (start.x + end.x) / 2;
        const centerY = (start.y + end.y) / 2;

        ctx.beginPath();
        ctx.setLineDash([dashLength, dashLength]);
        ctx.arc(centerX, centerY, radius, 0, Math.PI, true);
        ctx.strokeStyle = "black";
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.setLineDash([]);
    }

    function drawTriangle(thirdDot) {
        // Draw dashed lines between each dot and the third dot
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.setLineDash([dashLength, dashLength]);
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(thirdDot.x, thirdDot.y);
            ctx.strokeStyle = "black";
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }

    function distance(dot1, dot2) {
        const dx = dot2.x - dot1.x;
        const dy = dot2.y - dot1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    canvas.addEventListener("mousedown", (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (!isDrawing) {
            isDrawing = true;
            lastX = mouseX;
            lastY = mouseY;
        }
    });

    canvas.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (isDrawing) {
            drawLine(lastX, lastY, mouseX, mouseY);
            lastX = mouseX;
            lastY = mouseY;
        }
    });

    canvas.addEventListener("mouseup", () => {
        isDrawing = false;
    });

    function drawLine(startX, startY, endX, endY) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "cyan";
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        userLines.push({ startX, startY, endX, endY });
    }

    document.getElementById("start").addEventListener("click", () => {
        const playerName = document.getElementById("playerName").value.trim();
        if (playerName === "") {
            alert("Enter your name to start the game");
            return;
        }
        dots = [
            { x: 100, y: 200 },
            { x: 300, y: 200 }
        ];
        draw();
    });

    document.getElementById("restart").addEventListener("click", () => {
        const playerName = document.getElementById("playerName").value.trim();
        if (playerName === "") {
            alert("Enter your name to Play the game");
            return;
        }
        // Clear the canvas and reset dots array
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dots = [];
        // Clear the user-drawn lines array
        userLines = [];
        // Add two default dots and redraw
        dots = [
            { x: 100, y: 200 },
            { x: 300, y: 200 }
        ];
        draw();
    });

    document.getElementById("next").addEventListener("click", () => {
        const playerName = document.getElementById("playerName").value.trim();
        if (playerName === "") {
            alert("Enter your name to Play the game");
            return;
        }
        // Clear the canvas and reset dots array
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dots = [];
        // Reset the user-drawn lines array
        userLines = [];
        // Add three default dots and redraw
        dots = [
            { x: 100, y: 100 },
            { x: 300, y: 100 },
            { x: 200, y: 300 }
        ];
        draw();
    });
});


//

