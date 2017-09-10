"use strict";
/**
* Container.tsx
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Web-specific implementation of the cross-platform Container abstraction.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require("prop-types");
var restyleForInlineText = require("./utils/restyleForInlineText");
var Styles_1 = require("./Styles");
var _styles = {
    defaultStyle: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 0,
        flexShrink: 0,
        overflow: 'hidden',
        alignItems: 'stretch'
    }
};
var Container = (function (_super) {
    __extends(Container, _super);
    function Container(props, context) {
        return _super.call(this, props, context) || this;
    }
    Container.prototype.getChildContext = function () {
        // Let descendant Types components know that their nearest Types ancestor is not an Types.Text.
        // Because they're in an Types.View, they should use their normal styling rather than their
        // special styling for appearing inline with text.
        var childContext = {
            isRxParentAText: false
        };
        return childContext;
    };
    Container.prototype.render = function () {
        var combinedStyles = Styles_1.default.combine([_styles.defaultStyle, this.props.style]);
        var props = {
            style: combinedStyles
        };
        var reactElement = (React.createElement("div", __assign({}, props), this.props.children));
        return this.context.isRxParentAText ?
            restyleForInlineText(reactElement) :
            reactElement;
    };
    Container.contextTypes = {
        isRxParentAText: PropTypes.bool
    };
    Container.childContextTypes = {
        isRxParentAText: PropTypes.bool.isRequired
    };
    return Container;
}(React.Component));
exports.Container = Container;
exports.default = Container;
