## Image Processing API

> Part of Udacity's Full-Stack nanodegree

**NOTE** While using hex colors make sure to encode `#` as `%23` since the hash symbol is used by the browser! 

## Setup

1. To install required dependencies run `npm i` or `yarn`
2. Create a new `.env` file and set variables written in `.env.template`
   1. `PORT` is the part number to be used by the server
   2. `IMAGES_DIR` is the directory name to get images from, defaults to "images"
   3. `CACHE_DIR` is the directory name to get cached images from, defaults to "cache"

## Commands/Scripts

1. `npm run dev` or `yarn dev` starts a development server on the port in the `.env` file
2. `npm run build` or `yarn build` builds the project for production in `build` directory
3. `npm run jasmine` or `yarn jasmine` runs jasmine for unit tesing
4. `npm run test` or `yarn test` builds the project then runs the unit tests
5. `npm run lint` or `yarn lint` runs eslint to check for style or code issues.
6. `npm run lint:fix` or `yarn lint:fix` similar to the previous but tries to fix all auto fixable issues
7. `npm run prettier` or `yarn prettier` runs prettier to improve & fix writing style
8. `npm run start` or `yarn start` runs the production build using the `.env` file (need the project to be build beforehand)


After starting the server you can check the functionality of the project as detailed below

## Testing the Placeholder API
1. Send a `GET` request to `http://localhost:${PORT}/placeholder?width={width}&height={height}` replace `PORT` with your port number that is added in the `.env` file & replace both `{width}` & `{height}` with your desired ints

### Example
`GET http://localhost:8080/placeholder?width=250&height=250`

### Other optional parameters are

#### `bgColor`

A CSS supported color to be applied on the background of the placeholder image

#### Example
`GET http://localhost:8080/placeholder?width=250&height=250&bgColor=cornflowerblue`

#### `textColor`

A CSS supported color to be applied on the text of the placeholder image

#### Example
`GET http://localhost:8080/placeholder?width=250&height=250&textColor=%23e5e5e5`


#### `text`

A string containing the text to be in the image

#### Example
`GET http://localhost:8080/placeholder?width=250&height=250&textColor=%23e5e5e5&text=Hello, World!`


## Testing the Resizer API
1. Send a `GET` request to `http://localhost:${PORT}/resize?width={width}&height={height}&filename={filename}` replace `PORT` with your port number that is added in the `.env` file & replace both `{width}` & `{height}` with your desired ints, filename should be replaced with a file inside the `IMAGES_DIR` added in the `.env` file (along with the extension)

### Example
`GET http://localhost:8080/resize?width=250&height=250&filename=scandanavia-01.jpeg`

### Other optional parameters are:

#### `url`

Instead of using the filesystem you can just enter a url of an image

##### Example

`GET http://localhost:8080/resize?width=250&height=250&url=https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png`


#### `type`

If you wanted to fetch a png file but wants it to be compressed using webp or jpeg encoding you can pass the `type` parameter with 3 possible values `webp`, `png`, `jpeg`

It compresses the file on the fly

##### Example

`GET http://localhost:8080/resize?width=250&height=250&filename=scandanavia-01.jpeg&type=webp`


### Notes
1. Make sure to use a browser or otherwise make sure your request is encoded correctly