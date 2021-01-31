$(document).ready(function() {
    getData();
    $("#input-sku").keyup(function() {
        $("#input-sku").css("border", "1px solid #ced4da");
    });
    $("#input-name").keyup(function() {
        $("#input-name").css("border", "1px solid #ced4da");
    });
    $("#input-quantity").keyup(function() {
        $("#input-quantity").css("border", "1px solid #ced4da");
    });
    $("#input-price").keyup(function() {
        $("#input-price").css("border", "1px solid #ced4da");
    });
});

function finalizePurchase() {
    alertify.notify('The payment was successful.', 'success', 5, function() { console.log('dismissed'); });
}

function getData() {
    $.ajax({
        url: 'https://eshop-deve.herokuapp.com/api/v2/orders',
        headers: {
            'Authorization': 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYwNTY0NDA0NzA1OH0.skfIY_7CAANkxmhoq37OI4jYRE8flx1ENq1v1VaRevJiroYNFQYz7Oy6hL1YZ1OJkevXSQFuLMHTqY0w6d5nPQ'
        },
        type: 'GET',
        success: function(respuesta) {
            fillTable(respuesta.orders);
        },
        error: function() {
            console.error("No es posible completar la operación");
        }
    });
}

function sumOfPrices(obj) {
    var sum = 0;
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    obj.forEach(element => {
        var e = element.items[0].price;
        e = Number(e);
        sum += e;
    });
    return formatter.format(sum);
}

function addItem() {
    var input_sku = $("#input-sku").val();
    var input_name = $("#input-name").val();
    var input_quantity = $("#input-quantity").val();
    var input_price = $("#input-price").val();


    if (input_sku === "") {
        $("#input-sku").css("border", "1px solid red");
        alertify.notify('Enter sku.', 'error', 5, function() { console.log('dismissed'); });
    } else if (input_name === "") {
        $("#input-name").css("border", "1px solid red");
        alertify.notify('Enter name.', 'error', 5, function() { console.log('dismissed'); });
    } else if (input_quantity === "") {
        $("#input-quantity").css("border", "1px solid red");
        alertify.notify('Enter quantity.', 'error', 5, function() { console.log('dismissed'); });
    } else if (input_price === "") {
        $("#input-price").css("border", "1px solid red");
        alertify.notify('Enter price.', 'error', 5, function() { console.log('dismissed'); });
    } else {
        sendData(input_sku, input_name, input_quantity, input_price);
    }
}

function idRandom() {
    var max = 9999;
    var min = 1;
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function sendData(e1, e2, e3, e4) {
    var id = idRandom();
    $("#tbody-data").prepend(
        '<tr class="data-hover">' +
        '<td>' + id + '</th>' +
        '<td>' + e1 + '</th>' +
        '<td>' + e2 + '</th>' +
        '<td>' + e3 + '</td>' +
        '<td>' + e4 + '</td>' +
        '</tr>'
    );
    $("#exampleModalAdd").modal('hide');
    alertify.notify('the article was added successfully.', 'success', 5, function() { console.log('dismissed'); });
}

function fillTable(obj) {
    //console.log(obj);
    var sumPrices = sumOfPrices(obj);
    $("#global_total_orders").text(obj.length);
    $("#glogal_total_profit").text(sumPrices);

    obj.forEach(object => {
        var e = object.items[0];
        $("#tbody-data").prepend(
            '<tr class="data-hover" data-toggle="modal" data-target="#exampleModal' + object.number + '">' +
            '<td>' + object.number + '</th>' +
            '<td>' + e.sku + '</th>' +
            '<td>' + e.name + '</td>' +
            '<td>' + e.quantity + '</td>' +
            '<td>' + e.price + '</td>' +
            '</tr>'
        );

        $("#modal-info").prepend(
            '<div class="modal fade" id="exampleModal' + object.number + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title" id="exampleModalLabel">Order detail #' + object.number + '</h5>' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '</div>' +
            '<div class="modal-body">' +
            '<div class="container">' +
            '<div class="row">' +
            '<div class="col-sm">' +
            '<p class="info-title">Sku</p>' +
            '<p>' + e.sku + '</p>' +
            '</div>' +
            '<div class="col-sm">' +
            '<p class="info-title">Name</p>' +
            '<p>' + e.name + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-sm">' +
            '<p class="info-title">Quantity</p>' +
            '<p>' + e.quantity + '</p>' +
            '</div>' +
            '<div class="col-sm">' +
            '<p class="info-title">Price</p>' +
            '<p>' + e.price + '</p>' +
            '</div>' +
            '</div>' +

            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    });
}