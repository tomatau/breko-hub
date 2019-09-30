describe(`Bar page`, function () {
  beforeEach(() => {
    cy.server()
      .route({
        method: 'GET',
        url: '/api/bar',
        status: 200,
        response: [ 'a', 'b', 'c', 'd' ],
      })
  })

  it(`sets body as activeElement after navigating to bar`, () => {
    cy.visit('/')
    cy.get('a[href="/bar"]').click()
    cy.document().its('activeElement').should('match', 'body')
  })

  it('has visible header, nav, and main section', () => {
    cy.visit('/bar')
    cy.get('nav').should('be.visible')
    cy.get('header').should('be.visible')
    cy.get('section.BarRoute').should('be.visible')
  })
})
