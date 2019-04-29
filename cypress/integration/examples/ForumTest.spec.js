
describe('First test', () => {
  it('Navigate the site', () => {
   cy.visit('http://localhost:4200/');
  });

  it('mat card subtitle should contains p which is the postDate', ()=> {
    cy.get('mat-card-subtitle').should('contain','p');
  });
  it('mat card content should contains image which is the posted image', ()=> {
      cy.get("img");
  });

});
