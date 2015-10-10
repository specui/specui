module.exports = function(grunt) {

    grunt.initConfig({
        "pkg": "package.json",
        "concat": {
            "options": {
                "separator": ";"
            },
            "dist": {
                "src": ["./app/scripts/**/*.js"],
                "dest": ["./app/lib/autocode.js"]
            }
        },
        "uglify": {
            "options": {
                "banner": "/*! autocode <%= grunt.template.today(\"dd-mm-yyyy\") %> */\\n"
            },
            "dist": {
                "files": {
                    "dist/<%= pkg.name %>.min.js": ["<%= concat.dist.dest %>"]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify']);

};