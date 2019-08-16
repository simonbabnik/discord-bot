const Discord = require('discord.js');
var cheerio = require("cheerio");
var request = require("request");

const client = new Discord.Client;
const token = 'insert-your-token-here';


//sets the bot status to "playing !help"
//if the bot works properly, it logs "nibba" in the console
client.on('ready', () => {
    client.user.setStatus("available")
    client.user.setPresence({
        game: {
            name: '!help | give me permissions to join your voice channel!',
            type: "PLAYING",

        }
    });
    console.log('nibba');
});


//connecting to a voice channel (if user is in it)
//and playing a sound

client.on("message", function(message) {

    var msg = message.content;    

    //trigger words
    //(replace with your own if you want)
    //if the message includes the word, the bot will trigger and join the channel (if the user is in it)

    if (msg.includes("nigger") || msg.includes("nibba") || msg.includes("negro") || msg.includes("nigga")){

        var voiceChannel = message.member.voiceChannel;

        if (message.author.bot) return;

        if (!voiceChannel) return message.channel.send("Nigga you ain't in no voice channel")

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return message.channel.send('I need the permissions to join and speak in your voice channel!');            
        }         

        if (message.member.voiceChannel != undefined){

        voiceChannel.join().then(connection =>

        {
            const dispatcher = connection.playFile('./Sounds/nigger.wav');

            dispatcher.on("end", end => {
                voiceChannel.leave();
                });

    
     }).catch(err => console.log(err));    
    }    

 }});



/////////////////////////////////////////////////////////////////////////////////////////////////
// a simple image searching function


client.on("message", function(message) {

    // Splits message into an array for every space, our layout: "<command> [search query]" will become ["<command>", "search query"]
    var parts = message.content.split(" "); 
 
    // Simple command manager 
    if (parts[0] === "nigger") { // Check if first part of message is ..
 
        // call the image function
        image(message, parts); // Pass requester message to image function
 
    }
  });

 
function image(message, parts) {
 
    // extract search query from message
 
    var search = parts.slice(1).join(" "); // Slices of the command part of the array ["!image", "cute", "dog"] ---> ["cute", "dog"] ---> "cute dog"
 
    //the search result is "hard coded" 
    //you can change it to only search the content after the trigger word
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=nigger" + search,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function(error, response, responseBody) {
        if (error) {
            // handle error
            return;
        }
 
        // Extract image URLs from responseBody using cheerio
 
        $ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)
 
        // In this search engine they use ".image a.link" as their css selector for image links
        var links = $(".image a.link");
 
        // We want to fetch the URLs not the DOM nodes, we do this with jQuery's .attr() function
        // this line might be hard to understand but it goes thru all the links (DOM) and stores each url in an array called urls
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        console.log(urls);
        if (!urls.length) {
            message.channel.send("No results found :^(")
            // Handle no results
            return;
        }

        //send a random result from the array of results
        var randInt = Math.floor(Math.random() * urls.length); 
 
        // Send result
        message.channel.send( urls[randInt] );
    });

};

client.on("message", function(message) {
    if (message.content === "!help"){

        message.channel.send("If your message includes one of the following:\n \nnibba\nnigga\nnegro\nnigger\n\nit will trigger the bot, make him join your voice channel and play a funny sound.\n \nUse \"nigger\" for a funny picture ;)\n\nYou can also add something after it (for example: nigger black)")

    }});


client.login(token);

