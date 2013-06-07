/* 
Copyright (C) 2013, Evan Krambuhl

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

(function ($) {
    $.fn.extend({
        dropasaur: function (extend) { 
            var options = $.extend({                
                style : {
                    scriptless : "is-scriptless",
                    expanded   : "is-expanded"
                },
                select : { 
                	item : ".dropdown-item",
                	tab  : ".megadrop-title"
                },
                events : {
                    start : 'hover',
                    end   : 'mouseleave'
                },
                
                toggle: false, 
                
                timer   : null,
                timeout : 1500 // time in ms before hiding the menu on mouseleave.
            }, extend);
            
            
            return this.each(function () {
                var base = this;
                $(this).removeClass(options.style.scriptless);
                 
                // add expanded class on event & delete timer if there is one running
                $(options.select.tab, base).bind(options.events.start, function (e) {
                    clearTimeout(options.timer);
                    
                    var index = $(this).index(options.select.tab)
                    $(base).attr('data-dropasaur-index', index);
                    
                    if (!options.toggle) {
                        $(options.select.item, base).removeClass(options.style.expanded).eq(index).addClass(options.style.expanded);
                    } else {
                        $(options.select.item, base).eq(index).toggleClass(options.style.expanded);
                    }
                })
                
                // on leave event start timer,\ remove expanded class on timer finish
                $(options.select.item, base).bind(options.events.end, function (e) {                	
                	with ({that : this}) {
	                    options.timer = setTimeout(function() {
		                	var index = $(that).index(options.select.item);
		                    $(options.select.item, base).eq(index).removeClass(options.style.expanded);
		                }, options.timeout);	                	
                	}
	                
                });
            });
        }   
    })
})(jQuery);