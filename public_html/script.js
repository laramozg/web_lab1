$(function () {
    $.ajax({
        type: "POST",
        url: "php/Load.php",
        success: function (answer) {
            $('.result').append(answer);
        }
    })

    $('#clear').on('click', function () {
        setPoint(0, 0, 1)
        $.ajax({
            type: "POST",
            url: "php/Clear.php",
            success: function () {
                $('.resultFromPhp').remove();
            }
        })
    })

    $('#send').on('click', function (event) {
        let x = $('.x_in').val()
        let y = $('.y_in').val()
        let r = $('input[name="r"]:checked').val();
        checkY(x, y, r)
        event.preventDefault()
    })
    $("input[name=r]").on("change", (e) => {
        let value = e.currentTarget.defaultValue;

        $("input[name=r]").map((index, item) => {
            if (item.defaultValue !== value) {
                item.checked = false;
            }
        })
    })
})

function setPoint(x, y, r) {
    $('#pointer').attr("cx", (x * 120 / r + 200))
        .attr("cy", (y * -120 / r + 200));
}

function checkY(x, y, r) {
    if (!y) {
        showError('<br>Вы не ввели Y')
    } else if (y < -5 || y > 5) {
        showError('<br>Y должен быть от -5 до 3')
    } else if (isNaN(y)) {
        showError('<br>Y должен быть числом')
    } else {
        $('.error').html("")
        $.ajax({
            type: "POST",
            url: "php/Request.php",
            data: {X: x, Y: y, R: r},
            success: function (answer) {
                $('.result').append(answer);
            }
        })
        setPoint(x, y, r)
    }
}

function showError(message) {
    $('.error').html(message)
}