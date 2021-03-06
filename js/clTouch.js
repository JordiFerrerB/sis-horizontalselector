define(["qvangular"], function (a) {
  "use strict";
  a.directive("clActivate", [
    "$timeout",
    function () {
      return {
        link: function (a, b) {
          function c(c) {
            var d = b.attr("cl-activate");
            (a.$event = c), a.$apply(d);
          }
          b.bind("qv-activate", c);
        },
      };
    },
  ]),
    a.directive("clSwipestart", [
      "$timeout",
      function () {
        return {
          link: function (a, b) {
            function c(c) {
              var d = b.attr("cl-swipestart");
              (a.$event = c), a.$apply(d);
            }
            b.bind("qv-swipestart", c);
          },
        };
      },
    ]),
    a.directive("clSwipeupdate", function () {
      return {
        link: function (a, b) {
          function c(c) {
            var d = b.attr("cl-swipeupdate");
            (a.$event = c), a.$apply(d);
          }
          b.bind("qv-swipeupdate", c);
        },
      };
    }),
    a.directive("clSwipecancel", function () {
      return {
        link: function (a, b) {
          function c(c) {
            var d = b.attr("cl-swipecancel");
            (a.$event = c), a.$apply(d);
          }
          b.bind("qv-swipecancel", c);
        },
      };
    }),
    a.directive("clSwipe", function () {
      return {
        link: function (a, b) {
          function c(c) {
            var d = b.attr("cl-swipe");
            (a.$event = c), a.$apply(d);
          }
          b.bind("qv-swipe", c);
        },
      };
    });
});
