
describe('ForumPost list page tests', () => {
  it('Navigate the main page', () => {
   cy.visit('http://localhost:4200/');
  });
  it('mat card subtitle should contains p which is the postDate', ()=> {
    cy.get('mat-card-subtitle').should('contain','p');
  });
  it('mat card content should contains image which is the posted image', ()=> {
      cy.get("img");
  });
  it('it should click on matemenu to get a little menu with edit and delete options', ()=> {
    cy.get('#moreMenuBtn').click();
  });
  it('it should find the new post button and visit the page', ()=>{
    cy.get('#createForumPostBtn').click({force:true});
  });
  it('it should find the profile button and visit the page', ()=>{
    cy.get('#userMenu').click();
    cy.get('#profileBtn').click({force:true});
  });
});

describe('ForumPost page test with post new text based post and delete it', () => {
  it('Navigate the create page ', () => {
    cy.visit('http://localhost:4200/create');
    cy.get('#mat-tab-label-0-1').click();
    cy.get('#mat-tab-label-0-0').click();
  });
  it('get the input text from the input title field of a new text based post', ()=> {
    cy.get('input[formControlName="title"]').type('Test title');
    cy.get('input[formControlName="title"]')
    .invoke('val')
    .then(sometext => cy.log(sometext));
  });
  it('get the input text from the input description field of a new text based post', ()=> {
    cy.get('textarea[formControlName="description"]').type('this is a cypress test');
    cy.get('textarea[formControlName="description"]')
      .invoke('text')
      .then(sometext => cy.log(sometext));
  });
  it('Should find the post button and click it', ()=>{
    cy.get('#postBtn').click({force:true});
  });
  it('it should find the delete button and delete the first one', ()=>{
    cy.get('mat-card').first();
    cy.get('#moreMenuBtn').click();
    cy.get('#deletePost').click({force:true});
  });
});
