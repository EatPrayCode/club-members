document.getElementById('phoneNumber').addEventListener('keyup',
  function (evt) {
    var phoneNumber = document.getElementById('phoneNumber');
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    phoneNumber.value = phoneFormat(phoneNumber.value);
  });