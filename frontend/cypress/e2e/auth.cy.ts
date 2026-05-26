describe("Auth flow", () => {
  const testEmail = `test${Date.now()}@gmail.com`;
  const password = "Password123";

  it("can register and login", () => {
    cy.intercept("POST", "**/register-user").as("registerUser");
    cy.intercept("POST", "**/login-user").as("loginUser");

    cy.visit("http://localhost:3000/register");

    cy.get('input[name="name"]').type("Test");
    cy.get('input[name="last_name"]').type("User");
    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);

    cy.get('button[type="submit"]').click();

    cy.wait("@registerUser", { timeout: 15000 })
      .its("response.statusCode")
      .should("eq", 201);

    cy.visit("http://localhost:3000/login");

    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="password"]').type(password);

    cy.get('button[type="submit"]').click();

    cy.wait("@loginUser", { timeout: 15000 })
      .its("response.statusCode")
      .should("eq", 200);

    cy.url({ timeout: 10000 }).should("include", "/profile");
  });
});