context('Settings', () => {
  beforeEach(() => {
    cy.$login()
    cy.$clickSidebarItem('Settings')
    cy.intercept('PUT', '/api/settings', {}).as('save')
  })

  it('rescans media', () => {
    cy.get('#settingsWrapper').within(() => {
      cy.get('.screen-header')
        .should('be.visible')
        .and('contain.text', 'Settings')

      cy.get('[name=media_path]').should('have.value', '/media/sparkle/')
      cy.get('[type=submit]').click()
    })

    cy.wait('@save')
  })

  it('confirms before rescanning if media path is changed', () => {
    cy.get('#settingsWrapper').within(() => {
      cy.get('[name=media_path]')
        .should('have.value', '/media/sparkle/')
        .clear()
        .type('/var/media/sparkle')

      cy.get('[type=submit]').click()
    })

    cy.$confirm()
    cy.wait('@save')
  })
})
