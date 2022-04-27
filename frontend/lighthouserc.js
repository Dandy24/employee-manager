module.exports = {
    ci: {
        collect: {
            staticDistDir: './build',
            settings: {
                preset: 'desktop',
            },
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};
