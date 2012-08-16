(function()
{
	var INITIAL_OFFSET = 50;
	var SCROLL_AMOUNT = 40;

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

    $(window).resize(resetBar);

		main.bind("mousewheel", function(event)
		{
      bar.css("opacity", 1.0);
      bar.show();

			var position = $(main).data("top") || 0;
			var delta = event.originalEvent.wheelDelta;

			if (delta >= 0)
			{
				position -= SCROLL_AMOUNT;
			} 
			else 
			{
				position += SCROLL_AMOUNT;
			}

			if (position < 0)
			{
				position = 0;
			}

			if (position > (main.height() - $(document).height() + INITIAL_OFFSET))
			{
				position = (main.height() - $(document).height() + INITIAL_OFFSET);
			}

			$(main).data("top", position);
			$(main).css("top", -position + INITIAL_OFFSET);

      resetBar();

      bar.stop(true);
      bar.delay(250).fadeOut();
		});

    resetBar();
	}

	fourm = {};
	fourm.ui = {
		createScrollable: createScrollable
	}

}());
