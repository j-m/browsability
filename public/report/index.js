function parse(data){
    var generated = [], list = "";
    var target = {
        "chrome":data["minimum-support"]["chrome"],
        "firefox":data["minimum-support"]["firefox"],
        "safari":data["minimum-support"]["safari"],
        "edge":data["minimum-support"]["edge"],
        "ie":data["minimum-support"]["ie"]
    };
    if(!data["succ"])$("#overall").attr("invalid");
    if(!data["browser-tests"]["chrome"])$("#chrome").attr("invalid");
    if(!data["browser-tests"]["firefox"])$("#firefox").attr("invalid");
    if(!data["browser-tests"]["safari"])$("#safari").attr("invalid");
    if(!data["browser-tests"]["edge"])$("#edge").attr("invalid");
    if(!data["browser-tests"]["ie"])$("#ie").attr("invalid");
    for(var key in data["properties"]){
        var row ="\n<tr>\n\t<td>"+key+"</td>", count = 0;
        for(var index in target){
            var version = data["properties"][key]["support"][index]["version_added"],
                valid = (version<=target[index])?" ":"invalid";
            if(valid != " ") count++;
            row += "\n\t<td "+valid+">"+version+"</td>";
        }
        row += "\n</tr>"; 
        generated.push({invalid:count, html:row})
        if(list != "")list +=", "+key;
        else list = key;
    }
    function compare(a,b) {
        if (a.invalid < b.invalid) return true;
        return false;
    }
    generated.sort(compare);
    var output = "";
    for(var index = 0; index < generated.length; index++)
        if(generated[index].invalid != 0)
            output += generated[index].html;
    console.log(generated)
    $("#insert").html(output);
    $("#list p").text(list);
}
$(function () {
    $.ajax({
        type: "GET",
        url: "https://41c3c8b4.ngrok.io/json/jamesevickery%2Ftest-web-project-849b085d4282cee002bfc20985cf1e07d1bbded4.json",//window.location.href.replace("report","json-report"),
        success: function (data) {
            parse(data);
        }
    });
});