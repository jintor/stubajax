async function stubajax (divid,phphat,postix = [],pend = 'html') {
    
        var pcache = (Math.floor(Math.random() * 100000000) + 1);
        
        postix["preventcache"] = pcache;
        postix["divid"] = encodeURIComponent(divid);
        postix["mojax_height"] = encodeURIComponent($(window).height());
        postix["mojax_width"] = encodeURIComponent($(window).width());

postix["cookies"] = decodeURIComponent(document.cookie); // if you need to send cookies
        
        for (var i = 0; i < localStorage.length; i++){ postix[localStorage.key(i)] = localStorage.getItem(localStorage.key(i)); }
        for (var i = 0; i < sessionStorage.length; i++){ postix[sessionStorage.key(i)] = sessionStorage.getItem(sessionStorage.key(i)); }
            
        await fetch(phphat+"?pcache="+pcache+"&fetchx="+pcache, {
          method: "POST", body: JSON.stringify(Object.assign({}, postix)), headers: {"Content-type": "application/json; charset=UTF-8"}
        }).then( response => { return response.text(); }).then( html => { 
            switch ( pend ){
                case 'append' : $("#"+divid).append(html); break;
                case 'prepend' : $("#"+divid).prepend(html); break;
                default : $("#"+divid).html(html); break;
            }
        }).catch( err => console.log(err) );
          
    }

async function stubstreamjax (divid,phphat,postix = [],pend = 'html') {
    
        var pcache = (Math.floor(Math.random() * 100000000) + 1);
        
        postix["preventcache"] = pcache;
        postix["divid"] = encodeURIComponent(divid);
        postix["mojax_height"] = encodeURIComponent($(window).height());
        postix["mojax_width"] = encodeURIComponent($(window).width());

postix["cookies"] = decodeURIComponent(document.cookie); // if you need to send cookies
        
        for (var i = 0; i < localStorage.length; i++){ postix[localStorage.key(i)] = localStorage.getItem(localStorage.key(i)); }
        for (var i = 0; i < sessionStorage.length; i++){ postix[sessionStorage.key(i)] = sessionStorage.getItem(sessionStorage.key(i)); }
            
        await fetch(phphat+"?pcache="+pcache+"&fetchx="+pcache, {
      method: "POST", body: JSON.stringify(Object.assign({}, postix)), headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(response => response.body)
	  .then(rb => {
		const reader = rb.getReader();
		  return new ReadableStream({
			start(controller) {
			  function push() {
				reader.read().then( ({done, value}) => {
				  if (done) {
					controller.close(); return;
				  }
				  controller.enqueue(value); 
				  switch ( pend ){
                			case 'append' : $("#"+divid).append(new TextDecoder().decode(value)); break;
               			 	case 'prepend' : $("#"+divid).prepend(new TextDecoder().decode(value)); break;
                			default : $("#"+divid).html(new TextDecoder().decode(value)); break;
            			  }
				  push();
				})
			  }
			push();
			}
		  });
		});
          
    }
