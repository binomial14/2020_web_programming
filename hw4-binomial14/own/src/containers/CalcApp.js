import React from 'react';

import CalcButton from '../components/CalcButton';

var operation=
{
  DIV: 0,
  MUL: 1,
  MIN: 2,
  ADD: 3,
  DEF: 4,
  DOT: 5
}

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO
      display: 0,
      operation: operation.DEF,
      input_type: operation.DEF,
      previous_num: 0,
      dot_pos: 0,
      input_num: 0
    };
  }

  resetState = () => {
    // TODO
    this.setState({display: 0});
    this.setState({operation: operation.DEF,});
    this.setState({input_type: operation.DEF,});
    this.setState({previous_num: 0});
    this.setState({dot_pos: 0});
    this.setState({input_num: 0});
  }

  input = (i) => {
    console.log(this.state.display);
    console.log(this.state.dot_pos);
    if(this.state.input_type === operation.DEF)
    {
      this.setState({display: this.state.display*10+i});
    }
    else if(this.state.input_type === operation.DOT)
    {
      this.setState({display: this.state.display+i*Math.pow(0.1,this.state.dot_pos)});
      this.setState({dot_pos: this.state.dot_pos+1});
    }
    else
    {
      this.setState({display: i});
      this.setState({input_type: operation.DEF});
    }
    if(this.state.display !== 0 || i !== 0)
    {
      this.setState({input_num: this.state.input_num+1})
    }
  }

  percent = () => {
    //var show = (this.state.display*0.01)*-1;
    console.log(this.state.display);
    //this.setState({dot_pos: this.state.dot_pos+2});
    this.setState({display: this.state.display*0.01})
  }

  negative = () => {
    console.log(this.state.display);
    this.setState({display: (this.state.display*-1.0)});
  }

  divide = () => {
    this.setState({operation: operation.DIV});
    this.setState({input_type: operation.DIV});
    this.setState({previous_num: this.state.display});
    this.setState({dot_pos: 0});
    this.setState({input_num: 0})
  }

  multiply = () => {
    this.setState({operation: operation.MUL});
    this.setState({input_type: operation.MUL});
    this.setState({previous_num: this.state.display});
    this.setState({dot_pos: 0});
    this.setState({input_num: 0})
  }

  minus = () => {
    this.setState({operation: operation.MIN});
    this.setState({input_type: operation.MIN});
    this.setState({previous_num: this.state.display});
    this.setState({dot_pos: 0});
    this.setState({input_num: 0})
  }

  add = () => {
    this.setState({operation: operation.ADD});
    this.setState({input_type: operation.ADD});
    this.setState({previous_num: this.state.display});
    this.setState({dot_pos: 0});
    this.setState({input_num: 0})
  }

  equate = () => {
    var p_num = this.state.previous_num;
    this.setState({previous_num: this.state.display});
    switch(this.state.operation)
    {
      case operation.DIV:
        this.setState({display: p_num/this.state.display});
        break;
      case operation.MUL:
        this.setState({display: p_num*this.state.display});
        break;
      case operation.MIN:
        this.setState({display: p_num-this.state.display});
        break;
      case operation.ADD:
        this.setState({display: p_num+this.state.display});
        break;
      case operation.DEF:
        break;
      case operation.DOT:
        break;
    }
  }

    dot = () => {
      if(this.input_type !== operation.DEF)
      {
        this.setState({display: 0});
        this.setState({input_type: operation.DOT});
      }
      else
      {
        this.setState({input_type: operation.DOT});
      }
      this.setState({dot_pos: this.state.dot_pos+1})
    }

    show_num = () => {
      //console.log(this.state.display*Math.pow(0.1, this.state.dot_pos));
      var display_string = this.state.display.toString();
      console.log(display_string.length)
      var output;
      if(display_string.includes("e"))
      {
        var real = display_string.slice(0,this.state.input_num+1);
        if(real.includes("e"))
        {
          real = real.slice(0,real.indexOf("e"));
        }
        if(real.charAt(real.length-1)==".")
        {
          real = real.slice(0,real.length-1)
        }
        output = real+display_string.slice(display_string.indexOf("e"));
      }
      else
      {
        if(display_string.charAt(8) >= 5)
        {
          output = display_string.slice(0,8);
        }
        else
        {
          output = display_string.slice(0,8);
        }
      }
      if(this.state.operation === operation.DOT)
      {
        if(!output.includes("."))
        {
          output = output + "."
        }
      }
      return output;
    }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
    <div className="calc-display">{this.show_num()}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState}>AC</CalcButton>
            <CalcButton onClick={this.negative}>+/-</CalcButton>
            <CalcButton onClick={this.percent}>%</CalcButton>
            <CalcButton className="calc-operator" onClick={this.divide}>÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={() => this.input(7)}>7</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.input(8)}>8</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.input(9)}>9</CalcButton>
            <CalcButton className="calc-operator" onClick={this.multiply}>X</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={() => this.input(4)}>4</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.input(5)}>5</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.input(6)}>6</CalcButton>
            <CalcButton className="calc-operator" onClick={this.minus}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={() => this.input(1)}>1</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.input(2)}>2</CalcButton>
            <CalcButton className="calc-number" onClick={() => this.input(3)}>3</CalcButton>
            <CalcButton className="calc-operator" onClick={this.add}>+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" className="bigger-btn" onClick={() => this.input(0)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0</CalcButton>
            <CalcButton className="calc-number" onClick={this.dot}>.</CalcButton>
            <CalcButton className="calc-operator" onClick={this.equate}>=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
