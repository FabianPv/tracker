var array_of_requests;
function get_tracking_info(tracking_numbers){
    var request = function (){
        let loading_card = build_loading_info_card();
        append_tracking_info_card(loading_card);
        $.ajax({
            url: "http://localhost:3000/carrier/Fedex/tracking/" + tracking_numbers,
            type: "get",
            dataType: "json",
            async: true,
            success: function (data) {
                $("#spinner").remove();
                console.log(data);
                process_tracking_info(data.result);
                process_tracking_info(data.errors);
                array_of_requests.splice(0, 1);
                execute_array_function(0);
            },
            error: function () {
                $("#spinner").remove();
            }
        });
    };

    $("#tracking_numbers").val("");

    array_of_requests.push(request);
    if (array_of_requests.length == 1)
        execute_array_function(0);
}

function execute_array_function(position){
    if (array_of_requests.length > 0)
        array_of_requests[position]();
}

function process_tracking_info(data){
    $.each(data, function (index, value) {
        let tracking_info_card = build_tracking_info_card(value.id, value.tracking_info.description, value.tracking_info.status);
        append_tracking_info_card(tracking_info_card);
    });
}


function build_tracking_info_card(tracking_id,message,status){
    let border = status != "EXCEPTION" ? "border-success" : "border-danger"
    let tracking_card = "<div class='col-sm-12 mt-2' id='"+tracking_id+"'>"
        + "<div class='card " + border +"'>"
        + "<div class='card-body'>"
        + "<h5 class='card-title'>"+tracking_id+"</h5>"
        + "<p class='card-text'>" + status +" / "+ message +"</p>"
        + "</div>"
        + "</div>"
        + "</div>"

    return tracking_card
}

function build_loading_info_card(){
    let loading = "<div class='text-center col-sm-12 mt-2' id = 'spinner' >"
            +"<div class='card'>"
            +"<div class='card-body'>"
            +"<div class='spinner-grow' role='status'>"
            +"<span class='sr-only'>Loading...</span>"
            +"</div>"
            +"</div>"
            +"</div>"
            +"</div >"
    
    return loading
}

function remove_loading_info_card(){

}


function array_handler(){
    console.log();
}

function append_tracking_info_card(tracking_info_card){
    $(".main .row").append(tracking_info_card);
}

$(function () {
    $("#tracking-button").click(function () {
        get_tracking_info($("#tracking_numbers").val());
    });
    array_of_requests = [];
});



