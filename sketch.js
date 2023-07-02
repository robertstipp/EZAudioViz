let song 

function setup() {
  createCanvas(400, 400);

  document.getElementById('fileInput').addEventListener('change',function (event) {
    let file = event.target.files[0]
    if (file) {
      // Stop the previous sound if it exists
      if (song) {
        song.stop()
      }
      song = loadSound(URL.createObjectURL(file),() => song.play())
    }
  })

  fft = new p5.FFT()
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  noStroke();
  fill(255, 0, 255);
  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }

  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255);
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
}
