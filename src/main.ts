const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = buildFace();
portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});

function buildFace() {
  const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  face.setAttribute("viewBox", "0 0 200 200");
  face.setAttribute("role", "img");
  face.setAttribute("aria-label", "A neutral face");

  let sideLength = 50;
  let squaresPerLine = 1;
  let x = 0;
  let y = 0;

  while (sideLength >= 1) {
    for (let i = 0; i < squaresPerLine; i++) {
      const dot = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );
      dot.setAttribute("width", String(sideLength));
      dot.setAttribute("height", String(sideLength));
      dot.setAttribute("fill", "#563b67");

      dot.setAttribute("x", String(2 * x * (i / (squaresPerLine - 1))));
      dot.setAttribute("y", String(2 * y * (1 - (i / (squaresPerLine - 1)))));

      face.append(dot);
    }

    x += sideLength;
    y += sideLength;
    sideLength /= 2;
    squaresPerLine = (squaresPerLine * 2) + 3;
  }

  return face;
}
