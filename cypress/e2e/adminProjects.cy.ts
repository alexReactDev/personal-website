//For data origin see @model/mock.sql

describe("Admin projects page", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/admin/projects")
	})
	
	it("Should display and edit/create projects", () => {

		cy.getByTestId("admin-project").should("have.length", 3);

		cy.getByTestId("admin-projects-new").click();
		cy.location("pathname").should("equal", "/admin/projects/new");

		cy.getByTestId("admin-project-name").type("Test project", { force: true }); //Avoid being covered by top navbar (cypress scroll problem)
		cy.getByTestId("admin-project-title").type("Lorem ipsum", { force: true }); //Avoid being covered by top navbar (cypress scroll problem)
		cy.getByTestId("admin-project-date").type("2023", { force: true }); //Avoid being covered by top navbar (cypress scroll problem)
		cy.getByTestId("admin-project-description").type("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat quasi reprehenderit fuga ipsa fugiat soluta fugit corrupti quas iure, eius facilis perspiciatis.");

		cy.getByTestId("select-skills-submit").click({force: true }); //Avoid being covered by top navbar (cypress scroll problem)
		cy.getByTestId("select-skills-select").select("javascript", { force: true }); //Avoid being covered by top navbar (cypress scroll problem)
		cy.getByTestId("select-skills-submit").click({force: true }); //Avoid being covered by top navbar (cypress scroll problem)

		cy.getByTestId("admin-project-submit").click();

		cy.visit("http://localhost:3000/admin/projects");

		cy.getByTestId("admin-project").should("have.length", 4);
		cy.getByTestId("admin-project").its(3).within(() => {
			cy.get("h4").click();
		});
		
		cy.getByTestId("admin-project-name").should("have.value", "Test project");
		cy.getByTestId("admin-project-title").should("have.value", "Lorem ipsum");
		cy.getByTestId("admin-project-date").should("have.value", "2023");
		cy.getByTestIdStart("select-skills-selected-skill").should("have.length", 1);
		cy.getByTestIdStart("select-skills-selected-skill").contains(/javascript/i);

		cy.getByTestId("admin-project-delete").click();

		cy.visit("http://localhost:3000/admin/projects");
		cy.getByTestId("admin-project").should("have.length", 3);
	}) 
})