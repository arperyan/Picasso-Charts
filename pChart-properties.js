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
      orient: {
        type: "items",
        items: {
          vertHori: {
            type: "string",
						component: "buttongroup",
						label: "Bar Orientation",
						ref: "qDef.barDirect",
						options: [{
							value: "vertical",
							label: "Vertical",
							tooltip: "Select for vertical"
						}, {
							value: "horizontal",
							label: "Horizontal",
							tooltip: "Select for horizontal"
						}],
						defaultValue: "vertical",
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
              label: "Stroke Width",
        			ref: "qDef.barWidth",
              type: "number",
              component: "slider",
              label: function(d) {
                return "Stroke Width (" + d.qDef.barWidth +"px)";
              },
              min: 0,
              max: 10,
              step: 1,
              defaultValue: 0,
        			show: function (layout) {
                return layout.qDef.border === true && layout.qDef.chartStyle === "bar";
              }
            },
            bordercolor: {
              type: "object",
              label: "Stroke Color",
              ref: "qDef.barColor",
              component: "color-picker",
              defaultValue: {color: "#000000"},
        			show: function (layout) {
                return layout.qDef.border === true && layout.qDef.chartStyle === "bar";
              }
            }
          },
        },
        lineStroke: {
          type: "items",
          items: {
             linethick: {
                 type: "number",
                 component: "slider",
                 label: function(d) {
                   return "Line Width (" + d.qDef.lineWidth +"px)";
                 },
                 ref: "qDef.lineWidth",
                 min: 1,
                 max: 10,
                 step: 1,
                 defaultValue: 2,
                 show: function (layout) {
                   return layout.qDef.chartStyle === "line";
                 }
              },
              linecolor: {
                type: "object",
                label: "Line Color",
                ref: "qDef.lineColor",
                component: "color-picker",
                dualOutput: true,
                defaultValue: {color: "#3d52a1"},
                show: function (layout) {
                  return layout.qDef.chartStyle === "line";
                }
              },
              lineType: {
                type: "string",
                component: "dropdown",
                label: "Line Curve Style",
                ref: "qDef.lineType",
                options: [{
                      value: "linear",
                      label: "Linear"
                  }, {
                      value: "monotone",
                      label: "Monotone"
                  }, {
                      value: "cardinal",
                      label: "Cardinal"
                  }],
                  show: function (layout) {
                    return layout.qDef.chartStyle === "line";
                  }
              }
            }
        },
        showPoint: {
          type: "items",
          items: {
            showPoint: {
              type: "boolean",
              label: "Tick points",
              ref: "qDef.showPoint",
              defaultValue: false,
              show: function (layout) {
                return layout.qDef.chartStyle === "line";
              }
            },
            pointSize: {
              type: "number",
              component: "slider",
              label: function(d) {
                return "Bubble Size (" + Math.floor(d.qDef.pointSize *100) +"px)";
              },
              ref: "qDef.pointSize",
              min: 0,
              max: 1,
              step: 0.2,
              defaultValue: 0.4,
              show: function (layout) {
                return layout.qDef.chartStyle === "line" && layout.qDef.showPoint === true;
              }
            },
            pointcolor: {
              type: "object",
              label: "Bubble Color",
              ref: "qDef.bubbleColor",
              dualOutput: true,
              component: "color-picker",
              defaultValue: {color: "#3d52a1"},
              show: function (layout) {
                return layout.qDef.chartStyle === "line" && layout.qDef.showPoint === true;
              }
            },
            pointOpacity: {
              type: "number",
              component: "slider",
              label: function(d) {
                return "Bubble Opacity (" + Math.floor(d.qDef.pointOpacity *100) +"%)";
              },
              ref: "qDef.pointOpacity",
              min: 0.2,
              max: 1,
              step: 0.2,
              defaultValue: 0.6,
              show: function (layout) {
                return layout.qDef.chartStyle === "line" && layout.qDef.showPoint === true;
              }
            }
          }
        },
        pStroke: {
          type: "items",
          items: {
            pointStroke: {
                type: "number",
                component: "slider",
                label: function(d) {
                  return "Stroke Width (" + d.qDef.pointStroke +"px)";
                },
                ref: "qDef.pointStroke",
                min: 1,
                max: 10,
                step: 1,
                defaultValue: 2,
                show: function (layout) {
                  return layout.qDef.chartStyle === "line" && layout.qDef.showPoint === true;
                }
             },
             pstrokeColors: {
               type: "object",
               label: "Stroke Color",
               ref: "qDef.pstrokeColor",
               dualOutput: true,
               component: "color-picker",
               defaultValue: {color: "#ffffff"},
               show: function (layout) {
                 return layout.qDef.chartStyle === "line" && layout.qDef.showPoint === true;
               }
             }
           }
        },
        Area: {
          type: "items",
          items: {
            showArea: {
              type: "boolean",
              label: "Show Area",
              ref: "qDef.showArea",
              defaultValue: false,
              show: function (layout) {
                return layout.qDef.chartStyle === "line";
              },
              change: function (layout) {
                if (layout.qDef.showArea === false)
                  layout.qDef.areaOpacity = 0;
              }
            },
            AreaColors: {
              type: "object",
              label: "Area Color",
              ref: "qDef.areaColor",
              dualOutput: true,
              component: "color-picker",
              defaultValue: {color: "#cccccc"},
              show: function (layout) {
                return layout.qDef.chartStyle === "line" && layout.qDef.showArea === true;
              }
            },
            areaOpacity: {
              type: "number",
              component: "slider",
              label: function(d) {
                return "Opacity (" + Math.floor(d.qDef.areaOpacity *100) +"%)";
              },
              ref: "qDef.areaOpacity",
              min: 0,
              max: 1,
              step: 0.2,
              defaultValue: 0,
              show: function (layout) {
                return layout.qDef.chartStyle === "line" && layout.qDef.showArea === true;
              },
            }
          }
        },
        barColor: {
          type: "items",
          items: {
            usePalette: {
  						ref: "qDef.usePalette",
  						type: "string",
  						label: "Colors",
  						component: "dropdown",
  						defaultValue: "categorical",
  						options: [{
  							value: "categorical",
  							label: "Categorical"
  						}, {
  							value: "diverging",
  							label: "Diverging"
  						}, {
  							value: "sequential",
  							label: "Sequential"
  						}, {
  							value: "custom",
  							label: "Custom"
  						}],
              show: function (layout) {
                return layout.qDef.chartStyle === "bar";
              }
  					},
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
    							return d.qDef.reverse;
    						},
                value: "picasso1",
    						type: "categorical",
    						colors: colors.picasso1,
                show: function (layout) {
                  return layout.qDef.usePalette === "categorical";
                }
              }, {
                icon: "",
                label: "Picasso Div",
                component: "color-scale",
                reverse: function (d) {
                  return d.qDef.reverse;
                },
                value: "picasso2",
                type: "diverging",
                colors: colors.picasso2,
                show: function (layout) {
                  return layout.qDef.usePalette === "diverging";
                }
              }, {
                  icon: "",
                  label: "Picasso Seq",
                  component: "color-scale",
                  reverse: function (d) {
                    return d.qDef.reverse;
                  },
                  value: "picasso3",
                  type: "gradient",
                  colors: colors.picasso3,
                  show: function (layout) {
                    return layout.qDef.usePalette === "sequential";
                  }
                }, {
    						icon: "",
    						label: "Qlik Sense",
    						component: "color-scale",
    						reverse: function (d) {
    							return d.qDef.reverse;
    						},
    						value: "qlik10",
    						type: "categorical",
    						colors: colors.qlik10,
                show: function (layout) {
                  return layout.qDef.usePalette === "categorical";
                }
              }, {
  							icon: "",
  							label: "Qlik Sense 100",
  							component: "color-scale",
  							reverse: function (d) {
  								return d.qDef.reverse;
  							},
  							value: "qlik100",
  							type: "categorical",
  							colors: colors.qlik100,
                show: function (layout) {
                  return layout.qDef.usePalette === "categorical";
                }
  						}, {
  							icon: "",
  							label: "d3 category 10",
  							component: "color-scale",
  							reverse: function (d) {
  								return d.qDef.reverse;
  							},
  							value: "category10",
  							type: "categorical",
  							colors: colors.category10,
                show: function (layout) {
                  return layout.qDef.usePalette === "categorical";
                }
  						}, {
  							icon: "",
  							label: "d3 category 20",
  							component: "color-scale",
  							reverse: function (d) {
  								return d.qDef.reverse;
  							},
  							value: "category20",
  							type: "categorical",
  							colors: colors.category20,
                show: function (layout) {
                  return layout.qDef.usePalette === "categorical";
                }
  						}
            ],
            show: function (layout) {
              return layout.qDef.chartStyle === "bar"
            }
  				},
          reverseColors: {
            type: "boolean",
            ref: "qDef.reverse",
            label: "Reverse Colors",
            defaultValue: false,
            show: function (layout) {
              return layout.qDef.chartStyle === "bar"
            }
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
          legendButton: {
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
          },
          axis: {
            type: "string",
            component: "dropdown",
            label: "Axis Orientation",
            ref: "orientation",
            options: [{
              value: "left",
                  label: "Primary Axis"
              }, {
                  value: "right",
                  label: "Secondary Axis"
              }],
          },
          Dist: {
            type: "items",
            items: {
              innerwidth: {
                type: "number",
                component: "slider",
                label: function(d) {
                  return "Inner Distance (" + d.innerWidth +"px)";
                },
                ref: "innerWidth",
                min: 0,
                max: 0.8,
                step: 0.1,
                defaultValue: 0.2,
                show: function (layout) {
                  return layout.qDef.chartStyle === "line";
                }
              },
              outerwidth: {
                type: "number",
                component: "slider",
                label: function(d) {
                  return "Outer Distance (" + d.outerWidth +"px)";
                },
                ref: "outerWidth",
                min: 0,
                max: 1,
                step: 0.2,
                defaultValue: 0.2,
                show: function (layout) {
                  return layout.qDef.chartStyle === "line";
                }
              }
          }
        }
      }
    }

    }
  };

  var about = {
    ref: "about",
    label: "About",
    type: "items",
    component: {
        template: '<div><img src="../content/default/Arpe.png"  style="max-width:250px;"></div>' +
        '<p style="font-size:10px; color: #7f7f7f; text-align:left;"><i>Created by: Ryan Arpe</i>' +
        '<span style="font-size:10px; color: #7f7f7f; float:right; margin-right:10px"><i>v1.0</i></span></p>'+
        '<div style="width:95%; font-size:10px; margin-right:10px; color: #7f7f7f; text-align: left"><i>Colaborator: Ralf Becher</i></div>'
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
