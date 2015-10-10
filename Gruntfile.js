module.exports = function(grunt) {

    grunt.initConfig({
        "pkg": "package.json",
        "concat": {
            "options": {
                "separator": ";"
            },
            "dist": {
                "src": ["src/scripts/autocode.js", "src/scripts/autocode/*.js", "src/scripts/*/**"],
                "dest": "app/lib/autocode.js"
            }
        },
        "watch": {
            "files": ["src/scripts/autocode.js", "src/scripts/*/**"],
            "tasks": ["concat"]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat']);

};