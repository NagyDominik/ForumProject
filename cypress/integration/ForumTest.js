
describe('ForumPost list page tests', () => {
  it('Navigate to the main page', () => {
   cy.visit('http://localhost:4200/');
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
  it('Navigate to the create page ', () => {
    cy.visit('http://localhost:4200/create');
    cy.get('#mat-tab-label-0-1').click();
    cy.get('#mat-tab-label-0-0').click();
  });
  it('get the input text from the input title field of a new text based post', ()=> {
    cy.get('input[formControlName="title"]').type('Test title');
    cy.get('input[formControlName="title"]')
    .invoke('val')
    .then(sometext => cy.log(sometext));
    cy.wait(1000);
  });
  it('get the input text from the input description field of a new text based post', ()=> {
    cy.get('textarea[formControlName="description"]').type('this is a cypress test');
    cy.get('textarea[formControlName="description"]')
      .invoke('text')
      .then(sometext => cy.log(sometext));
    cy.wait(1000);
  });
  it('Should find the post button and click it', ()=>{
    cy.get('#postBtn').click({force:true});
    cy.wait(1000);
  });
});

describe('ForumPost title update through Pop up dialog', () => {
  it('Navigate to the main page ', () => {
    cy.visit('http://localhost:4200/');
  });

  it('it should find the edit button and edit the first one', ()=>{
      cy.get('mat-card').first();
      cy.get('#moreMenuBtn').click();
      cy.get('#editPost').click({force:true});
    cy.wait(1000);
  });
  it('it should click on cancel button to cancel the pop up dialog', ()=> {
    cy.get('#cancelBtn').click({force:true});
    cy.wait(1000);
  });
  it('it should find the edit button and edit the first one', ()=>{
    cy.get('mat-card').first();
    cy.get('#moreMenuBtn').click();
    cy.get('#editPost').click({force:true});
    cy.wait(1000);
  });
  it('get the input text from the input title field for update post title', ()=> {
    cy.get('input[formControlName="newTitle"]').type(' with cypress');
    cy.get('input[formControlName="newTitle"]')
      .invoke('val')
      .then(sometext => cy.log(sometext));
    cy.wait(1000);
  });
  it('it should click on save button to save the new title', ()=> {
    cy.get('#saveBtn').click({force:true});
    cy.wait(1000);
  });
  it('it should find the delete button and delete the first one', ()=>{
    cy.get('mat-card').first();
    cy.get('#moreMenuBtn').click();
    cy.get('#deletePost').click({force:true});
  });
});
