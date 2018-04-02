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
	};

  var sorting = {
    uses: "sorting"
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
			sectionAppearance: sectionAppearance,
      about: about
		//	sectionInteractivity: sectionInteractivity

		}
	}
})
