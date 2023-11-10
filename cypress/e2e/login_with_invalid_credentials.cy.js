describe("User login with invalid e-mail", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  })

  it("attempts to log in user with invalid e-mail", () => {
    // Visit the website
    cy.visit("https://mellifluous-daffodil-f7f1ad.netlify.app");
    cy.wait(2000);

    cy.intercept(`${Cypress.env("apiLoginUrl")}`).as("authLogin");

    // Click the "login" button
    cy.get("#registerModal .modal-footer button:nth-child(2)").click();
    cy.wait(1000);

    // Fill in invalidlogin credentials and submit
    cy.get("#loginEmail").type(`user123@bi.no`, {
      delay: 100,
    });
    cy.get("#loginPassword").type(
      `password` + "{enter}",
      {
        delay: 100,
      },
    );
    // The user is told to type in valid e-mail (noroff or stud.noroff) and cannot login.
    cy.wait(2000);
  });
});