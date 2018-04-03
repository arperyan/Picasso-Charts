define([
    './pChart-properties',
    './node_modules/picasso.js/dist/picasso.min',
    './node_modules/picasso-plugin-q/dist/picasso-q.min',
    './node_modules/picasso-plugin-hammer/dist/picasso-hammer.min'

],
    function (properties, picasso, pq, picassoHammer) {

        picasso.use(pq)
        picasso.renderer.prio(['canvas'])
        picasso.use(picassoHammer)

        var box = function (opts) {
          return  {
            type: 'box',
            key: opts.id,
            data: {
                extract: {
                    field: 'qDimensionInfo/0',
                    props: {
                        start:opts.start,
                        end: opts.end
                    }
                }
            },
            settings: {
                major: { scale: 'dimension' },
                minor: { scale: 'measure' },
                box: {
                    fill: opts.fill,
                    width: opts.width
                }
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
                line: {
                  stroke: opts.stroke
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
            }
          };
        }

        var legend = function (opts) {
          return {
            type: opts.type,
            key: 'leg',
            scale: opts.scale,
            dock: opts.dock,
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

            var measureProp = layout.qHyperCube.qMeasureInfo[0];

            var measureLabels = layout.qHyperCube.qMeasureInfo.map(function(d) {
                        		return d.qFallbackTitle;
                        	});
            console.log(measureProp.barWidth);

            if(layout.qHyperCube.qMeasureInfo.length === 1) {

            this.chart = picasso.chart({
                  element: $element[0],
                  settings: {
                      scales: {
                          dimension: {
                              data: { extract: { field: 'qDimensionInfo/0' } },
                              padding: 0.2,
                              paddingInner: 0,
                              paddingOuter: 0
                          },
                          measure: {
                              //data: { fields: ['qMeasureInfo/0','qMeasureInfo/1']},
                              data: {field : 'qMeasureInfo/0'},
                              invert: true,
                              expand: 0.1,
                              min: 0,
                              include: [0]
                          },
                          color: {
                              data:  { extract: { field: 'qDimensionInfo/0' } } ,
                              type: 'color'
                              // range: ['red', 'blue']

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
                                }
                              }
                            }]
                      }],
                      components: [{
                          type: 'axis',
                          key: 'y-axis',
                          dock: 'left',
                          scale: 'measure',
                          settings: {
                            labels: {
                              show: true,
                              mode: 'auto', // Control how labels arrange themself. Availabe modes are `auto`, `horizontal`, `layered` and `tilted`. When set to `auto` the axis determines the best possible layout in the current context
                              //maxGlyphCount: 10,
                              // tiltAngle: 35
                              //margin: 10
                            },
                            ticks: {
                              show: false, // Toggle ticks on/off // Optional
                              margin: 0, // Space in pixels between the ticks and the line. // Optional
                              tickSize: 4, // Size of the ticks in pixels. // Optional
                            },
                            line: {
                              show: false, // Toggle line on/off // Optional
                            }
                          }
                      }, {
                        type: 'axis',
                        scale: 'dimension',
                        key: 'x-axis',
                        dock: 'bottom',
                        settings: {
                          labels: {
                            show: true,
                              mode: 'auto', // Control how labels arrange themself. Availabe modes are `auto`, `horizontal`, `layered` and `tilted`. When set to `auto` the axis determines the best possible layout in the current context
                              //maxGlyphCount: 10,
                            // tiltAngle: 35
                              //margin: 10
                          },
                          ticks: {
                            show: false, // Toggle ticks on/off // Optional
                            margin: 0, // Space in pixels between the ticks and the line. // Optional
                            tickSize: 4, // Size of the ticks in pixels. // Optional
                          },
                          line: {
                            show: false, // Toggle line on/off // Optional
                          }
                        }//,
                        /////------------ Use this option to highlight the x-axis when the range brusihing is swithced off
                        // brush: {
                        //   trigger: [{
                        //     on: 'tap',
                        //     contexts: ['highlight']
                        //   }],
                        //   consume: [{
                        //     context: 'highlight',
                        //     style: {
                        //       inactive: {
                        //         opacity: 0.3
                        //       }
                        //     }
                        //   }]
                        // }
                      },
                      {
                        type: 'brush-range',
                        key: 'brushrange',
                        settings: {
                          brush: 'highlight',
                          scale: 'dimension',
                          direction: 'horizontal',
                          // displayOrder: 3,
                          bubbles: {  // Optional
                            show: true,
                            align: 'start' // Where to anchor bubble [start|end] // Optional
                          },
                          target: {
                            component: 'x-axis'
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
                      },
                      legend({
                        type: 'legend-cat',
                        scale: 'color',
                        dock: 'right',
                      }),
                      labels({ c: 'bars'
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

                        grid({id: 'gridline'}),
                      {
                        type: 'text',
                        text: measureLabels.join(', '),
                        dock: 'left'
                      },
                      {
                        type: 'text',
                        text: layout.qHyperCube.qDimensionInfo[0].qFallbackTitle,
                        dock: 'bottom',
                        // anchor: 'left'
                      },

                        box({ id: 'bars',
                          start: 0,
                          end: { field: 'qMeasureInfo/0' },
                          width: measureProp.barWidth,
                          fill: { scale: 'color'}
                        }),
                        // line({ id: 'lines',
                        //   line: { field: 'qMeasureInfo/1' },
                        //   stroke: '#00ff1d'
                        // }),
                        // point({ id: 'p',
                        //   dot: { field: 'qMeasureInfo/1' },
                        //   fill: '#12724d',
                        //   size: 0.3
                        // }),

                      ],
                  }
              })}

              this.chartBrush = this.chart.brush('highlight')
              this.chartBrush.on('update', (added, removed) => {
                  const selections = [].concat(added, removed).map(v => v.values[0])
                  this.selectValues(0, selections, true)
              });

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
