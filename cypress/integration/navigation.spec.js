
describe(`Navigation`, function () {
  it(`sets body as activeElement after navigation`, () => {
    cy.visit('/')
    cy.get('a[href="/bar"]').click()
    cy.document().then(doc => {
      expect(
        doc.activeElement.tagName,
        'the current document.activeElement'
      ).to.eql(doc.body.tagName)
    })
  })
})
