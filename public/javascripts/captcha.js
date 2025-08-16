 let currentCaptcha = '';

  function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
       currentCaptcha = captcha;
                
          document.querySelector('#login').textContent = captcha;
          document.getElementById('result').textContent = '';
          document.getElementById('userInput').value = '';    

          document.getElementById('signup').textContent = captcha;
          document.getElementById('result1').textContent = '';
          document.getElementById('userInput1').value = ''; 
   
  
  
  }

  function validateCaptcha(elem) {
       const modal = elem.closest('.modal').id;
        let userInput = '';
        let result = '';

        let userInput1 = '';
        let result1 = '';
      
      if(modal== "signupModal"){
         userInput1 = document.getElementById('userInput1').value;
         result1 = document.getElementById('result1');

           if (userInput1 === currentCaptcha) {
          result1.style.color = 'green';
          result1.textContent = 'CAPTCHA matched!';
        } else {
          result1.style.color = 'red';
          result1.textContent = 'Invalid CAPTCHA. Try again.';
        }
      }
      else{
         userInput = document.getElementById('userInput').value;
         result = document.getElementById('result');
          
           if (userInput === currentCaptcha) {
          result.style.color = 'green';
          result.textContent = 'CAPTCHA matched!';
          document.querySelector('#login-btn').style.display = "block";
         } else {
          result.style.color = 'red';
          result.textContent = 'Invalid CAPTCHA. Try again.';
         }
      }
    

  
  }

  window.onload = function () {
    generateCaptcha();
  };