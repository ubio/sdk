#!/usr/bin/env node

'use strict';

const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const copy = require('recursive-copy');
const replaceInFiles = require('replace-in-files');
const pkg = require('./package.json');
const domains = ['broadband-signup', 'hotel-booking', 'pet-insurance'];
const args = process.argv.slice(1);

function getArgs() {
    const domainIndex = args.indexOf('--domain');

    if (domainIndex === -1) {
        throw new Error('The --domain flag must be used to select a domain for your new project.');
    }

    const domain = args[domainIndex + 1];

    if (!domains.includes(domain)) {
        throw new Error('A domain name must follow the --domain flag in order select a domain for your new project.');
    }

    const nameIndex = args.indexOf('--name');

    if (nameIndex === -1) {
        throw new Error('The --name flag must be used to give your new project a name.');
    }

    const name = args[nameIndex + 1];

    if (!name || name.startsWith('-')) {
        throw new Error('A valid domain name must follow the --name flag in order to name your new project.');
    }

    return { name, domain };
}

async function run() {
    const { name, domain } = getArgs();

    await copy(path.join(__dirname, 'application-template'), name);

    process.chdir(name);

    await fs.writeFile('package.json', JSON.stringify({
        name,
        version: '1.0.0',
        description: '',
        main: 'index.js',
        private: true,
        scripts: {
            install: 'rimraf web_modules && vendor-copy',
            start: 'browser-sync start --index \'index.html\' --server --files \'index.html\' \'index.js\' \'src\' \'web_modules\'',
            test: 'echo \'Error: no test specified\' && exit 1'
        },
        dependencies: {
            // '@ubio/sdk-application-bundle': `^${pkg.version}`,
            '@ubio/sdk-application-bundle': '..',
            'vendor-copy': pkg.dependencies['vendor-copy'],
            'rimraf': pkg.dependencies['rimraf']
        },
        devDependencies: {
            'browser-sync': pkg.devDependencies['browser-sync']
        },
        vendorCopy: [
            {
                from: 'node_modules/@ubio/sdk-application-bundle/bundle.js',
                to: 'web_modules/@ubio/sdk-application-bundle/bundle.js'
            },
            {
                from: 'node_modules/@ubio/sdk-application-bundle/index.css',
                to: 'web_modules/@ubio/sdk-application-bundle/index.css'
            }
        ]
    }, null, 2));

    await exec('npm i', { env: process.env });
    await copy(path.join(__dirname, 'templates', domain), path.join('src', domain));
    await copy(path.join(__dirname, 'templates', 'generic'), path.join('src', 'generic'));
    await copy(path.join(__dirname, 'templates', 'shared'), path.join('src', 'shared'));
    await replaceInFiles({
        files: ['src/**/*.js'],
        from: /\/src\/main.js/g,
        to: '/web_modules/@ubio/sdk-application-bundle/bundle.js'
    });
    await fs.copyFile(path.join(__dirname, 'templates', `${domain}.config.js`), path.join('src', 'ubio.config.js'));
}

run();
