$(function () {
    var url = new URL(window.location.href);
    var token = url.searchParams.get("token");
    if (token) {
        var repouri = 'https://api.github.com/user/repos?access_token=' + token;
        $.getJSON(repouri, function (repositories) {
            var outhtml = "";
            if (repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
            else {
                outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
                $.each(repositories, function (index) {
                    outhtml = outhtml + '<li><a href="' + repositories[index].html_url + '" target="_blank">' + repositories[index].name + '</a></li>';
                });
                outhtml = outhtml + '</ul></div>';
            }
            $('#repos').html(outhtml);
        });
    }
});