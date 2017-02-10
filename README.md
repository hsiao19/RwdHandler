# RwdHandler
Handling responsive behavior.

Execute given behavior under specific width, and execute rollback function when the screen width not in the specific width.

----
### Installation

Just clone or download the zip of this repository

or via [npm](https://www.npmjs.com/package/rwd-handler):

~~~bash
# npm install --save rwd-handler
~~~

### Setup

~~~html
<script src='path/to/RwdHandler.min.js'></script>
~~~

or

~~~javascript
// import in your .js file
import RwdHandler from 'rwd-handler';
~~~

----

### RwdHandler()

* __minWidth__: _number_ 
Minimum width of screen.
* __maxWidth__: _number_ 
Maximum width of screen.
* __behavior__: _function_  
The function going to execute under given screen width.
* __rollback__: _function_  
The function for returning behavior to previous state.

~~~javascript
const rwdHandler = new RwdHandler({
    minWidth: 480,
    maxWidth: 720,
    behavior: rwdBehavior, //behavior function
    rollback: rollback //rollback function
});
~~~

### execute()

Execute rwd behavior under specific width, and execute rollback function when the screen width not in the specific width.

~~~javascript
rwdHandler.execute();
~~~

### stopExecute()

Stop executing rwd behavior.

~~~javascript
rwdHandler.stopExecute();
~~~

### changeDetectWidth(minWidth, maxWidth)

Change rwd detect width.

* __minWidth__: _number_ 
Minimum width of screen.
* __maxWidth__: _number_ 
Maximum width of screen.

~~~javascript
rwdHandler.changeDetectWidth(0, 720);
~~~

### changeBehavior(behavior)

Change rwd behavior.

* __behavior__: _function_  
The function going to execute under given screen width.

~~~javascript
rwdHandler.changeBehavior(behavior);
~~~

### changeRollback(rollback)

Change rwd rollback function.

* __rollback__: _function_  
The function for returning behavior to previous state.

~~~javascript
rwdHandler.changeRollback(rollback);
~~~

### changeConfig(options)

Change all handler config.

* __options__: _object_  
RwdHandler options.

~~~javascript
rwdHandler.changeConfig(options);
~~~
