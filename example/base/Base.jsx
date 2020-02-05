//author du

import React from 'react'
import {Form, Field} from '@lib/index'
import './style.css'

const InputWithMsg = props => {
    const {
        showMsg=false, // this props is from Field, a flag for showing error message
        msgChildren='no message', // this props is from Field, content of error message
        _ref, // this props is from Field, help locate field which happens error
        onChange,  // wrappered by Field
        label,
        required, 
        ...rest
        } = props

    return (
        <div>
            <label>
                {
                    required && 
                    <i className="base-required">*</i>
                }
                {label}：
            </label>
            <input
                ref={_ref} // if you want to use auto focus when error happen, you neet to use _ref to translate ref
                className={showMsg ? 'base-error-foucs' : '' }
                onChange={onChange}
                {...rest}
            />
            {
                showMsg && 
                <span>{msgChildren}</span>
            }
        </div>
    )
}

const InputWithValidate = Field(InputWithMsg)

class App extends React.Component{

    state= {
        data: {
            username: 'Lee',
            password: '123456'
        }
    }

    onSubmit= () => {
        // validateFields is from Form
        const {validateFields} = this.props

        validateFields((err, fields, ref) => {
            console.log(fields)
			if (err) {
                // do something when error happens
                ref.current && ref.current.focus()
			}else {
                // submit data
                // post('url', this.state.data)
                window.alert('submit success!')
			}
		})
    }

    changeValue= field => val => {
        const {data} = this.state
        this.setState({
            data: {
                ...data,
                [field]: val
            }
        })
    }

    render(){
        const {data} = this.state

        return (
            <div className="base-wrapper">
                <h2>base example</h2>
                <InputWithValidate
                    label="username"
                    required
                    name="username"
                    value={data.username}
                    onChange= {this.changeValue('username')}
                    rules={{
                        builtValidate: 'required', // Built-in Validation
                        errMsg: 'required'
                    }}
                />

                <InputWithValidate
                    label="password"
                    required
                    name="password"
                    value={data.password}
                    onChange= {this.changeValue('password')}
                    // multipe validater rules
                    rules={[
                        {
                            builtValidate: 'required',
                            errMsg: 'required'
                        },
                        {
                            validate(value){
                                return /^\d*$/.test(value)
                            },
                            errMsg: 'must be number'
                        }
                    ]}
                />

                <button onClick={this.onSubmit}>submit</button>
            </div>
        )
    }
}

export default Form(App)

