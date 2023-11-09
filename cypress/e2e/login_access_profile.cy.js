describe("User login and profile access", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  })

  it("logs in user and accesses profile", () => {
    // Visit the website
    cy.visit("http://127.0.0.1:5500/");
    cy.wait(2000);

    cy.intercept(`${Cypress.env("apiLoginUrl")}`).as("authLogin");

    // Click the "login" button
    cy.get("#registerModal .modal-footer button:nth-child(2)").click();
    cy.wait(1000);

    // Fill in login credentials and submit
    cy.get("#loginEmail").type(`eskil.torset1999@stud.noroff.no`, {
      delay: 100,
    });
    cy.get("#loginPassword").type(
      `123Spill` + "{enter}",
      {
        delay: 100,
      },
    );
    // The user is logged in and their user is accessed
    cy.wait(1000);

    // Check if token exists
    cy.window().its("localStorage.token").should("exist");
  });
});