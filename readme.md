# validate-field-decorator

A very simple Form Validation Tool for react

# 1. Install

```sh
npm install --save validate-field-decorator
```

Then use it.

# 2. Base Example
```js
import React from 'react'
import {Form, Field} from 'validate-field-decorator'

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
                    <i style={{color: 'red'}}>*</i>
                }
                {label}
            </label>
            <input
                ref={_ref} // if you want to use auto focus when error happen, you neet to use _ref to translate ref
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

```

# 3. props
Form and Field is a function which pass component and return component, you can also call them HOC.


### (1).props of the component which return by <strong>Form</strong>


### (2).props of the component which return by <strong>Field</strong>
#### name

#### rules

# 4. Built-in Validation
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

# 5. Available Scripts
### npm run dev
Runs the example in the development mode.
Open http://localhost:8707 to view it in the browser.

The page will reload if you make edits file in example and src.
You will also see any lint errors in the console.

### npm run build:min
The build is minified 

### npm run build:full
The build is Uncompressed

### npm test

### npm lint
