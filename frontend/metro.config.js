// Minimal CommonJS Metro config for Windows.
// Avoid calling ESM helpers; just extend resolver sourceExts to include TypeScript.
module.exports = {
    resolver: {
        sourceExts: ['js', 'jsx', 'ts', 'tsx', 'cjs', 'json'],
    },
};
