describe('Search Test', () => {
  it('Searches for Belarus and checks the capital', () => {
    cy.visit('/')
    cy.contains('Global Explorer')

    cy.get('input[tuiTextfield]').type('Belarus')
    cy.get('div[class*="grid"]').should('contain', 'Belarus')

    cy.get('div[class*="grid"] div:contains("Belarus")').click()

    cy.url().should('include', '/country/BLR')
    cy.contains('Minsk')
  })
})

describe('Navigation Test', () => {
  it('Clicks on the map and checks navigation to Belarus', () => {
    cy.visit('/')
    cy.contains('Global Explorer')
    
    cy.get('div > a').click()
    cy.url().should('include', '/map')
    cy.window().should('have.property', 'mapPolygonSeries')
    .then((series: any) => {
        const dataItem = series.dataItems.find((di: any) => 
          di.get("id") === "BY" || di.dataContext.id === "BY"
        );
        if (dataItem) {
          const polygon = dataItem.get("mapPolygon");
          
          polygon.events.dispatch("click", {
            type: "click",
            target: polygon,
            originalEvent: new MouseEvent('click')
          })
        } 
      })
    cy.url().should('include', '/country/BY')
    cy.contains('Minsk')
  })
})