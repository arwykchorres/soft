window.displayMessage = function (message, icon, danger) {
    swal({
        text: message,
        icon: icon,
        dangerMode: danger,
      })
};