
var singleViewProductTmplt;
var loadSelectedProductToViewMore = () => {
    singleViewProductTmplt = Handlebars.compile(document.querySelector("#singleViewMoreProductDetails").innerHTML);
    var productId = new URLSearchParams(window.location.search).get('id');
    if (productId) {
        loadProductDetails({id: productId}, true);
    } else {
        $("#view_productDetailsContainer > div").html('<p>No product selected to view details.</p>');
    }
}

var renderViewMoreProductDetails = (productData) => {

    // $("#view_productDetailsContainer > div").html('');
    console.log(productData);
    $("#view_productDetailsContainer").append(singleViewProductTmplt(productData[0]));

}

var loadBackProductDetails = () => {
    loadSelectedPage('productDetails');
}