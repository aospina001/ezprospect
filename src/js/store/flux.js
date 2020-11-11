const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			business: [],
			prospect: []
		},
		actions: {
			loadData: async () => {
				const url = "https://opendata.arcgis.com/datasets/ee6a22d3e19b47858f9500fc4e205f7e_0.geojson";

				const response = await fetch(url);
				const data = await response.json();
				const array = data.features;

				setStore({ business: array.slice(1, 100) });
			},

			addProspect: (formData, objectId, data) => {
				const store = getStore();
				setStore({
					prospect: [
						...store.prospect,
						{
							objectId,
							formData,
							data
						}
					]
				});
			}
		}
	};
};

export default getState;
