'use strict';

var listenOnPort = 8084;
var logger = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var Git = require("nodegit");
var env = require('node-env-file');
var request = require('request');
var glob = require("glob");
env(__dirname + '/.env');

var domain = "https://41c3c8b4.ngrok.io";

// Other code
var compat = require("./compat.js");

var dataSave = {
    ref: 'refs/heads/master',
    before: 'e52387e66980e4a7ab9d229bafda4910be957069',
    after: '849b085d4282cee002bfc20985cf1e07d1bbded4',
    created: false,
    deleted: false,
    forced: false,
    base_ref: null,
    compare: 'https://github.com/jamesevickery/test-web-project/compare/e52387e66980...849b085d4282',
    commits: [{
        id: '849b085d4282cee002bfc20985cf1e07d1bbded4',
        tree_id: '26467689cd59d1dbe4306a64308df74e27de3026',
        distinct: true,
        message: 'Empty commit to trigger webhook',
        timestamp: '2018-02-25T02:13:24Z',
        url: 'https://github.com/jamesevickery/test-web-project/commit/849b085d4282cee002bfc20985cf1e07d1bbded4',
        author: [Object],
        committer: [Object],
        added: [],
        removed: [],
        modified: []
    }],
    head_commit: {
        id: '849b085d4282cee002bfc20985cf1e07d1bbded4',
        tree_id: '26467689cd59d1dbe4306a64308df74e27de3026',
        distinct: true,
        message: 'Empty commit to trigger webhook',
        timestamp: '2018-02-25T02:13:24Z',
        url: 'https://github.com/jamesevickery/test-web-project/commit/849b085d4282cee002bfc20985cf1e07d1bbded4',
        author: {
            name: 'James Vickery',
            email: 'dev@jamesvickery.net',
            username: 'jamesevickery'
        },
        committer: {
            name: 'James Vickery',
            email: 'dev@jamesvickery.net',
            username: 'jamesevickery'
        },
        added: [],
        removed: [],
        modified: []
    },
    repository: {
        id: 122739178,
        name: 'test-web-project',
        full_name: 'jamesevickery/test-web-project',
        owner: {
            name: 'jamesevickery',
            email: 'dev@jamesvickery.net',
            login: 'jamesevickery',
            id: 14852491,
            avatar_url: 'https://avatars0.githubusercontent.com/u/14852491?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/jamesevickery',
            html_url: 'https://github.com/jamesevickery',
            followers_url: 'https://api.github.com/users/jamesevickery/followers',
            following_url: 'https://api.github.com/users/jamesevickery/following{/other_user}',
            gists_url: 'https://api.github.com/users/jamesevickery/gists{/gist_id}',
            starred_url: 'https://api.github.com/users/jamesevickery/starred{/owner}{/repo}',
            subscriptions_url: 'https://api.github.com/users/jamesevickery/subscriptions',
            organizations_url: 'https://api.github.com/users/jamesevickery/orgs',
            repos_url: 'https://api.github.com/users/jamesevickery/repos',
            events_url: 'https://api.github.com/users/jamesevickery/events{/privacy}',
            received_events_url: 'https://api.github.com/users/jamesevickery/received_events',
            type: 'User',
            site_admin: false
        },
        private: false,
        html_url: 'https://github.com/jamesevickery/test-web-project',
        description: 'HTML+CSS project for testing suitabrowse: https://github.com/jon-marsh/anvilhack',
        fork: false,
        url: 'https://github.com/jamesevickery/test-web-project',
        forks_url: 'https://api.github.com/repos/jamesevickery/test-web-project/forks',
        keys_url: 'https://api.github.com/repos/jamesevickery/test-web-project/keys{/key_id}',
        collaborators_url: 'https://api.github.com/repos/jamesevickery/test-web-project/collaborators{/collaborator}',
        teams_url: 'https://api.github.com/repos/jamesevickery/test-web-project/teams',
        hooks_url: 'https://api.github.com/repos/jamesevickery/test-web-project/hooks',
        issue_events_url: 'https://api.github.com/repos/jamesevickery/test-web-project/issues/events{/number}',
        events_url: 'https://api.github.com/repos/jamesevickery/test-web-project/events',
        assignees_url: 'https://api.github.com/repos/jamesevickery/test-web-project/assignees{/user}',
        branches_url: 'https://api.github.com/repos/jamesevickery/test-web-project/branches{/branch}',
        tags_url: 'https://api.github.com/repos/jamesevickery/test-web-project/tags',
        blobs_url: 'https://api.github.com/repos/jamesevickery/test-web-project/git/blobs{/sha}',
        git_tags_url: 'https://api.github.com/repos/jamesevickery/test-web-project/git/tags{/sha}',
        git_refs_url: 'https://api.github.com/repos/jamesevickery/test-web-project/git/refs{/sha}',
        trees_url: 'https://api.github.com/repos/jamesevickery/test-web-project/git/trees{/sha}',
        statuses_url: 'https://api.github.com/repos/jamesevickery/test-web-project/statuses/{sha}',
        languages_url: 'https://api.github.com/repos/jamesevickery/test-web-project/languages',
        stargazers_url: 'https://api.github.com/repos/jamesevickery/test-web-project/stargazers',
        contributors_url: 'https://api.github.com/repos/jamesevickery/test-web-project/contributors',
        subscribers_url: 'https://api.github.com/repos/jamesevickery/test-web-project/subscribers',
        subscription_url: 'https://api.github.com/repos/jamesevickery/test-web-project/subscription',
        commits_url: 'https://api.github.com/repos/jamesevickery/test-web-project/commits{/sha}',
        git_commits_url: 'https://api.github.com/repos/jamesevickery/test-web-project/git/commits{/sha}',
        comments_url: 'https://api.github.com/repos/jamesevickery/test-web-project/comments{/number}',
        issue_comment_url: 'https://api.github.com/repos/jamesevickery/test-web-project/issues/comments{/number}',
        contents_url: 'https://api.github.com/repos/jamesevickery/test-web-project/contents/{+path}',
        compare_url: 'https://api.github.com/repos/jamesevickery/test-web-project/compare/{base}...{head}',
        merges_url: 'https://api.github.com/repos/jamesevickery/test-web-project/merges',
        archive_url: 'https://api.github.com/repos/jamesevickery/test-web-project/{archive_format}{/ref}',
        downloads_url: 'https://api.github.com/repos/jamesevickery/test-web-project/downloads',
        issues_url: 'https://api.github.com/repos/jamesevickery/test-web-project/issues{/number}',
        pulls_url: 'https://api.github.com/repos/jamesevickery/test-web-project/pulls{/number}',
        milestones_url: 'https://api.github.com/repos/jamesevickery/test-web-project/milestones{/number}',
        notifications_url: 'https://api.github.com/repos/jamesevickery/test-web-project/notifications{?since,all,participating}',
        labels_url: 'https://api.github.com/repos/jamesevickery/test-web-project/labels{/name}',
        releases_url: 'https://api.github.com/repos/jamesevickery/test-web-project/releases{/id}',
        deployments_url: 'https://api.github.com/repos/jamesevickery/test-web-project/deployments',
        created_at: 1519475818,
        updated_at: '2018-02-24T13:47:53Z',
        pushed_at: 1519524807,
        git_url: 'git://github.com/jamesevickery/test-web-project.git',
        ssh_url: 'git@github.com:jamesevickery/test-web-project.git',
        clone_url: 'https://github.com/jamesevickery/test-web-project.git',
        svn_url: 'https://github.com/jamesevickery/test-web-project',
        homepage: null,
        size: 1666,
        stargazers_count: 0,
        watchers_count: 0,
        language: 'HTML',
        has_issues: true,
        has_projects: true,
        has_downloads: true,
        has_wiki: true,
        has_pages: false,
        forks_count: 0,
        mirror_url: null,
        archived: false,
        open_issues_count: 0,
        license: {
            key: 'mit',
            name: 'MIT License',
            spdx_id: 'MIT',
            url: 'https://api.github.com/licenses/mit'
        },
        forks: 0,
        open_issues: 0,
        watchers: 0,
        default_branch: 'master',
        stargazers: 0,
        master_branch: 'master'
    },
    pusher: {
        name: 'jamesevickery',
        email: 'dev@jamesvickery.net'
    },
    sender: {
        login: 'jamesevickery',
        id: 14852491,
        avatar_url: 'https://avatars0.githubusercontent.com/u/14852491?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/jamesevickery',
        html_url: 'https://github.com/jamesevickery',
        followers_url: 'https://api.github.com/users/jamesevickery/followers',
        following_url: 'https://api.github.com/users/jamesevickery/following{/other_user}',
        gists_url: 'https://api.github.com/users/jamesevickery/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/jamesevickery/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/jamesevickery/subscriptions',
        organizations_url: 'https://api.github.com/users/jamesevickery/orgs',
        repos_url: 'https://api.github.com/users/jamesevickery/repos',
        events_url: 'https://api.github.com/users/jamesevickery/events{/privacy}',
        received_events_url: 'https://api.github.com/users/jamesevickery/received_events',
        type: 'User',
        site_admin: false
    },
    installation: {
        id: 92095
    }
};


let app = express();
var http = require('http').Server(app)

app.use(logger('dev'));

var GithubWebHook = require('express-github-webhook');
var webhookHandler = GithubWebHook({
    path: '/webhook'
});

app.use(express.static(path.join(__dirname, '/public')));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/report', function (req, res) {
    res.render('report.html');
});

app.get('/json/:id', function (req, res) {
    res.sendFile(path.join(__dirname, '/json/' + encodeURIComponent(req.params.id)));
});

app.use(bodyParser.json());
app.use(webhookHandler);


function updateStatus(repoName, commit, details) {
    console.log("updating status")
    details["context"] = "browsability";

    request.post({
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json',
            'user-agent': 'node.js'
        },
        url: 'https://api.github.com/repos/' + repoName +
            '/statuses/' + commit +
            '?access_token=' + process.env.ACCESS_TOKEN,
        json: details
    }, function (error, response, body) {
        try {
            console.log(body['state'] + ": " + body['url']);
        } catch (err) { }
    });
}


function generateFileList(details, config) {
    var resolvedFiles = [];
    config['files'] = ["*.html"];

    console.log(details.path);
    for (var i = 0; i < config['files'].length; i++) {
        var newFiles = glob.sync(config['files'][i], {
            'cwd': details.path
        });

        for (var j = 0; j < newFiles.length; j++) {
            resolvedFiles.push(newFiles[j]);
        }
    }
    for (var i = 0; i < resolvedFiles.length; i++) {
        resolvedFiles[i] = path.join(__dirname, '/' + details['dirName'] + '/' + resolvedFiles[i]);
    }
    config['filesRes'] = resolvedFiles;

    console.log("resultant config:\n" + JSON.stringify(config, null, 2));

    compat.checkFiles(details, config)

    return config;
}


function runCompatCheck(data) {
    var details = {
        'repoUrl': data['repository']['clone_url'],
        'headCommit': data['head_commit']['id'],
        'repoName': data['repository']['full_name'],
    };
    details['report'] = domain + "/report?repo=" + encodeURIComponent(details.repoName) + "&id=" + encodeURIComponent(details.headCommit);
    details['dirName'] = 'clones/tmp-' + details['repoName'].replace('/', '-') + "-" + details['headCommit'];
    details['path'] = process.cwd() + '/' + details['dirName'];

    Git.Clone(details['repoUrl'], "./" + details['dirName'])
        .then(function (repo) {
            return repo.getCommit(details['headCommit']);
        })
        .then(function (commit) {
            return commit.getEntry("suitabrowser.json");
        })
        .then(function (entry) {
            return entry.getBlob().then(function (blob) {
                blob.entry = entry;
                return blob;
            });
        })
        .then(function (blob) {
            console.log("\nconfig:")
            var configStr = String(blob);
            console.log(configStr);

            var config = JSON.parse(configStr);
            config = generateFileList(details, config);

            updateStatus(details['repoName'], details['headCommit'], {
                "state": "success",
                "target_url": details.report,
                "description": "Browser compatibility checks passed",
            });
        })
        .catch(function (err) {
            console.log('error: ' + String(err));
            updateStatus(details['repoName'], details['headCommit'], {
                "state": "error",
                "target_url": domain,
                "description": "Oops! browsability ran into an error",
            });
        });
}

// runCompatCheck(dataSave); // Test

webhookHandler.on('push', function (repo, data) {
    console.log("checking: " + repo);
    runCompatCheck(data);
});

app.set('port', process.env.PORT || listenOnPort);
http.listen(app.get('port'));