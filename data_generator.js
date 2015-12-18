/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 */

// set up data structures
window.streams = {};
streams.home = [];
streams.users = {};
streams.users.shawndrost = [];
streams.users.sharksforcheap = [];
streams.users.mracus = [];
streams.users.douglascalhoun = [];
window.users = Object.keys(streams.users);

// utility function for adding tweets to our data structures
var addTweet = function(newTweet){
  var username = newTweet.user;
  streams.users[username].push(newTweet);
  streams.home.push(newTweet);
};

// utility function
var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator
var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
var verbs = ['drank', 'drunk', 'deployed', 'got', 'developed', 'built', 'invented', 'experienced', 'fought off', 'hardened', 'enjoyed', 'developed', 'consumed', 'debunked', 'drugged', 'doped', 'made', 'wrote', 'saw'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

var randomMessage = function(){
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
var generateRandomTweet = function(){
  var tweet = {};
  tweet.user = randomElement(users);
  tweet.message = randomMessage();
  tweet.created_at = new Date();
  addTweet(tweet);
};

for(var i = 0; i < 10; i++){
  generateRandomTweet();
}

var scheduleNextTweet = function(){
  generateRandomTweet();
  setTimeout(scheduleNextTweet, Math.random() * 1500);
};
scheduleNextTweet();


$(document).ready(function(){
  function loadTweets() {
    var main = $('#main');
    main.html('');

    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var user = tweet.user;
      var message = tweet.message;
      var time = moment(tweet.created_at).fromNow();
      var $tweet = $('<div class="tweet"></div>');
      var $user = $('<h2 class="user"></h2>');
      var $message = $('<p class="message"></p>');
      var $time = $('<p class="time"></p>');
      $user.text('@' + user).addClass(user);
      $message.text(message);
      $time.text(time);
      $tweet.appendTo(main);
      $user.appendTo($tweet);
      $message.appendTo($tweet);
      $time.appendTo($tweet);
      index -= 1;
    }
  };
  loadTweets();


  $('body').on('click', '#new-tweet', loadTweets);
  $('body').on('mouseenter', '.tweet', function() {
    $(this).toggleClass('highlighted');
  });
  $('body').on('mouseleave', '.tweet', function() {
    $(this).toggleClass('highlighted');
  });
  function loadUserTweets() {
    var main = $('#main');
    main.html('');
    var thisUser = $(this).text().slice(1);
    var tweets = streams.users[thisUser];
    var index = tweets.length - 1;
    while(index >= 0){
      var tweet = tweets[index];
      var message = tweet.message;
      var time = moment(tweet.created_at).fromNow();
      var $tweet = $('<div class="tweet"></div>');
      var $user = $('<h2 class="user"></h2>');
      var $message = $('<p class="message"></p>');
      var $time = $('<p class="time"></p>');
      $user.text('@' + thisUser).addClass(thisUser);
      $message.text(message);
      $time.text(time);
      $tweet.appendTo(main);
      $user.appendTo($tweet);
      $message.appendTo($tweet);
      $time.appendTo($tweet);
      index -= 1;
    }
  }
  $('body').on('click', '.user', loadUserTweets);
  // utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
var writeTweet = function(message){
  var visitor = $('input[name=username]').val();
  var message = $('textarea[name=message]').val();
  var time = new Date();
  if(!visitor){
    throw new Error('set the global visitor property!');
  }
  var tweet = {};
  tweet.user = visitor;
  tweet.message = message;
  tweet.created_at = time;
  if(!streams.users[visitor]) {
    streams.users[visitor] = [];
  }
  addTweet(tweet);
  loadTweets();
};
  $('body').on('click', '#write-tweet', writeTweet);

});
