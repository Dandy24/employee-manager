const purple = 'rgb(136, 132, 216)';
const green = 'rgb(130, 202, 157)';

describe('rendering graphs and other statictics in dashboard', () => {
    const tooltipNotVisible = (chart) =>
        chart.find('.recharts-tooltip-wrapper').should('have.css', 'visibility', 'hidden');

    const tooltipVisible = (chart) =>
        chart.find('.recharts-tooltip-wrapper').should('have.css', 'visibility', 'visible');

    const lineChart = () => cy.get('#line-chart');
    const pieChart = () => cy.get('#pie-chart');
    const areaChart = () => cy.get('#area-chart');
    const barChart = () => cy.get('#bar-chart');

    const checkBarTooltipValues = (
        barName,
        chartIndex,
        shouldHaveProp,
        shouldHaveVal,
        shouldNotHaveProp,
        shouldNotHaveVal,
    ) => {
        barChart().find(`[role="bar-chart-${barName}-bar"]`).eq(chartIndex).trigger('mouseover', { force: true });

        barChart()
            .find('.recharts-tooltip-wrapper')
            .should(shouldHaveProp, shouldHaveVal)
            .and(shouldNotHaveProp, shouldNotHaveVal);
    };

    beforeEach(() => {
        cy.visit('/');
    });

    it('Line chart is rendered correctly and matches and image snapshot', () => {
        cy.waitUntil(() => lineChart().should('be.visible'))
            .and((chart) => {
                expect(chart.height()).to.be.greaterThan(200);
            })
            .find('.recharts-line')
            .should('have.length', 2);

        cy.waitUntil(() => lineChart().should('contain.text', 'prosinec 21'));

        cy.get('#line-chart-work-line').should('have.css', 'stroke', purple);
        cy.get('#line-chart-vac-line').should('have.css', 'stroke', green);

        lineChart()
            .find('.recharts-legend-wrapper')
            .should('be.visible')
            .and((legend) => {
                expect(legend).to.contain.text('V práci').and.to.contain.text('Dovolená');
            });
    });

    it('Line chart matches image snapshot', () => {
        cy.waitUntil(() => lineChart().should('not.contain.text', 'Invalid date'));
        lineChart().toMatchImageSnapshot();
    });

    it('Pie chart is rendered correctly and tooltip works as expected', () => {
        cy.waitUntil(() => pieChart().should('be.visible'))
            .and((chart) => {
                expect(chart.height()).to.be.greaterThan(250);
            })
            .find('.recharts-pie-sector')
            .should('have.length', 3);

        tooltipNotVisible(pieChart());

        cy.get('#pie-chart-example-company-sector').trigger('mouseover', { force: true });

        tooltipVisible(pieChart()).and((tooltip) =>
            expect(tooltip).to.contain.text('Example Company').and.to.contain.text('285 hodin'),
        );

        cy.get('#pie-chart-example-company-sector').trigger('mouseout', { force: true });

        tooltipNotVisible(pieChart());

        const labels = ['Example Company', 'Realna Spolecnost s.r.o.', 'Test Company123'];

        [0, 1, 2].forEach((k) => {
            cy.waitUntil(() => cy.get('.recharts-pie-sector').eq(k).trigger('mouseover', { force: true }));
            cy.get('.recharts-tooltip-wrapper', { log: false }).should('contain', labels[k]);
        });
    });

    //FIXME label not showing up
    it('Pie chart matches image snapshot', () => {
        cy.waitUntil(() => pieChart().find('#pie-chart-example-company-sector').should('be.visible'));
        pieChart().toMatchImageSnapshot();
    });

    it('checks bar chart and its tooltip render correctly', () => {
        const barTypes = ['work', 'sick', 'overtime']; // 'vac'

        cy.waitUntil(() => barChart().should('be.visible'));
        barChart()
            .find('[role="bar-chart-work-bar"]')
            .should('have.length', 5)
            .eq(1)
            .trigger('mouseover', { force: true });

        barTypes.forEach((bar, index) => {
            barChart().find(`[role="bar-chart-work-bar"]`).eq(index).trigger('mouseover', { force: true });
            tooltipVisible(barChart());
        });

        /** TEST if zero values are ignored in tooltip **/
        checkBarTooltipValues('work', 0, 'not.include.text', 'Nemocenská', 'include.text', 'Přesčas : 2');
        checkBarTooltipValues('work', 1, 'not.include.text', 'Přesčas', 'include.text', 'Nemocenská : 12');

        /** Matches image snapshot with opened tooltip **/
        barChart().toMatchImageSnapshot();
    });

    it('Bar chart matches image snapshot', () => {
        cy.waitUntil(() => barChart().find(`[role="bar-chart-work-bar"]`).should('have.length', 5));
        barChart().toMatchImageSnapshot();
    });

    //TODO check if overtime, then hours cannot be over 160 (currently if i.e. 165h in a month, overtime is 5h, but work_hours is still 165!)
    // it('Check if work hours cant exceed 160, even with overtime', () => {
    //     cy.waitUntil(() => barChart().should('be.visible'));
    //     barChart()
    //         .find('[role="bar-chart-work-bar"]')
    //         .should('have.length', 5)
    //         .eq(1)
    //         .trigger('mouseover', { force: true });
    //     barChart().should('great');
    //
    //     checkBarTooltipValues('work', 0, 'not.', 'Nemocenská', 'include.text', 'Přesčas : 2');
    // });

    it('Bar chart correctly redirects to employee page', () => {
        cy.waitUntil(() => barChart().should('be.visible'));
        barChart().find('[role="bar-chart-work-bar"]').eq(1).click({ force: true });

        cy.get('[data-testid=overview-working_hours-stat]')
            .find('.ant-statistic-content-value')
            .should('contain.text', 'Martin Novak');

        cy.get('[data-testid=overview-company_name-stat]')
            .find('.ant-statistic-content-value')
            .should('contain.text', 'Test Company123');

        cy.get('[data-testid=dashboard-card-title]').should('have.text', 'Měsíční přehled zaměstnance');
        cy.get('[data-testid=overview-effectivity-stat]').should('contain.text', 'Efektivita zaměstnance');
        cy.get('[data-testid=overview-effectivity-stat-circle]').should('have.class', 'ant-progress-status-success');
    });

    //    TODO test if overall hours equals summed up hours from pie graph
});
