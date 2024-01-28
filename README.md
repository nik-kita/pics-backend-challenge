#### Test

- `npm run test`
- Unit tests check main logic of "mechanism" that is used for resolving
  destinations in application. So it should be good regression for prevent
  unexpected bugs during extending or modifiing project. That's also mean that
  in future it should not be problem to change API, backend fremework etc.
  without worry about this functional.

#### Docker

- `npm run docker:build` _build image_
- `npm run docker:run` _run container with builded image_
- `npm run docker:stop` _stop container_
- `npm run docker:rm` _remove container_

#### Without docker

- `npm run build`
- `npm start`

#### Configuration

- In `.env` main contain:
  - `PORT` variable to define on wich one application should be runned.
    - default `3000`
  - `PATH_TO_CONFIGURATION` path to json file with configuration for default
    analyzer strategy and available destinations configuration
    1. First app will try to read configuration by path in this variable and
       will throw exception if file is not exists
    2. If this variable is empty - `default-configuration.json` will be read

# // TODO
- log into MongoDb
- jwt authentication
- transport payload
