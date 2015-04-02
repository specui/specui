If you haven't found the right one. Or if you could do it better. Or just want to give a whirl:

Try creating a generator for you favorite language, framework or even your own custom code.

Generators are projects that are meant to be used as generators. In other words, a project is a project unless it:

- contains a `gen` key in the Crystal Config File
- contains a `gen` folder in the Crystal Source Directory (default: `./src`)

Once this has been done, the `crystal` project can then be used a generator for other projects. Or generators. Or itself.

If you want to share it with the world, then you'll also need to:

- create at least one test for the generator (in `/src/test`)
- publish it to [crystal.sh](http://crystal.sh) using: `crystal publish`