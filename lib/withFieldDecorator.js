import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
//author du
import React from 'react';
import PropTypes from 'prop-types';
import FormContext from './context';
import omit from 'omit';
export var getEventValue = function getEventValue(e) {
  return e.target ? e.target.value : e;
};

var Field = function Field(Cmp) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(FormItem, _React$Component);

    function FormItem(props) {
      var _this;

      _classCallCheck(this, FormItem);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(FormItem).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "state", {
        value: '',
        myRule: {},
        showMsg: false,
        errMsg: ''
      });

      _defineProperty(_assertThisInitialized(_this), "addRule", function (value) {
        var addField = _this.context.addField;
        var _this$props = _this.props,
            name = _this$props.name,
            rules = _this$props.rules;
        addField(name, {
          rules: rules,
          value: value,
          ref: _this.ref
        });
      });

      _defineProperty(_assertThisInitialized(_this), "onWrapperdChange", function (e) {
        var showMsg = _this.state.showMsg;
        var _this$props2 = _this.props,
            rules = _this$props2.rules,
            onChange = _this$props2.onChange;
        var value = getEventValue(e);

        var errMsg = _this.context.validateField(rules, value);

        onChange(value);

        _this.addRule(value);

        if (!showMsg && errMsg) {
          // 没有展示信息，但是错误了
          _this.setState({
            errMsg: errMsg,
            showMsg: true
          });
        } else if (showMsg && !errMsg) {
          // 已经展示信息，但是正确了
          _this.setState({
            showMsg: false
          });
        }
      });

      _this.ref = React.createRef();
      return _this;
    }

    _createClass(FormItem, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        this.addRule(this.props.value);
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.addRule(this.props.value);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$state = this.state,
            errMsg = _this$state.errMsg,
            showMsg = _this$state.showMsg;
        var itemProps = omit(['onChange', 'name', 'rules'], this.props);
        return React.createElement(Cmp, _extends({
          _ref: this.ref
        }, itemProps, {
          onChange: this.onWrapperdChange,
          showMsg: showMsg,
          msgChildren: errMsg
        }));
      }
    }]);

    return FormItem;
  }(React.Component), _defineProperty(_class, "contextType", FormContext), _defineProperty(_class, "defaultProps", {
    name: '',
    rules: []
  }), _defineProperty(_class, "propTypes", {
    name: PropTypes.string.isRequired,
    rules: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  }), _temp;
};

export default Field;