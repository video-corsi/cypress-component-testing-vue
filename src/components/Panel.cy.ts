/// <reference types="cypress" />

// https://github.com/cypress-io/cypress/issues/26628
// Not able to use Component Testing with Vite/Vue after upgrade to TypeScript 5 #26628 
// import { mount } from 'cypress/vue';

// Bug: Overload ts error when prop and slot exist together #2054 
// https://github.com/vuejs/test-utils/issues/2054
import { mount } from '@vue/test-utils'
import Panel from './Panel.vue';

describe('<Panel />', () => {
  it('renders', () => {
    mount(Panel)
  })
  it("should display title", () => {
    mount(Panel, {
      props: {
        title: 'Hello'
      }
    });
    cy.document().should("contain.text", "Hello");
  });

  it("should display content when the component is mount", () => {
    mount(Panel, {
      props: {
        title: 'Hello',
      },
      slots: {
        default: 'lorem ipsum'
      }
    });
    cy.document().should("contain.text", "lorem ipsum");
  });

  it("should hide children when title bar is clicked", () => {
    mount(Panel, {
      props: {
        title: 'Hello',
        isOpen: false
      },
      slots: {
        default: 'lorem ipsum'
      }
    });

    cy.contains('Hello').click()
    cy.contains('lorem...').should('not.exist')
  });

  it("should toggle children when title bar is clicked twice", () => {
    mount(Panel, {
      props: {
        title: 'Hello',
      },
      slots: {
        default: 'lorem ipsum'
      }
    });

    // click to hide children
    cy.document().contains("Hello").click();
    cy.document().contains("Hello").click();

    cy.document().should("contain.text", "lorem ipsum");
    // or
    cy.contains('lorem ipsum').should('exist')
  });


    it("should display an icon in the title bar", () => {
      mount(Panel, {
        props: {
          title: 'Hello',
          icon: '⭐️'
        },
        slots: {
          default: 'lorem ipsum'
        }
      });

      cy.document().contains("⭐️");
    });


    it("should invoke a function when icon is clicked", () => {
      const onClickSpy = cy.spy().as("onClickSpy"); // alias
      mount(Panel, {
        props: {
          title: 'Hello',
          icon: '⭐️',
          onIconClick: onClickSpy
        },
        slots: {
          default: 'lorem ipsum'
        }
      });

      cy.document().contains("⭐️").click()
      cy.get("@onClickSpy").should("have.been.calledOnce");
    });


    it('should not toggle the title bar when the icon is clicked', () => {

      mount(Panel, {
        props: {
          title: 'Hello',
          icon: '⭐️',
        },
        slots: {
          default: 'lorem ipsum'
        }
      });

      cy.document().contains("⭐️").click()
      cy.contains('lorem ipsum').should('be.visible')
    })

    it('should hide content if the open property is set to false', () => {
      mount(Panel, {
        props: {
          title: 'Hello',
          isOpen: false
        },
        slots: {
          default: 'lorem ipsum'
        }
      });

      cy.contains('lorem ipsum').should('not.exist')
    })


    it('should show content if the open property is set to true', () => {
      mount(Panel, {
        props: {
          title: 'Hello',
          isOpen: true
        },
        slots: {
          default: 'lorem ipsum'
        }
      });

      cy.contains('lorem ipsum').should('exist')
    })
})

