describe(`Bar page`, function () {
  beforeEach(() => {
    cy.server()
      .route({
        method: 'GET',
        url: '/api/bar',
        status: 200,
        response: { bar: [ 'a', 'b', 'c', 'd' ] },
      })
      .as('bar')
  })

  it(`sets body as activeElement after navigating to bar`, () => {
    cy.visit('/')
    cy.get('a[href="/bar"]').click()
    cy.document().its('activeElement').should('match', 'body')
  })

  it(`passes aXe check`, () => {
    cy.visit('/bar')
    cy.wait('@bar')
    cy.injectAxe()
    cy.checkA11y()
  })

  it('has visible header, nav, and main section', () => {
    cy.visit('/bar')
    cy.get('nav').should('be.visible')
    cy.get('header').should('be.visible')
    cy.get('section.BarRoute').should('be.visible')
  })
})
