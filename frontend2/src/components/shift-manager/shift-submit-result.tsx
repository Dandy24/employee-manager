import { observer } from 'mobx-react-lite';
import { Button, Result } from 'antd';
import React from 'react';
import { ShiftStore } from '../../stores/shift-store';

export interface ShiftSubmitResultProps {
    store: ShiftStore;
}

export const ShiftSubmitResult: React.FC<ShiftSubmitResultProps> = observer((props: ShiftSubmitResultProps) => {
    const { store } = props;

    const handleRedirect = () => {
        window.location.pathname = `/shift-calendar/${store.rootStore.calendarStore.activeCompanyId}`;
    };

    return (
        <>
            <Result
                status={store.shiftEditResult}
                title={
                    <div data-testid={'shift-submit-result-title'}>
                        {store.shiftEditResult === 'success'
                            ? `Směnu se podařilo úspěšně vytvořit.`
                            : `Směnu se nepodařilo vytvořit.`}
                    </div>
                }
                subTitle={
                    <div data-testid={'shift-submit-result-subtitle'}>
                        {store.shiftEditResult === 'success'
                            ? `Směna je naplánována na ${store.shift.date} ${store.shift.time}`
                            : `Zkontrolujte prosím zda nebyly hlášeny chyby`}
                    </div>
                }
                extra={[
                    <Button
                        data-testid={'back-to-calendar-button'}
                        type="primary"
                        key="calendar"
                        onClick={handleRedirect}
                    >
                        Vrátit se zpět na kalendář
                    </Button>,
                    // <Button key="buy">Buy Again</Button>,
                ]}
            />
        </>
    );
});
