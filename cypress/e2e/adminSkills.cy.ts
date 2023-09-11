//For data origin see @model/mock.sql

describe("Admin skills", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/admin/skills");
	})

	it("Should add and delete skills and scopes", () => {
		cy.getByTestIdStart("admin-skill").should("have.length", 4);
		cy.getByTestId("admin-skill-javascript").should("be.visible");
		cy.getByTestId("admin-skill-javascript").within(() => {
			cy.getByTestId("cross").click({ force: true }); //Omitting necessary hover
		})
		cy.getByTestId("admin-skill-javascript").should("not.exist");
		
		cy.getByTestId("skill-text-input").type("javascript");
		cy.getByTestId("skill-submit").click();
		cy.getByTestId("admin-skill-javascript").should("be.visible");


		cy.getByTestIdStart("delete-item").should("have.length", 3);

		cy.getByTestId("delete-item-frontend").should("be.visible");
		cy.getByTestId("delete-item-frontend").within(() => {
			cy.getByTestId("cross").click({ force: true }); //Omitting necessary hover
		})
		cy.getByTestId("delete-item-frontend").should("not.exist");

		cy.getByTestId("scope-submit").click(); //Disable scope input
		cy.getByTestId("scope-input").type("frontend");
		cy.getByTestId("scope-submit").click();
		cy.getByTestId("delete-item-frontend").should("be.visible");
	})
})