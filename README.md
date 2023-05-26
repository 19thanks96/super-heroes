# JavaScript SuperHero Database
It is a superhero database. Web application that allows us to
do CRUD operations of the superhero model

## Functional requirements:

- [x] Create a superhero
- [x] Edit a superhero
- [x] Remove a superhero
- [x] When creating / editing we want to be able to assign and remove images from
a superhero
- [x] List all the superheros, seeing only one image for each and it’s nickname,
- [x] pagination, showing 5 items at once
- [x] See the details of one particular superhero with all it’s information and images
> Test for fronend: 
> - [x] SuperheroList renders  "you have no heroes created yet" when no heroes pass
> - [x] SuperheroList renders  "add new hero" button
> - [x] SuperheroList renders `add new hero` button when no heroes pass
> - [x] CreateSuperHero renders  "submit" button
> - [x] CreateSuperHero create "superhero" with nickname, realname, origin description, catch phrase
>
> Test for backend
> - [x] backend create superhero returns 200
> - [x] backend get /superheroes should return list of superheroes
## Technical requirements
The webapp should be implemented having this technical requirements:
- [x] Use Node.js (any version you feel comfortable with)
- [x] Write down unit tests, at least for the main logic.
- [x] A README with the steps to run the solution, and a list of all the assumptions that
you made (if any)
> Technologies:
> - React
> - Typescript
> - Express
> - React-testing-library
> - Jest + supertest
> - React Router
> - Prettier
> - Nodemon
> - MongoDb

## Live Demo

![live promo](/promo.gif)

## How to start

Clone the project
```
git clone https://git@github.com:19thanks96/super-heroes.git
```

Change dir to the project folder
```
cd super-heroes
```

### Frontend:
```
cd frontend

npm install

npm start
```
### Backend:
Install and run MongoDb on: `mongodb://127.0.0.1:27017`
```
cd backend

npm install

npm start
```
