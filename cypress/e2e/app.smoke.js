describe(`Smoke test`, function () {
  beforeEach(() => {
    cy.server().route('**/bar').as('getBar')
  })

  it('has visible header, nav, and main section', () => {
    cy.visit('/bar')
    cy.get('main').within(() => {
      cy.wait('@getBar')
        .its('response.body')
        .then(body =>
          body.bar.forEach(item =>
            cy.get('p').should('contain', item)
          )
        )
    })
  })
})
