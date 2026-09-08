---
title: LS6 Events
date: "2023-07-26"
excerpt: A Leeds nightlife and ticket feed we founded at university. On hold since summer 2023.
technologies: [go, nextjs]
---
This project started as an idea to solve an ongoing problem with the event space inside Leeds. I decided to draft a web app to solve this problem, and in collaberation with some of my fellow students at the Unversity of Leeds we had a solution.  
  
For those who aren't as well versed in student culture at the University, Leeds itself is very much a party town, with over 10 clubs, over 50,000 students and a famous bar crawl where people dress up to drink in 16 pubs down one road. This requires a lot of organisation for different club nights and events hosting, and a method of selling and distributing the tickets. Therefore a space opened up for a large number of apps to come in as the ticket selling market. Fatsoma, FIXR, Skiddle were a few of these big names. And so the Leeds student community had a surplus of events apps to look for different nights out.  
  
That's where we manage to come in. We combined all of these apps into one feed, desinged for students. This feed was updated daily, and was constantly changing. The UI was designed to showcase what was good on a night, if you were looking for a club night in Leeds. It was as easy as going to the website, searching or scrolling for a bit to see what you liked the look of, then clicking through to the ticketing website to place your order for different tickets. Simple.

We dubbed this project 'LS6 Events' as LS6 is arguably one of the most popular student postcodes in Leeds, and the project was founded there. We set up a company and expanded the ticketing options. After a launch in September 2022, we gained over 1000 users within the first week.

The project was written in Go, running a microservices architecture in Kubernetes - having an API for interfacing with the database for the backend, and the frontend being powered by Next. We also experimented with an AI microservice written in FastAPI, which we did not finish.  
  
_Note: as of Summer 2023, we have put the project on hold to rewrite certain crucial systems due to cloud hosting financials._
