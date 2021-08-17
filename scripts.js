$("#add").click(() => {
    $.ajax({
        url:"http://localhost:8080/todo",
        type:"POST",
        data: JSON.stringify({
            name: $("#inputID").val(),
          }),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(){
            onLoad();
        }
      })
    })


$( document ).ready(function() {
    onLoad();
});

function del(row)  {
    $.ajax({
        url:"http://localhost:8080/todo",
        type:"DELETE",
        data: JSON.stringify({
            id: row,
          }),
        contentType:"application/json; charset=utf-8",
        success: function(){
            onLoad();
        }
      })
}

function check(row) {
    $(row).css("color","LightGrey")
    $("#check"+row).html('<img src="https://cdn4.iconfinder.com/data/icons/materia-flat-arrows-symbols-vol-6/24/018_282_ok_done_check_finished-512.png">')
    
}

$("#check").css('justify-content', 'flex-end')

function add(id, name) {
    $(".container").append(`
    <li id="${id}">
        ${name} 
        <button onclick="del(${id})"> 
            <img src="https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_delete_48px-512.png">
        </button>
        <button id="check${id}" onclick="check(${id})"> 
            <img src="https://cdn4.iconfinder.com/data/icons/epic-outlines/30/660993-check_button-512.png">
        </button> 
    </li>`)
}

function onLoad() {
    $(".container").empty();
    $.ajax({
        headers:{    
            "Accept":"application/json",
            "Content-type":"application/json"
        },   
        url:"http://localhost:8080/todo",
        success:function(myJSON){
            myJSON.forEach(myFunction);
        }
      });
    
} 
   function myFunction(item) {
        add(item.id, item.name);
}