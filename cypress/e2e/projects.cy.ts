//For data origin see @model/mock.js

describe("Skills page", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/projects");
	})

	it("Should render projects and skills", () => {
		cy.getByTestIdStart("project").should("have.length", 3);
		cy.getByTestIdStart("item").should("have.length", 4);
		
		cy.getByTestId("item-javascript").click();
		cy.getByTestIdStart("project").should("have.length", 1);
		cy.getByTestId("project-1").should("be.visible");
		cy.getByTestId("project-3").should("not.exist");
		
		cy.getByTestId("item-javascript").click();
		cy.getByTestIdStart("project").should("have.length", 3);
		cy.getByTestId("project-1").should("be.visible");
	})

	it("Should render project", () => {
		cy.getByTestId("project-1").within(() => {
			cy.get("h4").click();
		});

		cy.location("pathname").should("equal", "/projects/1");

		cy.get(".title").contains(/nice page/i);

		cy.getByTestId("project-skill").should("have.length", 1);
		cy.getByTestId("project-skill").contains("javascript");

		cy.getByTestIdStart("project-preview-picture").should("have.length", 4);

		cy.getByTestIdPart("test.jpg").should("be.visible");
		cy.getByTestIdPart("test2.jpg").click();
		cy.getByTestId("portal-trigger").within(() => {
			cy.getByTestIdPart("test2.jpg").should("be.visible");
			cy.getByTestIdPart("test.jpg").should("not.exist");
		})

		cy.getByTestId("portal-trigger").click();
		cy.getByTestId("portal-image-full").should("be.visible");
		cy.getByTestId("portal-close").click();
		cy.getByTestId("portal-image-full").should("not.exist");
	})
})