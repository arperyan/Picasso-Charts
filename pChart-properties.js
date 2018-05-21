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
                  layout.qDef.barsWidth = 0; //& layout.qDef.barColor = "#000";
              }
            },
            borderwidth: {
              label: "Stroke Width",
        			ref: "qDef.barsWidth",
              type: "number",
              component: "slider",
              label: function(d) {
                return "Stroke Width (" + d.qDef.barsWidth +"px)";
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
            tickPoint: {
              type: "boolean",
              label: "Tick points",
              ref: "qDef.showPoints",
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
                return layout.qDef.chartStyle === "line" && layout.qDef.showPoints === true;
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
                return layout.qDef.chartStyle === "line" && layout.qDef.showPoints === true;
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
                return layout.qDef.chartStyle === "line" && layout.qDef.showPoints === true;
              }
            },
            pointType: {
              type: "string",
              component: "dropdown",
              label: "Point Style",
              ref: "qDef.pointType",
              defaultValue: 'circle',
              options: [{
                    value: "circle",
                    label: "Circle"
                  }, {
                    value: "square",
                    label: "Square"
                  }, {
                    value: "star",
                    label: "Star"
                  }, {
                    value: "cross",
                    label: "Cross"
                  }, {
                    value: "triangle",
                    label: "Triangle"
                  }, {
                    value: "diamond",
                    label: "Diamond"
                }],
                show: function (layout) {
                  return layout.qDef.chartStyle === "line" && layout.qDef.showPoints === true;
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
                  return layout.qDef.chartStyle === "line" && layout.qDef.showPoints === true;
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
                 return layout.qDef.chartStyle === "line" && layout.qDef.showPoints === true;
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
  						defaultValue: "single",
  						options: [{
                value: "single",
                label: "Single Color"
              }, {
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
  						items: [{
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
          SingleColors: {
            type: "object",
            label: "Single Color",
            ref: "qDef.singleColor",
            dualOutput: true,
            component: "color-picker",
            defaultValue: {color: "#7DB8DA"},
            show: function (layout) {
              return layout.qDef.usePalette === "single" && layout.qDef.chartStyle === "bar";
            }
          },
          reverseColors: {
            type: "boolean",
            ref: "qDef.reverse",
            label: "Reverse Colors",
            defaultValue: false,
            show: function (layout) {
              return layout.qDef.chartStyle === "bar" && layout.qDef.usePalette !== "single";
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

  var settings = {
    uses: "settings",
    items: {
      presentation : {
        label: "Presentation",
        type: "items",
        items: {
          chartStyle: {
            type: "string",
            component: "item-selection-list",
            icon: "true",
            horizontal: "true",
            label: "",
            ref: "orient",
            defaultValue: "vertical",
            items: [
              {
              value:"vertical",
              component:"icon-item",
              labelPlacement: "bottom",
              icon: "º",
              label: "Vertical"
              },
              {
              value:"horizontal",
              component:"icon-item",
              icon: "Ω",
              labelPlacement: "bottom",
              label: "Horizontal"
              }
            ]
          },
          maGrid: {
             type: "items",
             items: {
               majorGrid: {
                 type: "boolean",
                 component: "switch",
                 label: "Major Grid Lines",
                 ref: "major",
                 options: [{
                   value: true,
                   label: "On"
                 }, {
                   value: false,
                   label: "Off"
                 }],
                 defaultValue: false
               },
               magridStroke: {
                 type: "number",
                 component: "slider",
                 label: function(d) {
                   return "Major Grid Width (" + d.majGridStroke +"px)";
                 },
                 ref: "majGridStroke",
                 min: 1,
                 max: 5,
                 step: 1,
                 defaultValue: 2,
                 show: function (layout) {
                   return layout.major === true;
                 }
               },
               maGridColors: {
                 type: "object",
                 label: "Stroke Color",
                 ref: "maGridColor",
                 dualOutput: true,
                 component: "color-picker",
                 defaultValue: {color: "#ccc"},
                 show: function (layout) {
                   return layout.major === true;
                 }
               }
             }
           },
           miGrid: {
              type: "items",
              items: {
                minorGrid: {
                  type: "boolean",
                  component: "switch",
                  label: "Minor Grid Lines",
                  ref: "minor",
                  options: [{
                    value: true,
                    label: "On"
                  }, {
                    value: false,
                    label: "Off"
                  }],
                  defaultValue: false
                },
                migridStroke: {
                  type: "number",
                  component: "slider",
                  label: function(d) {
                    return "Minor Grid Width (" + d.minGridStroke +"px)";
                  },
                  ref: "minGridStroke",
                  min: 1,
                  max: 5,
                  step: 1,
                  defaultValue: 1,
                  show: function (layout) {
                    return layout.minor === true;
                  }
                },
                maGridColors: {
                  type: "object",
                  label: "Stroke Color",
                  ref: "minGridColor",
                  dualOutput: true,
                  component: "color-picker",
                  defaultValue: {color: "#ccc"},
                  show: function (layout) {
                    return layout.minor === true;
                  }
                }
              }
            },
            valLabels: {
              type: "items",
              items: {
                labels: {
                  type: "boolean",
                  component: "switch",
                  label: "Value Labels",
                  ref: "labels",
                  options: [{
                    value: true,
                    label: "On"
                  }, {
                    value: false,
                    label: "Off"
                  }],
                  defaultValue: false
                },
                font: {
                  type: "number",
                  component: "slider",
                  label: function(d) {
                    return "Font Size (" + d.lableFontSize +"px)";
                  },
                  ref: "lableFontSize",
                  min: 8,
                  max: 20,
                  step: 1,
                  defaultValue: 12,
                  show: function (layout) {
                    return layout.labels === true;
                  }
                },
                olabels: {
                  type: "object",
                  label: "Outside Label Color",
                  ref: "olabelColor",
                  dualOutput: true,
                  component: "color-picker",
                  defaultValue: {color: "#000"},
                  show: function (layout) {
                    return layout.labels === true;
                  }
                },
                ilabels: {
                  type: "object",
                  label: "Inside Label Color",
                  ref: "ilabelColor",
                  dualOutput: true,
                  component: "color-picker",
                  defaultValue: {color: "#fff"},
                  show: function (layout) {
                    return layout.labels === true;
                  }
                }
              }
            }
          }
      },
      legend: {
        label: "Legend",
        type: "items",
        items: {
          legendType: {
            type: "string",
            component: "dropdown",
            label: "Legend Type",
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
      },
      xAxis : {
        label: "X-axis",
        type: "items",
        items: {
          axis: {
            label: "Axis",
            type: "items",
            items: {
              orientation: {
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
                }]
              }
            }
          }
        }
      },
      yAxis : {
        label: "Y-axis",
        type: "items",
        items: {
          axis: {
            label: "Axis Orientation",
            type: "items",
            items: {
              orientation: {
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
                }]
              }
            }
          },
          axisOrien: {
            label: "Axis Orientation",
            type: "items",
            items: {
              orientation: {
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
                }]
              }
            }
          }
        }
      },

        Layout: {
          label: "Layout",
          type: "items",
          items: {
            showInnerOuterWidth: {
              type: "boolean",
              ref: "showInnerOuterWidth",
              defaultValue: false,
              show: false
            },
            innerWidth: {
              type: "number",
              component: "slider",
              label: function (d) {
                return "Inner Distance (" + d.innerWidth + "px)";
              },
              ref: "innerWidth",
              min: 0,
              max: 0.8,
              step: 0.1,
              defaultValue: 0.2,
              show: function (layout) {
                return layout.showInnerOuterWidth;//layout.qDef.chartStyle === "line";
              }
            },
            outerWidth: {
              type: "number",
              component: "slider",
              label: function (d) {
                return "Outer Distance (" + d.outerWidth + "px)";
              },
              ref: "outerWidth",
              min: 0,
              max: 1,
              step: 0.2,
              defaultValue: 0.2,
              show: function (layout) {
                return layout.showInnerOuterWidth;//layout.qDef.chartStyle === "line";
              }
            }
          }
        }
    }
  };

  var about = {
    type: "items",
    label: function(d) { // dummy function to access extension scope
      scopeLayout  = d;
      return "About " + d.extensionMeta.name.trim();
    },
    items: {
      about: {
        component: {
          template: '<div><img src="../extensions/pChart/png/Arpe.png"  style="max-width:250px;"></div>' +
            '<p style="font-size:10px; color: #7f7f7f; text-align:left;"><i>Created by: Ryan Arpe</i>' +
            '<span style="font-size:10px; color: #7f7f7f; float:right; margin-right:10px"><i>v1.0</i></span></p>' +
            '<div style="width:95%; font-size:10px; margin-right:10px; color: #7f7f7f; text-align: left"><i>Colaborator: Ralf Becher</i></div>'
        }
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
			settings: settings,
      about: about

		}
	}
})
