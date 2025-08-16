
var loadSelectedPage = (pageType) => {
    var templteurl;
    switch (pageType) {
        case 'onload':
            templteurl = 'templates/mainpage.htm';
            break;
        case 'productDetails':
            templteurl = 'templates/productDetailsPage.htm'
            break;
        case 'viewMore':
            templteurl = 'templates/viewMore.htm'
            break;
    }
    window.location.hash = '#' + pageType;
    axios.get(templteurl).then((response) => {
        $("main").html(response.data);
        if (pageType == 'productDetails') {
            location.search = '';
            loadProductDetails();
        } else if (pageType == 'viewMore') {
            loadSelectedProductToViewMore();
            
        }
    })
}

var loginModal, signupModal, logoutModal;
document.addEventListener("DOMContentLoaded", () => {
    loginModal = new bootstrap.Modal(document.getElementById('loginModal'), {});
    signupModal = new bootstrap.Modal(document.getElementById('signupModal'), {});
    logoutModal = new bootstrap.Modal(document.getElementById('logoutModel'), {});
    axios.get('/check/userSession').then((response) => {
        console.log(response.data);
        if (response.data.isUserLoggedIn) {
            enableControls(response.data.accountId);
            if (window.location.hash == '#viewMore') {
                loadSelectedPage('viewMore');
            } else {
                // user is already logged in
                loadSelectedPage('productDetails');
            }            
        } else {
            // user is not logged in
            loadSelectedPage('onload');
        }
    }).catch((err) => {
        console.log(err);
    });
 });

var validateUserCredentials = () => {
    var userData = {};
    userData.accountId = $("#accountId").val();
    userData.password = $("#password").val();
    console.log(userData);

    axios.post('/validate/userCredentials' , userData).then((result) => {
        if (result.data.status == 'Valid') {
            // load the product details page
            // hide the popup 
            loginModal.hide();
            enableControls(userData.accountId);
            sessionStorage.setItem('jwtToken', result.data.jwtToken);
            // load teh product details page
            loadSelectedPage('productDetails');
        } else {
            $("#login_err_msg").text("Invalid Crdentials").show();
        }
    }).catch((err) => {
        
    });
}



var doLogout = () => {
    // window.location.href = '/';
    axios.get('/logout/session').then((response) => {
        console.log(response.data);
        if (response.data.status == 'success') {
            logoutModal.hide();
            loadSelectedPage('onload');
        } else {
            alert("Error while logging out");
        }
    }).catch((err) => {
        console.log(err);
    });
}

var enableControls = (accountId) => {
    $("#loggedInUserContainer").show();
    $("#loggedInUser").text(accountId);
    $("#loginContainer").hide();
}