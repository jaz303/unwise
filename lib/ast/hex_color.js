var T   = require('./types'),
        = require('./rgb_color');

module.exports = function(r, g, b) {
    return new HexColor(r, g, b);
}

function HexColor(r, g, b) {
    this.type = T.HEX_COLOR;
    this.red = r;
    this.green = g;
    this.blue = b;
}

HexColor.prototype.toString = function() {
    return '#'
        + this.red.toString(16)
        + this.green.toString(16)
        + this.blue.toString(16);
}

HexColor.prototype.toRgbColor = function() {
    return rgb(this.red / 255, this.green / 255, this.blue / 255);
}

HexColor.prototype.toHslColor = function() {
    return this.toRgbColor().toHslColor();
}