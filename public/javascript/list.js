var token = (new URL(window.location.href)).searchParams.get("token");
if (token)
    $.getJSON('https://api.github.com/user/repos?access_token=' + token, function (repositories) {
        if (repositories.length == 0)
            $('#repos').html('<p>No repos!</p></div>');
        else {
            var outhtml = '<p><strong>Repos List:</strong></p> <ul>';
            $.each(repositories, function (index) {
                outhtml += '<li><a href="./assess?name='+repositories[index].full_name + '&access_token='+token+'">' + repositories[index].full_name + '</a></li>';
            });
            outhtml = outhtml + '</ul></div>';
            $('#repos').html(outhtml);
        }
    });