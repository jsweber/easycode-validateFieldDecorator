//author du

import React from 'react'
import FormContext from './context'
import BuildValidationRules from './builtValidationRule'
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
let allField = Object.create(null)
/**
 * 当规则中同时有validate和builtValidate时，只会调用validate
 * @param {object} rule 验证规则
 * @param {any} value 需要验证的值
 */
const validate = (rule, value) => {
    const {validate, errMsg, param} = rule
    const params = Array.isArray(param) ? param.unshift(value) : [value, param]
    if (typeof validate === 'function' && !validate(...params)) return errMsg
    else if (typeof validate === 'undefined' && rule.builtValidate) {
        // 调用内置验证函数
        const builtValidate = BuildValidationRules[rule.builtValidate]
        if (builtValidate && !builtValidate(...params)) return  errMsg
    }
    return null
}

const Form = Cmp => class Form extends React.Component{
    static defaultProps = {}
    static propTypes = {}

    addField= (name, field) => {
        allField[name] = field
    }

    validateField= (rules, value) => {
        if (Array.isArray(rules)) {
            for (let i =0; i < rules.length; i++){
                const retMsg = validate(rules[i], value)
                if (retMsg) return retMsg
            }
        } else if (typeof rules === 'object'){
            // 支持直接给rule传一个对象
            const retMsg = validate(rules, value)
            if (retMsg) return retMsg
        }
        return null
    }
    /**
     * 验证所有的字段是否正确
     * @param {function} cb 验证后的回调函数，可以在里面执行些submit操作
     */
    validateFields= (cb) => {
        let retMsg = null, ret = {}, retCmp = null
        for (let field in allField){
            const fieldRule = allField[field]
            const {rules, value, ref} = fieldRule
            retMsg = this.validateField(rules, value)
            if (retMsg) {
                retCmp = ref
                break
            }
            ret[field] = value
        }
        /**
         * @param {string} retMsg 错误信息
         * @param {object} ret { username: { value, ...retNeedValue } }
         */
        cb(retMsg, ret, retCmp)
    }

    render(){
        const context = {
            validateFields: this.validateFields,
            validateField: this.validateField,
            addField: this.addField, 
            allField
        }

        return (
            <FormContext.Provider
                value={context}
            >
                <Cmp
                    {...this.props}
                    validateFields={this.validateFields}
                    validateField={this.validateField}
                />
            </FormContext.Provider>
        )
    }
}

export default Form
