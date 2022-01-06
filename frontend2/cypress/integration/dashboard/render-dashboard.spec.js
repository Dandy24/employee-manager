const purple = 'rgb(136, 132, 216)';
const green = 'rgb(130, 202, 157)';

describe('rendering graphs and other statictics in dashboard', () => {
    const allChartsVisible = () => {
        cy.waitUntil(() => {
            cy.get('#line-chart').should('be.visible');
            cy.get('#pie-chart').should('be.visible');
        });
    };

    const tooltipNotVisible = (chart) =>
        chart.find('.recharts-tooltip-wrapper').should('have.css', 'visibility', 'hidden');

    const tooltipVisible = (chart) =>
        chart.find('.recharts-tooltip-wrapper').should('have.css', 'visibility', 'visible');

    const lineChart = () => cy.get('#line-chart');
    const pieChart = () => cy.get('#pie-chart');
    const areaChart = () => cy.get('#area-chart');
    const barChart = () => cy.get('#bar-chart');

    beforeEach(() => {
        cy.visit('/');
        // allChartsVisible();
    });

    it('Line chart is rendered correctly and matches and image snapshot', () => {
        cy.waitUntil(() => lineChart().should('be.visible'))
            .and((chart) => {
                // we can assert anything about the chart really
                expect(chart.height()).to.be.greaterThan(200);
            })
            .find('.recharts-line')
            .should('have.length', 2);

        cy.get('#line-chart-work-line').should('have.css', 'stroke', purple);
        cy.get('#line-chart-vac-line').should('have.css', 'stroke', green);

        lineChart()
            .find('.recharts-legend-wrapper')
            .should('be.visible')
            .and((legend) => {
                expect(legend).to.contain.text('Hours worked').and.to.contain.text('Hours out');
            });

        // FIXME wait for lines to be aligned properly
        lineChart().toMatchImageSnapshot();
        // cy.get('#line-chart').toMatchSnapshot();
    });

    //TODO test tooltip including showing correct date (for example November 21) and position (chart height and direction) ?

    // TODO check if legend overlaps with graph (graph start y pos + height >= legend y pos)
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
            expect(tooltip).to.contain.text('Example Company').and.to.contain.text('489'),
        );

        // FIXME doesnt disappear if mouseleave moves to tooltip area (which is logical)
        cy.get('#pie-chart-example-company-sector').trigger('mouseout', { force: true });

        tooltipNotVisible(pieChart());

        const labels = ['Example Company', 'Realna Spolecnost s.r.o.', 'Test Company123'];

        [0, 1, 2].forEach((k) => {
            cy.waitUntil(() => cy.get('.recharts-pie-sector').eq(k).trigger('mouseover', { force: true }));
            cy.get('.recharts-tooltip-wrapper', { log: false }).should('contain', labels[k]);
        });

        pieChart().toMatchImageSnapshot();
        // cy.get('#pie-chart').toMatchSnapshot();
    });

    // FIXME wait for bars to have final height

    it('checks bar chart and its tooltip render correctly', () => {
        const barTypes = ['work', 'sick', 'overtime']; // 'vac'

        cy.waitUntil(() => barChart().should('be.visible'));
        barChart()
            .find('[role="bar-chart-work-bar"]')
            .should('have.length', 5)
            .eq(1)
            .trigger('mouseover', { force: true });

        barTypes.forEach((bar, index) => {
            barChart().find(`[role="bar-chart-${bar}-bar"]`).eq(index).trigger('mouseover', { force: true });
            tooltipVisible(barChart());
        });

        barChart().toMatchImageSnapshot();
    });

    // TODO expand
    it('checks bar chart correctly redirects to employee page', () => {
        cy.waitUntil(() => barChart().should('be.visible'));
        barChart().find('[role="bar-chart-work-bar"]').eq(1).click({ force: true });

        cy.get('[data-testid=dashboard-card-title]').should('have.text', 'Mesicni prehled zamestnance');
        cy.get('[data-testid=overview-effectivity-stat]').should('have.text', 'Efektivita zamestnance');
        cy.get('[data-testid=overview-effectivity-stat-circle]').should('have.class', 'ant-progress-status-success');
    });
});
