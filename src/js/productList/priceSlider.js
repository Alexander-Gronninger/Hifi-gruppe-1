var lowerSlider = document.querySelector('#lower');
var upperSlider = document.querySelector('#upper');

document.querySelector('#maxValue').value = upperSlider.value;
document.querySelector('#minValue').value = lowerSlider.value;

var lowerVal = parseInt(lowerSlider.value);
var upperVal = parseInt(upperSlider.value);

upperSlider.oninput = function () {
    lowerVal = parseInt(lowerSlider.value);
    upperVal = parseInt(upperSlider.value);
    if (upperVal < lowerVal + 100) {
        document.querySelector('#minValue').value = (parseInt(this.value));
        lowerSlider.value = upperVal - 100;
        if (lowerVal == lowerSlider.min) {
            upperSlider.value = 100;
        }
    }
    document.querySelector('#maxValue').value = this.value
};

lowerSlider.oninput = function () {
    lowerVal = parseInt(lowerSlider.value);
    upperVal = parseInt(upperSlider.value);
    if (lowerVal > upperVal - 100) {
        document.querySelector('#maxValue').value = (parseInt(this.value));
        upperSlider.value = lowerVal + 100;
        if (upperVal == upperSlider.max) {
            lowerSlider.value = parseInt(upperSlider.max) - 100;
        }
    }
    document.querySelector('#minValue').value = this.value
};