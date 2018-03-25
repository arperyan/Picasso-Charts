define([
    './pChart-properties',
    './node_modules/picasso.js/dist/picasso.min',
    './node_modules/picasso-plugin-q/dist/picasso-q.min'
],
    function (properties, picasso, pq) {

        picasso.use(pq)
        picasso.renderer.prio(['canvas'])

        var box = function (opts) {
          return  {
            type: 'box',
            key: opts.id,
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
                    fill: opts.fill,
                    width: opts.width
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
                line: {}
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
                      opacity: 0.3,
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
              size: opts.size
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
                      opacity: 0.3,
                    }
                  }
                }]
            }
          };
        }

        var labels = function (opts) {
          return {
            type: 'labels',
            key: 'labels-' + opts.c,
            displayOrder: 2,
            settings: {
              sources: [{
                component: opts.c,
                selector: 'rect',
                strategy: {
                  type: 'bar',
                  settings: {
                    direction: 'down',
                    fontSize: 14,
                    align: 'align' in opts ? opts.align : 0.5,
                    labels: [{
                      placements: [
                        {
                          position: 'opposite', // 'inside' | 'outside' | 'opposite'
                          justify: 0.02, // Placement of the label along the direction of the bar // Optional
                          fill: '#333', // Color of the label // Optional
                        },
                        {
                          position: 'inside',
                          justify: 0.02,
                          fill: '#fff'
                        }
                      ],
                      label: function label(d) {
                        //console.log(d);
                        return (d.data.end.label);
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
                  size: 8, // Optional
                }
              },
              title: {
                show: true,
                anchor: 'start',
                //fill: 'red',
                wordBreak: 'break-word'
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

              this.chart = picasso.chart({
                  element: $element[0],
                  settings: {
                      scales: {
                          dimension: {
                              data: { extract: { field: 'qDimensionInfo/0' } },
                              padding: 0.2
                          },
                          measure: {
                              data: { fields: ['qMeasureInfo/0','qMeasureInfo/1']},
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
                      components: [{
                          type: 'axis',
                          dock: 'left',
                          scale: 'measure'
                      }, {
                          type: 'axis',
                          dock: 'bottom',
                          scale: 'dimension'
                      },
                      legend({
                        type: 'legend-cat',
                        scale: 'color',
                        dock: 'right',
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
                      {
                          type: 'grid-line',
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
                            strokeWidth: 1
                          }
                      },
                      {
                        type: 'text',
                        text: 'Gravity (m/s2)',
                        dock: 'left'
                      }, {
                        type: 'text',
                        text: 'Density (g/cm3)',
                        dock: 'bottom'
                      },

                        box({ id: 'bars',
                          start: 0,
                          end: { field: 'qMeasureInfo/0' },
                          width: 1,
                          fill: { scale: 'color'}
                        }),
                        line({ id: 'lines',
                          line: { field: 'qMeasureInfo/1' }
                        }),
                        point({ id: 'p',
                          dot: { field: 'qMeasureInfo/1' },
                          fill: '#12724d',
                          size: 0.3
                        }),
                        labels({ c: 'bars' })
                      ]
                  }
              })

              this.chartBrush = this.chart.brush('highlight')
              this.chartBrush.on('update', (added, removed) => {
                  const selections = [].concat(added, removed).map(v => v.values[0])
                  this.selectValues(0, selections, true)
              });


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
