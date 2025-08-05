/// <reference types="cypress" />

describe('constuctor page', () => {
    beforeEach(() => {
        // baseUrl внутри cypress.config.ts
        cy.visit('/');
    });

    const ingredient_card_selector = '[class^=cy_test_card_ingredient]'
    const modal_dialog_selector = '[class^=modal_dialog]'
    const modal_close_selector = '[class^=modal_close]'
    const email = "test1997@test.ru"
    const password = "test12345"
    const name_zone_add_bun = 'Добавьте булку'
    const name_zone_add_ingredient = 'Добавьте ингридиенты'

    it('show ingredient detail', () => {
        cy.contains('Конструктор');
        cy.contains('Соберите бургер');
        cy.get(ingredient_card_selector).first().click();
        cy.get(modal_dialog_selector).contains('Детали ингредиента');
        cy.get(modal_close_selector).click();
        cy.get(modal_dialog_selector).should('not.exist');
    });

    it('create order', () => {
        cy.get('[class^=cy_test_ingredients_category]').as('list');
        cy.get('@list').eq(0).find(ingredient_card_selector).first().as('bun');
        cy.get('@list').eq(1).find(ingredient_card_selector).first().as('ingredient');
        cy.get('[class^=cy_constructor_test').first().as('dest');
        cy.get('@dest').children().first().as('bun-dest')
        cy.get('@bun-dest').next().as('ingredient-dest');
        cy.contains('Оформить заказ').as('order-button')

        cy.contains(name_zone_add_bun);
        cy.contains(name_zone_add_ingredient);

        cy.get('@bun').trigger('dragstart');
        cy.get('@bun-dest').trigger('drop');
        cy.get('@ingredient').trigger('dragstart');
        cy.get('@ingredient-dest').trigger('drop');
        cy.get('@order-button').click();

        cy.contains('Вход');
        cy.get('[name=email]').type(email);
        cy.get('[name=password]').type(password);
        cy.contains('button', 'Войти').click();

        cy.get('@order-button', { timeout: 20000 }).trigger('click');
        cy.get('[class^=cy_order_number]', { timeout: 40000 }).contains(/\d+/);
        cy.get(modal_close_selector).click();

        cy.contains(name_zone_add_bun);
        cy.contains(name_zone_add_ingredient);
    });
})