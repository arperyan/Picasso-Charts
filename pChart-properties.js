define([], function() {
    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: {
                uses: "dimensions",
                min: 0,
                max: 1
            },
            measures: {
                uses: "measures",
                min: 1,
                max: 2
            },
            sorting: {
                uses: "sorting"
            },
            appearance: {
                uses: "settings",
            }
        }
    }
})
