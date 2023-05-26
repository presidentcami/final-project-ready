<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url] [![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/presidentcami/ready">
    <img src="client/src/assets/ready.png" alt="Logo" width="80" height="80">
  </a>

<h1 align="center">Ready</h1>

  <p align="center">
Ready is a vacation management app that can make you ready to go on your trip AND come back to reality. Users create to-do lists for before, during, and after their trips. Lists can be associated with a specific trip, which will include a location, date, and a description to help AI recommend an itinerary and things to pack. They can also add in ad-hoc lists or details that are specific to that vacation. <br />
    <a href="https://github.com/presidentcami/ready"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <!-- Need to add pictures for demo -->
    <a href="https://server-n6hd.onrender.com">View Demo</a> 
    <br />
    Use this test login to play around: <br />
    · email address: camiwills325+testing1@gmail.com <br />
    · password: Testing123 <br />
    ·
    <a href="https://github.com/presidentcami/ready/issues">Report Bug</a>
    ·
    <a href="https://github.com/presidentcami/ready/issues">Request Feature</a>
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project

[![Ready Screen Shot][product-screenshot]](https://server-n6hd.onrender.com/)

I am a person who loves planning, going on vacations, and having a good time. Sometimes that means coming back down to earth from an experience and re-entering real life can be challenging! With the Ready app, you are encouraged to not only plan the things you want to do and pack to prepare for a trip, but also plan what you'll need to do when the trip is over. 

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- React
JavaScript / Node.js
Vite
Express
SQL
Postgres
Jest
React Testing Library
 -->

### Built With

* [![JavaScript][JavaScript.js]][JavaScript-url]
* [![Postgres][PostgreSQL.org]][PostgreSQL-url]
* [![Express][Express.js]][Express-url]
* [![React][React.js]][React-url]
* [![Node][Node.js]][Node-url]
* [![Styled Components][Styled Components]][Styled-Components-Url]
* [![Vite][Vite.js]][Vite-url]
* [![React Router][React-Router.js]][React-Router-url]
* [![Vitest][Vitest.dev]][Vitest-url]

### API Reference
* [![OpenAI][OpenAI]][OpenAI-url]

<!-- * [![Bootstrap][Bootstrap.com]][Bootstrap-url] -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- Installation -->

## Installation

**This project requires Auth0! Please visit [Auth0](https://auth0.com/) to make an account and retrieve a domain and clientid. See .env.example for set up!**

Step 1: Go to your terminal: clone the project and switch into the project directory.

```bash
  git clone https://github.com/presidentcami/ready.git
  cd ready
```
- To clean the owner git out of the main directory, run the command `rm -rf .git` Then while still within the main directory in your terminal, run the command `git init` to start your own git track 
Step 2: Install all packages.

```bash
  cd client && npm install && cd ../server && npm install
```

Step 3: Setup Environment Variables

- Copy the instructions from both .env.example files in the client and server.

Step 4: Connect the database and the data.

```bash
  cd server
  psql techtonica -f db.sql
```

Step 5: Run the app!

```bash
  cd server && npm run dev
```


<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

Twitter - [@presidentcami](https://twitter.com/presidentcami)

LinkedIn - [Find Me On LinkedIn!][linkedin-url]

Other projects: [Techtonica Assignments Repo](https://github.com/presidentcami/techtonica-assignments)


<!-- ACKNOWLEDGMENTS -->
<!-- ## Acknowledgments

[![FontAwesome][FontAwesome.com]][FontAwesome-url] -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!-- * [![JavaScript][JavaScript.js]][JavaScript-url]
* [![React][React.js]][React-url]
* [![Node][Node.js]][Node-url]
* [![Express][Express.js]][Express-url]
* [![Postgres][PostgreSQL.org]][PostgreSQL-url]
* [![FontAwesome][FontAwesome.com]][FontAwesome-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
 -->
[contributors-shield]: https://img.shields.io/github/contributors/presidentcami/ready.svg?style=for-the-badge
[contributors-url]: https://github.com/presidentcami/ready/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/presidentcami/ready.svg?style=for-the-badge
[forks-url]: https://github.com/presidentcami/ready/network/members
[stars-shield]: https://img.shields.io/github/stars/presidentcami/ready.svg?style=for-the-badge
[stars-url]: https://github.com/presidentcami/ready/stargazers
[issues-shield]: https://img.shields.io/github/issues/presidentcami/ready.svg?style=for-the-badge
[issues-url]: https://github.com/presidentcami/ready/issues
[license-shield]: https://img.shields.io/github/license/presidentcami/ready.svg?style=for-the-badge
[license-url]: https://github.com/presidentcami/ready/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0A66C2.svg?style=for-the-badge&logo=linkedin&colorB=0A66C2
[linkedin-url]: https://linkedin.com/in/camille-williams-phl
[product-screenshot]: client/src/assets/screenshot.png
[JavaScript.js]: https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://www.javascript.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/node-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[PostgreSQL.org]: https://img.shields.io/badge/postgreSQL-4169E1?style=for-the-badge&logo=postgreSQL&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Fontawesome.com]: https://img.shields.io/badge/fontawesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white
[Fontawesome-url]: https://fontawesome.com
[Styled Components]: https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white
[Styled-Components-url]: https://styled-components.com/
[Vite.js]: https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[OpenAi]: https://img.shields.io/badge/openai-412991?style=for-the-badge&logo=openai&logoColor=white
[OpenAI-url]: https://platform.openai.com/
[React-Router.js]: https://img.shields.io/badge/ReactRouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white
[React-Router-url]: https://reactrouter.com/en/main
[Vitest.dev]: https://img.shields.io/badge/vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white
[Vitest-url]: https://vitest.dev/


