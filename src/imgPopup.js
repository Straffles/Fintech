// Get the modal
var modal = document.getElementById("modal");
var modalImg = document.getElementById("modal-image");

// Get the image and insert it inside the modal
document.addEventListener('DOMContentLoaded', function() {
    var table = document.getElementById('inputTable');
    table.addEventListener('click', function(event) {
        var target = event.target;
        if (target.tagName === 'IMG') {
            modal.style.display = "block";
            modalImg.src = target.src;
        }
    });

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
});
