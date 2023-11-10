describe("User login with correct e-mail but invalid password", () => {
    beforeEach(() => {
      cy.clearLocalStorage();
    })
  
    it("attempts to log in user with valid e-mail and invalid password", () => {
      // Visit the website
      cy.visit("https://mellifluous-daffodil-f7f1ad.netlify.app");
      cy.wait(2000);
  
      cy.intercept(`${Cypress.env("apiLoginUrl")}`).as("authLogin");
  
      // Click the "login" button
      cy.get("#registerModal .modal-footer button:nth-child(2)").click();
      cy.wait(1000);
  
      // Fill in existing user and invalid password and submit
      cy.get("#loginEmail").type(`eskil.torset1999@stud.noroff.no`, {
        delay: 100,
      });
      cy.get("#loginPassword").type(
        `password` + "{enter}",
        {
          delay: 100,
        },
      );
      // The user is told by an alert that username or password is incorrect and cannot login.
      cy.wait(2000);
    });
  });