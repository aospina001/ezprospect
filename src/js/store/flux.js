// const ezprospectUrl = "https://3000-fe882c22-43b8-48a2-8467-13f140f61248.ws-us03.gitpod.io/";
const ezprospectUrl = "https://3000-a884d591-9b11-41c0-8795-eed5504a6f89.ws-us03.gitpod.io";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user_id: null,
			business: [],
			prospect: [],
			contacts: [],
			organizations: []
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
							phone_number: newUser.phone_number,
							organization_id: newUser.organization_id
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

			sign_out: () => {
				setStore({ token: null, user_id: null, prospect: [] });
			},

			addProspect: async data => {
				const store = getStore();
				try {
					const response = await fetch(`${ezprospectUrl}/addProspect`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							user_id: store.user_id,
							name: data.BUSNAME,
							industry: data.CLASSCODE,
							address1: data.BUSADDR,
							city: data.BUSCITY,
							state: data.BUSSTATE,
							zipCode: data.ZIPCODE,
							phone_number: data.PHONENO ? data.PHONENO : "",
							account: data.ACCOUNTNO
						})
					});
					const body = await response.json();
					console.log("*", body);
					return data.ACCOUNTNO;
				} catch (error) {
					console.log(error);
				}
			},

			loadProspects: async () => {
				const store = getStore();
				const response = await fetch(`${ezprospectUrl}/prospects/${store.user_id}`);
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
			},

			loadOrganizations: async () => {
				const response = await fetch(`${ezprospectUrl}/organizations`);
				const data = await response.json();
				setStore({
					organizations: data
				});
			},

			addFinancial: async data => {
				try {
					const response = await fetch(`${ezprospectUrl}/addFinancial`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							statement_date: data.statement_date,
							quality: data.quality,
							fye_month: data.fye_month,
							fye_day: data.fye_day,
							prepared_by: data.prepared_by,
							cash: data.cash,
							accounts_receivable: data.accounts_receivable,
							raw_materials: data.raw_materials,
							work_in_process: data.work_in_process,
							finished_goods: data.finished_goods,
							land: data.land,
							construction_in_progress: data.construction_in_progress,
							buildings: data.buildings,
							machines_and_equipment: data.machines_and_equipment,
							furniture_and_fixtures: data.furniture_and_fixtures,
							vehicles: data.vehicles
						})
					});
					const body = await response.json();
					return data.ACCOUNTNO;
					console.log(body);
				} catch (error) {
					console.log(error);
				}
			}
		}
	};
};

export default getState;
