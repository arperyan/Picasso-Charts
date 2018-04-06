define(["./colors"], function(colors) {

  var dimensions = {
      uses: "dimensions",
      min: 1,
      max: 1,

  };


	var measures = {
		uses: "measures",
		min: 1,
		max: 2,
    items: {
      chartStyle: {
        type: "string",
        component: "item-selection-list",
        icon: "true",
        horizontal: "true",
        label: "",
        ref: "qDef.chartStyle",
        defaultValue: "bar",
        items: [
          {
          value:"bar",
          component:"icon-item",
          labelPlacement: "bottom",
          icon: "∫",
          label: "Bar"
          },
          {
          value:"line",
          component:"icon-item",
          icon: "æ",
          labelPlacement: "bottom",
          label: "Line"
          }
        ],
        // change: function (layout) {
        //   if (layout.qDef.chartStyle === "line")
        //     layout.qDef.barWidth = 0;
        //}
      },
      axis: {
        type: "string",
				component: "dropdown",
				ref: "qDef.orientation",
				options: [{
  				value: "left",
  						label: "Primary Axis"
  				}, {
  						value: "right",
  						label: "Secondary Axis"
  				}],
			},
      barDist: {
        type: "items",
        items: {
          innerwidth: {
            type: "number",
            component: "slider",
            label: function(d) {
              return "Bar Inner Distance (" + d.qDef.innerWidth +"px)";
            },
            ref: "qDef.innerWidth",
            min: 0,
            max: 0.8,
            step: 0.1,
            defaultValue: 0.2,
            show: function (layout) {
              return layout.qDef.chartStyle === "bar";
            }
          },
          outerwidth: {
            type: "number",
            component: "slider",
            label: function(d) {
              return "Bar Outer Distance (" + d.qDef.outerWidth +"px)";
            },
            ref: "qDef.outerWidth",
            min: 0,
            max: 1,
            step: 0.2,
            defaultValue: 0.2,
            show: function (layout) {
              return layout.qDef.chartStyle === "bar";
            }
          }
        }
      },
      barBorder: {
        type: "items",
        items: {
          bordertype: {
              type: "boolean",
      				component: "switch",
      				label: " Bar Border",
      				ref: "qDef.border",
      				options: [{
      					value: true,
      					label: "Show"
      				}, {
      					value: false,
      					label: "None"
      				}],
      				defaultValue: false,
              show: function (layout) {
                return layout.qDef.chartStyle === "bar";
              },
              change: function (layout) {
                if (layout.qDef.border === false)
                  layout.qDef.barWidth = 0; //& layout.qDef.barColor = "#000";
              }
            },
            borderwidth: {
              type: "integer",
              label: "Stroke Width",
        			ref: "qDef.barWidth",
        			defaultValue: "1",
              max: "10",
        			show: function (layout) {
                return layout.qDef.border === true && layout.qDef.chartStyle === "bar";
              }
            },
            bordercolor: {
              type: "object",
              label: "Stroke Color",
              ref: "qDef.barColor",
              component: "color-picker",
              defaultValue: "#000",
        			show: function (layout) {
                return layout.qDef.border === true && layout.qDef.chartStyle === "bar";
              }
            }
          },

        },
        barColor: {
          type: "items",
          items: {
            paletteItems: {
  						ref: "qDef.colorSchema",
  						type: "string",
  						component: "item-selection-list",
  						defaultValue: "picasso1",
  						items: [
                {
    						icon: "",
    						label: "Picasso Cat",
    						component: "color-scale",
    						reverse: function (d) {
    							return d.qDef.colors.reverse;
    						},
                value: "picasso1",
    						type: "categorical",
    						colors: colors.picasso1
              }, {
    						icon: "",
    						label: "Qlik Sense",
    						component: "color-scale",
    						reverse: function (d) {
    							return d.qDef.colors.reverse;
    						},
    						value: "qlik10",
    						type: "categorical",
    						colors: colors.qlik10,
              }, {
  							icon: "",
  							label: "Qlik Sense 100",
  							component: "color-scale",
  							reverse: function (d) {
  								return d.qDef.colors.reverse;
  							},
  							value: "qlik100",
  							type: "sequential",
  							colors: colors.qlik100,
  						}, {
  							icon: "",
  							label: "d3 category 10",
  							component: "color-scale",
  							reverse: function (d) {
  								return d.qDef.colors.reverse;
  							},
  							value: "category10",
  							type: "sequential",
  							colors: colors.category10,
  						}, {
  							icon: "",
  							label: "d3 category 20",
  							component: "color-scale",
  							reverse: function (d) {
  								return d.qDef.colors.reverse;
  							},
  							value: "category20",
  							type: "sequential",
  							colors: colors.category20,
  						}
            ],
  					},
            reverseColors: {
  						type: "boolean",
  						ref: "qDef.colors.reverse",
  						label: "Reverse Colors",
  						defaultValue: false,
  					},
            barOpac: {
              type: "number",
              component: "slider",
              label: function(d) {
                return "Bar Opacity (" + Math.floor(d.qDef.barOpacity * 100) +"%)";
              },
              ref: "qDef.barOpacity",
              min: 0.1,
              max: 1,
              step: 0.1,
              defaultValue: 1,
              show: function (layout) {
                return layout.qDef.chartStyle === "bar";
              }
            }
          }
        }
    }
	};

  var sorting = {
    uses: "sorting"
  };

  var addons = {
    uses: "addons"
  };

	var sectionAppearance = {
    uses: "settings",
    type: "items",
    items: {
      type: {
        ref: "type",
        label: "Legend Type",
        type: "items",
        items: {
          MyButtongroupProp: {
                type: "string",
                component: "dropdown",
                label: "",
                ref: "legendType",
                options: [{
                  value: "cat",
                  label: "Categorical legend",
                }, {
                  value: "seq",
                  label: "Sequential legend",
                }],
                defaultValue: "Categorical legend"
          }
        }
      }
    },
  };

  var about = {
    ref: "about",
    label: "About",
    type: "items",
    items: {
      Author: {
        label: "Created by: Ryan Arpe",
        component: "text"
      },
      Colaborator: {
        label: "Colaborator: Ralf Becher",
        component: "text"
      },
      Version: {
        label: "Version: v1.0",
        component: "text"
      }
    }
  };
	// ****************************************************************************************
	// Return values
	// ****************************************************************************************

	return {
		type: "items",
		component: "accordion",
		items: {
			dimensions: dimensions,
      measures: measures,
      sorting: sorting,
      addons: addons,
			sectionAppearance: sectionAppearance,
      about: about

		}
	}
})
