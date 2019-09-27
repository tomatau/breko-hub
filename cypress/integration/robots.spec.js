
describe(`Robots.txt`, function () {
  it('has a robots.txt with allow all', () => {
    cy.request('/robots.txt')
      .its('body')
      .should('equal', 'User-agent: *\nAllow: /\n')
  })
})
