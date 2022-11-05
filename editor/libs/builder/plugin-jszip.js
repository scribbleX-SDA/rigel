
Rigel.Gui.download =
function () {
    let assets = [];
    
    function addUrl(url, href, binary) {
        assets.push({url, href, binary});
    }

    let html = Rigel.Builder.frameHtml;

    //stylesheets
    $("link[href$='.css']", html).each(function(i, e) {
        addUrl(e.href, e.getAttribute("href"), false);
    });

    //javascripts
    $("script[src$='.js']", html).each(function(i, e) {
        addUrl(e.src, e.getAttribute("src"), false);
    });
    
    //images
    $("img[src]", html).each(function(i, e) {
        addUrl(e.src, e.getAttribute("src"), true);
    });


    let zip = new JSZip();
    let promises = [];
    
    for (i in assets) {
        let asset = assets[i];
        let url = asset.url;
        let href = asset.href;
        let binary = asset.binary;
        
        let filename = href.substring(href.lastIndexOf('/')+1);
        
        promises.push(new Promise((resolve, reject) => {

          let request = new XMLHttpRequest();
          request.open('GET', url);
          if (binary) {
            request.responseType = 'blob';
          } else {
            request.responseType = 'text';
          }

          request.onload = function() {
            if (request.status === 200) {
              resolve({url, href, filename, binary, data:request.response});
            } else {
              reject(Error('Error code:' + request.statusText));
            }
          };

          request.onerror = function() {
              reject(Error('There was a network error.'));
          };

          // Send the request
          request.send();          
        /*  
        $.ajax({
          url: url,
          type: 'GET',
         
          success: function (data) {
            resolve({url, href, filename, binary, data});
          },
          error: function (error) {
            reject(error)
          },
        });
        */ 
     }));
    }
    
    Promise.all(promises).then((data) => {
        let html = Rigel.Builder.getHtml();
        
        for (i in data) {
            let file = data[i];
            html = html.replace(file.href, file.filename);
            zip.file(file.filename, file.data, {base64: file.binary});
        }
        
        zip.file("index.html", html);
        zip.generateAsync({type:"blob"})
        .then(function(content) {
            saveAs(content, "template.zip");
        });
    }).catch((error) => {
        console.log(error)
  })
};
