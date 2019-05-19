$(function()
{
  //Append data input to the table
  $("#submit").click(function()
  {
    //Verify that the inputs are valid
    if ($("#iTime").val() !== "" && $("#iTime").val().match(/^\d+(\.\d{1,2})?$/) && $("#iName").val() !== "")
    {
      //Format the values, append to the table, and update the styles
      $("#table tr:last").after("<tr><td id=\"tRank\">" + $(this).parent().parent().children().index($(this).parent()) + "</td><td id=\"tName\">" + $("#iName").val() + "</td><td id=\"tTime\">" + parseFloat(Math.round($("#iTime").val() * 100) / 100).toFixed(2) + "</td></tr><tr><td></td><td></td><td></td></tr>");
      $("tr:odd").css({"background-color": "transparent", "height": "1em"});
      $("tr:even").css({"background": "linear-gradient(to bottom, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)", "color": "white", "height": "2em"});
      $("input").css("box-shadow", "0 0 0 white");
    }
    else
    {
      //Visual Error Feedback
      if ($("#iTime").val() === "" || !$("#iTime").val().match(/^\d+(\.\d{1,2})?$/))
      {
        $("#iTime").css("box-shadow", "0 0 5px red");
      }
      else
      {
        $("#iTime").css("box-shadow", "0 0 0 white");
      }
      
      
      if ($("#iName").val() === "")
      {
        $("#iName").css("box-shadow", "0 0 5px red");
      }
      else
      {
        $("#iName").css("box-shadow", "0 0 0 white");
      }
    }
  });
  
  
  //Clear the entire table and refocus on the first textbox
  $("#reset").click(function()
  {
    $("#aTable").find("tr:gt(0)").remove();
    $("input").val("");
    $("#level").focus();
  });
  
  
  //Save the table data to a local text file
  $("#save").click(function()
  {
    var retContent = [];
    var retString = '';
    
    $('tbody tr').each(function(idx, elem)
    {
      var elemText = [];
      
      $(elem).children('td').each(function(childIdx, childElem)
      {
        elemText.push($(childElem).text());
      });
      
      retContent.push(`(${elemText.join(',')})`);
    });
    
    retString = retContent.join(',\r\n');
    var file = new Blob([retString], {type: 'text/plain'});
    var btn = $('#save');
    btn.attr("href", URL.createObjectURL(file));
    btn.prop("download", "data.txt");
  });
});
