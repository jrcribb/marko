/*
 * Copyright 2011 eBay Software Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This module provides the lightweight runtime for loading and rendering
 * templates. The compilation is handled by code that is part of the
 * [marko/compiler](https://github.com/raptorjs/marko/tree/master/compiler)
 * module. If rendering a template on the client, only the runtime is needed
 * on the client and not the compiler
 */

'use strict';

// helpers provide a core set of various utility methods
// that are available in every template
var helpers = require('./helpers');

/**
 * Method is for internal usage only. This method
 * is invoked by code in a compiled Marko template and
 * it is used to create a new Template instance.
 * @private
 */
 exports.c = function createTemplate(path, createFunc, meta) {
     var template = new Template(path, lazyRender);
     template.meta = meta;
     return template;

     function lazyRender() {
         template._ = createFunc(helpers);
         template._.apply(template, arguments);
     }
 };

var asyncVdomBuilder = require('async-vdom-builder');

var loader;

// If the optional "stream" module is available
// then Readable will be a readable stream

var AsyncVDOMBuilder = asyncVdomBuilder.AsyncVDOMBuilder;
var extend = require('raptor-util/extend');

function renderCallback(renderFunc, data, globalData, callback) {
    var out = new AsyncVDOMBuilder(globalData);

    renderFunc(data, out);

    return out.end()
        .on('finish', function() {
            callback(null, out.getOutput(), out);
        })
        .once('error', callback);
}

function Template(path, func) {
    this.path = path;
    this._ = func;
}

Template.prototype = {
    createOut() {
        return new AsyncVDOMBuilder();
    },
    renderSync: function(data) {
        var localData;
        var globalData;

        if (data) {
            localData = data;
            globalData = data.$global;
            localData.$global = null;
        } else {
            localData = {};
        }

        var out = new AsyncVDOMBuilder(globalData);
        out.sync();
        this._(localData, out);
        return out.getOutput();
    },

    /**
     * Renders a template to either a stream (if the last
     * argument is a Stream instance) or
     * provides the output to a callback function (if the last
     * argument is a Function).
     *
     * Supported signatures:
     *
     * render(data, callback)
     * render(data, out)
     * render(data, stream)
     * render(data, out, callback)
     * render(data, stream, callback)
     *
     * @param  {Object} data The view model data for the template
     * @param  {AsyncVDOMBuilder} out A Stream or an AsyncVDOMBuilder instance
     * @param  {Function} callback A callback function
     * @return {AsyncVDOMBuilder} Returns the AsyncVDOMBuilder instance that the template is rendered to
     */
    render: function(data, out, callback) {
        var renderFunc = this._;
        var finalData;
        var globalData;
        if (data) {
            finalData = data;

            if ((globalData = data.$global)) {
                // We will *move* the "$global" property
                // into the "out.global" object
                data.$global = null;
            }
        } else {
            finalData = {};
        }

        if (typeof out === 'function') {
            // Short circuit for render(data, callback)
            return renderCallback(renderFunc, finalData, globalData, out);
        }

        // NOTE: We create new vars here to avoid a V8 de-optimization due
        //       to the following:
        //       Assignment to parameter in arguments object
        var finalOut = out;

        var shouldEnd = false;

        if (arguments.length === 3) {
            if (globalData) {
                extend(finalOut.global, globalData);
            }

            finalOut
                .on('finish', function() {
                    callback(null, finalOut.getOutput(), finalOut);
                })
                .once('error', callback);
        } else if (!finalOut) {
            // Assume the "finalOut" is really a stream
            //
            // By default, we will buffer rendering to a stream to prevent
            // the response from being "too chunky".
            finalOut = new AsyncVDOMBuilder(globalData);
            shouldEnd = true;
        }



        // Invoke the compiled template's render function to have it
        // write out strings to the provided out.
        renderFunc(finalData, finalOut);

        // Automatically end output stream (the writer) if we
        // had to create an async writer (which might happen
        // if the caller did not provide a writer/out or the
        // writer/out was not an AsyncVDOMBuilder).
        //
        // If out parameter was originally an AsyncVDOMBuilder then
        // we assume that we are writing to output that was
        // created in the context of another rendering job.
        return shouldEnd ? finalOut.end() : finalOut;
    }
};

function createRenderProxy(template) {
    return function(data, out) {
        template._(data, out);
    };
}

function initTemplate(rawTemplate, templatePath) {
    if (rawTemplate.render) {
        return rawTemplate;
    }

    var createFunc = rawTemplate.create || rawTemplate;

    var template = createFunc.loaded;
    if (!template) {
        template = createFunc.loaded = new Template(templatePath);
        template.c(createFunc);
    }
    return template;
}

function load(templatePath, templateSrc, options) {
    if (!templatePath) {
        throw new Error('"templatePath" is required');
    }

    if (arguments.length === 1) {
        // templateSrc and options not provided
    } else if (arguments.length === 2) {
        // see if second argument is templateSrc (a String)
        // or options (an Object)
        var lastArg = arguments[arguments.length - 1];
        if (typeof lastArg !== 'string') {
            options = arguments[1];
            templateSrc = undefined;
        }
    } else if (arguments.length === 3) {
        // assume function called according to function signature
    } else {
        throw new Error('Illegal arguments');
    }

    var template;

    if (typeof templatePath === 'string') {
        template = initTemplate(loader(templatePath, templateSrc, options), templatePath);
    } else if (templatePath.render) {
        template = templatePath;
    } else {
        template = initTemplate(templatePath);
    }

    if (options && (options.buffer != null)) {
        template = new Template(
            template.path,
            createRenderProxy(template),
            options);
    }

    return template;
}

function createInlineMarkoTemplate(filename, renderFunc) {
    return new Template(filename, renderFunc);
}

exports.load = load;

exports.createOut = function() {
    return new AsyncVDOMBuilder();
};

exports.helpers = helpers;

exports.Template = Template;

exports._inline = createInlineMarkoTemplate;

/**
 * Used to associate a DOM Document with marko. This is needed
 * to parse HTML fragments to insert into the VDOM tree.
 */
exports.setDocument = function(newDoc) {
    AsyncVDOMBuilder.prototype.document = newDoc;
};

// The loader is used to load templates that have not already been
// loaded and cached. On the server, the loader will use
// the compiler to compile the template and then load the generated
// module file using the Node.js module loader
loader = require('../loader');