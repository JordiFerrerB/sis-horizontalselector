define([], function () {
  "use strict";

  var dimensions = { uses: "dimensions" };
  var sorting = { uses: "sorting" };
  var appearancePanel = { uses: "settings" };
  return {
    type: "items",
    component: "accordion",
    items: {
      dimensions: {
        type: "array",
        ref: "lists",
        label: "Dimensions",
        allowAdd: true,
        allowRemove: true,
        addTranslation: "Add Field",
        itemTitleRef: "fieldLabel",
        items: {
          fieldName: {
            component: "expression",
            expression: "optional",
            ref: "qListObjectDef.qDef.qFieldDefs.0",
            defaultValue: "",
            label: "Field",
          },
          fieldLabel: {
            type: "string",
            expression: "optional",
            ref: "fieldLabel",
            label: "Label",
          },
          sortDefault: {
            type: "boolean",
            ref: "sortDefault",
            label: "Sort Order",
            component: "switch",
            defaultValue: true,
            options: [
              {
                value: true,
                label: "Automatic",
              },
              {
                value: false,
                label: "Custom",
              },
            ],
          },
          sortByLoadOrder: {
            type: "number",
            component: "dropdown",
            label: "Sort by load order",
            ref: "qListObjectDef.qDef.qSortCriterias.0.qSortByLoadOrder",
            defaultValue: 0,
            options: [
              { value: 1, label: "Ascending" },
              { value: 0, label: "No" },
              { value: -1, label: "Descending" },
            ],
            show: function (data) {
              return !data.sortDefault;
            },
          },
          sortByNumeric: {
            type: "number",
            component: "dropdown",
            label: "Sort by numeric",
            ref: "qListObjectDef.qDef.qSortCriterias.0.qSortByNumeric",
            defaultValue: 0,
            options: [
              { value: 1, label: "Ascending" },
              { value: 0, label: "No" },
              { value: -1, label: "Descending" },
            ],
            show: function (data) {
              return !data.sortDefault;
            },
          },
          sortByAscii: {
            type: "number",
            component: "dropdown",
            label: "Sort by alphabetical",
            ref: "qListObjectDef.qDef.qSortCriterias.0.qSortByAscii",
            defaultValue: 0,
            options: [
              { value: 1, label: "Ascending" },
              { value: 0, label: "No" },
              { value: -1, label: "Descending" },
            ],
            show: function (data) {
              return !data.sortDefault;
            },
          },
          initialDataFetchWidth: {
            type: "number",
            ref: "qListObjectDef.qInitialDataFetch.0.qWidth",
            label: "qWidth",
            show: false,
            defaultValue: 10,
          },
          initialDataFetchHeight: {
            type: "number",
            ref: "qListObjectDef.qInitialDataFetch.0.qHeight",
            label: "qHeight",
            show: false,
            defaultValue: 1e3,
          },
        },
      },
    },
  };
});
