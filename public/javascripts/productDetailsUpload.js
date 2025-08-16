var productData = {};
var uploadProductDetails = () => {    
    productData.title = $("#title").val();
    productData.description = $("#description").val();
    productData.category = $("#category").val();
    productData.price = parseInt($("#price").val());
    productData.discountPercentage = parseInt($("#discountPercentage").val());
    productData.rating = parseInt($("#rating").val());
    // productData.thumbnail = $("#thumbnail").val();
    resetFields();
    console.log(productData);
    axios.post('/add/newProduct', productData).then((result) => {
        $("#upload_success_msg").show();
    }).catch((err) => {
        
    });
}

var resetFields = () => {
    $("#title").val('');
    $("#description").val('');
    $("#category").val('');
    $("#price").val('');
    $("#discountPercentage").val('');
    $("#rating").val('');
    $("#thumbnail").val(''); 
}

var readFile = () => {
    var formData = new FormData();    
    var userSelectedFile = $("input[name=prodThumbnail]")[0].files[0]; // $("#abc").val()
    formData.append("prodThumbnail", userSelectedFile);

    axios.post('/upload/resource', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((result) => {
        console.log(result);
        productData.thumbnail = result.data.filePath;
    }).catch((err) => {
        console.error(err);
    });
}