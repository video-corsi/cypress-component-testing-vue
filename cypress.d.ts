import { mount } from "cypress/vue";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Work around for TS bug on cypress
       * this solve as any, that's why can build and run without errors
       * 
       * should be removed on release of this ==> 
       * https://github.com/vuejs/test-utils/issues/2054
       * 
       * @issue {vue test utils}
       * diff => https://github.com/cypress-io/cypress/pull/25538/files
       * 
       */
      mount: Mount<typeof mount>;
      /**
       * Custom command to select DOM element by `data-cy` attribute.
       * @param value The `data-cy` value
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
      /**
       * Custom command to access the Vue Test Utils wrapper in component testing.
       */
      vueWrapper(): Chainable<Cypress.Cypress["vueWrapper"]>;
    }
  }
}