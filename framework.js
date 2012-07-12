(function(){  
	var Quirk = function(selector)
	{		
		var type = selector.charAt(0);
		var element = selector.substring(1,selector.length);

		switch(type)
		{
			case '#':
				e = Quirk.select.id(element);

				// Quirk.select.id(element);
				return ret;
			break;
			case '.':
				return Quirk.select.class(element);
			break;
			case '<':
				return Quirk.select.new(selector);
			break;
			default:
				return document.getElementsByTagName(selector)[0];
			break;
		}
	}

	var qObj = function(element)
	{
		this.element = element;
		this.text = function(str)
		{
			this.element.innerHTML = str;
		}
		this.attr = function()
		{
			switch(attributes.lengthd)
			{
				case 1:

				break;


			}
		}
	}


	// add a function to the wait queue.
	Quirk.ready = function(func)
	{
		Quirk.ready.wait.push(func);
	}


	Quirk.ready.wait = []

	Quirk.select = {
		cache : {}, 
		id : function(selector)
		{
			if(!this.cache[selector])
				this.cache[selector] = document.getElementById(selector);
			
			return this.cache[selector];
		},
		class : function(selector){


		},
		new : function(selector){
			if(selector.charAt(selector.length - 1) == '>')
			{
				element = selector.substring(1,selector.length - 1);
				return document.createElement(element);
			}
		}

	}

	//once document is loaded, loop through the wait list and execute and functions.
	document.onreadystatechange = function()
	{
		if(document.readyState == 'complete')
		{
			for(var i=0; i < Quirk.ready.wait.length; i++)
				Quirk.ready.wait[i]();
		}
	}

   	if(!window.$q){window.$q = window.Quirk = window.Q = Quirk;}
})();

