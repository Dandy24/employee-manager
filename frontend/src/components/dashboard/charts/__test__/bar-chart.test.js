import { render } from '@testing-library/react';
import React from 'react';
import { MyBarChart } from '../bar-chart';

jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts');

    return {
        ...OriginalModule,
        ResponsiveContainer: ({ height, children }) => (
            <OriginalModule.ResponsiveContainer width={800} height={500}>
                {children}
            </OriginalModule.ResponsiveContainer>
        ),
    };
});

test('Bar chart matches snapshot', async () => {
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

    const testData = [
        { id: 1, name: 'Test', sick: 2, work: 160, vac: 6 },
        { id: 2, name: 'Test2', sick: 10, work: 150, vac: 16 },
    ];

    const view = render(
        <MyBarChart
            title="Nejlepší měsíce podle výkonu"
            data={testData}
            dataKey1="work"
            dataName1="V práci"
            dataKey2="vac"
            dataName2="Volno"
            xAxisKey="name"
        />,
    );

    // eslint-disable-next-line testing-library/no-node-access,testing-library/no-container
    const barChart = view.container.querySelector('#bar-chart');

    expect(barChart).toMatchSnapshot();
});
