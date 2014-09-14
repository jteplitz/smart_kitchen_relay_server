(function(){
  "use strict";
  var socket = require('socket.io-client')('http://localhost:3000'),
      process = require("child_process"),

  // functions
    say, order;

  socket.on("connect", function(){
    console.log("connected");
    socket.on("order_item", function(msg){
      var item = msg.name;
      order(item);
    });
    socket.on("say", function(msg){
      console.log("got", msg);
      say(msg.msg);
    });
  });

  order = function(item){
    console.log("ordering", item);
    process.exec("java AmazonBuyer " + item);
  };

  say = function(msg){
    console.log("saying " + msg);
    process.exec("say \"" + msg + "\"");
  };
}());
