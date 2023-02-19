// Used from https://gist.github.com/positlabs/5216101 :))))

Vignette = function (canvas) {

    var alpha = .7,
          context,
          visible,
          data;
  
      (function initView() {
  
          context = canvas.getContext("2d");
          show();
  
      })();
  
      function draw() {
  
          var w = canvas.width = window.innerWidth;
          var h = canvas.height = window.innerHeight;
  
          context.clearRect(0, 0, w, h);
          context.rect(0, 0, w, h);
  
          // create radial gradient
          var outerRadius = w * .5;
          var innerRadius = w * .2;
          var grd = context.createRadialGradient(w / 2, h / 2, innerRadius, w / 2, h / 2, outerRadius);
          // light blue
          grd.addColorStop(0, 'rgba(0,0,0,0)');
          // dark blue
          grd.addColorStop(1, 'rgba(0,0,0,' + alpha + ')');
  
          context.fillStyle = grd;
          context.fill();
  
      }
  
      this.show = function() {
          if (!visible) {
              visible = true;
              canvas.style.display = "block";
              window.addEventListener("resize", draw);
              draw();
          }
      }
  
      this.hide = function() {
          if (!visible) {
              visible = false;
              canvas.style.display = "none";
              window.removeEventListener("resize", draw);
          }
      }
  
  };