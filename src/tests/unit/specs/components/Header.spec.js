import { mount } from "avoriaz"
import { expect } from "chai"
import AppHeader from "Components/AppHeader.vue"

describe("AppHeader", () => {
	it("renders a header", () => {
		const header = mount(AppHeader)
		expect(header.is("header")).to.equal(true)
		expect(header.hasClass("AppHeader")).to.equal(true)
	})
})
