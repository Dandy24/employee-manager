import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MainNavigation } from '../../../layout/MainNavigation';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

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
    const { getByTestId } = render(
        <MemoryRouter>
            <MainNavigation />
        </MemoryRouter>,
    );

    const EmployeeLinkEl = getByTestId('menu-employee-list-item-link');

    fireEvent.click(EmployeeLinkEl, { button: 0 });

    //expect(screen.getByText('kok')).toBeInTheDocument();

    expect(location.pathname).toBe('/employee-list');
});
