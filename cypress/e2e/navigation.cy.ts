describe('template spec', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })

  it('passes', () => {
    cy.getByTestId("nav-link-skills").click();
    cy.location("pathname").should("equal", "/skills");
    cy.get(".title").contains(/skills/i);
    
    
    cy.getByTestId("nav-link-projects").click();
    cy.location("pathname").should("equal", "/projects");
    cy.get(".title").contains(/projects/i);
    

    cy.getByTestId("nav-link-about").click();
    cy.location("pathname").should("equal", "/about");
    cy.get(".title").contains(/about/i);
    
    cy.getByTestId("nav-link-contacts").click();
    cy.location("pathname").should("equal", "/contacts");
    cy.get(".title").contains(/contacts/i);
    
    cy.getByTestId("nav-link-home").click();
    cy.location("pathname").should("equal", "/");
    cy.getByTestId("main-title").contains(/hi. my name is alexander/i);
  })
})