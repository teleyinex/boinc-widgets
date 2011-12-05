(function($){
		$.widget("ui.throbber", {
				// default options
				options: {
					overlay: true,
					hidden: true,
					addClass: '',
					global: false,
					speed: 50
				},
				_create: function() {
					var self = this;
					self.throbberElement = $('<div/>', {
							'class': 'ui-throbber'
						}
					)
					.appendTo( self.element );


					self.throbber = $('<div/>', 
						{ 
							'class': 'ui-throbber-image' 
						}
					)
					.appendTo( self.throbberElement );

					self.overlay = $('<div/>', 
						{ 
							'class': 'ui-throbber-overlay' 
						}
					)
					.hide()
					.appendTo( self.element );

					if (! self.options.hidden) {
						self.throbberElement.fadeIn('fast');
						if( self.options.overlay ) {
							self.overlay.show();
						}
					}

				},
				show: function() {
					var self = this;
					if( ! self.throbberId ) {
						self.throbber.css('left', 0);
						var relativeElement = self.options.global ? $(window) : self.element;
						relativeElement.bind( 'resize.throbber', function() {
								if( self.options.overlay ) {
										self.overlay
										.width(relativeElement.width())
										.height(relativeElement.height());
								}

								self.throbberElement
								.position({
										'my': 'center',
										'at': 'center',
										'of': relativeElement[0],
										'collision': 'none'
									}
								);
							}
						).triggerHandler('resize.throbber' );

						if( self.options.overlay ) {
							self.overlay.show();
						}
						self.throbberElement.fadeIn('fast');
						relativeElement.triggerHandler('resize.throbber' );
						var throbberWidth = self.throbber.width();
						var throbberContainerWidth = self.throbberElement.width();
						self.throbberId = setInterval(function(){
								var cur_left = Math.abs(self.throbber.position().left);

								self.throbber.css(
									{
										'left': -((cur_left + throbberContainerWidth) % throbberWidth)
									}
								);


							}, self.options.speed);
					}

				},
				hide: function() {
					var self = this;
					if( self.throbberId ) {
						clearInterval( self.throbberId );
						var relativeElement = self.options.global ? $(window) : self.element;
						relativeElement.unbind( 'resize.throbber' );
						self.throbberId = null;
						self.throbberElement.fadeOut('fast');
						if( self.options.overlay ) {
							self.overlay.hide();
						}
					}	   
				},
				destroy: function() {
					$.Widget.prototype.destroy.apply(this, arguments); // default destroy
					this.throbber.remove();
					this.overlay.remove();
					if( this.wasHidden ) {
						this.element.hide();
					} else {
						this.element.show();
					}
				}
			}
		);
		var globalThrobber = null;
		$.throbber = {
			show: function( o ) {
				if( ! globalThrobber ) {
					var options = $.extend( { 'global': true }, o );
					globalThrobber = $('<div />', { 
							'position': 'fixed',
							'top': 0,
							'left': 0
						}
					)
					.appendTo( 'body' )
					.throbber(options);
				}
				globalThrobber.throbber('show');
			},
			hide: function() {
				if( globalThrobber ) {
					globalThrobber.throbber('hide');
				}
			}
		}		
	}
)(jQuery);
