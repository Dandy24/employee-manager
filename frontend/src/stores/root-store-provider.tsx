import React from 'react';
import { RootStore } from './root-store';

const RootStoreContext = React.createContext<RootStore>({} as RootStore);

export const useRootStore = (): RootStore => {
    const context = React.useContext(RootStoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within StoreProvider');
    }

    return context;
};

interface RootStoreProviderProps {
    rootStore: RootStore;
    children: React.ReactNode;
}

export const RootStoreProvider: React.FC<RootStoreProviderProps> = ({
    rootStore,
    children,
}: RootStoreProviderProps): React.ReactElement => {
    return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
};
