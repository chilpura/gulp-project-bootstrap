module.exports = function(grunt) {

  grunt.initConfig({
    includereplace: {
    build: {
      options: {
      // Task-specific options go here.
      },
      // Files to perform replacements and includes with
      src: '*.html',
      // Destination directory to copy files to
      dest: 'dist/',
      includesDir: 'inc/'
    }
  }
  // browserSync: {
  //   bsFiles: {
  //       src : ['build/css/*.css', 'build/*.html']
  //   },
  //   options: {
  //                   watchTask: true,
  //                   server: 'build/'
  //             }
  // },
  //   watch: {
  //     files: ['*.html', 'inc/*.html', 'css/*.css'],
  //     tasks: ['includereplace', 'copy']
  // },
  // copy: {
  //   main: {
  //     expand: true,
  //     src: 'css/*',
  //     dest: 'build/',
  //   },
  // },
  });

  grunt.loadNpmTasks('grunt-include-replace');
  // grunt.loadNpmTasks('grunt-browser-sync');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['includereplace']);

};
