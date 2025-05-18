const core = require('@actions/core');
//const github = require('@actions/github');
const exec = require('@actions/exec');


function run() {
    // 1. get some input values
    const bucket = core.getInput('bucket', {required: true});
    const bucketregion = core.getInput('bucket-region', {required: true});
    const distfolder = core.getInput('dist-folder', {required: true});

    // 2. upload files 
    const s3Uri = `s3://${bucket}`
    exec.exec(`aws s3 sync ${distfolder} ${s3Uri} --region ${bucketregion}`);

    const websiteUrl = `http://${bucket}.s3-website-${bucketregion}.amazonaws.com`
    core.setOutput('website-url', websiteUrl); // ::set-output
}
run();