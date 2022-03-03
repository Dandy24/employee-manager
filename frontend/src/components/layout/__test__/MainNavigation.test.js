import { render, screen } from '@testing-library/react';
import React from 'react';
import { MainNavigation } from '../MainNavigation';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { RootStore } from '../../../stores/root-store';
import { RootStoreProvider } from '../../../stores/root-store-provider';
import { act } from '@testing-library/react';

test('Menu snapshot matches the previous one', async () => {
    render(
        <BrowserRouter>
            <MainNavigation />
        </BrowserRouter>,
    );

    const mainMenu = await screen.findByTestId('main-header');

    expect(mainMenu).toMatchSnapshot();
});

test('Menu displays on page correctly', async () => {
    render(
        <BrowserRouter>
            <MainNavigation />
        </BrowserRouter>,
    );

    const mainMenuEl = await screen.findByTestId('main-header');

    expect(mainMenuEl).toBeInTheDocument();
});

test('Menu items display correctly in menu', async () => {
    render(
        <RootStoreProvider rootStore={new RootStore()}>
            <BrowserRouter>
                <MainNavigation />
            </BrowserRouter>
        </RootStoreProvider>,
    );

    const CompanyListEl = await screen.findByTestId('menu-company-list-item');

    expect(CompanyListEl.textContent).toBe('Seznam firem');
});

test('Menu items link correctly redirects to right page', async () => {
    // Defining missing window.matchMedia() property from JSDOM, to prevent Jest from crashing
    // https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom

    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    render(
        <BrowserRouter>
            <MainNavigation />
        </BrowserRouter>,
    );

    const employeeLinkEl = await screen.findByTestId('menu-employee-list-item-link');

    await act(async () => {
        userEvent.click(employeeLinkEl);
    });

    /** Vyzaduje vyrenderovani cele aplikace + zpusobuje error se storem **/
    // expect(await screen.findByText('ID zaměstnance')).toBeInTheDocument();
    expect(location.pathname).toEqual('/employee-list');
});
