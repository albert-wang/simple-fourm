(function()
{
	var INITIAL_OFFSET = 50;
	var SCROLL_AMOUNT = 40;

	function createScrollable(id)
	{
		var main = $("#" + id + " > .scrollable");

		main.bind("mousewheel", function(event)
		{
			var ct = event.currentTarget;
			var position = $(ct).data("top") || INITIAL_OFFSET;

			var delta = event.originalEvent.wheelDelta;

			if (delta >= 0)
			{
				position += SCROLL_AMOUNT;
			} 
			else 
			{
				position -= SCROLL_AMOUNT;
			}

			if (position > INITIAL_OFFSET)
			{
				position = INITIAL_OFFSET;
			}

			if (position < -(main.height() - $(document).height()))
			{
				position = -(main.height() - $(document).height());
			}

			$(ct).data("top", position);
			$(ct).css("top", position);
		});

		
	}



	fourm = {};
	fourm.ui = {
		createScrollable: createScrollable
	}

}());