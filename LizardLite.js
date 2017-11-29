var LizardLite = {
        version:'1.0',
        path:'webapp.veryzhun.com',
        Model:function(t) {
            LizardLite.url = t.url
            if(t.query != undefined){
                LizardLite.query = t.query
            }else{
                LizardLite.query = ''
            }
            if(t.method != undefined){
                LizardLite.method = t.method
            }
            if(t.protocol != undefined){
                 LizardLite.protocol = t.protocol
            }
            if(t.jsoncallback != undefined){
                 LizardLite.jsoncallback = t.jsoncallback
            }
            return LizardLite
        },
        protocol:'http://',
        query:'',
        setParam:function(t){
            this.query = t;
        },
        setPath:function(t){
          this.path = t;
        },
        promised:function(){
            return this._getUrl(this.method,this.protocol,this.url,this.path,this.query)
        },
        method:'POST',
        abort:function(){
            this.isAbort=!0,this.ajax&&this.ajax.abort&&this.ajax.abort()
        },
        _getUrl:function(method,protocol,url,path,query){
            var xhr = this.ajaxFunction()
            return new Promise(function(resolve, reject) {
                if(method == 'JSONP'){
                    var scriptElement=document.createElement('script');
                    scriptElement.src=protocol + path + url + '?jsoncallback=airportlist';
                    document.body.appendChild(scriptElement);
                    eval('window.' + LizardLite.jsoncallback + '=function(e){resolve(e)}')
                }else{
                    if(method == 'GET'){
                        if(query == undefined){
                            query = ''
                        }else{
                            url = url + '?' + query
                        }
                    }
                    xhr.open(method, protocol + path + url,true);
                    if(method == 'POST'){
                        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                        xhr.send(query)
                    }
                    xhr.onreadystatechange = function(){
                        if(xhr.readyState==4){
                            if (xhr.status == 200) {
                                try {
                                    var response = JSON.parse(xhr.responseText);
                                    resolve(response);
                                } catch (e) {
                                    reject(e);
                                }
                            }else{
                                reject(new Error(xhr.statusText));
                            }
                        }
                    }
                    if(method == 'GET'){
                        xhr.send(null);
                    }
                }

            })
        },
        ajaxFunction:function(){
            var xmlHttpRequest;
            if (window.XMLHttpRequest) {
                xmlHttpRequest = new XMLHttpRequest();
                if (xmlHttpRequest.overrideMimeType) {
                    xmlHttpRequest.overrideMimeType("text/xml");
                }
            }else if (window.ActiveXObject){
                var activexName = [ "MSXML2.XMLHTTP", "Microsoft.XMLHTTP" ];
                for ( var i = 0; i < activexName.length; i++) {
                    try {
                        xmlHttpRequest = new ActiveXObject(activexName[i]);
                        if(xmlHttpRequest){
                            break;
                        }
                    } catch (e) {

                    }
                }
            }
            return xmlHttpRequest;
        }
    }
