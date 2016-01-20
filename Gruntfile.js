module.exports = function(grunt) {
    grunt.initConfig({
        "pkg": "package.json",
        "concat": {
            "options": {
                "separator": ";"
            },
            "dist": {
                "src": ["app/src/scripts/autocode.js", "app/src/scripts/autocode/*.js", "app/src/scripts/*/**"],
                "dest": "app/lib/scripts/autocode.js"
            }
        },
        "watch": {
            "files": ["app/src/scripts/autocode.js", "app/src/scripts/*/**"],
            "tasks": ["concat"]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat']);
};