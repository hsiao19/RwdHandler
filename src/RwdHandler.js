/*!
 * RwdHandler - v1.0.0 2017-01-07
 * https://github.com/hsiao19/RwdHandler
 * 
 * Copyright (c) 2017 Yu-Tung, Hsiao
 * Licensed MIT <https://github.com/hsiao19/RwdHandler/blob/master/LICENSE>
 */

/**
 * Rwd handler module.
 * Execute given behavior under specific width, and execute rollback function 
 * when the screen width not in the specific width.
 * @module RwdHandler
 */

(function(root, factory) {
    if( typeof define === 'function' && define.amd ) {
        define(factory);
    }
    else if(typeof exports === 'object') {
        module.exports = factory(require, exports, module);
    }
    else if( root ) {
        root.RwdHandler = factory();
    }
    else {
        window.RwdHandler = factory();
    }
}(this, (require, exports, module) => {

    /** 
     * Class for rwd behavior.
     * Set behavior under given screen width.
     * Note: If rollback function is given and an event listener is added in 
     * behavior, the event should call off() in rollback function. 
     * e.g. $(element).off('event'), or call off() before bind the event in 
     * behavior. 
     * e.g. $(element).off('event').on('event', fn).
     */
    class RwdHandler {
        
        /**
         * Create a rwd behavior handler.
         * @param {object} options - RwdHandler options.
         * @param {number} [options.minWidth=null] - Minimum width of screen.
         * @param {number} [options.maxWidth=null] - Maximum width of screen.
         * @param {function} options.behavior - A function going to execute 
         *                                      under given screen width.
         * @param {function} [options.rollback-null] - A function for returning 
         *                                             behavior to previous 
         *                                             state.
         */
        constructor(options) {
            this.doneBehavior = false;
            this.config = {
                minWidth: null,
                maxWidth: null,
                behavior: null,
                rollback: null
            }

            // set handler config
            this._setConfig(options);        
        }

        /**
         * Set rwd handler config value.
         * @param {object} options - RwdHandler options.
         * @param {number} [options.minWidth=this.config.minWidth]
         *                  - Minimum width of screen.
         * @param {number} [options.maxWidth=this.config.maxWidth]
         *                  - Maximum width of screen.
         * @param {function} [options.behavior=this.config.behavior]
         *                    - A function going to execute under given screen 
         *                      width.
         * @param {function} [options.rollback=this.config.rollback]
         *                    - A function for returning behavior to previous 
         *                      state.
         */
        _setConfig(options) {
            // check options type
            if(!options || typeof options !== 'object') {
                throw new Error('options is invalid');
            }

            // set handler config
            if(options.minWidth){
                this.config.minWidth = options.minWidth;
            }
            if(options.maxWidth){
                this.config.maxWidth = options.maxWidth;
            }
            if(options.behavior){
                this.config.behavior = options.behavior;
            }
            if(options.rollback){
                this.config.rollback = options.rollback;
            }

            this._checkConfig();
        }

        /**
         * Check whether the rwd handler config value is correct.
         * @param {object} config - RwdHandler options.
         * @param {number} [config.minWidth=this.config.minWidth]
         *                  - Minimum width of screen.
         * @param {number} [config.maxWidth=this.config.maxWidth]
         *                  - Maximum width of screen.
         * @param {function} [config.behavior=this.config.behavior]
         *                    - A function going to execute under given screen 
         *                      width.
         * @param {function} [config.rollback=this.config.rollback]
         *                    - A function for returning behavior to previous 
         *                      state.
         */
        _checkConfig(config=this.config) {
            // width check
            if(!config.minWidth && !config.maxWidth) {
                throw new Error('minWidth or maxWidth should be given');
            }

            if(config.minWidth && typeof config.minWidth !== "number") {
                throw new TypeError('minWidth should be a number');
            }

            if(config.maxWidth && typeof config.maxWidth !== "number") {
                throw new TypeError('maxWidth should be a number');
            }

            // behavior and rollback check
            if(!config.behavior) {
                throw new Error('behavior should be given');
            }

            if(config.behavior && typeof config.behavior !== "function") {
                throw new TypeError('behavior should be a function');
            }

            if(config.rollback && typeof config.rollback !== "function") {
                throw new TypeError('rollback should be a function');
            }
        }

        /**
         * Execute rwd behavior under specific width, and execute rollback 
         * function when the screen width not in the specific width.
         */
        _doRwdBehavior() {
            let winWidth = window.innerWidth;
            let inGivenWidth = false;

            if (this.config.maxWidth && this.config.minWidth) {
                if (winWidth <= this.config.maxWidth && winWidth > this.config.minWidth){
                    inGivenWidth = true;
                }
            }
            else if (this.config.maxWidth && !this.config.minWidth) {
                if (winWidth <= this.config.maxWidth){
                    inGivenWidth = true;
                }
            }
            else if (!this.config.maxWidth && this.config.minWidth) {
                if (winWidth > this.config.minWidth) {
                    inGivenWidth = true;
                }
            }
            
            if(inGivenWidth) {
                if (this.config.rollback && this.doneBehavior) {
                    this.config.rollback();
                    this.doneBehavior = false;
                }
                this.config.behavior();
                this.doneBehavior = true;           
            }
            else {
                if (this.doneBehavior) {
                    if (this.config.rollback) {
                        this.config.rollback();
                        this.doneBehavior = false;
                    } 
                }                      
            }
        }

        /**
         * Execute rwd behavior under specific width, and execute rollback 
         * function when the screen width not in the specific width.
         */
        execute() {
            this._doRwdBehavior();

            window.addEventListener("resize", () => {
                this._doRwdBehavior();
            });
        }

        /**
         * Stop executing rwd behavior.
         */
        stopExecute() {
            if (this.doneBehavior){
                if (this.config.rollback){
                    this.config.rollback();
                    this.doneBehavior = false;
                } 
            }
            window.removeEventListener("resize", () => {
                this._doRwdBehavior();
            });
        }

        /**
         * Change rwd detect width.
         * @param {number} [minWidth=this.config.minWidth]
         *                  - Minimum width of screen.
         * @param {number} [maxWidth=this.config.maxWidth]
         *                  - Maximum width of screen.
         */
        changeDetectWidth(minWidth, maxWidth) {
            if(minWidth) {
                this.config.minWidth = minWidth;
            }
            if(maxWidth) {
                this.config.maxWidth = maxWidth;
            }            
            this._checkConfig();
        }

        /**
         * Change rwd behavior.
         * @param {function} behavior - rwd behavior.
         */
        changeBehavior(behavior) {
            this.config.behavior = behavior;
            this._checkConfig();
        }

        /**
         * Change rwd rollback function.
         * @param {function} rollback - rollback function.
         */
        changeRollback(rollback) {
            this.config.rollback = rollback;
            this._checkConfig();
        }

        /**
         * Change all handler config.
         * @param {object} options - RwdHandler options.
         * @param {number} [options.minWidth=this.config.minWidth]
         *                  - Minimum width of screen.
         * @param {number} [options.maxWidth=this.config.maxWidth]
         *                  - Maximum width of screen.
         * @param {function} [options.behavior=this.config.behavior]
         *                    - A function going to execute under given screen 
         *                      width.
         * @param {function} [options.rollback=this.config.rollback]
         *                    - A function for returning behavior to previous 
         *                      state.
         */
        changeConfig(options) {
            this._setConfig(options);
        }
    }

    return RwdHandler;
}));
