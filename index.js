var http = require("http"),
	cheerio = require("cheerio"),
	url = "http://group.jd.com/site/20000541/20000361.htm?from=pindao",
	datas = "", currData;


http.createServer(function(req,res){
	
	    http.get(url,function(response){
			response.on("data",function(d){
				datas += d;
			});

			response.on("end",function(){
				currData = handleData(datas);
				req.on("data",function(){

				})
				req.on("end",function(){
					res.writeHead(200,{"Content-Type":"text/html"});
					res.write(currData)
					res.end();
				})
			})
		});
	
}).listen(2015);


function handleData(data){
	var $ = cheerio.load(data);
	var arr = [],
		html = "";
	$("img").each(function(item){
		var img = $(this).attr("src");
		arr.push(img);
		html += ("<img src='" + img + "'>");
	});

	return html;
}