var singleProductTmplt;

var loadProductDetails = (filters = {}, isViewMore = false) => {
    $("#productDetailsContainer > div").html('');
    var url = '/get/details/product';
    axios.get(url, {params: filters, headers: {"Authorization" : `Bearer ${sessionStorage.getItem('jwtToken')}`}}).then((response) => {
        var productData = response.data;
        if (isViewMore) {
            renderViewMoreProductDetails(productData);
        } else {
            singleProductTmplt = Handlebars.compile(document.querySelector("#singleProductTmplt").innerHTML);
            productData.forEach((product, index) => {
                var desc = product.description;
                product.index = index;
                product.description = desc.substring(0, 100) + '...';
                product.discountedPrice = Math.round(product.price - (product.price * product.discountPercentage) / 100);
                $("#productDetailsContainer > div").append(singleProductTmplt(product));
                addRatingStars('#rating_c_' + product.index, product.rating);
            });
        }
    })
}

var viewMoreDetails = (id) => {
    loadSelectedPage('viewMore');
    location.search = '?id=' + id;    
}

var applyProductFilter = () => {
    var filters = {};
    filters.category = [];
    filters.price = 0;
    var selctedCheckboxList = document.querySelectorAll(".category_options input[type=checkbox]:checked");

    selctedCheckboxList.forEach((element) => {
        filters.category.push(element.value);
    });

    filters.priceRange = parseInt($('#priceRange').val());

    console.log(filters);
    loadProductDetails(filters);
}


var setPriceValue = () => {

     $("#selectedPriceRange").html(parseInt($('#priceRange').val()));
}