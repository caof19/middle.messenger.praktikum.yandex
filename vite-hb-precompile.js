import Handlebars from 'handlebars';

export default function handlebars() {
    const fileRegexp = /\.hbs$|\.handlebars$/;

    return {
        name: 'vite-hb-precompile',
        transform(src, id) {
            if (!fileRegexp.test(id)) {
                return;
            }

            // language=javascript
            const code = `
                import Handlebars from 'handlebars';
                export default Handlebars.template(${Handlebars.precompile(src)});
            `;

            return {
                code
            };
        }
    };
}
