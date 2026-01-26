document.addEventListener("DOMContentLoaded", () => {
  function openDrawPopup(imgSrc) {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "draw-overlay";

    // Popup container
    const popup = document.createElement("div");
    popup.className = "draw-popup";

    // Header with controls
    const header = document.createElement("div");
    header.className = "draw-header";

    const btnClose = document.createElement("button");
    btnClose.textContent = "Close";
    const btnUndo = document.createElement("button");
    btnUndo.textContent = "Undo";
    const btnClear = document.createElement("button");
    btnClear.textContent = "Clear";

    [btnUndo, btnClear, btnClose].forEach((b) => {
      b.className = "draw-btn";
    });
    btnUndo.classList.add("draw-undo");
    btnClear.classList.add("draw-clear");
    btnClose.classList.add("draw-close");

    header.appendChild(btnUndo);
    header.appendChild(btnClear);
    header.appendChild(btnClose);

    // Canvas container: show base image on left, drawing canvas on right
    const canvasWrap = document.createElement("div");
    canvasWrap.className = "draw-canvas-wrap side-by-side";

    const leftPanel = document.createElement("div");
    leftPanel.className = "draw-panel draw-panel-left";
    const rightPanel = document.createElement("div");
    rightPanel.className = "draw-panel draw-panel-right";

    const baseCanvas = document.createElement("canvas");
    baseCanvas.className = "draw-base-canvas";
    const drawCanvas = document.createElement("canvas");
    drawCanvas.className = "draw-canvas";

    leftPanel.appendChild(baseCanvas);
    rightPanel.appendChild(drawCanvas);
    canvasWrap.appendChild(leftPanel);
    canvasWrap.appendChild(rightPanel);

    popup.appendChild(header);
    popup.appendChild(canvasWrap);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Load image and size canvases
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // scale to fit max dimensions
      const maxW = Math.min(window.innerWidth * 0.9 - 20, img.naturalWidth);
      const maxH = Math.min(window.innerHeight * 0.8 - 40, img.naturalHeight);
      let scale = Math.min(
        maxW / img.naturalWidth,
        maxH / img.naturalHeight,
        1,
      );
      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);

      baseCanvas.width = w;
      baseCanvas.height = h;
      drawCanvas.width = w;
      drawCanvas.height = h;

      baseCanvas.style.width = w + "px";
      baseCanvas.style.height = h + "px";
      drawCanvas.style.width = w + "px";
      drawCanvas.style.height = h + "px";

      const baseCtx = baseCanvas.getContext("2d");
      baseCtx.drawImage(img, 0, 0, w, h);

      const drawCtx = drawCanvas.getContext("2d");
      drawCtx.strokeStyle = "#000000";
      drawCtx.lineWidth = 3;
      drawCtx.lineCap = "round";

      // Fill right drawing canvas with white background so users draw on blank
      const drawBg = drawCanvas.getContext("2d");
      drawBg.fillStyle = "#ffffff";
      drawBg.fillRect(0, 0, drawCanvas.width, drawCanvas.height);

      // Drawing state
      let drawing = false;
      let lastX = 0;
      let lastY = 0;

      // Undo stack: store ImageData snapshots
      const undoStack = [];
      const UNDO_LIMIT = 30;

      function pushUndo() {
        try {
          const data = drawCtx.getImageData(
            0,
            0,
            drawCanvas.width,
            drawCanvas.height,
          );
          undoStack.push(data);
          if (undoStack.length > UNDO_LIMIT) undoStack.shift();
          btnUndo.disabled = false;
        } catch (err) {
          // getImageData can fail on tainted canvas; ignore
          console.warn("undo push failed", err);
        }
      }

      function getPos(e) {
        const rect = drawCanvas.getBoundingClientRect();
        if (e.touches && e.touches[0]) {
          return {
            x:
              (e.touches[0].clientX - rect.left) *
              (drawCanvas.width / rect.width),
            y:
              (e.touches[0].clientY - rect.top) *
              (drawCanvas.height / rect.height),
          };
        }
        return {
          x: (e.clientX - rect.left) * (drawCanvas.width / rect.width),
          y: (e.clientY - rect.top) * (drawCanvas.height / rect.height),
        };
      }

      function start(e) {
        e.preventDefault();
        // snapshot before starting a new stroke
        pushUndo();
        drawing = true;
        const p = getPos(e);
        lastX = p.x;
        lastY = p.y;
      }

      function move(e) {
        if (!drawing) return;
        e.preventDefault();
        const p = getPos(e);
        drawCtx.beginPath();
        drawCtx.moveTo(lastX, lastY);
        drawCtx.lineTo(p.x, p.y);
        drawCtx.stroke();
        lastX = p.x;
        lastY = p.y;
      }

      function stop(e) {
        if (!drawing) return;
        e.preventDefault();
        drawing = false;
      }

      drawCanvas.addEventListener("mousedown", start);
      drawCanvas.addEventListener("mousemove", move);
      window.addEventListener("mouseup", stop);

      drawCanvas.addEventListener("touchstart", start, { passive: false });
      drawCanvas.addEventListener("touchmove", move, { passive: false });
      window.addEventListener("touchend", stop);

      btnClear.addEventListener("click", () => {
        // allow undo of clear
        pushUndo();
        drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
      });

      btnUndo.addEventListener("click", () => {
        if (undoStack.length === 0) return;
        const last = undoStack.pop();
        try {
          drawCtx.putImageData(last, 0, 0);
        } catch (err) {
          console.warn("undo putImageData failed", err);
        }
        if (undoStack.length === 0) btnUndo.disabled = true;
      });

      // start with undo disabled until there's something to undo
      btnUndo.disabled = true;

      btnClose.addEventListener("click", () => {
        overlay.remove();
      });
    };
    img.src = imgSrc;
  }

  // Attach click listeners to elements with class 'pic'
  const pics = document.querySelectorAll(".pic");
  pics.forEach((el) => {
    el.classList.add("clickable-pic");
    el.addEventListener("click", (e) => {
      const target = e.currentTarget;
      // If it's an <img>, use its src, otherwise try background-image
      let src = null;
      if (target.tagName && target.tagName.toLowerCase() === "img") {
        src = target.getAttribute("src");
      } else {
        const bg = window.getComputedStyle(target).backgroundImage || "";
        const m = bg.match(/url\((?:\"|')?(.*?)(?:\"|')?\)/);
        if (m) src = m[1];
      }
      if (src) openDrawPopup(src);
    });
  });
});
