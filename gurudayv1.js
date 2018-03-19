define([
    './guruday-properties',
    './node_modules/picasso.js/dist/picasso.min',
    './node_modules/picasso-plugin-q/dist/picasso-q.min'
],
    function (properties, picasso, pq) {

        picasso.use(pq)
        picasso.renderer.prio(['canvas'])

        var box = function (opts) {
          return  {
            type: 'box',
            key: 'bars',
            data: {
                extract: {
                    field: 'qDimensionInfo/0',
                    props: {
                        start: 0,
                        end: { field: 'qMeasureInfo/0' }
                    }
                }
            },
            settings: {
                major: { scale: 'dimension' },
                minor: { scale: 'measure' },
                box: {
                    fill: { scale: 'color', ref: 'end' }
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
            key: 'lines',
            type: 'line',
            data: {
              extract: {
                field: 'qDimensionInfo/0',
                props: {
                  line: { field: 'qMeasureInfo/0' }
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
            key: 'p',
            type: 'point',
            data: {
              extract: {
                field: 'qDimensionInfo/0',
                props: {
                  dot: { field: 'qMeasureInfo/0' }
                }
              }
            },
            settings: {
              x: { scale: 'dimension' },
              y: { scale: 'measure', ref: 'dot' },
              fill: '#12724d',
              size: 0.2
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
        return {
            definition: properties,
            initialProperties: {
                qHyperCubeDef: {
                    qDimensions: [],
                    qMeasures: [],
                    qInitialDataFetch: [{ qTop: 0, qLeft: 0, qWidth: 2, qHeight: 2000 }]
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
                              data: { field: 'qMeasureInfo/0' },
                              invert: true,
                              expand: 0.1,
                              min: 0,
                              include: [0]
                          },
                          color: {
                              type: 'color',
                              data: { field: 'qMeasureInfo/0' }
                          }
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
                          box({ c: 'bars'}),
                          line({ c: 'lines'}),
                          point({ c: 'p'}),
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
                            data: layout.qHyperCube
                        }]
                    })
                    resolve()
                })
            }
        }
    })
