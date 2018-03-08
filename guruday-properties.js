define([], function() {
    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: {
                uses: "dimensions",
                min: 1,
                max: 1
            },
            measures: {
                uses: "measures",
                min: 1,
                max: 1
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