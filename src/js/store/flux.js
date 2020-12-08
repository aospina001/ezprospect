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

			login: async user => {
				try {
					const response = await fetch(
						"https://3000-fe882c22-43b8-48a2-8467-13f140f61248.ws-us03.gitpod.io/login",
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								email: user.email,
								password: user.password
							})
						}
					);
					const body = await response.json();
					if (response.status == 400) {
						console.log(body);
					} else {
						console.log("Logged", body);
						window.location.href = "/logged";
					}
				} catch (error) {
					console.log(error);
				}
			},

			signup: async newUser => {
				try {
					const response = await fetch(
						"https://3000-fe882c22-43b8-48a2-8467-13f140f61248.ws-us03.gitpod.io/signup",
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								email: newUser.email,
								password: newUser.password
							})
						}
					);
					const body = await response.json();
					if (response.status == 400 || response.status == 500) {
						console.log(body);
					} else {
						console.log("Logged", body);
						window.location.href = "/logged";
					}
				} catch (error) {
					console.log(error);
				}
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
