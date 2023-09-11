describe("Skills page", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/skills");

		cy.intercept("GET", "/api/scopes", [
			"frontend",
			"backend",
			"other"
		])
		cy.intercept("GET", "/api/skills?with-scopes=true", [
			{
				"name": "Javascript ES6+",
				"scopes": [
					"frontend"
				]
			},
			{
				"name": "node.js",
				"scopes": [
					"backend"
				]
			},
			{
				"name": "docker",
				"scopes": [
					"other"
				]
			},])
	})

	it("Should render skills and scopes", () => {
		cy.getByTestIdStart("skill").should("have.length", 3);
		cy.getByTestIdStart("item").should("have.length", 3);
		
		cy.getByTestId("item-frontend").click();
		cy.getByTestIdStart("skill").should("have.length", 1);
		cy.getByTestIdStart("skill").contains(/javascript/i);
		cy.getByTestId("skill-node.js").should("not.exist");
		
		cy.getByTestId("item-frontend").click();
		cy.getByTestIdStart("skill").should("have.length", 3);
		cy.getByTestId("skill-node.js").should("be.visible");
	})
})