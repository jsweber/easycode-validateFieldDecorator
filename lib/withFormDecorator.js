import _extends from "@babel/runtime/helpers/extends";
import _typeof from "@babel/runtime/helpers/typeof";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
//author du
import React from 'react';
import FormContext from './context';
import BuildValidationRules from './builtValidationRule';
/**
 * 不希望更新它时出发渲染，所以放组件外
 * [
 *      'username': {
 *          rules: [
 *              {
    *              validate(value){
    *                  return value !== ''
    *              },
    *               param: [8]
    *              message: 'must input something',
 *              },
 *              {   内置验证方法使用
 *                  builtValidate: 'max',
 *                  param: 8
 *                  message: 'required'
 *              },
 *              {
 *                  // 处理异步验证
 *                  validate(value) {
 *                      return new Promise((resolve, reject) => {
 *                          setTimeout(() => {
 *                              resolve(true)
 *                          }, 1000)
 *                      })
 *                  }
 *              }
 *          ],
 *          value: ''
 *       }
 * 
 * ]
 * 
 */

var allField = Object.create(null);
/**
 * 当规则中同时有validate和builtValidate时，只会调用validate
 * @param {object} rule 验证规则
 * @param {any} value 需要验证的值
 */

var validate = function validate(rule, value) {
  var validate = rule.validate,
      errMsg = rule.errMsg,
      param = rule.param;
  var params = Array.isArray(param) ? param.unshift(value) : [value, param];
  if (typeof validate === 'function' && !validate.apply(void 0, _toConsumableArray(params))) return errMsg;else if (typeof validate === 'undefined' && rule.builtValidate) {
    // 调用内置验证函数
    var builtValidate = BuildValidationRules[rule.builtValidate];
    if (builtValidate && !builtValidate.apply(void 0, _toConsumableArray(params))) return errMsg;
  }
  return null;
};

var Form = function Form(Cmp) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Form, _React$Component);

    function Form() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Form);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Form)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "addField", function (name, field) {
        allField[name] = field;
      });

      _defineProperty(_assertThisInitialized(_this), "validateField", function (rules, value) {
        if (Array.isArray(rules)) {
          for (var i = 0; i < rules.length; i++) {
            var retMsg = validate(rules[i], value);
            if (retMsg) return retMsg;
          }
        } else if (_typeof(rules) === 'object') {
          // 支持直接给rule传一个对象
          var _retMsg = validate(rules, value);

          if (_retMsg) return _retMsg;
        }

        return null;
      });

      _defineProperty(_assertThisInitialized(_this), "validateFields", function (cb) {
        var retMsg = null,
            ret = {},
            retCmp = null;

        for (var field in allField) {
          var fieldRule = allField[field];
          var rules = fieldRule.rules,
              value = fieldRule.value,
              ref = fieldRule.ref;
          retMsg = _this.validateField(rules, value);

          if (retMsg) {
            retCmp = ref;
            break;
          }

          ret[field] = value;
        }
        /**
         * @param {string} retMsg 错误信息
         * @param {object} ret { username: { value, ...retNeedValue } }
         */


        cb(retMsg, ret, retCmp);
      });

      return _this;
    }

    _createClass(Form, [{
      key: "render",
      value: function render() {
        var context = {
          validateFields: this.validateFields,
          validateField: this.validateField,
          addField: this.addField,
          allField: allField
        };
        return React.createElement(FormContext.Provider, {
          value: context
        }, React.createElement(Cmp, _extends({}, this.props, {
          validateFields: this.validateFields,
          validateField: this.validateField
        })));
      }
    }]);

    return Form;
  }(React.Component), _defineProperty(_class, "defaultProps", {}), _defineProperty(_class, "propTypes", {}), _temp;
};

export default Form;