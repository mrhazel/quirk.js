(function(){
	var Quirk = function(selector)
	{
		var type = selector.charAt(0);
		var element = selector.substring(1,selector.length);


		switch(type)
		{
			case '#':
				e = Quirk.select.id(element);
			break;
			case '.':
				e = Quirk.select.class(element);
			break;
			case '<':
				e = Quirk.select.new(selector);
			break;
			default:
				return document.getElementsByTagName(selector)[0];
			break;
		}
		return new qObj(e);
	}

	// add a function to the wait queue.
	Quirk.ready = function(func)
	{
		Quirk.ready.queue.push(func);
	}

	Quirk.ready.queue = []

	//once document is loaded, loop through the wait list and execute and functions.
	document.onreadystatechange = function()
	{
		if(document.readyState == 'complete')
		{
			for(var i=0; i < Quirk.ready.queue.length; i++)
				Quirk.ready.queue[i]();
		}
	}

	Quirk.select = {
		cache : {}, 
		id : function(selector)
		{
			if(!this.cache[selector])
				this.cache[selector] = document.getElementById(selector);
			
			return this.cache[selector];
		},
		class : function(selector){
			// TODO
		},
		new : function(selector){
			if(selector.charAt(selector.length - 1) == '>')
			{
				element = selector.substring(1,selector.length - 1);
				return document.createElement(element);
			}
		}

	}

	// this is where most of the magic happens.
	var qObj = function(element)
	{
		this.element = element;
		this.type = element.tagName.toLowerCase();
		this.events = []

		// kinda hacky right now.
		// not all objects require all methods.  Here we provided object specific methods.
		switch(this.type)
		{
			case 'a':
				this.href 	= function(url) 	{ this.attr('href',url); 		return this;}
				this.target = function(target) 	{ this.attr('target',target); 	return this;}
			break;
		}

		this.on = function(action, func)
		{
			this.events[action] = func;

			this.element.addEventListener(action, this.events[action], false);
			return this;
		}

		this.off = function(action)
		{
			this.element.removeEventListener(action, this.events[action]);
		}

		this.text = function()
		{
			switch(arguments.length)
			{
				case 0:
					return this.element.innerHTML;
				break;
				case 1:
					this.element.innerHTML = arguments[0];
					return this;
				break;
			}
		}
		
		this.attr = function()
		{
			switch(arguments.length)
			{
				case 1:
					return this.element.getAttribute(arguments[0]);
				break;
				case 2:
					this.element.setAttribute(arguments[0], arguments[1]);
					return this;
				break;
			}
		}
		
		this.addClass = function(c)
		{
			this.element.classList.add(c);
		}
		
		this.removeClass = function(c)
		{
			this.element.classList.remove(c);
		}
		
		this.append = function(child)
		{
			if(child instanceof qObj)
				this.element.appendChild(child.element);
			else
				this.element.appendChild(child);
		}
		
		this.appendTo = function(parent)
		{
			console.debug(parent);
			if(parent instanceof qObj)
				parent.element.appendChild(this.element);
			else
				parent.appendChild(this.element);
		}

		this.hide = function()
		{
			this.element.style.visibility = 'hidden';
		}

		this.show = function()
		{
			this.element.style.visibility = 'visible';
		}

		this.toggle = function()
		{
			this.element.style.visibility = (this.element.style.visibility == 'hidden' ? 'visible' : 'hidden');
				

		}

	}

	if(!window.$q || !window.Quirk){window.$q = window.Quirk = window.Q = Quirk;}
})();

