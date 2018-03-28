var data = require('./data.json');
const fastJson = require('fast-json-stringify');

// 把数据修饰下，字段和数据类型固定
delete data.props;
data.children = data.children.map(function(child) {
    return {
        action: child.action,
        uuid: child.uuid,
        pid: child.pid,
        order: child.order,
        vnode: child.vnode ? {
            type: child.vnode.type,
            vtype: child.vnode.vtype,
            text: child.vnode.text,
            uuid: child.vnode.uuid,
            order: child.vnode.order,
            checkProps: child.vnode.checkProps
        } : null
    };
});
data.componentList = data.componentList.map(function(comp) {
    return {
        componentId: comp.componentId,
        componentType: comp.componentType,
        mode: comp.mode,
        uuid: comp.uuid
    };
});

var repeatTimes = 10;

var t = Date.now();
for (var i = 0; i < repeatTimes; i++) {
    JSON.stringify(data);
}
console.log(Date.now() - t);

var stringify = fastJson({
    title: 'DOMupdatePatch',
    definitions: {
        child: {
            type: 'object',
            properties: {
                action: { type: 'string' },
                uuid: { type: 'integer' },
                pid: { type: 'integer' },
                order: { type: 'integer' },
                vnode: { $ref: '#/definitions/vnode' }
            }
        },
        component: {
            type: 'object',
            properties: {
                componentId: { type: 'integer' },
                componentType: { type: 'string' },
                mode: { type: 'string' },
                uuid: { type: 'integer' },
                // wvProps: {
                //     type: 'object',
                //     additionalProperties: {
                //         type: 'string'
                //     }
                // }
            }
        },
        vnode: {
            type: 'object',
            properties: {
                type: { type: 'string' },
                vtype: { type: 'string' },
                text: { type: 'string' },
                uuid: { type: 'string' },
                order: { type: 'integer' },
                checkProps: { type: 'integer' },
                // attrs: {
                //     type: 'object',
                //     additionalProperties: {
                //         type: 'string'
                //     }
                // }
            }
        }
    },
    type: 'object',
    properties: {
        children: {
            type: 'array',
            items: {
                $ref: '#/definitions/child'
            }
        },
        componentList: {
            type: 'array',
            items: {
                $ref: '#/definitions/component'
            }
        }//,
        // props: {
        //     type: 'object',
        //     additionalProperties: {
        //         type: 'string'
        //     }
        // }
    }
});

var t1 = Date.now();
for (var i = 0; i < repeatTimes; i++) {
    stringify(data);
}
console.log(Date.now() - t1);


