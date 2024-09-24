let range = document.querySelector(".edit-panel input");
let bri = document.querySelector(".bri");
let perc = document.querySelector(".perc");
let chooseinput = document.querySelector(".chooseinput");
let image = document.querySelector("img");
let choosebtn = document.querySelector(".chooseimg-btn");
let filterbtns = document.querySelectorAll(".filter-btns button");
let rotateBtns = document.querySelectorAll(".rotate-btns button");
let resetbtn = document.querySelector(".reset-btn");
let imgCont = document.querySelector(".image");
let saveBtn = document.querySelector(".saveimg-btn");
let brightness = 100,
  inversion = 0,
  saturation = 100,
  grayscale = 0;
let rotate = 0,
  flipVertical = 1,
  fliphorizontal = 1;

// Set overflow hidden for image container
imgCont.style.overflow = "hidden";

// Filter buttons functionality
filterbtns.forEach((element) => {
  element.addEventListener("click", () => {
    bri.innerHTML = element.innerHTML;
    let prevActive = document.querySelector(".filter-btns .active");
    if (prevActive) {
      prevActive.classList.remove("active");
    }
    element.classList.add("active");

    // Update range based on selected filter
    if (element.id === "brightness") {
      range.max = "200";
      range.value = brightness;
      perc.innerHTML = `${range.value}%`;
    } else if (element.id === "saturation") {
      range.max = "200";
      range.value = saturation;
      perc.innerHTML = `${range.value}%`;
    } else if (element.id === "inversion") {
      range.max = "100";
      range.value = inversion;
      perc.innerHTML = `${range.value}%`;
    } else if (element.id === "grayscale") {
      range.max = "100";
      range.value = grayscale;
      perc.innerHTML = `${range.value}%`;
    }
    applyfilters();
  });
});

// Apply filters and transforms
function applyfilters() {
  image.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  image.style.transform = `rotate(${rotate}deg) scale(${fliphorizontal}, ${flipVertical})`;
}

// Update filter values when the range input changes
range.addEventListener("input", () => {
  perc.innerHTML = `${range.value}%`;
  let selectedfilter = document.querySelector(".filter-btns button.active");
  if (selectedfilter.id === "brightness") {
    brightness = range.value;
  } else if (selectedfilter.id === "saturation") {
    saturation = range.value;
  } else if (selectedfilter.id === "inversion") {
    inversion = range.value;
  } else if (selectedfilter.id === "grayscale") {
    grayscale = range.value;
  }
  applyfilters();
});

// Rotate and flip buttons functionality
rotateBtns.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.id === "right-rotate") {
      rotate += 90;
    } else if (element.id === "left-rotate") {
      rotate -= 90;
    } else if (element.id === "vertical-flip") {
      flipVertical = flipVertical === 1 ? -1 : 1;
    } else if (element.id === "horizontal-flip") {
      fliphorizontal = fliphorizontal === 1 ? -1 : 1;
    }
    applyfilters();
  });
});

// Reset button functionality
resetbtn.addEventListener("click", () => {
  brightness = 100;
  inversion = 0;
  saturation = 100;
  grayscale = 0;
  rotate = 0;
  flipVertical = 1;
  fliphorizontal = 1;
  applyfilters();
});

// Load and display the image when selected
choosebtn.addEventListener("click", () => chooseinput.click());
chooseinput.addEventListener("change", () => {
  let file = chooseinput.files[0];
  if (file) {
    image.src = URL.createObjectURL(file);
  }
});

// Save the edited image
saveBtn.addEventListener("click", () => {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotate * Math.PI) / 180);
  ctx.scale(fliphorizontal, flipVertical);
  ctx.drawImage(
    image,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  let link = document.createElement("a");
  link.download = "edited-image.jpg";
  link.href = canvas.toDataURL();
  link.click();
});
