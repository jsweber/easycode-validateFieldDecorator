# validate-field-decorator

A very simple form validate tool for react

# 1. install

```sh
npm install --save validate-field-decorator
```

Then use it.

```jsx
import React from 'react'
import {Form, Field} from 'validate-field-decorator'

const InputWithMsg = props => {
    const {
        showMsg=false, // from Field, a flag for showing error message
        msgChildren='no message', // from Field, content of error message
        _ref, // from Field, help locate field which happens error
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
                    <i style={{color: 'red'}}>*</i>
                }
                {label}
            </label>
            <input
                ref={_ref}
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
        // validateFields from Form
        const {validateFields} = this.props

        validateFields((err, fields, ref) => {
			if (err) {
                // do something when error happens
                ref.current && ref.current.focus()
			}else {
                // submit data
                // post('url', this.state.data)
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
            <div>
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
                                return String(value).length >= 6
                            },
                            errMsg: 'length must be longer'
                        }
                    ]}
                />

                <button onClick={this.onSubmit}>submit</button>
            </div>
        )
    }
}

export default Form(App)

```

# 2. Built-in Validation
```js

const BuildValidationRule = {

    required(value){
        return value !== ''
    },

    isNumber(value) {
        return typeof value === 'number' && !Number.isNaN(value)
    },

    isString(value){
        return typeof value === 'string'
    },

    max(value, maxNumber){
        return this.isNumber(value) && value <= maxNumber
    },

    min(value, minNumber) {
        return this.isNumber(value) && value >= minNumber
    }
}

```
