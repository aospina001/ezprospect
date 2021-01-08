// const ezprospectUrl = "https://3000-fe882c22-43b8-48a2-8467-13f140f61248.ws-us03.gitpod.io";
const ezprospectUrl = "https://3000-a884d591-9b11-41c0-8795-eed5504a6f89.ws-us03.gitpod.io";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user_id: null,
			business: [],
			prospect: [],
			contacts: [],
			financials: []
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
				try {
					const response = await fetch(`${ezprospectUrl}/addProspect`, {
						method: "POST",
						headers: { "Content-Type": "application/json", Authorization: `Bearer ${store.token}` },
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
				const store = getStore();
				try {
					const response = await fetch(`${ezprospectUrl}/addContact`, {
						method: "POST",
						headers: { "Content-Type": "application/json", Authorization: `Bearer ${store.token}` },
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
							vehicles: data.vehicles,
							leasehold_improvements: data.leasehold_improvements,
							capital_leases: data.capital_leases,
							other_fixed_assets: data.other_fixed_assets,
							accumulated_depreciation: data.accumulated_depreciation,
							other_operating_assets: data.other_operating_assets,
							goodwill: data.goodwill,
							other_intangibles: data.other_intangibles,
							accumulated_amortization: data.accumulated_amortization,
							other_non_operating_assets: data.other_non_operating_assets,
							short_term_debt_secured: data.short_term_debt_secured,
							short_term_debt_unsecured: data.short_term_debt_unsecured,
							cpltd_secured: data.cpltd_secured,
							cpltd_unsecured: data.cpltd_unsecured,
							other_notes_payable: data.other_notes_payable,
							accounts_payable_trade: data.accounts_payable_trade,
							other_current_liabilities: data.other_current_liabilities,
							ltd_secured: data.ltd_secured,
							ltd_unsecured: data.ltd_unsecured,
							other_lt_notes_payable: data.other_lt_notes_payable,
							other_operating_liaibilities: data.other_operating_liaibilities,
							other_non_operating_liabilities: data.other_non_operating_liabilities,
							common_stock: data.common_stock,
							additional_paid_in_capital: data.additional_paid_in_capital,
							retained_earnings: data.retained_earnings,
							total_revenue: data.total_revenue,
							total_cogs: data.total_cogs,
							sga_expenses: data.sga_expenses,
							rent_expense: data.rent_expense,
							depreciation_expense: data.depreciation_expense,
							amortization_expense: data.amortization_expense,
							bad_debt_expense: data.bad_debt_expense,
							other_operating_expenses: data.other_operating_expenses,
							interest_expense: data.interest_expense,
							interest_income: data.interest_income,
							other_non_operating_income_expense: data.other_non_operating_income_expense,
							tax_provision: data.tax_provision,
							distributions: data.distributions
						})
					});
					const body = await response.json();
					console.log(body);
				} catch (error) {
					console.log(error);
				}
			},

			// editContact: async (id, full_name, email, address, phone) => {
			// 	try {
			// 		const response = await fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
			// 			method: "PUT",
			// 			headers: {
			// 				"Content-Type": "application/json"
			// 			},
			// 			body: JSON.stringify({
			// 				full_name: full_name,
			// 				email: email,
			// 				agenda_slug: "aospina001",
			// 				address: address,
			// 				phone: phone
			// 			})
			// 		});

			// 		getActions().getContacts();
			// 	} catch (error) {
			// 		console.log(error);
			// 	}
			// },
			deleteFinancial: async id => {
				const response = await fetch(`${ezprospectUrl}/deleteFinancial`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				});
				getActions().getFinancials();
			},
			getFinancials: async () => {
				try {
					const response = await fetch(`${ezprospectUrl}/getFinancial`);
					const contacts = await response.json();
					setStore({ contacts: contacts });
				} catch (error) {
					console.log(error);
				}
			}
		}
	};
};

export default getState;
