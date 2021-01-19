define([
  "jquery",
  "qlik",
  "./properties",
  "./initialproperties",
  "text!./template.ng.html",
  "text!./css/main.css",
  "./js/clTouch",
], function ($, qlik, props, initProps, ngTemplate, cssContent, clTouch) {
  "use strict";
  var app = qlik.currApp();

  $("<style>").html(cssContent).appendTo("head");
  return {
    definition: props,
    initialProperties: initProps,
    snapshot: { canTakeSnapshot: true },
    template: ngTemplate,
    controller: [
      "$scope",
      function ($scope) {
        $scope.dimData = [];
        $scope.swipeSelections = {};
        $scope.component.model.Validated.bind(function () {
          $scope.getFields();
        });

        // Collect fields data from $scope.fields
        $scope.getFields = function () {
          $scope.dimData = [];
          $scope.layout.lists.forEach((field) => {
            if (field.qListObject.qDataPages.length > 0) {
              $scope.dimData.push({
                label: field.fieldLabel,
                name: field.qListObject.qDimensionInfo.qFallbackTitle,
                values: field.qListObject.qDataPages[0].qMatrix.map((value) => {
                  return {
                    value: value[0].qText,
                    qNum: value[0].qNum,
                    state: value[0].qState,
                  };
                }),
              });
            }
          });
        };

        var getTargetValue = function (target) {
          var dataValue = target.attr("data-value");
          var qNum = target.attr("data-qnum");
          return !isNaN(qNum) ? parseInt(qNum) : dataValue;
        };

        var selectSwipeValue = function(target, value){
          console.log('SET', target, value)
          if ($scope.swipeSelections.isSelectOperation && !target[0].classList.contains("S")) { //Select
            $scope.swipeSelections.selectValues.push(value);
            target.removeClass("A X O");   
            target.addClass("S");
          } else if(!$scope.swipeSelections.isSelectOperation && target[0].classList.contains("S")) { //Deselect
            $scope.swipeSelections.selectValues.push(value);
            target.removeClass("S"); 
            target.addClass("X");
          }
        }

        $scope.onSwipeStart = function (event){
          var target = $(event.originalEvent.target);
          var dimension = target.attr("data-dim");
          var value = getTargetValue(target)

           // If first swipe: set dimension to current hovered object
          $scope.swipeSelections.selectedDimension = dimension;
          $scope.swipeSelections.selectValues = [];
          $scope.swipeSelections.isSelectOperation = !target[0].classList.contains("S");
          // selectSwipeValue(target, value);
        }

        // Add elements hovered to selectionsQueue
        $scope.onSwipeUpdate = function (event) {
          var target = $(event.originalEvent.target);
          var dimension = target.attr("data-dim");

          // Add value to selections queue
          if (dimension == $scope.swipeSelections.selectedDimension) {
            var value = getTargetValue(target);
            if (!$scope.swipeSelections.selectValues.includes(value)) {
              selectSwipeValue(target, value);
            }
          }
        };

        // On swipe end: selectValues
        $scope.onSwipe = function (event) {
          console.log($scope.swipeSelections);
          if ($scope.swipeSelections.selectValues) {
            app
              .field($scope.swipeSelections.selectedDimension)
              .selectValues($scope.swipeSelections.selectValues, true, true);
          }
          $scope.swipeSelections = {};
        };

        // onClickEvent: Create the selections
        $scope.onClickButton = function (event) {
          var target = $(event.target);
          var dimension = target.attr("data-dim");
          var value = getTargetValue(target);

          console.log(dimension, value);

          app.field(dimension).selectValues([value], true, true);
          // target.toggleClass("button-active");
        };
      },
    ],
  };
});
