/**
 * @fileoverview <%= comConfig.desc %>
 * @author <%= comConfig.author.name %><<%= comConfig.author.email%>>
 * @module <%= comConfig.name %>
 **/
KISSY.add(function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * <%= comConfig.desc %>
     * @class <%= comConfig.componentClass %>
     * @constructor
     * @extends Base
     */
    function <%= comConfig.componentClass %>(comConfig) {
        var self = this;
        //调用父类构造函数
        <%= comConfig.componentClass %>.superclass.constructor.call(self, comConfig);
    }
    S.extend(<%= comConfig.componentClass %>, Base, /** @lends <%= comConfig.componentClass %>.prototype*/{

    }, {ATTRS : /** @lends <%= comConfig.componentClass %>*/{

    }});
    return <%= comConfig.componentClass %>;
}, {requires:['node', 'base']});



