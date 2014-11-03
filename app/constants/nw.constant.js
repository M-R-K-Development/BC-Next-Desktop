var gui = require('nw.gui');
var fs = require('fs');

var appDir = process.cwd();


win = gui.Window.get();
win.maximize();
var nativeMenuBar = new gui.Menu({ type: "menubar" });
try {
nativeMenuBar.createMacBuiltin("My App");
win.menu = nativeMenuBar;
} catch (ex) {
console.log(ex.message);
}
