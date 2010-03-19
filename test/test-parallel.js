var Do = require('do');
var sys = require('sys');
var assert = require('assert');

var success_count = 0;
var error_count = 0;


Do.parallel(
  	func1(),
		func4()
)(function (res1, res2,res3) {
   sys.puts("callback called");
	 success_count++;
}, errorHandler);

Do.parallel(
  	func1(),
	func2(),
	func3()
)(function (res1, res2,res3) {
  sys.puts("callback called");
	 success_count++;
}, errorHandler);


function func1() { return function (callback, errback) {
	process.nextTick(function () {
 		callback("result from func1");
	});
}}


function func2() { return function (callback, errback) {
	process.nextTick(function () {
 		errback(new Error("error in func2"));
	});

}}

function func3() { return function (callback, errback) {
	process.nextTick(function () {
  	errback(new Error("error in func3"));
	});
}}

function func4() { return function (callback, errback) {
	process.nextTick(function () {
 		callback("result from func4");
	});
}}

function errorHandler() { 
	sys.puts("errback called");
	error_count++;
}


process.addListener("exit", function () {
  assert.equal(1, success_count);
  assert.equal(1, error_count);
});
