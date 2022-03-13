import { render } from '@testing-library/react';
import React from 'react';
import { MyAreaChart } from '../area-chart';

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

test('Area chart matches snapshot', async () => {
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
        { name: '2022-03-01', value: 62 },
        { name: '2022-02-01', value: 77 },
    ];

    const view = render(
        <MyAreaChart
            xAxisKey="name"
            dataKey1="value"
            dataName1="Efektivita"
            title="Vývoj efektivity"
            data={testData}
        />,
    );

    // eslint-disable-next-line testing-library/no-node-access,testing-library/no-container
    const areaChart = view.container.querySelector('#area-chart');

    expect(areaChart).toMatchSnapshot();
});
