/// <reference types="cypress" />

describe('constuctor page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });

    it('show ingredient detail', () => {
        cy.contains('Конструктор');
        cy.contains('Соберите бургер');
        cy.get('[class^=cy_test_card_ingredient]').first().click();
        cy.get('[class^=modal_dialog]').contains('Детали ингредиента');
        cy.get('[class^=modal_close]').click();
        cy.get('[class^=modal_dialog]').should('not.exist');
    });

    it('create order', () => {
        cy.get('[class^=cy_test_ingredients_category]').as('list');
        cy.get('@list').eq(0).find('[class^=cy_test_card_ingredient]').first().as('bun');
        cy.get('@list').eq(1).find('[class^=cy_test_card_ingredient]').first().as('ingredient');
        cy.get('[class^=cy_constructor_test').first().as('dest');
        cy.get('@dest').children().first().as('bun-dest')
        cy.get('@bun-dest').next().as('ingredient-dest');
        cy.contains('Оформить заказ').as('order-button')
        // cy.get('[class^=burger-constructor-order_total] button').as('order-button');

        cy.contains('Добавьте булку');
        cy.contains('Добавьте ингридиенты');

        cy.get('@bun').trigger('dragstart');
        cy.get('@bun-dest').trigger('drop');
        cy.get('@ingredient').trigger('dragstart');
        cy.get('@ingredient-dest').trigger('drop');
        cy.get('@order-button').click();

        cy.contains('Вход');
        cy.get('[name=email]').type("test1997@test.ru");
        cy.get('[name=password]').type("test12345");
        cy.contains('button', 'Войти').click();

        cy.get('@order-button', { timeout: 20000 }).trigger('click');
        cy.get('[class^=cy_order_number]', { timeout: 40000 }).contains(/\d+/);
        cy.get('[class^=modal_close]').click();

        cy.contains('Добавьте булку');
        cy.contains('Добавьте ингридиенты');
    });
})