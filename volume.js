


const handleVolume = function (event) {
    let slider = $(event.target);
    let track = slider.parent().parent().attr("id").substring(3,4);
    if (tonesArray[track - 1] != null) {
        tonesArray[track - 1].volume.value = slider.val();
    }
    console.log(slider.val());
}

$(document).ready(function() {
    $("#vlm1").on("input", handleVolume);
    $("#vlm2").on("input", handleVolume);
    $("#vlm3").on("input", handleVolume);
    $("#vlm4").on("input", handleVolume);
    $("#vlm5").on("input", handleVolume);
    $("#vlm6").on("input", handleVolume);
    $("#vlm7").on("input", handleVolume);
    $("#vlm8").on("input", handleVolume);
    console.log($("#vlm1").val());
});