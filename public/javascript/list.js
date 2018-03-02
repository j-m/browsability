var token = (new URL(window.location.href)).searchParams.get("token"),
    files = [];
function getContents(name, path) {
    var uri = 'https://raw.githubusercontent.com/' + name + '/master/' + path + '?access_token=' + token;
    $.get(uri, function (data) {
        files.push({ file: path, content: data });
    });
}
function getTree(name) {
    $.getJSON('https://api.github.com/repos/' + name + '/commits/master?access_token=' + token, function (latest) { //get latest commit on master
        $.getJSON('https://api.github.com/repos/' + name + '/git/trees/' + latest.sha + '?recursive=1&access_token=' + token, function (data) { //get tree object with paths
            $.each(data.tree, function (index) {
                var file = data.tree[index];
                if (file.type == "blob") { //we only care about files
                    var fileType = file.path.substr(file.path.lastIndexOf("."));
                    if (fileType == ".browsability")
                        getContents(name, file.path);
                    else if (fileType == ".css")
                        getContents(name, file.path);
                    else if (fileType == ".html")
                        getContents(name, file.path);
                }
            });
            console.log(files);
        });
    });
}
if (token)
    $.getJSON('https://api.github.com/user/repos?access_token=' + token, function (repositories) {
        if (repositories.length == 0)
            $('#repos').html('<p>No repos!</p></div>');
        else {
            var outhtml = '<p><strong>Repos List:</strong></p> <ul>';
            $.each(repositories, function (index) {
                outhtml += '<li><a href="#" onclick="getTree(&apos;' + repositories[index].full_name + '&apos;)">' + repositories[index].full_name + '</a></li>';
            });
            outhtml = outhtml + '</ul></div>';
            $('#repos').html(outhtml);
        }
    });