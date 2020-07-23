var git = require('git-rev-sync');

module.exports.currentGitTag = function(req, res) {
    try{
        let currentTag = ' ' + git.tag()
        //'console.log(typeof(currentTag));
        return currentTag       
    }
    catch(err){
        return 'No git responsitory in this software'
    }
}

// module.exports.currentGitTag = objGit()