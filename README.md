# grossjungig-frontend

# 0. Announcements

## Tickets - 03/22/2021

Dear Developers,

* Please don't add any new tickets
* Please take only one ticket (until it's done and live you should stay with that ticket)
Read the description of the Ticket Cards
* Take tickets only if you are going to start so after taking them you should move them to the __Doing__

Thx  
Morteza

___

## Preview Mode and Backend Changes - 03/21/2021
Hi everyone, the followings has been changed:

* Backend - package "cors" has been removed - (please remove ``node_modules/`` from the backend and reinstall the packages ``npm install`` again on Backend) - You will finde the ``Env Vars`` on Slack Dev Channel.

* Please don't use the Grossjungig.de for your testing purposes any more (for example don't create any Dummy Room or Dummy User there anymore for that we are going to use a Dummy DB which is going to work on Local Grossjungig and Online Preview Mode https://grossjungig-de.vercel.app/
For a better understanding I have alternated the title of HTML so you never gonna confuse them on your browser:
    * Production Tab Name: __Grossjungig__
    * Preview Online Tab Name: __Preview Grossjungig__
    * Local Tab Name: __Develop Grossjungig__

Thx  
Morteza
___

## Avoid Bad Merge Request - 03/17/2021
Dear Team please take a look at these changes in the picture.

![Bad Merge Request](https://i.ibb.co/N1qMTRp/bad-git-changes.png)

What we see is caused by an IDE automatically and staged using Git in Terminal. Because the person did not see what he/she is staging, so I appeal to you to use a Git GUI if you don't master Git on Terminal and Console. To check your changes before staging and finally committing.
This picture is an example of a whole over 500 lines unnecessary changes which I'm reviewing in ONLY ONE feature branch in ONLY one COMMIT. These changes have nothing to do with the main purpose of the ticket and this makes the Review very very hard and exhausting and I will every time reject the review. So please use one of the following free Git GUIs on your machine:

__Fork__  
(I suggest for the Mac Users , I had a good experience with it as I worked on MacOS)
https://git-fork.com/

__GitKraken__  
(This is also great but works if the repo on github is public - our project is public on github FOR NOW so you can use it)
https://www.gitkraken.com/
There are a lot more options as a Git GUI which you can use and connect with your Github account or just use it for commits and then at end you can use git push on Terminal again. If you don't want / can't to connect them with your GitHub account.

Thx  
Morteza
___

## Oversized Pictures and Importing Pictures - 03/06/2021
1. Please use ``src/assets/images`` instead of ``public/`` and then use ``import ... from ...`` to add images to the components. It helps the performance.

2. Please be careful of the size of images when you import them into the code. Anastasia's pic was __12MB__ BIG!!! , it's almost 100 times too big and costs the performance enormously!!!  
To optimize the images please use: https://squoosh.app/ 

Thx  
Morteza

___

## Learning Redux - 03/05/2021
Dear team,  
please be noticed I'm going to add the following packages to the project:  

``redux`` , ``react-redux`` and ``redux-thunk`` to the frontend project. You can search these package names in npmjs.com and find the docs, BUT maybe that's too broad, so if you already know these packages that is perfect but if you want to try them and understand the concepts I have found a very good and short tutorial but first it explains the concepts:

 https://medium.com/@jsmuster/using-redux-standalone-497aa85981c1

And if your learning type is just like me VIDEO he is a very great author:
https://youtu.be/poQXNp9ItL4

__For any question please open the thread under this post.__

Thx  
Morteza

___
___
___


# 1. Guidelines

## 1.1. Git

From now on we want to follow some of Git-Flow principles.

* Please create/push your branches from/on ``develop`` branch. (The ``main`` branch will be used for final releases e.g. at the end of each sprint.)

* So from now the pull requests on the ``main`` branch will be rejected.

* We will add an instruction about how to send a merge request on the ``develop`` soon (but if it's already clear for you go on :) ) ...

* Please use ``feature/<branch-name>`` as the naming convention for your branches.

* If this is a page of the website it would be ``feature/page_<page-name>`` (So typically ``_`` is use for separation)

* As some examples we have renamed some branches so you can take a look at the branch names on frontend project on Github.

___

## 1.2. React Practices

We can follow some of Airbnb [rules](https://github.com/airbnb/javascript/tree/master/react) in general.

* Please use only ``<componentName>.css`` for the styling of each component both for desktop and mobile devices. If in some cases you think there's a necessary to use Styled Components, Radium or other React styling methods we can discuss about it.

* The __Styled Components__ have some benefits but in our project we rarely need them one of them is dynamic styling. It's great to create reusable UI components with them. But there are some real __performance issues__ with Styled Components. Learn more [here](https://getstream.io/blog/styled-components-vs-css-stylesheets/#styled-components)

* On the directory ``src/components/`` please do not create DIRECTLY any ``.js`` or ``.css`` files anymore. Instead please use the following pattern:
``src/MyComponent/MyComponent.js``
``src/MyComponent/myComponent.css``

* __IMAGES - Performance__
    * Please use src/assets/images instead of public/ and then use import ... from ... to add images to the components. It helps the performance.
    
    * Please take a look at the size of images when you add/import them. Anastasia's pic on the website (March 6 2021)is 12mb big! It's almost 100 times too big and costs the performance enormously.

    * This is a nice web app to optimize the images: https://squoosh.app/

___

## 1.3. Useful Links
* More on Git-Flow: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
* More on Branch Naming Conventions: https://dev.to/couchcamote/git-branching-name-convention-cch (edited) 

## 1.4. More & Contact
Please contact for the questions and ideas with Menna and Morteza on __Slack__.
