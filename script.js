$(document).ready(function() {
  let arr = [];
  let map = []; //граф
  let idef; //id элемента по которому мы кликнули
  var rows,columns; //кол-во строк и столбцов
  var coordA, coordB;
  let arr_new = [1,20,36,40,8,10]; //массив с путем

  function createTable(rows,columns){ //строим таблицу
    var table = '<table class = "game"><tr>';
    for(let i = 0; i < rows*columns; i++){
        if((i % columns == 0)&&(i!=0)){
          table += '</tr><tr>';
        }
        if(arr[i] == "island"){
          table += '<td class = "island" id = ' + i + '></td>';
        }else if(arr[i] == "sand"){
          table += '<td class = "sand" id = ' + i + '></td>';
        }else if(arr[i] == "A"){
          table += '<td id = ' + i + '>A</td>';
        }else if(arr[i] == "B"){
          table += '<td id = ' + i + '>B</td>';
        }else{
          table += '<td id = ' + i + '></td>';
        }
        if(!arr[i]){
          arr[i] = "";
        }
    }
    table += "</table>";
    $('.container').append(table);
    paintWay(arr_new);
  }

  function addSand(id){ //добавляем песок
    let topLeft = id - columns - 1;
    let topCenter = id - columns;
    let topRight = id - columns + 1;
    let thisLeft = id - 1;
    let thisCenter = id;
    let thisRight = id + 1;
    let botLeft = id + columns - 1;
    let botCenter = id + columns;
    let botRight = id + columns + 1;
    console.log(botLeft);
    if(arr[topLeft] != "island"){
      $("#"+topLeft+"").addClass("sand");
      arr[topLeft] = "sand";
    }
    if(arr[topCenter] != "island"){
      $("#"+topCenter+"").addClass("sand");
      arr[topCenter] = "sand";
    }
    if(arr[topRight] != "island"){
      $("#"+topRight+"").addClass("sand");
      arr[topRight] = "sand";
    }
    if(arr[thisLeft] != "island"){
      $("#"+thisLeft+"").addClass("sand");
      arr[thisLeft] = "sand";
    }
    if(arr[thisRight] != "island"){
      $("#"+thisRight+"").addClass("sand");
      arr[thisRight] = "sand";
    }
    if(arr[botLeft] != "island"){
      $("#"+botLeft+"").addClass("sand");
      arr[botLeft] = "sand";
    }
    if(arr[botCenter] != "island"){
      $("#"+botCenter+"").addClass("sand");
      arr[botCenter] = "sand";
    }
    if(arr[botRight] != "island"){
      $("#"+botRight+"").addClass("sand");
      arr[botRight] = "sand";
    }
    console.log(arr);
  }

  function paintWay(arr){
    for (let i = 0; i < arr.length; i++){
      $("#"+arr[i]+"").addClass("way");
    }
  }

  $(document).on('click', 'td', function(e){
    $(e.currentTarget).removeClass("sand");
    $(e.currentTarget).addClass("island"); //добавляем класс island
    let idef = parseInt($(e.currentTarget).attr("id")); //узнаём id
    arr[idef] = "island"; //изменяем в массиве значение этой клетки на island
    addSand(idef); //запускаем функцию добавления песка
  })

  $(".rows").change(function(){
    rows = parseInt(this.value);
    columns = parseInt($(".columns").attr("value"));
    $(".game").remove();
    createTable(rows,columns);
  })

  $(".columns").change(function(){
    let oldRows = rows;
    rows = parseInt($(".rows").attr("value"));
    columns = parseInt(this.value);
    $(".game").remove();
    createTable(rows,columns);
  })

  $(".coordAX, .coordAY").change(function(){
    let coordAX = parseInt(this.value);
    let coordAY = parseInt($(".coordAY").attr("value"));
    let coord = (coordAY - 1)*rows + coordAX - 1;
    $("#"+coord+"").text("A");
    arr[coordA] = "";
    coordA = coord;
    arr[coord] = "A";
    $(".game").remove();
    createTable(rows,columns);
  })

  $(".coordBX, .coordBY").change(function(){
    let coordBX = parseInt(this.value);
    let coordBY = parseInt($(".coordBY").attr("value"));
    let coord = (coordBY - 1)*rows + coordBX - 1;
    $("#"+coord+"").text("B");
    arr[coordB] = "";
    coordB = coord;
    arr[coord] = "B";
    $(".game").remove();
    createTable(rows,columns);
  })

  $(".delete").click(function(){
    for(let i = 0; i < rows*columns - 1; i++){
      arr[i] = "";
    }
    $(".game").remove();
    createTable(rows,columns);
  })

  $(".find").click(function(){
    console.log(arr);
    for (let i = 0; i < rows*columns; i++){
      map[i] = [];
      if(arr[i] != "sand" && arr[i] != "island"){
        if(arr[i - columns] != "sand" && arr[i - columns] != "island"){
          map[i].push(i - columns);
        }
        if(arr[i - 1] != "sand" && arr[i - 1] != "island"){
          map[i].push(i - 1);
        }
        if(arr[i + 1] != "sand" && arr[i + 1] != "island"){
          map[i].push(i + 1);
        }
        if(arr[i + columns] != "sand" && arr[i + columns] != "island"){
          map[i].push(i + columns);
        }
      }else{
        continue;
      }
    }
    var k = 0;
    for (var i = 0; i < rows*columns; i++){
      for (var j = 0; j <= 8-k; j++){
        if (map[i][j] < 0){
          map[i].splice(j,1);
          k++;
          j--;
        }
      }
      k = 0;
    }
    console.log(map);
  })

});
