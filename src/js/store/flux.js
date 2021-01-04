// const ezprospectUrl = "https://3000-fe882c22-43b8-48a2-8467-13f140f61248.ws-us03.gitpod.io/";
const ezprospectUrl = "https://3000-d6982fcb-39a5-419b-a5ac-7d3136a54d8c.ws-us03.gitpod.io";
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
						console.log(body);
					}
				} catch (error) {
					console.log(error);
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
						console.log(body);
					}
				} catch (error) {
					console.log(error);
				}
			},

			addProspect: async data => {
				try {
					const response = await fetch(`${ezprospectUrl}/addProspect`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							name: data.BUSNAME,
							industry: data.CLASSCODE,
							address1: data.BUSADDR,
							address2: data.BUSADDR2,
							city: data.BUSCITY,
							state: data.BUSSTATE,
							zipCode: data.ZIPCODE,
							phone_number: data.PHONENO,
							account: data.ACCOUNTNO
						})
					});
					const body = await response.json();
					return data.ACCOUNTNO;
					console.log(body);
				} catch (error) {
					console.log(error);
				}
			},

			loadProspects: async () => {
				const response = await fetch(`${ezprospectUrl}/prospects`);
				const data = await response.json();
				setStore({
					prospect: data
				});
			},

			delete_Token: () => {
				setStore({ token: null, user_id: null });
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

			// addFinancial: async data => {
			// 	try {
			// 		const response = await fetch(`${ezprospectUrl}/addFinancial`, {
			// 			method: "POST",
			// 			headers: { "Content-Type": "application/json" },
			// 			body: JSON.stringify({
			// 				name: data.BUSNAME,
			// 				industry: data.CLASSCODE,
			// 				address1: data.BUSADDR,
			// 				address2: data.BUSADDR2,
			// 				city: data.BUSCITY,
			// 				state: data.BUSSTATE,
			// 				zipCode: data.ZIPCODE,
			// 				phone_number: data.PHONENO,
			// 				account: data.ACCOUNTNO
			// 			})
			// 		});
			// 		const body = await response.json();
			// 		return data.ACCOUNTNO;
			// 		console.log(body);
			// 	} catch (error) {
			// 		console.log(error);
			// 	}
			// }
		}
	};
};

export default getState;
