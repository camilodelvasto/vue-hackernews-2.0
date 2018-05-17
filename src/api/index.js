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
              } else {
                reject({ code: 404 })
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

export function fetchCampaign (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${baseURL}/campaigns/${id}`)
      .then(response => {
        if (response.data.length) {
          resolve(response.data[0])
        } else {
          reject({ code: 404 })
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function fetchCampaigns (campaign_id, page, limit, paginated = true) {
  return new Promise((resolve, reject) => {
    if (!paginated) {
      page = 1
    }
    axios.get(`${baseURL}/campaigns/?campaign_id=${campaign_id}&_limit=${limit}&_page=${page++}`)
      .then(response => {
        if (response.data.length) {
          resolve(response.data)
        } else {
          reject({ code: 404 })
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function fetchUpdates (campaign_id, page, limit, paginated = true) {
  return new Promise((resolve, reject) => {
    if (!paginated) {
      page = 1
    }
    axios.get(`${baseURL}/updates/?campaign_id=${campaign_id}&_limit=${limit}&_page=${page++}`)
      .then(response => {
        if (response.data.length) {
          resolve(response.data)
        } else {
          reject({ code: 404 })
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function fetchComments (campaign_id, page, limit, paginated = true) {
  return new Promise((resolve, reject) => {
    if (!paginated) {
      page = 1
    }
    axios.get(`${baseURL}/comments/?campaign_id=${campaign_id}&_limit=${limit}&_page=${page++}`)
      .then(response => {
        if (response.data.length) {
          resolve(response.data)
        } else {
          reject({ code: 404 })
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function fetchDonations (campaign_id, page, limit, paginated = true) {
	return new Promise((resolve, reject) => {
    if (!paginated) {
      page = 1
    }
		axios.get(`${baseURL}/donations/?campaign_id=${campaign_id}&_limit=${limit}&_page=${page++}`)
			.then(response => {
				if (response.data.length) {
					resolve(response.data)
				} else {
					reject({ code: 404 })
				}
			})
			.catch(e => {
				reject(e)
			})
	})
}
