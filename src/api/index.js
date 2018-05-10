import axios from "axios"

const baseURL = process.env.BASE_API
const IRSSearchAPI = process.env.IRS_SEARCH_API_URL

export function fetchNonprofit (ein) {
	return new Promise((resolve, reject) => {
		axios.get(`${baseURL}/nonprofits/${ein}`)
			.then(response => {
        if (response.data.length) {
          resolve(response.data[0])
        } else {
          axios.get(`${IRSSearchAPI}/nonprofits/${ein}`)
            .then(res => {
              if (res.data.length) {
                resolve(res.data[0])
              }
            })
            .catch(err => {
              reject(err)
            })
        }
			})
			.catch(e => {
				reject(e)
			})
	})
}
