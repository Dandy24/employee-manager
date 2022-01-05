const purple = 'rgb(136, 132, 216)';
const green = 'rgb(130, 202, 157)';

describe('rendering graphs and other statictics in dashboard', () => {
    const allChartsVisible = () => {
        cy.waitUntil(() => {
            cy.get('#line-chart').should('be.visible');
            cy.get('#pie-chart').should('be.visible');
        });
    };

    beforeEach(() => {
        cy.visit('/');
        // allChartsVisible();
    });

    it('Line chart is rendered correctly and matches and image snapshot', () => {
        cy.waitUntil(() => cy.get('#line-chart').should('be.visible'))
            .and((chart) => {
                // we can assert anything about the chart really
                expect(chart.height()).to.be.greaterThan(200);
            })
            .find('.recharts-line')
            .should('have.length', 2);

        cy.get('#line-chart-work-line').should('have.css', 'stroke', purple);
        cy.get('#line-chart-vac-line').should('have.css', 'stroke', green);

        cy.get('#line-chart')
            .find('.recharts-legend-wrapper')
            .should('be.visible')
            .and((legend) => {
                expect(legend).to.contain.text('Hours worked').and.to.contain.text('Hours out');
            });

        // FIXME wait for lines to be aligned properly
        cy.get('#line-chart').toMatchImageSnapshot();
        // cy.get('#line-chart').toMatchSnapshot();
    });

    // TODO check if legend overlaps with graph (graph start y pos + height >= legend y pos)
    it('Pie chart is rendered correctly and matches and image snapshot', () => {
        const tooltipNotVisible = () =>
            cy.get('#pie-chart').find('.recharts-tooltip-wrapper').should('have.css', 'visibility', 'hidden');

        const tooltipVisible = () =>
            cy.get('#pie-chart').find('.recharts-tooltip-wrapper').should('have.css', 'visibility', 'visible');

        cy.waitUntil(() => cy.get('#pie-chart').should('be.visible'))
            .and((chart) => {
                // we can assert anything about the chart really
                expect(chart.height()).to.be.greaterThan(200);
            })
            .find('.recharts-pie-sector')
            .should('have.length', 3);

        tooltipNotVisible();

        cy.get('#pie-chart-example-company-sector').trigger('mouseover', { force: true });

        tooltipVisible();

        // FIXME doesnt dissapear if mouseleave moves to tooltip area (which is logical)
        cy.get('#pie-chart-example-company-sector').trigger('mouseout', { force: true });

        tooltipNotVisible();

        // cy.get('#line-chart')
        //     .find('.recharts-legend-wrapper')
        //     .should('be.visible')
        //     .and((legend) => {
        //         expect(legend).to.contain.text('Hours worked').and.to.contain.text('Hours out');
        //     });
        //
        cy.get('#pie-chart').toMatchImageSnapshot();
        // cy.get('#pie-chart').toMatchSnapshot();
    });
});
