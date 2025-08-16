var doSignup = () => {
    var userDetails = {};
    userDetails.accountId = $("#s_accountId").val();
    userDetails.password = $("#s_password").val();
    userDetails.mailId = $("#s_mailid").val();
    userDetails.contactNo = $("#s_contact").val();
    console.log(userDetails);
    resetFields();
    axios.post('/new/User/signup', userDetails).then((result) => {
        $("#signupSuccess").show();
    }).catch((err) => {
        
    });
}

var openLoginModal = () => {
    signupModal.hide();
    loginModal.show();
}

var resetFields = () => {
    var fieldIdList = ['#s_accountId', '#s_password', "#s_mailid", "#s_contact", "#rs_password"]
    fieldIdList.forEach((id) => {
        $(id).val('');
    });
}