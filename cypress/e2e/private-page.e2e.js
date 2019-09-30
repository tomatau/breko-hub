describe(`Private page`, function () {
  it(`redirects to / and focuses the flash message close button`, () => {
    cy.visit('/private')

    cy.url().should('match', /\/$/)
      .and('not.contain', 'private')

    cy.document().its('activeElement')
      .should('match', 'button.Msg__close')
  })

  it('has visible header, nav, and main section', () => {
    cy.visit('/')

    cy.get('nav').should('be.visible')
    cy.get('header').should('be.visible')
    cy.get('section.HomeRoute').should('be.visible')
  })
})
