define([
    './guruday-properties',
    './node_modules/picasso.js/dist/picasso.min',
    './node_modules/picasso-plugin-q/dist/picasso-q.min'
],
function(properties, picasso, pq) {    
    return {
        mount: function($element) {},
        updateData: function(layout) {
            return new Promise((resolve, reject) => {
                resolve(layout)
            })
        },
        paint: function($element, layout) {
            return new Promise((resolve, reject) => {
                resolve()
            })
        }

    }
})