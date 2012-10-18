
/**
 * @fileoverview Serves as the view controller for the Coffee Counter.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('coffee.CoffeeController');

goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.events.EventTarget');
goog.require('goog.ui.Control');



/**
 * Connects listeners to the buttons.
 *
 * @param {!Element} contentElement The element for this controller’s content.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
coffee.CoffeeController = function(contentElement) {
  goog.base(this);

  /**
   * Container element for this controller's content.
   * @type {!Element}
   * @private
   */
  this.container_ = contentElement;

  /**
   * Cups of coffee
   * @type {number}
   */
  this.cups = 0;

  /**
   * Array of button controls.  Reference held for later disposal.
   * @type {Array.<goog.ui.Control>}
   * @private
   */
  this.buttonControls_ = [];
  
  /**
   * Holds events that should only be removed when the controller is disposed.
   * @type {goog.events.EventHandler}
   * @private
   */
  this.eventHandler_ = new goog.events.EventHandler(this);

  this.init_();
};
goog.inherits(coffee.CoffeeController, goog.events.EventTarget);


/**
 * Index of the decrement button control.
 * @type {number}
 * @const
 */
coffee.CoffeeController.DECREMENT_BUTTON = 0;


/**
 * Index of the reset button control.
 * @type {number}
 * @const
 */
coffee.CoffeeController.RESET_BUTTON = 1;


/**
 * Index of the increment button control.
 * @type {number}
 * @const
 */
coffee.CoffeeController.INCREMENT_BUTTON = 2;


/**
 * Logger for this class.
 * @type {goog.debug.Logger}
 */
coffee.CoffeeController.prototype.logger =
    goog.debug.Logger.getLogger('coffee.CoffeeController');


/**
 * Initialize the view controller.
 * @private
 */
coffee.CoffeeController.prototype.init_ = function() {
  // Add control objects to the buttons.
  var buttonEls = goog.dom.getElementsByClass('button');
  for (var i = 0; i < buttonEls.length; i++) {
    var buttonControl = new goog.ui.Control('');
    buttonControl.decorate(buttonEls[i]);
    this.eventHandler_.listen(buttonControl, goog.ui.Component.EventType.ACTION,
        this.handleButtonPress_);
    this.buttonControls_.push(buttonControl);
  }
  this.updateView_();
};


/**
 * Handles a click on a button.
 * @param {goog.events.Event} e Click event.
 * @private
 */
coffee.CoffeeController.prototype.handleButtonPress_ = function(e) {
  var buttonIndex = goog.array.indexOf(this.buttonControls_, e.target);
  switch (buttonIndex) {
    case coffee.CoffeeController.DECREMENT_BUTTON:
      this.cups--;
      break;
    case coffee.CoffeeController.RESET_BUTTON:
      this.cups = 0;
      break;
    case coffee.CoffeeController.INCREMENT_BUTTON:
      this.cups++;
      break;
  }
  this.updateView_();
};


/**
 * Updates the view state.
 * @private
 */
coffee.CoffeeController.prototype.updateView_ = function() {
  var messageEl = goog.dom.getElementByClass('message');
  var coffeeImg = window.document.querySelector('img');
  
  if (this.cups > 0) {
    goog.dom.classes.remove(window.document.body, 'no-cups'); 
  } else {
    goog.dom.classes.add(window.document.body, 'no-cups');
  }
  messageEl.innerHTML = "You've had " + this.cups + " cups of coffee.";
  if (this.cups == 1) {
    messageEl.innerHTML = "You've had " + this.cups + " cup of coffee.";
    goog.dom.classes.set(coffeeImg, '');
  } else if (this.cups == 2) {
    goog.dom.classes.set(coffeeImg, 'two-cups');
  } else if (this.cups == 3) {
    goog.dom.classes.set(coffeeImg, 'three-cups');
  } else if (this.cups == 4) {
    goog.dom.classes.set(coffeeImg, 'four-cups');
  } else if (this.cups > 4) {
    goog.dom.classes.set(coffeeImg, 'many-cups');
  } else {
    goog.dom.classes.set(coffeeImg, '');
  }
};


/** @inheritDoc */
coffee.CoffeeController.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');

  // Remove listeners added.
  this.eventHandler_.removeAll();
  goog.dispose(this.eventHandler_);
  delete this.eventHandler_;

  // Remove listeners added by controls.
  for (var i = 0; i < this.buttonControls_.length; i++) {
    goog.dispose(this.buttonControls_[i]);
  }
  delete this.buttonControls_;

  // Remove the DOM elements.
  goog.dom.removeChildren(this.container_);
};
