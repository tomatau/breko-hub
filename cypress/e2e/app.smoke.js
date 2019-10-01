describe(`Smoke test`, function () {
  beforeEach(() => {
    cy.server().route('**/bar').as('getBar')
  })

  it('connects to the environment endpoint and displays the result', () => {
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
