import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.locale(en)

export function host (url) {
	const host = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "")
	const parts = host.split(".").slice(-3)
	if (parts[0] === "www") parts.shift()
	return parts.join(".")
}

export function timeAgo (timestamp) {
  const timeAgo = new TimeAgo('en-US')
  var formedString = timeAgo.format(timestamp)
  return formedString
}

function pluralize (time, label) {
	if (time === 1) {
		return time + label
	}
	return time + label + "s"
}
