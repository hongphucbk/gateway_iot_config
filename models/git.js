var git = require('git-rev-sync');

module.exports.currentGitTag = async function() {
    try{
        var currentTag = git.tag();
        return currentTag;
    }
    
    catch(err){
        return 'No git responsitory in this software'
    }
}
