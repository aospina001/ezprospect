const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			business: [],
			prospect: [],
			contacts: []
		},
		actions: {
			loadData: async () => {
				const url = "https://opendata.arcgis.com/datasets/ee6a22d3e19b47858f9500fc4e205f7e_0.geojson";

				const response = await fetch(url);
				const data = await response.json();
				const array = data.features;

				setStore({ business: array.slice(1, 100) });
			},

			addProspect: (objectId, data) => {
				const store = getStore();
				let count = 0;
				store.prospect.map(each => {
					if (each.objectId == objectId) {
						count = 1;
					}
				});
				if (count == 0) {
					setStore({
						prospect: [
							...store.prospect,
							{
								objectId,
								data
							}
						]
					});
				}
			},

			addContact: data => {
				const store = getStore();
				setStore({
					contacts: [
						...store.contacts,
						{
							data
						}
					]
				});
			}
		}
	};
};

export default getState;
