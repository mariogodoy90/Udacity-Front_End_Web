let submit;
submit = $("#sizePicker").submit(function(){
    clearGrid();
    makeGrid();
    return false;
});

// When size is submitted by the user, call makeGrid()

function makeGrid() {
    let row = $("#inputHeight").val();
    let column = $("#inputWidth").val();

    for (let i = 0; i < row; i++){
        $("#pixelCanvas").append("<tr></tr>");
        for (let j = 0; j < column; j++){
            $("tr").last().append("<td></td>");
        }
    }
}

function clearGrid(){
    $("tr").remove();
    $("td").remove();
}

myColor = $("#colorPicker").val();

let click = $("#pixelCanvas").on("click", "td", function(){
    let myColor = $("#colorPicker").val();
    $(this).css("background-color", myColor);
});
