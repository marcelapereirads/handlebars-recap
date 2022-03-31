const loadProducts = (() => {
    const serviceUrl = 'http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=natural&rating_greater_than=4.5';
    const productListRequest = new Request(serviceUrl, {
        method: 'GET'
    });
    let productList;

    fetch(productListRequest)
    .then(response => {
        return response.json();
    })
    .catch(error => console.log('An error has occurred. Please try again later.', error))
    .then(products => {
        productList = {
            products: products.map(product => {
                return {
                    name: product.name,
                    imageUrl: product.image_link,
                    price: product.price,
                    rating: product.rating
                }
            })
        }

        registerHelpers();
        
        const template = Handlebars.compile(document.querySelector('#load-products').innerHTML);

        document.querySelector('#products').innerHTML = template(productList);
    });
})();

const registerHelpers = () => {
    Handlebars.registerHelper('breakLine', (text) => {
        const formattedText = Handlebars.Utils.escapeExpression(text).replace('\n', '<br/>');

        return new Handlebars.SafeString(formattedText);
    });

    Handlebars.registerHelper('formatPrice', (price) => `$${parseFloat(price).toFixed(2)}`);

    Handlebars.registerHelper('checkHighlight', (rating) => {
        if (rating > 4.8) {
            const highlight = `
            <div class="product-highlight">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                <span>Top rated</span>
            </div>
            `;
            return new Handlebars.SafeString(highlight);
        }
    });
}