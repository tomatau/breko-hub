
describe(`User story: Application name and purpose`, function () {
  it('has h1 with title', () => {
    cy.visit('/')
    cy.get('header h1')
      .should('contain', 'Breko Hub')
  })
})
