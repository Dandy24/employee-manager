import { render } from '@testing-library/react';
import React from 'react';
import { MyLineChart } from '../line-chart';
import { MyPieChart } from '../pie-chart';

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

const COLORS = ['rgb(136, 132, 216)', '#FFBB28', '#FF8042', 'rgb(130, 202, 157)'];

test('Pie chart matches snapshot', async () => {
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
        { name: 'Hours worked', value: 1710 },
        { name: 'Hours vacation', value: 116 },
        { name: 'Hours sick', value: 48 },
        { name: 'Hours overtime', value: 52 },
    ];

    const view = render(
        <MyPieChart title="Rozložení hodin" data={testData} dataKey="value" dataName="name" colors={COLORS} />,
    );

    // eslint-disable-next-line testing-library/no-node-access,testing-library/no-container
    const pieChart = view.container.querySelector('#pie-chart');

    expect(pieChart).toMatchSnapshot();
});
