describe("User logout from their user", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  })

  it("logs in user and accesses profile", () => {
    // Visit the website
    cy.visit("https://mellifluous-daffodil-f7f1ad.netlify.app");
    cy.wait(2000);

    cy.intercept(`${Cypress.env("apiLoginUrl")}`).as("authLogin");

    // Click the "login" button
    cy.get("#registerModal .modal-footer button:nth-child(2)").click();
    cy.wait(1000);

    // Fill in valid login credentials and submit
    cy.get("#loginEmail").type(`eskil.torset1999@stud.noroff.no`, {
      delay: 100,
    });
    cy.get("#loginPassword").type(
      `123Spill` + "{enter}",
      {
        delay: 100,
      },
    );
    cy.wait(2000);

    // Click the "logout" button
    cy.get("button[data-auth='logout']").click();
    cy.wait(1000);

    // Check if token is removed from local storage
    cy.window().its("localStorage.token").should("not.exist");
  });
});