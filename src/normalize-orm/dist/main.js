/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("recoil"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["recoil", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["recoil-normalize-orm"] = factory(require("recoil"), require("lodash"));
	else
		root["recoil-normalize-orm"] = factory(root["recoil"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_recoil__, __WEBPACK_EXTERNAL_MODULE_lodash__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar model_1 = __importDefault(__webpack_require__(/*! ./model */ \"./src/model.ts\"));\nmodule.exports = model_1.default;\n\n\n//# sourceURL=webpack://recoil-normalize-orm/./src/index.ts?");

/***/ }),

/***/ "./src/model.ts":
/*!**********************!*\
  !*** ./src/model.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar recoil_1 = __webpack_require__(/*! recoil */ \"recoil\");\nvar modelManager_1 = __importDefault(__webpack_require__(/*! ./modelManager */ \"./src/modelManager.ts\"));\nvar lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nfunction initModel() {\n    var modelManager = new modelManager_1.default();\n    var staticResetSelector = recoil_1.selector({\n        key: 'NORMALIZE_ORM_MODEL_STATIC_METHODS',\n        get: function () {\n            return null;\n        },\n        set: function (_a) {\n            var reset = _a.reset;\n            modelManager.traverse(function (modelInstance) {\n                var atom = modelInstance.atom;\n                reset(atom);\n            });\n        },\n    });\n    return {\n        createModel: createModel,\n        useChangeData: useChangeData,\n    };\n    function createModel(opt) {\n        var currModelName = opt.name;\n        if (modelManager.hasModel(currModelName)) {\n            throw new Error(\"model name existed: \" + name);\n        }\n        var atomItem = recoil_1.atom({\n            key: getAtomName(currModelName),\n            default: {},\n        });\n        var getSelectorItem = recoil_1.selectorFamily({\n            key: getSelectorName(currModelName, 'get'),\n            get: function (ids) { return function (_a) {\n                var get = _a.get;\n                var dataMap = get(atomItem);\n                var data = getValue(dataMap, ids);\n                if (data === null) {\n                    return null;\n                }\n                if (lodash_1.default.isArray(ids)) {\n                    // 批量读取数据\n                    return lodash_1.default.map(data, function (dataItem) { return getDataItemRecursively(get, currModelName, dataItem); });\n                }\n                // 读取单个数据\n                return getDataItemRecursively(get, currModelName, data);\n            }; },\n        });\n        var updaterSelectorItem = recoil_1.selector({\n            key: getSelectorName(currModelName, 'set'),\n            get: function (_a) {\n                var get = _a.get;\n                // 组装出更新当前model需要的所有已在store中的数据，包含当前model的数据，及所有子孙model的数据\n                var modelDeps = modelManager.getDeps(currModelName);\n                var res = {};\n                lodash_1.default.forEach(modelDeps, function (modelDep) {\n                    res[modelDep] = get(modelManager.getModel(modelDep).atom);\n                });\n                var currModelInstance = modelManager.getModel(currModelName);\n                res[currModelName] = get(currModelInstance.atom);\n                return res;\n            },\n            set: function (_a, newValue) {\n                var set = _a.set;\n                lodash_1.default.forOwn(newValue, function (newModalDataMap, modelName) {\n                    var modelInstance = modelManager.getModel(modelName);\n                    set(modelInstance.atom, newModalDataMap);\n                });\n            },\n        });\n        modelManager.setModel(currModelName, {\n            name: currModelName,\n            option: opt,\n            atom: atomItem,\n        });\n        return {\n            useShallowData: function (ids) {\n                var dataMap = recoil_1.useRecoilValue(atomItem);\n                return getValue(dataMap, ids);\n            },\n            useData: function (ids) {\n                return recoil_1.useRecoilValue(getSelectorItem(ids));\n            },\n            useChangeData: function () {\n                var _a = recoil_1.useRecoilState(updaterSelectorItem), storeMap = _a[0], setStoreMap = _a[1];\n                return {\n                    set: function (id, data) {\n                        var newStoreMap = lodash_1.default.cloneDeep(storeMap);\n                        var ids = normalize(currModelName, newStoreMap, id, data);\n                        if (!lodash_1.default.isEqual(newStoreMap, storeMap)) {\n                            setStoreMap(newStoreMap);\n                        }\n                        return ids;\n                    },\n                    remove: function (id) {\n                        if (id === undefined) {\n                            throw new Error('remove id is undefined');\n                        }\n                        var newStoreMap = lodash_1.default.cloneDeep(storeMap);\n                        var modelData = newStoreMap[currModelName];\n                        // id值可能是字符串或数字，而存在表中的key是字符串，因此要将id值转成字符串进行比较\n                        var targetIds = lodash_1.default.map(lodash_1.default.isArray(id) ? id : [id], function (id) { return id.toString(); });\n                        lodash_1.default.forOwn(modelData, function (dataItem, id) {\n                            if (targetIds.indexOf(id) !== -1) {\n                                // 删除的数据，在存储中依然保留id的key，只是将数据改为null。在查询时会过滤掉为null的数据项\n                                modelData[id] = null;\n                            }\n                        });\n                        setStoreMap(newStoreMap);\n                    },\n                };\n            }\n        };\n        /**\n         * 从model库中，根据id或id数组查询数据\n         * @param dataMap model数据库\n         * @param ids 查询的id或id列表\n         * @param parse 处理单个数据的函数\n         * @returns\n         */\n        function getValue(dataMap, ids, parse) {\n            if (ids === null || ids === undefined) {\n                return null;\n            }\n            var parseDataItem = parse || (function (dataItem) { return dataItem; });\n            if (lodash_1.default.isArray(ids)) {\n                // 批量读取数据\n                var dataList = lodash_1.default.map(ids, function (id) { return parseDataItem(dataMap[id]); });\n                // 过滤掉null、undefined等不存在的数据\n                return lodash_1.default.filter(dataList, function (dataItem) { return !!dataItem; });\n            }\n            // 读取单个数据\n            var id = ids;\n            var dataItem = parseDataItem(dataMap[id]);\n            return dataItem !== undefined ? dataItem : null;\n        }\n        /**\n         * 递归地将单个数据项中的经过处理的子model数据，填充为完整地数据项\n         * @example {books:[1,2]} -> {books: [{id:1, name:'book1'}, {id:2, name:'book2'}]}\n         * @param get recoil的get方法\n         * @param dataItem 单个数据项\n         * @returns object\n         */\n        function getDataItemRecursively(get, modelName, dataItem) {\n            var newDataItem = lodash_1.default.cloneDeep(dataItem);\n            var modelInstance = modelManager.getModel(modelName);\n            var fields = modelInstance.option.fields;\n            // 将子model的id替换成真实数据\n            lodash_1.default.forOwn(fields, function (subModelName, field) {\n                var subModelIds = newDataItem[field];\n                if (subModelIds !== undefined) {\n                    var subModelInstance = modelManager.getModel(subModelName);\n                    var subModelAtom = subModelInstance.atom;\n                    var subModelData = getValue(get(subModelAtom), subModelIds, function (dataItem) { return getDataItemRecursively(get, subModelName, dataItem); });\n                    newDataItem[field] = subModelData;\n                }\n            });\n            return newDataItem;\n        }\n        function normalize(modelName, storeMap, id, data) {\n            var dataItem;\n            var dataItems;\n            if (!data) {\n                // id是数据\n                if (lodash_1.default.isArray(id)) {\n                    // id是数据列表\n                    dataItems = id;\n                    return normalizeList(modelName, storeMap, dataItems);\n                }\n                else {\n                    // id是单个数据\n                    dataItem = id;\n                    return normalizeItem(modelName, storeMap, dataItem);\n                }\n            }\n            // id是要写入的数据的id，data是单个数据或部分的单个数据\n            dataItem = data;\n            return normalizeItem(modelName, storeMap, dataItem, id);\n        }\n        /**\n         * 批量处理数据列表\n         */\n        function normalizeList(modelName, storeMap, dataList) {\n            var ids = lodash_1.default.map(dataList, function (dataItem) {\n                return normalizeItem(modelName, storeMap, dataItem);\n            });\n            return lodash_1.default.filter(ids, function (id) { return id !== null; });\n        }\n        /**\n         * 将单个数据中涉及的子model数据，转换为id信息，并存入本model库中\n         * @param modelName model名\n         * @param storeMap 相关model的数据合集\n         * @param dataItem 要修改的数据项，可能只包含了部分数据\n         * @param id 要修改的数据项的id\n         * @returns\n         */\n        function normalizeItem(modelName, storeMap, dataItem, id) {\n            var modelInstance = modelManager.getModel(modelName);\n            var _a = modelInstance.option, idAttr = _a.idAttr, _b = _a.fields, currFields = _b === void 0 ? {} : _b;\n            var idVal = id === undefined ? dataItem[idAttr] : id;\n            if (idVal === undefined) {\n                console.error(\"idAttr \" + idAttr + \" is missing\", dataItem);\n                return null;\n            }\n            var newDataItem = lodash_1.default.cloneDeep(dataItem);\n            lodash_1.default.forOwn(currFields, function (subModelName, field) {\n                var subModelData = newDataItem[field];\n                var isNormalized = isNormalizedLike(subModelData);\n                if (subModelData !== undefined && !isNormalized) {\n                    // 尚未处理成id或id列表的子model数据\n                    var subDataIds = normalize(subModelName, storeMap, subModelData);\n                    newDataItem[field] = subDataIds;\n                }\n            });\n            changeDataItemInStoreMap(modelName, storeMap, idVal, newDataItem);\n            return idVal;\n        }\n    }\n    /**\n     * 全局数据操作的hook，可以操作所有model表\n     * @returns\n     */\n    function useChangeData() {\n        var resetData = recoil_1.useResetRecoilState(staticResetSelector);\n        return {\n            reset: function () {\n                resetData();\n            }\n        };\n    }\n}\nexports.default = initModel;\n/**\n * 在model表中，修改指定id的数据项的内容\n * @param modelName model名称\n * @param storeMap 所有相关的model的联合表\n * @param id 要修改的数据项的id\n * @param dataItem 要修改的数据内容\n */\nfunction changeDataItemInStoreMap(modelName, storeMap, id, dataItem) {\n    var modelDataMap = storeMap[modelName];\n    var orgDataItem = modelDataMap[id];\n    modelDataMap[id] = __assign(__assign({}, orgDataItem), dataItem);\n}\n/**\n * 是否像是处理过的model数据，由于model数据都是对象，因此只要不是对象就可以认为是处理过成为id或id列表的\n * @param list\n * @returns\n */\nfunction isNormalizedLike(data) {\n    if (lodash_1.default.isArray(data)) {\n        return lodash_1.default.every(data, function (item) { return !lodash_1.default.isPlainObject(item); });\n    }\n    return !lodash_1.default.isPlainObject(data);\n}\nfunction getAtomName(name) {\n    return \"NORMALIZE_ORM_MODEL_ATOM_\" + name;\n}\nfunction getSelectorName(name, extra) {\n    return \"NORMALIZE_ORM_MODEL_SELECTOR_\" + name + (extra ? \"_\" + extra : '');\n}\n\n\n//# sourceURL=webpack://recoil-normalize-orm/./src/model.ts?");

/***/ }),

/***/ "./src/modelManager.ts":
/*!*****************************!*\
  !*** ./src/modelManager.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __spreadArray = (this && this.__spreadArray) || function (to, from) {\n    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)\n        to[j] = from[i];\n    return to;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nvar ModelManager = /** @class */ (function () {\n    function ModelManager() {\n        this.data = {};\n        this.modelDepMap = {};\n    }\n    /**\n     * 计算model间的依赖关系\n     * @returns\n     */\n    ModelManager.prototype.getModelDepMap = function () {\n        var _this = this;\n        var modelNames = lodash_1.default.keys(this.data);\n        var depMap = {};\n        // 初始化依赖表\n        lodash_1.default.forEach(modelNames, function (modelName) {\n            var modelOpt = _this.data[modelName].option;\n            var _a = modelOpt.fields, fields = _a === void 0 ? {} : _a;\n            depMap[modelName] = lodash_1.default.values(fields);\n        });\n        // 再遍历一次依赖表，将每个model深度依赖的其他model都补全\n        lodash_1.default.forEach(modelNames, function (modelName) {\n            var depList = depMap[modelName];\n            var newDepList = __spreadArray([], depList);\n            var loopList = __spreadArray([], depList);\n            while (loopList.length) {\n                var currModelName = loopList.shift();\n                var currDepList = depMap[currModelName] || [];\n                lodash_1.default.forEach(currDepList, function (dep) {\n                    if (newDepList.indexOf(dep) === -1) {\n                        // 新的依赖，加入依赖项列表\n                        newDepList.push(dep);\n                        // 新的依赖，需要继续深度分析，查找更深的依赖\n                        loopList.push(dep);\n                    }\n                });\n            }\n            // 将深度挖掘过依赖的结果，写入依赖表\n            depMap[modelName] = newDepList;\n        });\n        return depMap;\n    };\n    ModelManager.prototype.hasModel = function (name) {\n        return !!this.data[name];\n    };\n    ModelManager.prototype.getModel = function (name) {\n        if (!this.hasModel(name)) {\n            throw new Error(\"model name not existed: \" + name);\n        }\n        return this.data[name];\n    };\n    ModelManager.prototype.setModel = function (name, modelInstance) {\n        if (this.hasModel(name)) {\n            // model name已存在\n            throw new Error(\"model name existed: \" + name);\n        }\n        this.data[name] = modelInstance;\n        // 重新计算model依赖关系\n        this.modelDepMap = this.getModelDepMap();\n    };\n    ModelManager.prototype.traverse = function (cb) {\n        lodash_1.default.forOwn(this.data, function (modelInstance) {\n            cb(modelInstance);\n        });\n    };\n    /**\n     * 获取model依赖的其他model的列表\n     * @param name model名称\n     * @returns\n     */\n    ModelManager.prototype.getDeps = function (name) {\n        if (!this.hasModel(name)) {\n            throw new Error(\"model name not existed: \" + name);\n        }\n        return this.modelDepMap[name];\n    };\n    return ModelManager;\n}());\nexports.default = ModelManager;\n\n\n//# sourceURL=webpack://recoil-normalize-orm/./src/modelManager.ts?");

/***/ }),

/***/ "recoil":
/*!*************************!*\
  !*** external "recoil" ***!
  \*************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_recoil__;

/***/ }),

/***/ "lodash":
/*!*************************************************************************************!*\
  !*** external {"commonjs":"lodash","commonjs2":"lodash","amd":"lodash","root":"_"} ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});