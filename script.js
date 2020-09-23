document.addEventListener("DOMContentLoaded", function () {
  var Clock = (function () {
    var exports = function (element) {
      this._element = element;
      var html = "";
      for (var i = 0; i < 6; i++) {
        html += "<span>&nbsp;</span>";
      }
      this._element.innerHTML = html;
      this._slots = this._element.getElementsByTagName("span");
      this._tick();
    };
    exports.prototype = {
      _tick: function () {
        var time = new Date();
        this._update(
          this._pad(time.getHours()) +
            this._pad(time.getMinutes()) +
            this._pad(time.getSeconds())
        );
        var self = this;
        setTimeout(function () {
          self._tick();
        }, 1000);
      },
      _pad: function (value) {
        return ("0" + value).slice(-2);
      },
      _update: function (timeString) {
        var i = 0,
          l = this._slots.length,
          value,
          slot,
          now;
        for (; i < l; i++) {
          value = timeString.charAt(i);
          slot = this._slots[i];
          now = slot.dataset.now;
          if (!now) {
            slot.dataset.now = value;
            slot.dataset.old = value;
            continue;
          }
          if (now !== value) {
            this._flip(slot, value);
          }
        }
      },
      _flip: function (slot, value) {
        slot.classList.remove("flip");
        slot.dataset.old = slot.dataset.now;
        slot.dataset.now = value;
        slot.offsetLeft;
        slot.classList.add("flip");
      },
    };
    return exports;
  })();
  var i = 0,
    clocks = document.querySelectorAll(".clock"),
    l = clocks.length;
  for (; i < l; i++) {
    new Clock(clocks[i]);
  }

  const currHour = new Date().getHours();
  let timeframe;

  if (currHour >= 6 && currHour <= 11) {
    timeframe = "morning";
  } else if (currHour >= 12 && currHour <= 16) {
    timeframe = "afternoon";
  } else if (currHour >= 17 && currHour <= 20) {
    timeframe = "evening";
  } else {
    timeframe = "night";
  }

  document.querySelector("#timeframe").innerHTML = timeframe;
});
