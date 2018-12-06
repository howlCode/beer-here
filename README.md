# Beer Here!

## What is it?

This application features multiple ways to view the beers pulled from the Punk API at:
https://punkapi.com/documentation/v2
Users can explore the beers offered through the API, including infinite scroll in the main page,by searching beer names, filtering through the beers by the Hops and Malts used in crafting the beer, and finally filtering beers by keywords related to food and food pairing. Users can pour (get it?) through detailed data of every beer, and share the beer through social media links.
I chose to go with Vue and Vuetify as I find these tools to be the most productive and efficient for building a rich UI/UX. These tools, off the shelf, are modern, clean, and robust.

## How do I use it?

-Currently live at:  
https://beer-here.howlcode.com/

To run it on your local machine, follow these steps:
-Clone down the repo here  
-cd into the cloned directory  
-run yarn install  
-run yarn run serve  
-visit http://localhost:8080 on your machine to see it

Alternatively, you can pull down a docker image:  
docker pull miromanyth/beer-here  
and run it through docker using the command:  
docker run -it -p 8080:8080 --rm --name beer-here

## Future Plans

In V2 of this app, given more time and scope, this project would include jest tests structured around the API calls and filtering functions as they are most important as it relates to the UX.
Long term, I intend to connect to other API's which will enable the ability to not only learn about the beers themselves but how they can be applied to a community. I will implement a forum for brewers to discuss attempts at crafing the beers at home. I will create a space where users can share recipes conceived after learning about potential food pairings with a particular beer.
'Untappd' has an API that I could hook into so that a user could locate the beer and pick one up local to them.
