
/**
 * @fileoverview Serves as the view controller for the Coffee Counter.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('coffee.CoffeeController');

goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');



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


  /* TODO: Add member variables specific to this controller */
  
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

};




/** @inheritDoc */
coffee.CoffeeController.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');

  // Remove listeners added.
  this.eventHandler_.removeAll();
  goog.dispose(this.eventHandler_);
  delete this.eventHandler_;

  // TODO: Dispose of controls.
  
  // Remove the DOM elements.
  goog.dom.removeChildren(this.container_);
};
