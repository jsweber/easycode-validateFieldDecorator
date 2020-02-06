//author du

import React from 'react'
import {Form, Field} from '../../src/index'
import './style.css'
import InputWithMsg from '@common/InputWithMsg' // ../common/InputWithMsg
import RadioWithMsg from '@common/RadioWithMsg' // ../common/RadioWithMsg

const InputWithValidate = Field(InputWithMsg)
const RadioWithValidate = Field(RadioWithMsg)

class App extends React.Component{

    state= {
        data: {
            username: '',
            password: '',
            sex: ''
        }
    }

    onSubmit= () => {
        // validateFields is from Form
        const {validateFields} = this.props

        validateFields((err, fields, ref) => {
            console.log(fields)
			if (err) {
                // do something when error happens
                console.log(ref)
                ref.current && ref.current.focus()
			}else {
                // submit data
                // post('url', this.state.data)
                window.alert(JSON.stringify(fields))
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
                    name="username"
                    value={data.username}
                    onChange= {this.changeValue('username')}
                    required
                    rules={{
                        builtValidate: 'required', // Built-in Validation
                        errMsg: 'required'
                    }}
                />

                <InputWithValidate
                    name="password"
                    value={data.password}
                    onChange= {this.changeValue('password')}
                    required
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
                <RadioWithValidate
                    label="sex"
                    required
                    name="sex"
                    value={data.sex}
                    onChange= {this.changeValue('sex')}
                    rules={{
                        validate(value){
                            return value === 'unkown'
                        },
                        errMsg: 'must be unkown'
                    }}
                />

                <button 
                    onClick={this.onSubmit}
                    className="base-submit-btn"
                >submit</button>
            </div>
        )
    }
}

export default Form(App)

