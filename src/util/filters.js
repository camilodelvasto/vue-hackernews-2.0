import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"

TimeAgo.locale(en)

export function host (url) {
	const host = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "")
	const parts = host.split(".").slice(-3)
	if (parts[0] === "www") parts.shift()
	return parts.join(".")
}

export function timeAgo (timestamp) {
  const timeAgo = new TimeAgo("en-US")
  var formedString = timeAgo.format(timestamp)
  return formedString
}

export function formattedDate (timestamp) {
  var date = new Date(timestamp)
  var options = { year: "numeric", month: "long", day: "numeric" }
  return date.toLocaleString("en-US", options)
}

export function usd (amount) {
	if (!isNaN(amount)) {
		var newValue = amount.toLocaleString("en-US")
		return `$${newValue}`
	}
}

export function people (number) {
	if (!isNaN(number)) {
		if (number === 1) {
			return `${number} person`
		}
		return `${number} people`
	}
}
