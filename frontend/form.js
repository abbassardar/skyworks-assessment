$(document).ready(function () {
  $("form").submit(function (event) {
    var formData = {
      title: $("#title").val(),
      date: $("#date").val(),
      description: $("#description").val()
    };

    $.ajax({
      type: "POST",
      url: "https://gddki32wg7.execute-api.eu-west-1.amazonaws.com/dev/newsitem",
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      console.log(data);
    });

    event.preventDefault();
  });
});

