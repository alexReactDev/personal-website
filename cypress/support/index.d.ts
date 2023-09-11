declare namespace Cypress {
	interface Chainable {
		getByTestId(testId: string): Chainable<JQuery<HTMLElement>>
	}

	interface Chainable {
		getByTestIdStart(testIdStartPattern: string): Chainable<JQuery<HTMLElement>>
	}

	interface Chainable {
		getByTestIdPart(testIdStartPattern: string): Chainable<JQuery<HTMLElement>>
	}
}