define([
    './guruday-properties',
    './node_modules/picasso.js/dist/picasso.min',
    './node_modules/picasso-plugin-q/dist/picasso-q.min'
],
    function (properties, picasso, pq) {

        picasso.use(pq)
        picasso.renderer.prio(['canvas'])

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
                      }, {
                          type: 'box',
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
                      }]
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
