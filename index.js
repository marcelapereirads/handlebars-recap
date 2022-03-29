const loadProducts = (() => {
    const productList = {
        products: [
            {
                name: 'gloss',
                description: 'Define-A-Lash Lengthening & Defining Mascara is a zero-clump mascara that creates stunning length and clean definition. The flexible brush is shaped to the lash to elongate and define lashes, one by one. The built-in wiper contours brush to remove excess formula, ensuring clean deposit on lashes. There is no smudging, smearing or flaking, and the smooth, lightweight formula feels comfortable on lashes.Allergy tested, ophthalmologist tested and contact lens safe.\n\n',
                price: '10.79',
                rating: 4.1
            },
            {
                name: 'mask',
                description: 'A breakthrough in no-clump mascara! Get 200% more volume and zero \nclumps. Features an innovative double-sided brush with lash-loading and \nclump-combing zones to crush clumps.Features: 200% more volume, zero clumpsInnovative curved brushSuper-volumized, beautifully separated lashes',
                price: '20.14',
                rating: 5
            }
        ]
    }
    
    const template = Handlebars.compile(document.querySelector('#load-products').innerHTML);
    
    Handlebars.registerHelper('breakLine', (text) => {
        const formattedText = Handlebars.Utils.escapeExpression(text).replace('\n', '<br/>');

        return new Handlebars.SafeString(formattedText);
    });

    Handlebars.registerHelper('formatPrice', (price) => `$${price}`);

    Handlebars.registerHelper('checkHighlight', (rating) => {
        if (rating > 4.8) {
            const highlight = '<span>Top rated</span>';
            return new Handlebars.SafeString(highlight);
        }
    })

    document.querySelector('#products').innerHTML = template(productList);
})();
