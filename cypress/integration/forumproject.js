describe('Forumproject', () => {
    it('should load successfuly', () => {
        cy.visit('');
    });

    it('should have a navbar', () => {
        cy.contains('Forum');
        cy.contains('New post');
        cy.contains('User');
        cy.get('#userMenu').should('exist');
    });
});

describe('"New post"', () => {
    it('should route to "/create"', () => {
        cy.contains('New post').click();
        cy.url().should('include', '/create');
    });

    it('should have a "Post" button', () => {
        cy.contains('Post');
    });

    it('should have a File input hidden', () => {
        cy.get('#fileInput').should('be', 'hidden');
    });
});

describe('"Forum"', () => {
    it('should route to root', () => {
        cy.contains('Forum').click();
        cy.url().should('be', '/');
    });
});

describe('User menu', () => {
    it('should have a "My profile" button', () => {
        cy.get('#userMenu').click();
        cy.contains('My profile');
    });
});

describe('My profile', () => {
    it('should route to the profile page', () => {
        cy.contains('My profile').click();
        cy.url().should('include', '/users/profile');
    });
});