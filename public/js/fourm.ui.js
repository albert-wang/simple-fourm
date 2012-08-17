
//Some UI utility methods, for creating scrollbars and such things.
(function ()
{
	var INITIAL_OFFSET = 50;
	var SCROLL_AMOUNT = 250;

	function createScrollable(id)
	{
      var main = $("#" + id + " > .scrollable");
	    var bar  = $("#" + id + " > .scrollbar");

	    /*
		* Bar position = (position / total) * (total - barsize)
		* barsize / scrollsize = pagesize / totalsize;
		*  -> pagesize / totalsize * scrollsize;
		*/
	
	    function resetBar()
	    {
		    var min = 0;
		    var max = main.height() - $(document).height() + INITIAL_OFFSET;

		    var size = ($(document).height() - INITIAL_OFFSET) * ($(document).height() - INITIAL_OFFSET) / main.height();
		    bar.css("height", size + "px");

		    var off = main.data("top") || 0;
		    off = off / max * ($(document).height() - size - INITIAL_OFFSET);
		    off = off + INITIAL_OFFSET;

		    bar.css("top", off + "px");
	    }

      function moveBar(delta)
      {
          bar.css("opacity", 1.0);
	        bar.show();

	        var position = $(main).data("top") || 0;

	        if (delta > 0) {
	            position -= SCROLL_AMOUNT;
	        }
	        else {
	            position += SCROLL_AMOUNT;
	        }

	        if (position < 0) {
	            position = 0;
	        }

	        if (position > (main.height() - $(document).height() + INITIAL_OFFSET)) {
	            position = (main.height() - $(document).height() + INITIAL_OFFSET);
	        }

	        $(main).data("top", position);
	        $(main).css("top", -position + INITIAL_OFFSET);

	        resetBar();

	        bar.stop(true);
	        bar.delay(250).fadeOut();

      }

	    $(window).resize(function() {
        resetBar();
        moveBar(0);
      });

	    main.bind("mousewheel", function(event)
	    {
        moveBar(event.originalEvent.wheelDelta);
      });

	    resetBar();
	}

  function renderThreads(threads, depth)
  {
    var result = "";
    if (!depth) {
      depth = 0;
    }

    for (x in threads) { 
      var obj = threads[x];
      result += Mustache.render(fourm.templates.navigation, obj);
      if (obj.children) {
        result += "<ul class='collapsable'>"; 
        result += renderThreads(obj.children, depth + 1);
        result += "</ul>";
      }
    }

    return result;
  }

	var fourm = {};
	fourm.ui =
    {
		createScrollable: createScrollable,
    renderThreads: renderThreads
    }

	window.fourm = fourm;
}());

//Templates
(function ()
{
	var navigationTemplate =
    "<a href='#'><li>" +
      "<div class='title'><div class='avatar'><img src='http://2.gravatar.com/avatar/0d8d5485c71164e89c41f0cc22d8cc10'/></div>" +
      "<p>{{title}}<span class='extra'>&nbsp;{{extra}}</span></p><span class='count'>{{count}}</span></div><div class='clearboth'></div>" +
    "</li></a>";

	window.fourm.templates = {
		navigation: navigationTemplate,
	}
}())
