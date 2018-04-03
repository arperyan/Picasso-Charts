define([], function() {

  var dimensions = {
      uses: "dimensions",
      min: 1,
      max: 1
  };


	var measures = {
		uses: "measures",
		min: 1,
		max: 2,
    items: {
      barwidth: {
        type: "number",
				component: "slider",
				label: "Bar Width",
				ref: "qDef.barWidth",
				min: 0,
				max: 2,
		    step: 0.5,
				defaultValue: 1
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
          MyButtongroupProp: {
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
          }
        }
      }
    },
  };

  var about = {
    ref: "about",
    label: "About",
    type: "items",
    items: {
      Author: {
        label: "Created by: Ryan Arpe",
        component: "text"
      },
      Colaborator: {
        label: "Colaborator: Ralf Becher",
        component: "text"
      },
      Version: {
        label: "Version: v1.0",
        component: "text"
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
			sectionAppearance: sectionAppearance,
      about: about

		}
	}
})
