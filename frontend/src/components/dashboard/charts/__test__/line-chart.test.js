import { render } from '@testing-library/react';
import React from 'react';
import { MyLineChart } from '../line-chart';

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

test('Line chart matches snapshot', async () => {
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
        { name: '2022-03-01', work: 1789, vac: 46 },
        { name: '2022-02-01', work: 1556, vac: 132 },
    ];

    const view = render(
        <MyLineChart
            title="Vývoj pracovního nasazení"
            data={testData}
            dataKey1="work"
            dataKey2="vac"
            dataName1="V práci"
            dataName2="Dovolená"
            xAxisKey="name"
        />,
    );

    // eslint-disable-next-line testing-library/no-node-access,testing-library/no-container
    const lineChart = view.container.querySelector('#line-chart');

    expect(lineChart).toMatchSnapshot();
});
