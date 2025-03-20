import {src, dest, series} from "gulp";
import zip from "gulp-zip";
import modifyFile from "gulp-modify-file";
import jsonModify from "gulp-json-modify";
import path from "path";

function zipRequest() {
    console.log("Zip request...");
    return src([
        './ViewerRequest/**/*.js',
        '!./ViewerRequest/node_modules/**',
        '!./ViewerRequest/test/**'
    ])
        .pipe(zip('ViewerRequest.zip'))
        .pipe(dest('./dist'));
}

function zipResponse() {
    console.log("Zip response...");
    return src([
        './ViewerResponse/**/*.js',
        '!./ViewerResponse/node_modules/**',
        '!./ViewerResponse/test/**'
    ])
        .pipe(zip('ViewerResponse.zip'))
        .pipe(dest('./dist'));
}

export function prepare() {
    console.log("Prepare...");
    return src([
        'ViewerRequest/sdk/*.js'
    ])
        .pipe(dest('dist/ViewerRequest/sdk'));
}

export function stripPackage(){
    return src(['./package.json'])
        .pipe(jsonModify({key: 'devDependencies', value: {}}))
        .pipe(jsonModify({key: 'scripts', value: {}}))
        .pipe(dest('./'))
}

export default series(prepare, zipRequest, zipResponse);