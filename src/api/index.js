import axios from "axios"

const baseURL = process.env.BASE_API

export function fetchNonprofit (ein) {
	return new Promise((resolve, reject) => {
		axios.get(`${baseURL}/${ein}`)
			.then(response => {
				resolve(response.data[0])
			})
			.catch(e => {
				reject(e)
			})
	})
}
