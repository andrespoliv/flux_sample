const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				fetch("https://swapi.dev/api/films").then(data => data.json()).then(data => {
					console.log(data)
					setStore({demo: data})
				})
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			postData: () => {
				fetch("https://swapi.dev/api/films").then(data => data.json()).then(data => {
					setStore({demo: [...getStore().demo, {
						title: "ANOTHER ONE",
						background: "red",
						initial: "red"
					}]})
				})
			}
		}
	};
};

export default getState;
