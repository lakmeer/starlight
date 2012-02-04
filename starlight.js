/*
 * src/star.coffee
 *
 */


var Star;

Star = (function() {

  function Star(x, y, alpha, size, speed, minBrightness) {
    var _ref;
    this.x = x;
    this.y = y;
    this.alpha = alpha;
    this.size = size;
    this.speed = speed;
    this.minBrightness = minBrightness;
    this.delta = 0;
    this.brightness = this.alpha;
    this.minBrightness = this.alpha * ((_ref = this.minBrightness) != null ? _ref : 0.5);
  }

  Star.prototype.draw = function(ctx) {
    ctx.globalAlpha = this.brightness;
    return ctx.fillRect(this.x, this.y, this.size, this.size);
  };

  Star.prototype.twinkle = function() {
    var _this = this;
    if (this.brightness === this.alpha) {
      this.delta = this.speed * -1;
      this.brightness += this.delta;
    } else if (this.brightness + this.delta >= this.alpha) {
      this.brightness = this.alpha;
      this.delta = 0;
      return;
    } else if (this.brightness + this.delta <= this.minBrightness) {
      this.brightness = this.alpha / 2;
      this.delta = this.speed;
    } else {
      this.brightness += this.delta;
    }
    return setTimeout((function() {
      return _this.twinkle.apply(_this);
    }), 10);
  };

  return Star;

})();



/*
 * src/starfield.coffee
 *
 */


var StarField,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

StarField = (function() {

  function StarField(host, total, config) {
    this.host = host;
    this.draw = __bind(this.draw, this);
    this.saveConfig(config);
    this.stars = this.generate(total, this.width, this.height, config.minAlpha, config.maxAlpha, config.starSize, config.sizeVariance);
  }

  StarField.prototype.saveConfig = function(config) {
    var _ref, _ref2, _ref3, _ref4;
    this.width = (_ref = config != null ? config.width : void 0) != null ? _ref : this.host.width();
    this.height = (_ref2 = config != null ? config.height : void 0) != null ? _ref2 : this.host.height();
    this.speed = (_ref3 = config != null ? config.twinkleSpeed : void 0) != null ? _ref3 : 0.02;
    return this.activity = (_ref4 = config != null ? config.twinkleActivity : void 0) != null ? _ref4 : 1;
  };

  StarField.prototype.styles = {
    host: {
      position: 'relative'
    },
    canvas: {
      position: 'absolute',
      top: '0px',
      left: '0px'
    }
  };

  StarField.prototype.newCanvas = function() {
    var canvas;
    canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    return canvas;
  };

  StarField.prototype.newContext = function(canvas) {
    var ctx;
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    return ctx;
  };

  StarField.prototype.generate = function(total, sfx, sfy, minA, maxA, sz, szV) {
    var a, i, p, s, x, y, _results;
    if (minA == null) minA = 0;
    if (maxA == null) maxA = 1;
    if (sz == null) sz = 1;
    if (szV == null) szV = 1;
    _results = [];
    for (i = 0; 0 <= total ? i < total : i > total; 0 <= total ? i++ : i--) {
      p = i / total;
      a = p * (minA - maxA) + maxA;
      x = Math.floor(Math.random() * sfx);
      y = Math.floor(p * sfy);
      s = sz + Math.round(Math.random() * szV);
      _results.push(new Star(x, y, a, s, this.speed));
    }
    return _results;
  };

  StarField.prototype.draw = function(ctx) {
    var star, _i, _len, _ref,
      _this = this;
    ctx.clearRect(0, 0, this.width, this.height);
    _ref = this.stars;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      star = _ref[_i];
      star.draw(ctx);
    }
    this.twinkle();
    return webkitRequestAnimationFrame(function() {
      return _this.draw(ctx);
    });
  };

  StarField.prototype.twinkle = function() {
    var _i, _ref, _results;
    _results = [];
    for (_i = 0, _ref = this.activity; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--) {
      _results.push(this.stars[Math.floor(Math.random() * this.stars.length)].twinkle());
    }
    return _results;
  };

  StarField.prototype.start = function() {
    var canvas, context;
    canvas = this.newCanvas();
    context = this.newContext(canvas);
    this.host.css(this.styles.host);
    $(canvas).css(this.styles.canvas);
    this.host.prepend(canvas);
    return this.draw(context);
  };

  return StarField;

})();



/*
 * src/jqstars.coffee
 *
 */



$.fn.starlight = function(config) {
  var element, s, starfields, totalStars, _i, _len, _ref;
  totalStars = (_ref = config != null ? config.totalStars : void 0) != null ? _ref : 1000;
  starfields = (function() {
    var _i, _len, _ref2, _results;
    _ref2 = this.toArray();
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      element = _ref2[_i];
      _results.push(new StarField($(element), totalStars, config));
    }
    return _results;
  }).call(this);
  for (_i = 0, _len = starfields.length; _i < _len; _i++) {
    s = starfields[_i];
    s.start();
  }
  return this;
};



