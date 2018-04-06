define([
    './pChart-properties',
    './node_modules/picasso.js/dist/picasso',
    './node_modules/picasso-plugin-q/dist/picasso-q.min',
    './node_modules/picasso-plugin-hammer/dist/picasso-hammer.min',
    './colors'
],
    function (properties, picasso, pq, picassoHammer, colors) {

        picasso.use(pq)
        picasso.renderer.prio(['canvas'])
        picasso.use(picassoHammer)

        var box = function (opts) {
          return  {
            type: 'box',
            key: opts.id,
            displayOrder: 1,
            data: {
                extract: {
                    field: 'qDimensionInfo/0',
                    props: {
                        start: opts.start,
                        end: opts.end
                    }
                }
            },
            settings: {
                major: { scale: 'dimension' },
                minor: { scale: 'measure' },
                box: {
                    show: opts.show,
                    fill: opts.fill,
                    opacity: opts.opacity,
                    width: 1,
                    stroke: opts.stroke, // Optional
                    strokeWidth: opts.strokeWidth, // Optional
                },

            },
            brush: {
              trigger: [{
                on: 'tap',
                action: 'toggle',
                contexts: ['highlight'],
                propagation: 'stop', // 'stop' => prevent trigger from propagating further than the first shape
                globalPropagation: 'stop', // 'stop' => prevent trigger of same type to be triggered on other components
              }],
                consume: [{
                  context: 'highlight',
                  style: {
                    inactive: {
                      opacity: 0.3,
                    }
                  }
                }]
            }
          };
        }

        var line = function (opts) {
          return  {
            key: opts.id,
            type: 'line',
            displayOrder: 2,
            data: {
              extract: {
                field: 'qDimensionInfo/0',
                props: {
                  line: opts.line
                }
              }
            },
            settings: {
              coordinates: {
                major: { scale: 'dimension' },
                minor: { scale: 'measure', ref: 'line' }
              },
              layers: {
                curve: 'monotone', //// cardinal, linear
                show: true,
                line: {
                  stroke: opts.stroke,
                  show: true,
                  strokeWidth: 4,
                  opacity: 1
                },
                area: {
                  fill: '#ccc', // Optional
                  opacity: 0.8, // Optional
                  show: false, // Optional
                }
              }
            },
            brush: {
              consume: [{
                  context: 'highlight',
                  style: {
                    inactive: {
                      opacity: 0.3
                    }
                  }
                }]
            }
          };
        }

        var point = function (opts) {
          return {
            key: opts.id,
            type: 'point',
            displayOrder: 3,
            data: {
              extract: {
                field: 'qDimensionInfo/0',
                props: {
                  dot: opts.dot
                }
              }
            },
            settings: {
              x: { scale: 'dimension' },
              y: { scale: 'measure', ref: 'dot' },
              fill: opts.fill,
              size: opts.size,
              opacity: 0.8,
              strokeWidth: 2,
              stroke: "#fff",
            },
            brush: {
              trigger: [{
                on: 'tap',
                action: 'toggle',
                contexts: ['highlight'],
                propagation: 'stop', // 'stop' => prevent trigger from propagating further than the first shape
                globalPropagation: 'stop', // 'stop' => prevent trigger of same type to be triggered on other components
              }],
                consume: [{
                  context: 'highlight',
                  style: {
                    active: {
                      stroke: '#fff',
                      strokeWidth: 3
                    },
                    inactive: {
                      opacity: 0.3
                    }
                  }
                }]
            }
          };
        }

        var labels = function (opts) {
          return {
            type: 'labels',
            key: 'labels',
            displayOrder: 4,
            settings: {
              sources: [{
                component: opts.c,
                selector: 'rect',
                strategy: {
                  type: 'bar',
                  settings: {
                    direction: 'down',
                    fontSize: opts.fontSize || 12,
                    fontFamily: 'Arial',
                    //align: 'align' in opts ? opts.align : 0.5,
                    align: 0.5,
                     labels: [{
                      placements: [
                        {
                          position: 'opposite', // 'inside' | 'outside' | 'opposite'
                          // justify: 0.2, // Placement of the label along the direction of the bar // Optional
                          fill: '#333', // Color of the label // Optional
                        },
                        {
                          position: 'inside',
                          //justify: 0.2,
                          fill: '#fff'
                        }
                      ],
                      label({ data }) {
                        return data ? data.end.label : '';
                      }
                    }]
                  }
                }
              }]
            },
            brush: {
              consume: [{
                  context: 'highlight',
                  style: {
                    inactive: {
                      opacity: 0.3
                    }
                  }
                }]
            }
          };
        }

        var legend = function (opts) {
          return {
            type: opts.type,
            key: 'leg',
            scale: opts.scale,
            dock: opts.dock,
            displayOrder: 1,
            settings: {
              layout: {  // Optional
                size: 1, // Maximum number of columns (vertical) or rows (horizontal) // Optional
                direction: 'rtl', // Layout direction. Either `'ltr'` or `'rtl'` // Optional
              },
              item: {  // Optional
                // Settings applied per item
                show: true, // Whether to show the current item // Optional
                label: {  // Optional
                  wordBreak: 'break-word', // Word break rule, how to apply line break if label text overflows its maxWidth property. Either `'break-word'` or `'break-all'` // Optional
                  maxLines: 2, // Max number of lines allowed if label is broken into multiple lines (only applicable with wordBreak) // Optional
                  maxWidth: 136, // Maximum width of label, in px // Optional
                },
                shape: {  // Optional
                  type: 'square', // Optional
                  size: 12, // Optional
                }
              },
              title: {
                show: true,
                anchor: 'start',
                //fill: 'red',
                wordBreak: 'break-word'
              },
              navigation: {
                class: {
                  'my-button': true
                },
                content: function(h, state) {
                  return h('span', {
                    class: {
                      [`arrow-${state.direction}`]: true
                    }
                  })
                }
              }
            },
            brush: {
                trigger: [{
                  on: 'tap',
                  contexts: ['highlight'],
                }],
                consume: [{
                  context: 'highlight',
                  style: {
                    inactive: {
                      opacity: 0.3
                    }
                  }
                }]
            }
          };
        }

        var grid = function (opts) {
          return {
            type: 'grid-line',
            key: opts.id,
            displayOrder: 0,
            // x: {
            //   scale: 'dimension'
            // },
            y: {
              scale: 'measure'
            },
            ticks: {
              show: true,
              stroke: 'red',
              strokeWidth: 2,
            },
            minorTicks: {
              show: true,
              stroke: 'blue',
              strokeWidth: 2
            },
            brush: {
              consume: [{
                  context: 'highlight',
                  style: {
                    inactive: {
                      opacity: 0.3
                    }
                  }
                }]
            }
          };
        }

        var yaxis = function (opts) {
          return  {
              type: 'axis',
              key: opts.id,
              dock: opts.dock,
              scale: 'measure',
              settings: {
                labels: {
                   show: true,
                   //mode: 'auto', // Control how labels arrange themself. Availabe modes are `auto`, `horizontal`, `layered` and `tilted`. When set to `auto` the axis determines the best possible layout in the current context
                    //maxGlyphCount: 10,
                  // tiltAngle: 35
                    //margin: 10
                    margin: 4, // Space in pixels between the tick and label. // Optional
                    maxLengthPx: 150, // Max length of labels in pixels // Optional
                    minLengthPx: 0, // Min length of labels in pixels. Labels will always at least require this much space // Optional
                    align: 0.5, // Align act as a slider for the text bounding rect over the item bandwidth, given that the item have a bandwidth. // Optional
                    offset: 0 //
                },
                ticks: {
                  show: false, // Toggle ticks on/off // Optional
                  margin: 0, // Space in pixels between the ticks and the line. // Optional
                  tickSize: 4, // Size of the ticks in pixels. // Optional
                },
                minorTicks: {
                  show: false, // Toggle minor-ticks on/off // Optional
                  tickSize: 3, // Size of the ticks in pixels. // Optional
                  margin: 0, // Space in pixels between the ticks and the line. // Optional
                },
                line: {
                  show: false, // Toggle line on/off // Optional
                },
                paddingStart: 0, // Padding in direction perpendicular to the axis // Optional
                paddingEnd: 10, // Padding in direction perpendicular to the axis // Optional
                align: 'auto' // Set the anchoring point of the axis. Avaialable options are `auto/left/right/bottom/top`. In `auto` the axis determines the best option. The options are restricted based on the axis orientation, a vertical axis may only anchor on `left` or `right` // Optional
              }
            };
        }

        var xaxis = function (opts) {
          return {
            type: 'axis',
            scale: 'dimension',
            key: opts.id,
            dock: 'bottom',
            settings: {
              labels: {
                 show: true,
                  //mode: 'auto', // Control how labels arrange themself. Availabe modes are `auto`, `horizontal`, `layered` and `tilted`. When set to `auto` the axis determines the best possible layout in the current context
                  //maxGlyphCount: 10,
                // tiltAngle: 35
                  //margin: 10
                  margin: 4, // Space in pixels between the tick and label. // Optional
                  maxLengthPx: 150, // Max length of labels in pixels // Optional
                  minLengthPx: 0, // Min length of labels in pixels. Labels will always at least require this much space // Optional
                  align: 0.5, // Align act as a slider for the text bounding rect over the item bandwidth, given that the item have a bandwidth. // Optional
                  offset: 0 //
              },
              ticks: {
                show: false, // Toggle ticks on/off // Optional
                margin: 0, // Space in pixels between the ticks and the line. // Optional
                tickSize: 4, // Size of the ticks in pixels. // Optional
              },
              minorTicks: {
                show: false, // Toggle minor-ticks on/off // Optional
                tickSize: 3, // Size of the ticks in pixels. // Optional
                margin: 0, // Space in pixels between the ticks and the line. // Optional
              },
              line: {
                show: false, // Toggle line on/off // Optional
              },
              paddingStart: 0, // Padding in direction perpendicular to the axis // Optional
              paddingEnd: 10, // Padding in direction perpendicular to the axis // Optional
              align: 'auto' // Set the anchoring point of the axis. Avaialable options are `auto/left/right/bottom/top`. In `auto` the axis determines the best option. The options are restricted based on the axis orientation, a vertical axis may only anchor on `left` or `right` // Optional

            }
          };
        }

        var xheader = function (opts) {
          return {
            type: 'text',
            key: opts.id,
            text: opts.text,
            dock: 'left'
          };
        }

        var yheader = function (opts) {
          return {
            type: 'text',
            key: opts.id,
            text: opts.text,
            dock: 'bottom'
          };
        }

        var range = function (opts) {
          return {
            type: 'brush-range',
            key: opts.id,
            displayOrder: 5,
            settings: {
              brush: 'highlight',
              scale: 'dimension',
              direction: 'horizontal',
              bubbles: {  // Optional
                show: true,
                align: 'start' // Where to anchor bubble [start|end] // Optional
              },
              target: {
                component: 'x-axis',
              }
            },
            formatter: 'myFormatter',
              style: {
                bubble: {  // Optional
                  fontSize: 16, // Optional
                  fontFamily: 'Arial', // Optional
                  fill: '#ff0000', // Optional
                  color: '#fff', // Optional
                  stroke: '#000'/* string */, // Optional
                  strokeWidth: 3, // Optional
                  borderRadius: 3, // Optional
                },
                target: {  // Optional
                  fill: 'limegreen', // Optional
                  opacity: '0.2'
                },
                line: {  // Optional
                  stroke: '#ff0000',
                  strokeWidth: 3 // Optional
                }
              }
          };
        }

        return {
            definition: properties,
            initialProperties: {
                qHyperCubeDef: {
                    qDimensions: [],
                    qMeasures: [],
                    qInitialDataFetch: [{ qTop: 0, qLeft: 0, qWidth: 10, qHeight: 500 }]
                },
                selections: "CONFIRM"
            },
            paint: function ($element, layout) {

            //var dimProp      = layout.qHyperCube.qDimensionInfo[0]
            var measureProp0 = layout.qHyperCube.qMeasureInfo[0],
                measureProp1 = layout.qHyperCube.qMeasureInfo[1],
                measureLabels = layout.qHyperCube.qMeasureInfo.map(function(d) {
                        		        return d.qFallbackTitle;
                                }),
                dimLabel = layout.qHyperCube.qDimensionInfo[0].qFallbackTitle,
                colorSchema = measureProp0.colorSchema;

            // var qMeaColorUser = layout.qHyperCube.qMeasureInfo.map(function(d){
      			// 		var m = typeof d.colorPalette !== "undefined" ? d.colorPalette : {};
      			// 		return {
      			// 			cat: typeof m.cat !== "undefined" ? m.cat : 'picasso1',
      			// 		}
      			// });


            //if(layout.qHyperCube.qMeasureInfo.length === 1) {

              this.chart = picasso.chart({
                    element: $element[0],
                    settings: {
                        scales: {
                            dimension: {
                                data: { extract: { field: 'qDimensionInfo/0' } },
                                //padding: 0.1,
                                paddingInner: measureProp0.innerWidth,
                                paddingOuter: measureProp0.outerWidth
                            },
                            measure: {
                                data: { fields: ['qMeasureInfo/0','qMeasureInfo/1']},
                                //data: { field: 'qMeasureInfo/0'},
                                invert: true,
                                expand: 0.1,
                                min: 0,
                                include: [0]
                            },
                            color: {
                              data: { field: 'qMeasureInfo/0' },
                              type: 'color',
                              range: colors.colorSchema,
                              nice: true,
                              //type: 'threshold-color'

                                // data:  { fields: ['qMeasureInfo/0','qMeasureInfo/1']},
                                // type: 'categorical-color',
                                // range: ['red', 'blue'],//measureProp0.colorPalette//'color'
                            },
                        },
                        interactions: [{
                              type: 'hammer',
                              gestures: [{
                                type: 'Pan',
                                options: {
                                  event: 'range',
                                  // direction: Hammer.DIRECTION_VERTICAL,
                                },
                                events: {
                                  rangestart: function(e) {
                                    this.chart.component('brushrange').emit('rangeStart', e);
                                  },
                                  rangemove: function(e) {
                                    this.chart.component('brushrange').emit('rangeMove', e);
                                  },
                                  rangeend: function(e) {
                                    this.chart.component('brushrange').emit('rangeEnd', e);
                                  },
                                  rangeclear: function(e) {
                                    this.chart.component('brushrange').emit('rangeClear', e);
                                  }
                                }
                              }]
                        }],
                        components: [
                          labels({ c: 'bars'}),
                          yaxis({
                            id: 'y-axis',
                            dock: measureProp0.orientation
                          }),
                          xaxis({id: 'x-axis'
                          }),
                          range({id: 'brushrange'}),
                          legend({
                            type: 'legend-cat',
                            scale: 'color',
                            dock: 'right',
                          }),
                          grid({id: 'gridline'}),
                          yheader({
                            id: 'y-header',
                            text: dimLabel
                          }),
                          xheader({
                            id: 'x-header',
                            text: measureLabels.join(', ')
                          }),
                          box({ id: 'bars',
                            start: 0,
                            end: { field: 'qMeasureInfo/0' },
                            show: true,
                            fill: { scale: 'color', ref: 'end'},//{ scale: 'color'},
                            strokeWidth: measureProp0.barWidth,
                            stroke: measureProp0.barColor.color,
                            opacity: measureProp0.barOpacity
                          }),
                          line({ id: 'lines',
                            line: { field: 'qMeasureInfo/1' },
                            stroke: '#ff0000'
                          }),
                          point({ id: 'p',
                            dot: { field: 'qMeasureInfo/1' },
                            fill: '#12724d',
                            size: 0.3
                          }),


                        //     This is for Sequential legend
                        //      type: 'legend-seq',
                        //     settings: {
                        //       fill: 'color',
                        //       major: 'linear-scale',
                        //       // tick: {
                        //       //   label: (tickValue, index) => {
                        //       //     const temp = ['Hot', 'Cold'];
                        //       //     return temp[index % 2];
                        //       //   },
                        //       // }
                        //     }
                        // },
                        ],
                      }
                  })
              // } else {   bring in later
              //
              // }

              var scope = $element.scope();

              var chartBrush = this.chart.brush('highlight')
              chartBrush.on('update', (added, removed) => {
                  var selections = [].concat(added, removed).map(v => v.values[0]).filter(e => {return e > -1;});
                  //console.log(scope, selections);
                  if (selections.length > 0) {
                    scope.selectValues(0, selections, true);
                  }
              });

              // this.chartBrush = this.chart.brush('selection')
              // this.chartBrush.on('update', (added, removed) => {
              //     const selections = [].concat(added, removed).map(v => v.values[0])
              //     this.selectValues(0, selections, true)
              // });

              // this.chartBrush = this.chart.brush('selection')
              // this.chartBrush.on('update', (added, removed) => {
              //     const selections = [].concat(added, removed).map(v => v.values[0])
              //     this.selectValues(0, selections, true)
              // });


                return new Promise((resolve, reject) => {
                    this.chart.update({
                        data: [{
                            type: 'q',
                            key: 'qHyperCube',
                            data: layout.qHyperCube
                        }]
                    })
                    resolve()
                })
            }
        }
    })
