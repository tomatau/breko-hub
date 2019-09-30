describe(`Home page`, function () {
  it(`loads with an active body element`, () => {
    cy.visit('/')
    cy.document().its('activeElement').should('match', 'body')
  })

  it(`passes aXe check`, () => {
    cy.visit('/')
    cy.injectAxe()
    cy.checkA11y()
  })

  it('has visible header, nav, and main section', () => {
    cy.visit('/')
    cy.get('nav').should('be.visible')
    cy.get('header').should('be.visible')
    cy.get('section.HomeRoute').should('be.visible')
  })
})
