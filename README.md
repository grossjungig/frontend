# grossjungig-frontend

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

___

## 1.3. Useful Links
* More on Git-Flow: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
* More on Branch Naming Conventions: https://dev.to/couchcamote/git-branching-name-convention-cch (edited) 

## 1.4. More & Contact
Please contact for the questions and ideas with Menna and Morteza on __Slack__.
