#First Attempt At Web App Using Express, Node.js, Jade, Socket.io, & more to come.

12/16/14 - 

###To Mongo Or Not To Mongo, This Is The Question

I should probably figure out authentication first. It shouldn't be too difficult, granted I am sitting next to "Impractical Jokers" blasting out of a soundbar && A and K speaking loudly across from me (as always). Business as usual around here.

So: 2 Options here:
MongoDB - Use mongoose and passport to authenticate.
MySQL - Figure out how to authenticate using MySQL and res.connection. I will probably do this.

--SSJ

12/17/14 - 

###I did not mongo.

And this, made me happy. Finally got the authentication to work. Note to self: read documentation before using new plugins. I was trying to compare two hashes with bcrypt, when bcrypt only allows you to compare a string to a hash. Whomp whomp whomp. Only took me a little while to figure it out with a fresh mind.

Lesson: Sleep on a problem and come at it the next day. 

Also, I removed Socket.io from the plugins I'm using. I may incorporate a chatroom at some point doe. I think it would be cool, until the internet got a hold of it. If the site got that much traffic I think I could cope though.

TODO List: 

Database Stuff: ORM, Design, Pretty Much Everything in between  
Figure out how to post these blogs  
body layout  
a ton more other stuff.  
Passport for outside auth, for the hell of it.  
I should probably scaffold the file system a little better too.  
Redis for Session storage?  

Oh, and I got the sessions working today too (redundancy ftw). That was easy though.

--SSJ

*12/22/14*

###Routes, Routes, Routes

So, I took a few days off this weekend. Christmas is coming and I had some other stuff to take care of. SO, when I got back to it, I popped open my routes.js file and decided to split it into several different files, one each for the possible route URL's, combining all the CRUD methods needed for each.

At least its all easy to find now, eh? There is probably a better way to do it than storing each action as a JSON element, but it works for now. 

More to come this evening.

----------------------------------------------------------------

So, I decided to use Sequelize for my ORM today. Getting it working is a bit of a pain so far, but I think it's actually coming along pretty well (so far). It works pretty niftily, takes a lot of me writing SQL queries out of it, although that definately would have been faster at this point I reckon. 

I'm getting a validation error from sequelize. I'm going to track it down before I go to sleep preferably. I think I'll shower first though.

More to come this evening still! (Maybe. It's 1:21 AM EST Folks.)

-----------------------------------------------------------------

3AM : Got sequelize signup to work. Could not get login to work. 

Too Tired. Until tommorrow, anyone who cares enough to read this.

--SSJ