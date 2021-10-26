import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MainNavigation } from '../MainNavigation';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../../../App';
import { RootStore } from '../../../stores/root-store';
import { RootStoreProvider } from '../../../stores/root-store-provider';

test('Menu snapshot matches the previous one', () => {
    const {asFragment} = render(
        <BrowserRouter>
            <MainNavigation />
        </BrowserRouter>,
    )

    expect(asFragment()).toMatchSnapshot();
});

test('Menu displays on page correctly', () => {
    const { getByTestId } = render(
        <BrowserRouter>
            <MainNavigation />
        </BrowserRouter>,
    );

    const mainMenuEl = getByTestId('main-header');

    expect(mainMenuEl).toBeInTheDocument();
});

test('Menu items display correctly in menu', () => {
    const { getByTestId } = render(
        <BrowserRouter>
            <MainNavigation />
        </BrowserRouter>,
    );

    const CompanyListEl = getByTestId('menu-company-list-item');

    expect(CompanyListEl.textContent).toBe('Seznam firem');
});

test('Menu items link correctly redirects to right page', () => {
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

    const { getByTestId } = render(
        <RootStoreProvider rootStore={new RootStore()}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </RootStoreProvider>,
    );

    const employeeLinkEl = getByTestId('menu-employee-list-item-link');

    act(() => {
        userEvent.click(employeeLinkEl);
    });

    expect(screen.getByText('ID zaměstnance')).toBeInTheDocument();
});
