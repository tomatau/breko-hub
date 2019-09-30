import 'cypress-axe'
import './commands'

Cypress.on(`window:before:load`, win => {
  delete win.fetch
})
