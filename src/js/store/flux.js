const ezprospectUrl = "https://3000-fe882c22-43b8-48a2-8467-13f140f61248.ws-us03.gitpod.io";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user_id: null,
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
				const store = getStore();
				try {
					const response = await fetch(`${ezprospectUrl}/login`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: user.email,
							password: user.password
						})
					});
					const body = await response.json();
					if (response.status == 200) {
						setStore({ token: body.jwt, user_id: body.user_id });
					} else {
						setStore({ token: null, user_id: null });
						return body.msg;
					}
				} catch (error) {
					return error;
				}
			},

			signup: async newUser => {
				try {
					const response = await fetch(`${ezprospectUrl}/signup`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: newUser.email,
							password: newUser.password,
							first_name: newUser.first_name,
							last_name: newUser.last_name,
							phone_number: newUser.phone_number
						})
					});
					const body = await response.json();
					if (response.status == 200) {
						setStore({ token: body.jwt, user_id: body.user_id });
					} else {
						setStore({ token: null, user_id: null });
						return body.msg;
					}
				} catch (error) {
					console.log(error);
					return "Error";
				}
			},

			sign_out: () => {
				setStore({ token: null, user_id: null, prospect: [] });
			},

			addProspect: async data => {
				const store = getStore();
				const lat = data.LAT.toString();
				const lon = data.LON.toString();
				console.log(lon, lat);
				try {
					const response = await fetch(`${ezprospectUrl}/addProspect`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							name: data.BUSNAME,
							industry: data.CLASSCODE,
							address1: data.BUSADDR,
							city: data.BUSCITY,
							state: data.BUSSTATE,
							zipCode: data.ZIPCODE,
							phone_number: data.PHONENO,
							account: data.ACCOUNTNO,
							lat: lat,
							lon: lon,
							user_id: store.user_id
						})
					});
					const body = await response.json();
					console.log(body, response);
					return data.ACCOUNTNO;
				} catch (error) {
					console.log(error);
				}
			},

			loadProspects: async () => {
				const store = getStore();
				const user_id = store.user_id;
				const response = await fetch(`${ezprospectUrl}/prospects/${user_id}`);
				const data = await response.json();
				setStore({
					prospect: data
				});
			},

			addContact: async (data, account) => {
				try {
					const response = await fetch(`${ezprospectUrl}/addContact`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							first_name: data.first_name,
							last_name: data.last_name,
							position: data.position,
							title: data.title,
							email: data.email,
							phone_number: data.phone_number,
							account: account
						})
					});
					const body = await response.json();
				} catch (error) {
					console.log(error);
				}
			},

			loadContacts: async () => {
				const response = await fetch(`${ezprospectUrl}/contacts`);
				const data = await response.json();
				setStore({
					contacts: data
				});
			}
		}
	};
};

export default getState;
