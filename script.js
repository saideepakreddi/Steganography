var fgImage = null;
var bgImage = null;
var fgCanvas;
var bgCanvas;

function loadForegroundImage() {
  var file = document.getElementById("fgfile");
  fgImage = new SimpleImage(file);
  bgImage = new SimpleImage(file);
  fgCanvas = document.getElementById("fgcan");
  fgImage.drawTo(fgCanvas);
  bgCanvas = document.getElementById("bgcan");
  bgImage = new SimpleImage(file);
}

function clearbits(colvalue){
    var x = Math.floor(colvalue/16)*16;
    return x;
}

function mergebits(colorval){
    var x = Math.floor(colorval/16)*16;
    var y = Math.floor(colorval-x)*16;
    return y;
}

function chop2open(image){
    for(var px of image.values()){
        px.setRed(clearbits(px.getRed()));
        px.setGreen(clearbits(px.getGreen()));
        px.setBlue(clearbits(px.getBlue()));
    }
    return image;
}

function extract(image){
    for(var px of image.values()){
        px.setRed(mergebits(px.getRed()));
        px.setGreen(mergebits(px.getGreen()));
        px.setBlue(mergebits(px.getBlue()));
    }
    return image;
}

function doSteganImage() {
  //check that images are loaded
  if (fgImage == null  || ! fgImage.complete()) {
    alert("Foreground image not loaded");
  }
  // clear canvases
  
  var imgext = new    SimpleImage(fgImage.getWidth(),fgImage.getHeight());
  imgext = chop2open(fgImage);
  var imgext1 = new         SimpleImage(bgImage.getWidth(),bgImage.getHeight());
imgext1= extract(bgImage);
  imgext.drawTo(fgCanvas);
  imgext1.drawTo(bgCanvas);
}

function clearCanvas() {
  doClear(fgCanvas);
  doClear(bgCanvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}