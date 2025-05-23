/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-test attribute.
     * @example cy.getByTestId('greeting')
     */
    getByTestId(value: string): Chainable<Element>
  }
} 