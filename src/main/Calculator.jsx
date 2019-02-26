import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button.'
import Display from '../components/Display';

const initialState = {
    displayValue: '',
    op: '',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0       
}

export default class Calculator extends Component{

    state = { ...initialState}

    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory(){
        console.log('limpar')
        this.state.displayValue = '0'
        this.setState({displayValue: 0})
        
    }
    setOperation(operation){  
        console.log(operation)  
        
        if(this.state.current === 0){
            this.setState({operation, current: 1, clearDisplay: true})
        }else{
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]
            values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operations: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values            
            })

        }
        



        /* MY FIRST TRY, MY CODE, MY LOGIC WITHOUT UDEMY LESSONS */
        /*
        console.log('second number')
        if(operation === '='){
            if(this.state.op === '/'){
                this.state.displayValue = this.state.values[0] / this.state.values[1]
                console.log(this.state.displayValue)
            }
            if(this.state.op === '*'){
                this.state.displayValue = this.state.values[0] * this.state.values[1]
                console.log(this.state.displayValue)
            }
            if(this.state.op === '+'){
                this.state.displayValue = this.state.values[0] + this.state.values[1]
                console.log(this.state.displayValue)
            }
            if(this.state.op === '-'){
                this.state.displayValue = this.state.values[0] - this.state.values[1]
                console.log(this.state.displayValue)
            }
        }

        }
        
        if(this.state.current === 0){
            console.log('first number')
            this.state.current = 1
            this.state.op = operation
        }
        */


    }

    addDigit(n){    
        if(n === '.' && this.state.displayValue.includes('.')){
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if(n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
            console.log(values)

        }

        this.state.values[this.state.current] = parseInt(n)

    }

    
    render() {
        const addDigit = n => this.addDigit(n)
        const setOperation = op => this.setOperatuion(op)

        return(
            <div className="calculator">
            <Display value={this.state.displayValue}/>
            <Button label="AC" click={this.clearMemory} triple/>
            <Button label="/" click={this.setOperation} operation/>
            <Button label="7" click={this.addDigit}/>
            <Button label="8" click={this.addDigit} />
            <Button label="9" click={this.addDigit} />
            <Button label="*" click={this.setOperation} operation/>
            <Button label="4" click={this.addDigit} />
            <Button label="5" click={this.addDigit} />
            <Button label="6" click={this.addDigit} />
            <Button label="-" click={this.setOperation} operation/>
            <Button label="1" click={this.addDigit} />
            <Button label="2" click={this.addDigit} />
            <Button label="3" click={this.addDigit} />
            <Button label="+" click={this.setOperation} operation/>
            <Button label="0" click={this.addDigit} double />
            <Button label="." click={this.addDigit}/>
            <Button label="=" click={this.setOperation} operation/>        
            </div>
        )
    }
}