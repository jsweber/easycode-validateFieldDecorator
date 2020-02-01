//author du

import React from 'react'
import PropTypes from 'prop-types'
import FormContext from './context'
import omit from 'omit'

export const getEventValue = e => e.target ? e.target.value : e

const Field = Cmp => {

    return class FormItem extends React.Component{
        static contextType = FormContext

        static defaultProps = {
            name: '',
            rules: []
        }

        static propTypes = {
            name: PropTypes.string.isRequired,
            rules: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        }

        state = {
            value: '',
            myRule: {},
            showMsg: false,
            errMsg: ''
        }

        constructor(props) {
            super(props)
            this.ref = React.createRef()
        }

        componentDidUpdate() {
            this.addRule(this.props.value)
        }

        componentDidMount() {
            this.addRule(this.props.value)
        }

        addRule= value => {
            const {addField} = this.context
            const {name, rules} = this.props
            addField(name, {
                rules,
                value,
                ref: this.ref
            })
        }

        onWrapperdChange= e => {
            const {showMsg} = this.state
            const {rules, onChange} = this.props
            const value = getEventValue(e)
            const errMsg = this.context.validateField(rules, value)
            onChange(value)
            this.addRule(value)
            if (!showMsg && errMsg) {
                // 没有展示信息，但是错误了
                this.setState({
                    errMsg,
                    showMsg: true
                })
            } else if (showMsg && !errMsg) {
                // 已经展示信息，但是正确了
                this.setState({
                    showMsg: false
                })
            }
        }

        render(){
            const {errMsg, showMsg} = this.state
            const itemProps = omit([
                'onChange',
                'name',
                'rules'
            ], this.props)
            
            return (
                <Cmp
                    _ref={this.ref}
                    {...itemProps}
                    onChange = {this.onWrapperdChange}
                    showMsg={showMsg}
                    msgChildren={errMsg}
                />
            )
        }
    }
}

export default Field
