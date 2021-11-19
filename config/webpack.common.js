const config = [
    { site: 'mushrooms' },
];

const entryHtmlPlugins = config.map(({ site }) => {
    return new HtmlWebPackPlugin({
        filename: `${site}.html`,
        template: `./src/${site}/index.pug`,
        chunks: [site],
    });
});

module.exports = {
    entry: {
        mushrooms: {
            import: './src/mushrooms/index.ts'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true,
                    self: true,
                },
            }
        ],
    },
    plugins: [...entryHtmlPlugins],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
}
