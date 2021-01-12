define([
  "jquery",
  "qlik",
  "./properties",
  "./initialproperties",
  "text!./template.ng.html",
  "text!./css/main.css",
], function ($, qlik, props, initProps, ngTemplate, cssContent) {
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

        // onClickEvent: Create the selections
        $scope.onClickButton = function (event) {
          var target = $(event.target);
          var dimension = target.attr("data-dim");
          var dataValue = target.attr("data-value");
          var qNum = target.attr("data-qnum");
          var value = !isNaN(qNum) ? parseInt(qNum) : dataValue;

          app.field(dimension).selectValues([value], true, true);
          target.toggleClass("button-active");
        };
      },
    ],
  };
});
