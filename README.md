#First Attempt At Web App Using Express, Node.js, Jade, Socket.io, & more to come.

12/16/14 - 

###To Mongo Or Not To Mongo, This Is The Question

I should probably figure out authentication first. It shouldn't be too difficult, granted I am sitting next to "Impractical Jokers" blasting out of a soundbar && A and K speaking loudly across from me (as always). Business as usual around here.

So: 2 Options here:
MongoDB - Use mongoose and passport to authenticate.
MySQL - Figure out how to authenticate using MySQL and res.connection. I will probably do this.

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


Oh, and I got the sessions working today too (redundancy ftw). That was easy though.

--SSJ