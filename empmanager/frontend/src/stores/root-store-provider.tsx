import React from 'react';
import { RootStore } from './root-store'

let rootStore: RootStore;
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

// export function initializeRootStore(host: string, initialData?: RootStoreHydration): RootStore {
//     const api = new Api(host, process.env.NODE_ENV === 'production');
//
//     const _rootStore = rootStore ?? new RootStore(host, api);
//
//     // If your page has Next.js data fetching methods that use a Mobx rootStore, it will
//     // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
//     if (initialData) {
//         _rootStore.rehydrate(initialData);
//     }
//     // For SSG and SSR always create a new rootStore
//     if (typeof window === 'undefined') {
//         return _rootStore;
//     }
//     // Create the rootStore once in the client
//     if (!rootStore) {
//         rootStore = _rootStore;
//     }
//
//     return _rootStore;
// }
